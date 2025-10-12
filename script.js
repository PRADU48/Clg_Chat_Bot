// Logic and Functions for KPMIM Chat Bot

const chatWin = document.querySelector(".chatWindow");
const btn = document.querySelector(".send");

function quickAns(innerText) {
    const botBubble = document.createElement('p');
    botBubble.className = 'bot-msg';
    botBubble.innerText = innerText;
    chatWin.appendChild(botBubble);
}

btn.addEventListener('click', () => {
    const userMSG = document.querySelector("#Questions").value.trim();

    if (userMSG === "") {
        alert("Type question first!");
        return;
    }

    // Show user message
    const userBubble = document.createElement('p');
    userBubble.className = 'user-msg';
    userBubble.innerText = userMSG;
    chatWin.appendChild(userBubble);

    const lowerCase = userMSG.toLowerCase();

    if (lowerCase.includes("bca") && lowerCase.includes("fees")) {
        quickAns("BCA fees are 22K annually");
    }
    else if (lowerCase.includes("bba") && lowerCase.includes("fees")) {
        quickAns("BBA fees are 19K annually");
    }
    else if (lowerCase.includes("mba") && lowerCase.includes("fees")) {
        quickAns("MBA fees are 24K annually");
    }
    else if (lowerCase.includes("bca") && lowerCase.includes("timing")) {
        quickAns("BCA college timing is 10AM to 5PM");
    }
    else if (lowerCase.includes("bba") && lowerCase.includes("timing")) {
        quickAns("BBA college timing is 8AM to 2PM");
    }
    else if (lowerCase.includes("mba") && lowerCase.includes("timing")) {
        quickAns("MBA college timing is 10AM to 2PM");
    }
    else if (lowerCase.includes("admission") && (lowerCase.includes("start") || lowerCase.includes("date"))) {
        quickAns("Admission starts from June");
    }
    else {
        quickAns("Sorry! I can't understand.");
    }
});