import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import { MdModeEdit, MdSave } from 'react-icons/md';


function NamePicker(props){
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState("name")
    const inputEl = useRef(null);

    function saveName () {
        setEditName(!editName)
        props.makeName(name)
        localStorage.setItem('name', name)
    }
    
    useEffect(()=> {
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            props.makeName(n)
        }
    }, [])

    return <div className = "center">
        <input
            ref={inputEl}
            disabled = {!editName}
            className = "nameInput"
            value = {name} 
            onChange = {e => {
                if(editName) {
                    setName(e.target.value)
                }
            }}
            onKeyPress={e => {
                if(e.key ==='Enter'){
                    if(name === ''){
                        setName('name')
                    }
                    saveName()
                }
            }}
        />
        <button
            className = "nameBtn"
            onClick ={()=>{
                setTimeout(()=>{
                    inputEl.current.focus()
                    if (!editName) {
                        setName('')
                    } else {
                        setName('name')
                    }
                },25)
                inputEl.current.focus()
                saveName()
            }}
        >  
        {!editName ? <MdModeEdit /> : <MdSave/>}
        </button>  
    </div>
}



export default NamePicker
