import React from 'react';
import '../css/Output.css';

import placeholderpdf from '../assets/placeholder.pdf';

const Output = (props) => {
    return (
        <div className='output'>
            <h1>REVAISE</h1>
            <div className='output-container'>
                <div className='output-chat'>
                    <div className='chats'>
                        <div className='ai-out'>
                            Hello! How can I help you today?
                        </div>
                        <div className='usr-in'>
                            I love ai SOOOOOOOO MUCH!
                        </div>
                        <div className='ai-out'>
                            Hello! How can I help you today?
                        </div>
                        <div className='usr-in'>
                            I love ai SOOOOOOOO MUCH!
                        </div>
                        <div className='ai-out'>
                            Hello! How can I help you today?
                        </div>
                        <div className='usr-in'>
                            I love ai SOOOOOOOO MUCH!
                        </div>
                        <div className='ai-out'>
                            Hello! How can I help you today?
                        </div>
                        <div className='usr-in'>
                            I love ai SOOOOOOOO MUCH!
                        </div>
                    </div>


                    <textarea className='output-chat-textarea' placeholder='Type your message here...'></textarea>
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