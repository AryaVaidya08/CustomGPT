import './App.css'
import ChatMessage from './Components/ChatMessage.js'
import { useState, useEffect } from 'react';
import getResponse from './Components/request.js';

/*
--------------------------------------------------------------------------------------------------------------------------------------------------------
  Before running this website, make sure you run this command in your terminal/command prompt:

  Mac: open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
  Windows: C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=%LOCALAPPDATA%\Google\chromeTemp

  Then run "npm start" in your terminal and navigate to "localhost:3000" in your web browswer
--------------------------------------------------------------------------------------------------------------------------------------------------------
*/ 

const colors = {
  Human : "#3A3A3A", 
  GPT : "#4F4F4F",
}

let previousMessages = []
let previousTyped = ""
let messageText = ""
let username = prompt("What is your name?")

if (localStorage.getItem("Chat Messages") != null) {
  previousMessages = JSON.parse(localStorage.getItem("Chat Messages"));
}

export default function App() {
  const [chatMessages, setChatMessages] = useState(previousMessages);

  useEffect(() => {
    localStorage.setItem("Chat Messages", JSON.stringify(chatMessages)); 
    if (chatMessages.length % 2 === 1) {
      getBotResponse(messageText);
    }
  }, [chatMessages]);

  const removeMessages = () => {
    setChatMessages([])
    previousTyped = ""
  }

  const getBotResponse = (prompt) => {
    const output = getResponse(prompt);
    output.then((value) => {
      sendMessage(value, "AryaGPT",  false);
    })
  }

  const sendHumanMessage = () => {
    messageText = document.getElementById("prompt-input").value
    if (messageText === "") { alert("Please enter in a prompt!"); return; }
    sendMessage(messageText, username, true);
    document.getElementById("prompt-input").value = ""
  }

  const sendMessage = (text, name, humanResponse) => {
    const newMessage = {"Person" : name,
                        "Message" : text,
                        "Human" : humanResponse};
    
    let tempArray = [];
    for (let i = 0; i < chatMessages.length; i++) {
      tempArray.push(chatMessages[i]);
    }
    tempArray.push(newMessage);
    setChatMessages(tempArray);
  }

  const enterClicked = (event) => {
    if (event.key === 'Enter' && previousTyped !== 'Shift') {
      sendHumanMessage();
    }
    previousTyped = event.key;
  }

  

  return (
    <div class="container">
        <div class="title-container">
            <p id="title-text">AryaGPT v0.1</p>
        </div>
        
        <div class="convo-container">
            {chatMessages.map((message, i) => (
                <ChatMessage
                key={i}
                name={message.Person}
                response={message.Message}
                color={message.Human ? colors.Human : colors.GPT}
                />
            ))}
        </div>
        <div class="bottom-container">
            <button type='text' id="delete-chat" onClick={removeMessages}/>
            <input id="prompt-input" name="input" placeholder='Enter Prompt!' onKeyDown={enterClicked}/>
            <button id="ask-prompt" onClick={sendHumanMessage}/>
        </div>
    </div>
  );
}
