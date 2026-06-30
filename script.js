const login=document.getElementById("login");
const chat=document.getElementById("chat");

const photo=document.getElementById("photo");
const preview=document.getElementById("preview");

const nameInput=document.getElementById("name");
const loginBtn=document.getElementById("loginBtn");

photo.onchange=()=>{

const file=photo.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=(e)=>{

preview.src=e.target.result;

};

reader.readAsDataURL(file);

};

loginBtn.onclick=()=>{

if(nameInput.value.trim()==""){

alert("اكتب اسمك");

return;

}

if(photo.files.length==0){

alert("اختر صورة");

return;

}

login.style.display="none";

chat.style.display="flex";

};
