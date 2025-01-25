import { React, useEffect, useState } from 'react'
import '../css/Output.css'

import placeholderpdf from '../assets/placeholder.pdf'

const Output = (props) => {
  const [text, setText] = useState('')
  const [chats, setChats] = useState([])

  const [output, setOutput] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('in followup')
    async function fetchFollowup() {
      console.log(chats)
      const message = chats[chats.length - 1][1]
      const response = await fetch('http://localhost:5001/api/followup', {
        method: 'POST',
        body: message,
      })
      const data = await response.json()
      setOutput(data.message)
      setChats([...chats, ['ai-out', output]])
    }
    if (count > 0 && chats.length > 0) {
      fetchFollowup()
    }
  }, [chats])

  useEffect(() => {
    console.log('in output')
    async function fetchOutput() {
      const response = await fetch('http://localhost:5001/api/output', {})
      const data = await response.json()
      setChats([...chats, ['ai-out', data.message]])
    }
    if (count == 0) {
      fetchOutput()
      setCount(count + 1)
    }
  }, [count])

  const handleSubmit = (event) => {}

  const handleKeyPress = (event) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.ctrlKey &&
      text.trim() !== ''
    ) {
      event.preventDefault()
      setChats([...chats, ['usr-in', text]])
      setText('')
      handleSubmit(event)
      setTimeout(() => {
        console.log('Chat cooldown finished.')
      }, 10000)
    }
  }
  const handleSendPress = (event) => {
    event.preventDefault()
    setChats([...chats, ['usr-in', text]])
    setText('')
    handleSubmit(event)
    setTimeout(() => {
      console.log('Chat cooldown finished.')
    }, 10000)
  }

  return (
    <div className="output">
      <h1>REVAISE</h1>
      <div className="output-container">
        <div className="output-chat">
          <div className="chats">
            {chats.map((chat, index) => (
              <div key={index} className={chat[0]}>
                {chat[1]}
              </div>
            ))}
          </div>

          <form className="usr-chatbox" onSubmit={handleSubmit}>
            <textarea
              className="output-chat-textarea"
              placeholder="Type your message here..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={handleKeyPress}
            ></textarea>
            <button className="output-chat-button" onClick={handleSendPress}>
              Send
            </button>
          </form>
        </div>
        <div className="output-showcase">
          <object className="pdf" data={placeholderpdf} type="application/pdf">
            <a href={placeholderpdf} download={placeholderpdf}>
              <p>COULD NOT RENDER THE PDF, CLICK TO VIEW</p>
            </a>
          </object>
        </div>
      </div>
    </div>
  )
}
export default Output
