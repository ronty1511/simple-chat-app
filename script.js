const socket = io("http://localhost:3000");
const form = document.querySelector(".message");
const msgInput = document.querySelector("#message-text");
const display = document.querySelector(".display");
function scrollToBottom() {
  let lastMsg = document.querySelector('.display').lastElementChild;
  lastMsg.scrollIntoView();
}

function appendMsg(msg, pos) {
  const msgElem = document.createElement("div");
  msgElem.innerText = msg;
  let cls = 'one-msg-left';
  if(pos === 2)
    cls = 'one-msg-right';
  if(pos === 1)
    cls = 'one-msg-center';
  msgElem.classList.add(cls);
  display.append(msgElem);
  scrollToBottom();
}

const username = prompt("Enter name");
appendMsg("You joined", 1);
socket.emit("new-user", username);

socket.on("chat-msg", (msg) => {
  appendMsg(`${msg.username}: ${msg.msg}`);
});

socket.on("user-connected", (username) => {
  appendMsg(`${username} joined`, 1);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (msgInput.value != "") {
    appendMsg(`You: ${msgInput.value}`, 2);
    socket.emit("send-msg", msgInput.value);
    msgInput.value = "";
  }
});
