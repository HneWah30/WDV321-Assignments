const userInput = document.getElementById("username");
const saveUserBtn = document.getElementById("saveUserBtn");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const messagesDiv = document.getElementById("messages");

let user = localStorage.getItem("chatUser") || "Anonymous";
userInput.value = user;

// Save username
saveUserBtn.addEventListener("click", () => {
  user = userInput.value.trim() || "Anonymous";
  localStorage.setItem("chatUser", user);
  alert(`Username saved as ${user}`);
});

// Send message
sendBtn.addEventListener("click", () => {
  const msg = msgInput.value.trim();
  if (msg) {
    const message = document.createElement("p");
    message.textContent = `${user}: ${msg}`;
    messagesDiv.appendChild(message);
    msgInput.value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});
