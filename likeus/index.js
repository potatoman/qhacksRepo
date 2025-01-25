import express from 'express'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import pdfUtil from 'pdf-to-text'
import multer from 'multer'
import cors from 'cors'
import fs from 'fs'

// initialize dotenv to load env vars
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.KEY,
})

// middleware to parse incoming json requests
app.use(express.json())
app.use(cors())
app.use(multer().any())
const upload = multer()

let conversation = []
let output = ''
// basic route for testing
app.get('/', (req, res) => {
  res.send("we're up")
})

app.get('/api/output', (req, res) => {
  res.json({ message: output })
})
app.get('/api/followup', async (req, res) => {
  output = ''
  console.log('followup body', req.body)
  const stream = await callGPTFollowup(req.body)
  for await (const chunk of stream) {
    output += chunk.choices[0]?.delta?.content || ''
  }
  conversation.push(req.body)
  conversation.push(output)
  return res.json({ message: output })
})

async function callGPTFollowup(message) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `This is the conversation so far: ${conversation}. Every odd message is a user message, and every even message is an AI message. Please respond to this user message: ${message}. Remember that you cannot provide an explicit answer. Keep it short and concise.`,
      },
    ],
    store: true,
    stream: true,
  })
  return stream
}

// example api route
app.get('/api/example', (req, res) => {
  res.json({ message: 'example endpoint' })
})

// // TODO step 1 & 2 & 3
// const dataBuffer = fs.readFileSync("./sample.pdf");

// pdfParse(dataBuffer).then((data) => {
//   console.log("PDF Text Content:");
//   console.log(data.text);
// });

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

async function callGPT(subject, difficulty, rubric, submission, outline) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `You are an expert in ${subject} and are known as a ${difficulty} marker. You are grading the assignment and rubric that will be provided. What grade would you provide the submission based off of the rubric? Please provide only a numeric grade for this section and nothing else.
            Provide a brief explanation as to which level is best met for each criteria along with the numeric grade you would give.
            If there is any criteria that does not meet the maximum level, provide feedback on how to improve. Be specific on where in the submission, and what could be improved, but do not write any new content for the student as we do not want to violate any academic integrity rules. Do not be afraid to critique the work.
            Make sure to separate the rubric grade/explanation and the submission feedback in two separate sections.
            Here is the assignment outline: ${outline}.
            Here is the submission text: ${submission}.
            Here is the rubric: ${rubric}.
            `,
        // role: "user", content: "Hi"
      },
    ],
    store: true,
    stream: true,
  })
  conversation.push({
    content: `You are an expert in ${subject} and are known as a ${difficulty} marker. You are grading the assignment and rubric that will be provided. What grade would you provide the submission based off of the rubric? Please provide only a numeric grade for this section and nothing else.
            Provide a brief explanation as to which level is best met for each criteria along with the numeric grade you would give.
            If there is any criteria that does not meet the maximum level, provide feedback on how to improve. Be specific on where in the submission, and what could be improved, but do not write any new content for the student as we do not want to violate any academic integrity rules. Do not be afraid to critique the work.
            Make sure to separate the rubric grade/explanation and the submission feedback in two separate sections. Keep it short and concise.
            Here is the assignment outline: ${outline}.
            Here is the submission text: ${submission}.
            Here is the rubric: ${rubric}.
            `,
  })
  conversation.push(stream)
  return stream
}

app.post('/api/intro', async (req, res) => {
  try {
    const subject = req.body.subject
    const difficulty = req.body.difficulty
    const parsed_rubric = req.body.rubricText
    const parsed_submission = req.body.submissionText
    const parsed_outline = req.body.outlineText
    const stream = await callGPT(
      subject,
      difficulty,
      parsed_rubric,
      parsed_submission,
      parsed_outline
    )
    for await (const chunk of stream) {
      output += chunk.choices[0]?.delta?.content || ''
    }
    return res.json({
      message: 'Good shit',
    })
  } catch (error) {
    return res.json({ message: 'CMON MAN', error_message: error })
  }
})

// main()
