import './App.css'
import ChatMessage from './Components/ChatMessage.js'
import { useState, useEffect } from 'react';
import getResponse from './Components/request.js';

const colors = {
  Human : "#3A3A3A", 
  GPT : "#4F4F4F",
}

let previousMessages = []
let previousTyped = ""
let messageText = ""
let username = ""
let lastMessageHuman = false

if (localStorage.getItem("Chat Messages") != null) {
  previousMessages = JSON.parse(localStorage.getItem("Chat Messages"));
}

if (localStorage.getItem("Username") != null) {
  username = localStorage.getItem("Username");
} else {
  username = prompt("What is your username?");
  localStorage.setItem("Username", username);
}

export default function App() {
  const [chatMessages, setChatMessages] = useState(previousMessages);

  useEffect(() => {
    localStorage.setItem("Chat Messages", JSON.stringify(chatMessages)); 
    if (lastMessageHuman) {
      //sendMessage("Generating...", "AryaGPT", false);
      getBotResponse(messageText);
    }
  }, [chatMessages]);

  const removeMessages = () => {
    setChatMessages([])
    previousTyped = ""
  }

  const changeUsername = () => {
    let tempUsername = prompt("What is your new username?");
    if (window.confirm(`Are you sure you want to change your username from:\n${username} --> ${tempUsername}`) == true) {
      let tempArray = [];
      for (let i = 0; i < chatMessages.length; i++) {
        const newMessage = {"Person" : chatMessages[i].Human == false ? chatMessages[i].Person : tempUsername,
                        "Message" : chatMessages[i].Message,
                        "Human" : chatMessages[i].Human};
        tempArray.push(newMessage);
      }
      setChatMessages(tempArray);
      username = tempUsername;
      localStorage.setItem("Username", tempUsername);
    }
  }

  const changeSettings = () => {
    let wantToChange = prompt("Do you want to change your username (y/n)?");
    wantToChange = wantToChange != null ? wantToChange : "n";
    if (wantToChange.toLowerCase() === "y" || wantToChange.toLowerCase() === "yes") {
      changeUsername();
    }
  }

  const getBotResponse = (prompt) => {
    const output = getResponse(prompt);
    output.then((value) => {
      lastMessageHuman = false;
      sendMessage(value, "AryaGPT",  false);
    })
  }

  const sendHumanMessage = () => {
    messageText = document.getElementById("prompt-input").value
    if (messageText === "") { alert("Please enter in a prompt!"); return; }
    lastMessageHuman = true;
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
    if (!humanResponse && text === 'Generating...') {
      //tempArray.pop();
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
            <button id="open-settings" onClick={changeSettings}/>
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
            <button id="delete-chat" onClick={removeMessages}/>
            <input id="prompt-input" name="input" placeholder='Enter Prompt!' autoComplete='off' onKeyDown={enterClicked}/>
            <button id="ask-prompt" onClick={sendHumanMessage}/>
        </div>
    </div>
  );
}
