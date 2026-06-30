import {
db,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "./firebase.js";

const login=document.getElementById("login");
const chat=document.getElementById("chat");

const photo=document.getElementById("photo");
const preview=document.getElementById("preview");

const nameInput=document.getElementById("name");
const loginBtn=document.getElementById("loginBtn");

const messages=document.getElementById("messages");
const text=document.getElementById("text");
const send=document.getElementById("send");

let myName=localStorage.getItem("forever_name");
let myPhoto=localStorage.getItem("forever_photo");

if(myName && myPhoto){

login.style.display="none";
chat.style.display="flex";

}

photo.onchange=()=>{

const file=photo.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=(e)=>{

preview.src=e.target.result;

myPhoto=e.target.result;

};

reader.readAsDataURL(file);

};

loginBtn.onclick=()=>{

if(nameInput.value.trim()==""){

alert("اكتب اسمك");

return;

}

if(!myPhoto){

alert("اختر صورة");

return;

}

myName=nameInput.value;

localStorage.setItem("forever_name",myName);

localStorage.setItem("forever_photo",myPhoto);

login.style.display="none";

chat.style.display="flex";

};
const q = query(
  collection(db, "private_chat"),
  orderBy("time")
);

send.onclick = async () => {

  if (text.value.trim() == "") return;

  await addDoc(
    collection(db, "private_chat"),
    {
      sender: myName,
      photo: myPhoto,
      text: text.value,
      time: serverTimestamp()
    }
  );

  text.value = "";

};
onSnapshot(q,(snapshot)=>{

messages.innerHTML="";

snapshot.forEach((doc)=>{

const data=doc.data();

const msg=document.createElement("div");

msg.className="message";

if(data.sender===myName){

msg.classList.add("me");

}else{

msg.classList.add("friend");

}

let t="";

if(data.time){

t=new Date(data.time.seconds*1000).toLocaleTimeString("ar-IQ",{
hour:"2-digit",
minute:"2-digit"
});

}

msg.innerHTML=`

<img class="avatar" src="${data.photo}">

<div class="bubble">

<div class="sender">${data.sender}</div>

<div class="text">${data.text}</div>

<div class="time">${t}</div>

</div>

`;

messages.appendChild(msg);

});

messages.scrollTop=messages.scrollHeight;

});
