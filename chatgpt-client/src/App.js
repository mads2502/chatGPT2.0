
import "./App.css";
import "./normalize.css";
import { useState } from "react";
import ChatMessage from "./ChatMessage";

function App() {
  
  const [input,setInput]=useState("");
  const [chatLog,setChatLog]=useState([{
    role:"system",
    content:"Hello! How can I help you?"
  },
{
  role:"user",
  content:"Who are you?"
}]);
  async function  handleSubmit(event){
    event.preventDefault();
    console.log("submit");
    //when submitted input shld be empty
    //and chatlog shld be updated
    setChatLog([...chatLog,{role:"user",content:`${input}`}])
    setInput("");
    //fetch API call
    const response= await fetch("http://localhost:3080/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message: chatLog.map((m)=> m).join("")
      })
      })
    
    const data= await response.json()
    console.log(data+"Frm Chatgpt");
   
    }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenu-button">
          <span className="sidemenu-button-icon">+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((chat,index)=>{
            console.log(chat);
            return <ChatMessage key={index} message={chat}/>
          })}
        </div>
        <div className="chatgpt-input-holder">
          <form onSubmit={(e)=>{handleSubmit(e)}}>
          <input 
          value={input}
          onChange={(event)=>{setInput(event.target.value)}}
          className="chatgpt-input-text" row="1"></input>
          </form>
          
        </div>
      </section>
    </div>
  );
}

export default App;
