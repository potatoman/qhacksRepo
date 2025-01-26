import { React, useEffect, useState } from 'react'
import '../css/Output.css'

import placeholderpdf from '../assets/placeholder.pdf'

const Output = (props) => {
  const [text, setText] = useState('')
  const [chats, setChats] = useState([])
  const [sentMsg, setSentMsg] = useState(false)
  const [count, setCount] = useState(0)
  const [subText, setSubText] = useState('')

  useEffect(() => {
    console.log('in followup')
    async function fetchFollowup() {
      console.log(chats)
      const message = chats[chats.length - 1][1]
      console.log(message)
      const response = await fetch('http://localhost:5001/api/followup', {
        method: 'POST',
        body: message,
      })
      const data = await response.json()
      setChats([...chats, ['ai-out', data.message]])
    }
    if (count > 0 && chats.length > 0 && sentMsg) {
      fetchFollowup()
      setSentMsg(false)
    }
  }, [sentMsg])


  useEffect(() => {
    console.log('in output')
    async function fetchOutput() {
      const response = await fetch('http://localhost:5001/api/output', {})
      const data = await response.json()
      console.log(data.message)
      setChats([...chats, ['ai-out', data.message]])

      const response2 = await fetch('http://localhost:5001/api/displaytext', {})
      const data2 = await response2.json()
      console.log(data2)
      setSubText(data2.message)

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
      setSentMsg(true)
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
    setSentMsg(true)
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
          {/* <object className="pdf" data={placeholderpdf} type="application/pdf">
            <a href={placeholderpdf} download={placeholderpdf}>
              <p>COULD NOT RENDER THE PDF, CLICK TO VIEW</p>
            </a>
          </object> */}
          <h1>RAW TEXT OF ASSIGNMENT:</h1>
          <h3>{subText}</h3>
        </div>
      </div>
    </div>
  )
}
export default Output
