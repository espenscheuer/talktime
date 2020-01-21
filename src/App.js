import React, {useState} from 'react';
import './App.css';
import NamePicker from '.\\namePicker.js'
var name = "name"
function App() {
  const [messages, setMessages] = useState([])
  return (
  <main> 
    <header>
    <img alt = "logo" className ="logo" src={require('.\\logo.png')} />
      talktime
      <NamePicker makeName={n => {
          name = n
         }}/>
    </header>
    
      <div className = "messages">
        {messages.map((m,i)=>{
          return <div key = {i}>
              <div className = "message-wrap">
                <div  className = "message">
                  {m.msg}
                </div>
              </div>
              <div className = "message-wrap">
                <div  className = "user">
                  {m.user}
                </div>
              </div>
          </div>
        })}
      
    </div>
    <TextInput onSend={text => {setMessages([{user:name, msg:text}, ...messages])}}/>
  </main>
  )
}

function TextInput(props) {
  const [text, setText] = useState('')

  return (
    <div className = "center">
      <input value = {text} 
        className = "text-input"
        onChange = {e => setText(e.target.value)}
        onKeyPress={e => {
          if(e.key==='Enter'){
            if(text) props.onSend(text)
              setText('')
          }
        }}
      />
      <button className = "button" 
        disabled = {!text}
        onClick ={()=>{
          if(text) {
            props.onSend(text)
            setText('')
          }
        }
        }>
        →
          
      </button>
    </div> 
  )
}

export default App;
