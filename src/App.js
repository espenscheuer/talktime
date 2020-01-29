import React, {useState, useEffect} from 'react';
import './App.css';
import './media.css';
import NamePicker from '.\\namePicker.js'
import { db, useDB } from './db';
import { BrowserRouter, Route } from 'react-router-dom'
import { FiSend, FiCamera } from 'react-icons/fi'
import Camera from 'react-snap-pic'
import * as firebase from "firebase/app"
import "firebase/storage"
import Div100vh from 'react-div-100vh'


function App() {

  useEffect(() => {
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path ="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {

  const {room} = props.match.params
  const [name, setName] = useState("name")  
  const messages = useDB(room)
  const [showCamera, setShowCamera] = useState(false)
  
  
  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name, ts: new Date(), room })
  }

  return (
  <Div100vh> 
    <header>
      <div className = "logo-wrap">
        <img alt = "logo" className ="logo" src={require('.\\logo.png')} />
        talktime
      </div>
    <NamePicker makeName={setName}></NamePicker>
    </header>
    
    {showCamera && <Camera takePicture={takePicture} />}

      <div className = "messages">
        {messages.map((m,i)=> <Message key={i} m ={m} name = {name} />)}
    </div>

    <TextInput onSend={(text)=>{
      db.send({
        text,name,ts:new Date(), room
      })
      
    }}
    setCamera={()=>{setShowCamera(!showCamera)}}
    />
  </Div100vh>
  )
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/talktime-2020.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div onClick = {() => db.delete(m.id)}>
  <div className = "message-wrap" from = {m.name === name ? "me" : "you"}>
    {m.text && <div  className = "message">{m.text} </div>}
    {m.img && <div className = "msg-wrap"> <img className = 'msgpic'src ={bucket + m.img +suffix} alt = "pic" /> </div>}
  </div>
  <div className = "message-wrap" from = {m.name === name ? "me" : "you"}>
    <div  className = "user">
      {m.name}
    </div>
  </div>
</div>
}

function TextInput(props) {
  const [text, setText] = useState('')

  return (
    <div className = "center">

      <button onClick={props.setCamera}
          style={{left:10, right:'auto'}}
          className = "button">
          <FiCamera style={{height:20, width:20, marginTop: 1}} />
      </button>

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
        onClick ={()=>{
          if(text) {
            props.onSend(text)
            setText('')
          }
        }
        }>
          <FiSend style={{height:20, width:20, marginTop: 1}} />
          
      </button>
    </div> 
  )
}

export default App;
