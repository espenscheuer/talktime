import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==', room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyBDGTpZrFPl_tRNokjHOtR-xV_gd-UxBJA",
    authDomain: "talktime-2020.firebaseapp.com",
    databaseURL: "https://talktime-2020.firebaseio.com",
    projectId: "talktime-2020",
    storageBucket: "talktime-2020.appspot.com",
    messagingSenderId: "250239552659",
    appId: "1:250239552659:web:1affb34e6042c59d0a1166",
    measurementId: "G-SBZ074XEN6"
  };

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()