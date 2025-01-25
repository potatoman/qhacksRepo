import '../css/Home.css'
import { useState } from 'react'

function Home() {
  const [selectedFiles, setSelectedFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
  })

  const handleFileChange = (event) => {
    const { id, files } = event.target
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [id]: files[0] || null, // Store the first selected file or null
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Send the selected files to the server
    console.log(selectedFiles)
  }

  return (
    <div className="App">
      <div className="titleContainer">
        <h1 className="title">
          REV<span className="title2">AI</span>SE
        </h1>
      </div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="subheader">Subject</div>
        <select className="dropDown">
          <option value="option1">Business</option>
          <option value="option2">English</option>
          <option value="option3">Econ</option>
        </select>

        <div className="subheader">Assignment</div>
        <div className="fileUploadContainer">
          <label className="fileUploadLabel" htmlFor="file1">
            {selectedFiles.file1 ? selectedFiles.file1.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="file1"
            className="fileUpload"
            onChange={handleFileChange}
          />

          <div className="subheader">Assignment Instructions</div>
          <label className="fileUploadLabel" htmlFor="file2">
            {selectedFiles.file2 ? selectedFiles.file2.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="file2"
            className="fileUpload"
            onChange={handleFileChange}
          />

          <div className="subheader">Assignment Rubric</div>
          <label className="fileUploadLabel" htmlFor="file3">
            {selectedFiles.file3 ? selectedFiles.file3.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="file3"
            className="fileUpload"
            onChange={handleFileChange}
          />
        </div>
        <div className="subheader">Grading Difficulty</div>
        <div className="sliderContainer">
          <div className="slider">
            <input type="range" min="1" max="3" step="1" defaultValue="1" />
            <div className="sliderLabels">
              <span>Chill</span>
              <span>Fair</span>
              <span>Harsh</span>
            </div>
          </div>
        </div>

        <button className="submitButton" type="submit">REVAISE</button>
      </form>
    </div>
  )
}

export default Home
