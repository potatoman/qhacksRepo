import {React, useState} from 'react';
import '../css/Output.css';

import placeholderpdf from '../assets/placeholder.pdf';


const Output = (props) => {

    const [text, setText] = useState('')
    const [chats, setChats] = useState([])

    const handleSubmit = (event) => {

    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && text.trim() !== '') {
            event.preventDefault();
            setChats([...chats, ['usr-in' ,text]]);
            setText('');
            handleSubmit(event);
        }
    };

    return (
        <div className='output'>
            <h1>REVAISE</h1>
            <div className='output-container'>
                <div className='output-chat'>
                    <div className='chats'>
                        {chats.map((chat, index) => (
                            <div key={index} className={chat[0]}>
                                {chat[1]}
                            </div>
                        ))}
                    </div>

                    <form className='usr-chatbox' onSubmit={handleSubmit}>
                        <textarea 
                            className='output-chat-textarea' 
                            placeholder='Type your message here...' 
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            onKeyDown={handleKeyPress}>
                        </textarea>
                        <button className='output-chat-button' type='submit'>Send</button>
                    </form>

                </div>
                <div className='output-showcase'>
                    <object className="pdf" data={placeholderpdf} type="application/pdf">
                        <a href={placeholderpdf} download={placeholderpdf}>
                            <p>COULD NOT RENDER THE PDF, CLICK TO VIEW</p>
                        </a>
                    </object>
                </div>
            </div>
        </div>
    );
};
export default Output;