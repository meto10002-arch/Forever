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

const q = query(
collection(db,"private_chat"),
orderBy("time")
);

onSnapshot(q,(snapshot)=>{

messages.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

const bubble=document.createElement("div");

bubble.className="message";

if(data.sender===myName){

bubble.classList.add("me");

}else{

bubble.classList.add("friend");

}

let time="";

if(data.time){

time=new Date(
data.time.seconds*1000
).toLocaleTimeString("ar-IQ",{
hour:"2-digit",
minute:"2-digit"
});

}

bubble.innerHTML=`

<div class="sender">

${data.sender}

</div>

<div class="text">

${data.text}

</div>

<div class="time">

${time}

</div>

`;

messages.appendChild(bubble);

});

messages.scrollTop=messages.scrollHeight;

});
send.onclick = async () => {

if(text.value.trim()=="") return;

await addDoc(
collection(db,"private_chat"),
{
sender: myName,
text: text.value,
time: serverTimestamp()
}
);

text.value="";

};

text.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

send.click();

}

});
