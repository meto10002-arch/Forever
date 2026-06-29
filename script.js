import {
  db,
  collection,
  addDoc,
  serverTimestamp
} from "./firebase.js";

import {
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const messages = document.getElementById("messages");
const text = document.getElementById("text");
const send = document.getElementById("send");

const username = localStorage.getItem("username") || prompt("اكتب اسمك");

localStorage.setItem("username", username);

const q = query(
  collection(db, "messages"),
  orderBy("time")
);onSnapshot(q, (snapshot) => {
  messages.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");
    div.className =
      "message " +
      (data.sender === username ? "me" : "friend");

    div.innerHTML = `
      <div class="name">${data.sender}</div>
      <div>${data.text}</div>
      <div class="time">
        ${
          data.time
            ? new Date(data.time.seconds * 1000).toLocaleTimeString()
            : ""
        }
      </div>
    `;

    messages.appendChild(div);
  });

  messages.scrollTop = messages.scrollHeight;
});
send.onclick = async () => {
  if (text.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
    sender: username,
    text: text.value,
    time: serverTimestamp()
  });

  text.value = "";
};

text.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    send.click();
  }
});
