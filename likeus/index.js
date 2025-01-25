import express from "express"
import dotenv from "dotenv"
import OpenAI from "openai";
import fs from "fs"
import pdfParse from 'pdf-parse';
import pdf from 'pdf-parse'

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
  console.log('server is running on http://localhost:${PORT}');
});
// 1. Read PDF file


// Function to extract text from a PDF file
const parsePdf = async (filePath) => {
    try {
      // Read the PDF file
      const pdfBuffer = fs.readFileSync(filePath);
  
      // Extract text using pdf-parse
      const pdfData = await pdfParse(pdfBuffer);
  
      // Log the extracted text
      console.log("Extracted Text:\n", pdfData.text);
    } catch (error) {
      console.error("Error parsing PDF:", error);
    }
  };
  
// Specify the path to the PDF file
const pdfFilePath = './sample.pdf'; // Replace with your PDF file path

// Call the function
parsePdf(pdfFilePath);

// async function main() {
//     const stream = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ 
//             role: "system", 
//             content: 
//             `You are an expert in {your field} and are known as a {tough} marker. You are grading the assignment and rubric that will be provided. What grade would you provide the submission based off of the rubric? Please provide only a numeric grade for this section and nothing else.
//             Provide a brief explanation as to which level is best met for each criteria along with the numeric grade you would give.
//             If there is any criteria that does not meet the maximum level, provide feedback on how to improve. Be specific on where in the submission, and what could be improved, but do not write any new content for the student as we do not want to violate any academic integrity rules. Do not be afraid to critique the work.
//             Make sure to separate the rubric grade/explanation and the submission feedback in two separate sections.`,
//             role: "user", content: "Hi"
//         }],
//         store: true,
//         stream: true,
//     });
//     for await (const chunk of stream) {
//         process.stdout.write(chunk.choices[0]?.delta?.content || "");
//     }
// }

// main()
