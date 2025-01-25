import '../css/Home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pdfToText from 'react-pdftotext'


function Home() {
  
  const navigate = useNavigate()
  const [files, setFiles] = useState({
    assignment: null,
    outline: null,
    rubric: null,
  })
  const [subject, setSubject] = useState('Business')
  const [difficulty, setDifficulty] = useState(1)

  const [assignmentText, setAssignmentText] = useState('')
  const [outlineText, setOutlineText] = useState('')
  const [rubricText, setRubricText] = useState('')

  const handleAssignmentChange = (event) => {
    const { id, files } = event.target
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: files[0] || null, // Store the first selected file or null
    }))
    
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => setAssignmentText(text))
        .catch(error => console.error("Failed to extract text from pdf"))
  }
  const handleOutlineChange = (event) => {
    const { id, files } = event.target
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: files[0] || null, // Store the first selected file or null
    }))
    
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => setOutlineText(text))
        .catch(error => console.error("Failed to extract text from pdf"))
  }
  const handleRubricChange = (event) => {
    const { id, files } = event.target
    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: files[0] || null, // Store the first selected file or null
    }))
    
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => setRubricText(text))
        .catch(error => console.error("Failed to extract text from pdf"))
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

    // Parse each PDF into text on the client side

    // Prepare FormData
    const formData = new FormData()
    // Append original files (if you still want to send the PDFs themselves)
    formData.append('assignment', files.assignment)
    formData.append('outline', files.outline)
    formData.append('rubric', files.rubric)

    formData.append('assignmentText', assignmentText)
    formData.append('outlineText', outlineText)
    formData.append('rubricText', rubricText)

    // Append difficulty
    let difficultyLabel = 'chill'
    if (difficulty === '2') difficultyLabel = 'fair'
    if (difficulty === '3') difficultyLabel = 'harsh'
    formData.append('difficulty', difficultyLabel)

    // Append subject
    formData.append('subject', subject)

    try {
      const response = await fetch('http://localhost:5001/api/intro', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('Files (and text) uploaded successfully!')
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
            onChange={handleAssignmentChange}
          />

          <div className="subheader">Assignment Instructions</div>
          <label className="fileUploadLabel" htmlFor="outline">
            {files.outline ? files.outline.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="outline"
            className="fileUpload"
            onChange={handleOutlineChange}
          />

          <div className="subheader">Assignment Rubric</div>
          <label className="fileUploadLabel" htmlFor="rubric">
            {files.rubric ? files.rubric.name : 'Choose File'}
          </label>
          <input
            type="file"
            id="rubric"
            className="fileUpload"
            onChange={handleRubricChange}
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
