// Logic and Functions for KPMIM Chat Bot

const chatWin = document.querySelector(".chatWindow");
const btn = document.querySelector(".send");

function quickAns(innerText) {
    const botBubble = document.createElement('p');
    botBubble.className = 'bot-msg';
    botBubble.innerText = innerText;
    chatWin.appendChild(botBubble);
    chatWin.scrollTop = chatWin.scrollHeight; // auto scroll
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

    // ---------- College FAQs ----------
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
    else if (lowerCase.includes("admission") && (lowerCase.includes("start"))) {
        quickAns("Admission starts from June every year. You can apply online.");
    }
    else if (lowerCase.includes("eligibility")) {
        quickAns("Eligibility depends on the course. Usually 10+2 for BCA/BBA and Graduation for MBA.");
    }
    else if (lowerCase.includes("documents")) {
        quickAns("You need marksheet, ID proof, passport size photo, and application form for admission.");
    }
    else if (lowerCase.includes("entrance")) {
        quickAns("Some courses may require an entrance exam. Please check the college website.");
    }
    else if (lowerCase.includes("scholarship") || lowerCase.includes("financial aid")) {
        quickAns("Yes, scholarships and financial aid are available based on merit and criteria.");
    }
    else if (lowerCase.includes("courses") || lowerCase.includes("programs")) {
        quickAns("We offer BCA, BBA, MBA courses.");
    }
    else if (lowerCase.includes("semester") || lowerCase.includes("subjects")) {
        quickAns("The syllabus includes core subjects and electives. Check the college portal for full details.");
    }
    else if (lowerCase.includes("library")) {
        quickAns("Yes, we have a well-stocked library with digital resources.");
    }
    else if (lowerCase.includes("principal")) {
        quickAns("The principal is Dr. Ramesh Kumar.");
    }
    else if (lowerCase.includes("contact") || lowerCase.includes("phone") || lowerCase.includes("email")) {
        quickAns("You can contact the administration office at +91-02172317964 or email info@kpmim.org");
    }
    else if (lowerCase.includes("location") || lowerCase.includes("address")) {
        quickAns("The college is located at 156-B, Railway lines, Dufferin Chowk, Solapur, Maharashtra-413001, India.");
    }
    else if (lowerCase.includes("parking")) {
        quickAns("Yes, parking is available for students and staff.");
    }
    else if (lowerCase.includes("internship")) {
        quickAns("Internships are provided in various industries. Check the placement cell for details.");
    }
    else if (lowerCase.includes("events") || lowerCase.includes("fest")) {
        quickAns("Our college hosts annual cultural, technical, etc events.");
    }
    else {
        quickAns("Sorry! I can't understand. Please try asking in a different way.");
    }

    document.querySelector("#Questions").value = ""; // clear input
});