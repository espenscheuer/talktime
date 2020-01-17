import React, {useState} from 'react';
import './App.css';
import { MdModeEdit } from 'react-icons/md';

function NamePicker(props){
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState("name")
    return <div className = "center">
        <input
            disabled = {!editName}
            className = "editName"
            value = {name} 
            onChange = {e => {
                if(editName) {
                    setName(e.target.value)
                    props.name = name
                }
            }}
            onKeyPress={e => {
                if(e.key==='Enter'){
                  setEditName(!editName)
                }
            }}
        />
        <button
            className = "setEdit"
            focus = {!editName}
            onClick ={()=>{
                setEditName(!editName)
            }}
        > 
        <MdModeEdit 
        className = "editIcon"
        disabled = {!editName}/>
        </button>  
    </div>
}

export default NamePicker