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

const avatar="https://i.pravatar.cc/150?img=12";

const q=query(
collection(db,"private_chat"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messages.innerHTML="";

snapshot.forEach((doc)=>{

const data=doc.data();

const box=document.createElement("div");

box.className="message";

if(data.sender===myName){

box.classList.add("me");

}else{

box.classList.add("friend");

}

let t="";

if(data.time){

t=new Date(
data.time.seconds*1000
).toLocaleTimeString("ar-IQ",{
hour:"2-digit",
minute:"2-digit"
});

}

box.innerHTML=`

<img class="avatar" src="${avatar}">

<div class="bubble">

<div class="sender">

${data.sender}

</div>

<div class="text">

${data.text}

</div>

<div class="time">

${t}

</div>

</div>

`;

messages.appendChild(box);

});

messages.scrollTop=messages.scrollHeight;

});
send.onclick = async()=>{

if(text.value.trim()=="") return;

await addDoc(

collection(db,"private_chat"),

{

sender:myName,

text:text.value,

time:serverTimestamp()

}

);

text.value="";

};

text.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

send.click();

}

});
