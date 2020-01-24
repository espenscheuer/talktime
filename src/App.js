import React, {useState} from 'react';
import './App.css';
import NamePicker from '.\\namePicker.js'
import { db, useDB } from './db';
function App() {

  const [name, setName] = useState("name")  
  const messages = useDB()

  return (
  <main> 
    <header>
      <div className = "logo-wrap">
        <img alt = "logo" className ="logo" src={require('.\\logo.png')} />
        talktime
      </div>
      <NamePicker makeName={setName}
    />
    </header>
    
      <div className = "messages">
        {messages.map((m,i)=>{
          return <div key = {i}>
              <div className = "message-wrap" from = {m.name === name ? "me" : "you"}>
                <div  className = "message">
                  {m.text}
                </div>
              </div>
              <div className = "message-wrap" from = {m.name === name ? "me" : "you"}>
                <div  className = "user">
                  {m.name}
                </div>
              </div>
          </div>
        })}
      
    </div>
    <TextInput onSend={(text)=>{
      db.send({
        text,name,ts:new Date()
      })
    }}/>
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
            if(text){ 
              props.onSend(text)
              setText('')
            }
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
