import '../css/Home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [files, setFiles] = useState({
    assignment: null,
    outline: null,
    rubric: null,
  })
  const [subject, setSubject] = useState('Business')
  const [difficulty, setDifficulty] = useState(1)

  const handleFileChange = (event) => {
    const { id, files } = event.target
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: files[0] || null, // Store the first selected file or null
    }))
  }

  //   console.log(file1Element)
  //   file1Element.addEventListener('change', (event) => {
  //     const files = event.target.files // this gives you a filelist object
  //     if (files.length > 0) {
  //       const file = files[0] // access the first file (if needed)
  //       console.log(file) // debug: check the file object
  //       // process/save the file as needed
  //     }
  //   })

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value)
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    // append files to the formdata object
    formData.append('assignment', files.assignment)
    formData.append('outline', files.outline)
    formData.append('rubric', files.rubric)
    if (difficulty == 1) {
      formData.append('difficulty', 'chill')
    } else if (difficulty == 2) {
      formData.append('difficulty', 'fair')
    } else if (difficulty == 3) {
      formData.append('difficulty', 'harsh')
    }
    formData.append('subject', subject)

    console.log(formData)

    try {
      const response = await fetch('http://localhost:5001/api/intro', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('Files uploaded successfully!')
        navigate('/output')
      } else {
        console.error('File upload failed.')
      }
    } catch (error) {
      console.error('Error while uploading files:', error)
    }
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
        <select className="dropDown" onChange={handleSubjectChange}>
          <option value="Business">Business</option>
          <option value="English">English</option>
          <option value="Econ">Econ</option>
        </select>

        <div className="subheader">Assignment</div>
        <div className="fileUploadContainer">
          <label className="fileUploadLabel" htmlFor="assignment">
            {files.assignment ? files.assignment.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="assignment"
            className="fileUpload"
            onChange={handleFileChange}
          />

          <div className="subheader">Assignment Instructions</div>
          <label className="fileUploadLabel" htmlFor="outline">
            {files.outline ? files.outline.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="outline"
            className="fileUpload"
            onChange={handleFileChange}
          />

          <div className="subheader">Assignment Rubric</div>
          <label className="fileUploadLabel" htmlFor="rubric">
            {files.rubric ? files.rubric.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="rubric"
            className="fileUpload"
            onChange={handleFileChange}
          />
        </div>
      </form>
      <div className="subheader">Grading Difficulty</div>
      <div className="sliderContainer">
        <div className="slider">
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            defaultValue="1"
            onChange={handleDifficultyChange}
          />
          <div className="sliderLabels">
            <span>Chill</span>
            <span>Fair</span>
            <span>Harsh</span>
          </div>
        </div>
      </div>

      <button className="submitButton" onClick={handleSubmit}>
        REVAISE
      </button>
    </div>
  )
}

export default Home
