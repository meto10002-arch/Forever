import {
db,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "./firebase.js";

const messages=document.getElementById("messages");
const text=document.getElementById("text");
const send=document.getElementById("send");

let myName=localStorage.getItem("forever_name");

if(!myName){

myName=prompt("اكتب اسمك");

if(!myName || myName.trim()==""){

myName="زائر";

}

localStorage.setItem("forever_name",myName);

}

const avatar="https://i.pravatar.cc/100";

const q=query(
collection(db,"private_chat"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messages.innerHTML="";

snapshot.forEach((doc)=>{

const data=doc.data();

let time="";

if(data.time){

time=new Date(
data.time.seconds*1000
).toLocaleTimeString("ar-IQ",{
hour:"2-digit",
minute:"2-digit"
});

}

const msg=document.createElement("div");

msg.className="message";

if(data.sender===myName){

msg.classList.add("me");

}else{

msg.classList.add("friend");

}

msg.innerHTML=`

<img class="avatar" src="${avatar}">

<div class="bubble">

<div class="sender">

${data.sender}

</div>

<div>

${data.text}

</div>

<div class="time">

${time}

</div>

</div>

`;

messages.appendChild(msg);

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
