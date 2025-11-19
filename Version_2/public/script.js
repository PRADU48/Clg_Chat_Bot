// script.js (frontend) - connects to server /chat

const chatWin = document.querySelector(".chatWindow");
const sendBtn = document.getElementById("sendBtn") || document.querySelector(".send");
const floatingBtn = document.getElementById("floatingBtn");
const chatContainer = document.getElementById("chatContainer");
const closeBtn = document.getElementById("closeBtn");
const inputEl = document.getElementById("Questions");

// Toggle chat window visibility
floatingBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatContainer.classList.toggle("open");
    chatContainer.setAttribute("aria-hidden", chatContainer.classList.contains("open") ? "false" : "true");
    inputEl.focus();
});

// Close chat window
closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatContainer.classList.remove("open");
    chatContainer.setAttribute("aria-hidden", "true");
});

// Close chat when clicking outside (but not when clicking inside)
document.addEventListener("click", (event) => {
    if (!chatContainer.contains(event.target) && !floatingBtn.contains(event.target)) {
        chatContainer.classList.remove("open");
        chatContainer.setAttribute("aria-hidden", "true");
    }
});

// helper to add bubble
function addBubble(text, sender = "bot", optMeta = "") {
    const bubble = document.createElement("p");
    bubble.className = sender === "user" ? "user-msg" : "bot-msg";
    bubble.innerText = text;
    chatWin.appendChild(bubble);

    if (optMeta) {
        const small = document.createElement("small");
        small.style.display = "block";
        small.style.fontSize = "0.68rem";
        small.style.opacity = "0.7";
        small.style.marginTop = "4px";
        small.innerText = optMeta;
        bubble.appendChild(small);
    }

    chatWin.scrollTop = chatWin.scrollHeight;
}

// send message handler
async function sendMessage() {
    const userMsg = inputEl.value.trim();
    if (!userMsg) {
        alert("Type your question first!");
        return;
    }

    // show user
    addBubble(userMsg, "user");
    inputEl.value = "";
    inputEl.focus();

    // show typing bubble
    const typing = document.createElement("p");
    typing.className = "bot-msg";
    typing.innerText = "Typing...";
    chatWin.appendChild(typing);
    chatWin.scrollTop = chatWin.scrollHeight;

    try {
        // Use relative path so it works both locally and when deployed
        const res = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMsg })
        });

        const data = await res.json();

        typing.remove();

        // Show reply and a small confidence/intention note (optional)
        const meta = data.intent ? `intent: ${data.intent} — confidence: ${Number(data.confidence).toFixed(3)}` : "";
        addBubble(data.reply, "bot", meta);

    } catch (err) {
        typing.remove();
        console.error("Network error:", err);
        addBubble("Server Error! Cannot connect to backend. Try again later.", "bot");
    }
}

// Click event
sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendMessage();
});

// Allow Enter key to send
inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
