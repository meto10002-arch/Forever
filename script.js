import {
db,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "./firebase.js";

const messages = document.getElementById("messages");
const text = document.getElementById("text");
const send = document.getElementById("send");

let myName = localStorage.getItem("forever_name");

if(!myName){

myName = prompt("اكتب اسمك");

if(!myName || myName.trim()==""){

myName = "زائر";

}

localStorage.setItem("forever_name",myName);

}
