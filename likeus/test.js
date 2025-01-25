import axios from 'axios';
import fs from 'fs'

// Your OpenAI API Key
const apiKey = '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';

// File to upload
const filePath = "../README";

// Read the file as a stream
const fileStream = fs.createReadStream(filePath);

// Make the POST request
axios
  .post(
    "https://api.openai.com/v1/files",
    {
      file: fileStream,
      purpose: "fine-tune", // Specify the purpose (e.g., "fine-tune")
    },
    {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    }
  )
  .then((response) => {
    console.log("File uploaded successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error uploading file:", error.response?.data || error.message);
  });
