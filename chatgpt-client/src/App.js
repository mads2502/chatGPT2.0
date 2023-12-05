import "./App.css";
import "./normalize.css";
import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([
    {
      id: "gpt-3.5-turbo-16k",
    },
    {
      id: "gpt-3.5-turbo-1106",
    },
  ]);
  const [chatLog, setChatLog] = useState([
    {
      role: "system",
      content: "Hello! How can I help you?",
    },
  ]);
  const [currModel, setCurrModel] = useState("");

  //Clear Chat on new chat
  function clearChat() {
    setChatLog([
      {
        role: "system",
        content: "Hello! Welcome to OpenAI",
      },
    ]);
  }
  //submit or chat completion
  async function handleSubmit(event) {
    event.preventDefault();
    //when submitted input shld be empty
    //and chatlog shld be updated
    let chatLogNew = [...chatLog, { role: "user", content: `${input}` }];
    await setChatLog([...chatLogNew]);
    await setInput("");
    //fetch API call
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: chatLogNew,
        model: currModel,
      }),
    });

    const dataResp = await response.json();
    await setChatLog([
      ...chatLogNew,
      { role: "system", content: dataResp.data.choices[0].message.content },
    ]);
    console.log("From ChatGPT: ", dataResp.data.choices[0].message.content);
  }
  //fucntion for ChatGPT model selction on page render
  //new chat completions doesnt support all models
  // useEffect(() => {
  //   selectModel();
  // }, []);
  // function selectModel() {
  //   fetch("http://localhost:3080/models")
  //     .then((res) => res.json())
  //     .then((dataResp) => {
  //       setModels(dataResp.data.data);
  //       console.log(dataResp.data.data);
  //     });
  // }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenu-button" onClick={clearChat}>
          <span className="sidemenu-button-icon">+</span>
          New Chat
        </div>
        <select
          className="sidemenu-select-model"
          aria-label="Default select example"
          onChange={(e) => {
            setCurrModel(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option selected>Select ChatGPT models</option>
          {models.map((model, index) => {
            return (
              <option key={index} value={model.id}>
                {model.id}
              </option>
            );
          })}
        </select>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((chat, index) => {
            return <ChatMessage key={index} message={chat} />;
          })}
        </div>
        <div className="chatgpt-input-holder">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              className="chatgpt-input-text"
              row="1"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
