import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import pdfUtil from 'pdf-to-text';

// initialize dotenv to load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.KEY
});

// middleware to parse incoming json requests
app.use(express.json());

// basic route for testing
app.get("/", (req, res) => {
  res.send("we're up");
});

// example api route
app.get("/api/example", (req, res) => {
  res.json({ message: "example endpoint" });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function pdfText(file){
  return new Promise((resolve, reject) => {
    pdfUtil.pdfToText(file, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}


async function callGPT(subject, difficulty, rubric, submission, outline) {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ 
            role: "user", 
            content: 
            `You are an expert in ${subject} and are known as a ${difficulty} marker. You are grading the assignment and rubric that will be provided. What grade would you provide the submission based off of the rubric? Please provide only a numeric grade for this section and nothing else.
            Provide a brief explanation as to which level is best met for each criteria along with the numeric grade you would give.
            If there is any criteria that does not meet the maximum level, provide feedback on how to improve. Be specific on where in the submission, and what could be improved, but do not write any new content for the student as we do not want to violate any academic integrity rules. Do not be afraid to critique the work.
            Make sure to separate the rubric grade/explanation and the submission feedback in two separate sections.
            Here is the assignment outline: ${outline}.
            Here is the submission text: ${submission}.
            Here is the rubric: ${rubric}.
            `,
            // role: "user", content: "Hi"
        }],
        store: true,
        stream: true,
    });
    return stream
}


app.post('/api/intro', async (req, res) => {
    try{
      let subject, difficulty, rubric, submission, outline = req.body
      const parsed_rubric = await pdfText(rubric)
      const parsed_submission = await pdfText(submission)
      const parsed_outline = await pdfText(outline)
      const stream = await callGPT(subject, difficulty, parsed_rubric, parsed_submission, parsed_outline);
      for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
    return res.json({
      message: "Good shit"
    })
  }
  catch(error) {
    return res.json({message: "CMON MAN", error_message: error})
  }
})

// main()
