function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();

    if (message === "") return;

    addMessage(message, "user-msg");
    input.value = "";

    // Send to backend API (Flask / Node)
    fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        addMessage(data.reply, "bot-msg");
    })
    .catch(() => {
        addMessage("Sorry, server not responding.", "bot-msg");
    });
}

function addMessage(text, className) {
    let chatBox = document.getElementById("chat-box");
    let msgDiv = document.createElement("div");
    msgDiv.classList.add("message", className);
    msgDiv.innerText = text;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
