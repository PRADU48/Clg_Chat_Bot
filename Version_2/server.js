// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import natural from "natural";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// -------------------- 1) Training data --------------------
const trainingExamples = [
    { text: "what is the college address", intent: "address" },
    { text: "where is the college located", intent: "address" },
    { text: "tell me the address", intent: "address" },
    { text: "college location", intent: "address" },

    { text: "contact number of college", intent: "contact" },
    { text: "phone number", intent: "contact" },
    { text: "email for admissions", intent: "contact" },
    { text: "how can i contact the college", intent: "contact" },

    { text: "which courses are offered", intent: "courses" },
    { text: "do you offer mba", intent: "courses" },
    { text: "what programs do you provide", intent: "courses" },

    { text: "is the college aicte approved", intent: "approval" },
    { text: "is it affiliated to solapur university", intent: "approval" },

    { text: "when was the institute established", intent: "established" },
    { text: "how to apply for admission", intent: "admission_process" },
    { text: "how do i apply", intent: "admission_process" },

    { text: "what documents required for admission", intent: "documents" },
    { text: "documents needed", intent: "documents" },

    { text: "do you have a library", intent: "library" },
    { text: "library timing", intent: "library" },

    { text: "who is the director", intent: "principal" },
    { text: "who is the principal", intent: "principal" },

    { text: "placement and training", intent: "placement" },
    { text: "placement cell", intent: "placement" },

    { text: "what are the fees", intent: "fees" },
    { text: "fees for bca", intent: "fees" },

    { text: "college events", intent: "events" },
    { text: "fest", intent: "events" },

    { text: "internship opportunities", intent: "internship" },

    { text: "how to reach by public transport", intent: "directions" },
    { text: "where can i find syllabus", intent: "syllabus" },

    { text: "scholarship details", intent: "scholarship" },
    { text: "grievance portal", intent: "grievance" },
    { text: "notice and updates", intent: "updates" },
    { text: "is there parking", intent: "parking" }
];

// -------------------- 2) Answers map --------------------
const answers = {
    address: "156-B, Railway lines, Dufferin Chowk, Solapur, Maharashtra-413001.",
    contact: "Phone: 0217-2317964 / 0217-2310029. Email: info@kpmim.org.",
    courses: "The institute offers management and professional programs including MBA and other UG/PG BCA, BBA courses. See the website for full list.",
    approval: "The institute is approved/recognized by AICTE and affiliated to the university (check the official site for certificates).",
    established: "The institute was established in the late 1990s and has been serving management education in Solapur.",
    admission_process: "Apply online via the college website’s admissions section or contact the admin office for details.",
    documents: "Typical documents: mark sheets, ID proof, passport size photos, and completed application form.",
    library: "Yes, there is a library with print and digital resources for students.",
    principal: "Director: Dr. O.M. Ashtankar (refer to faculty page for full details).",
    placement: "The Training & Placement cell coordinates internships and placements with industry partners.",
    fees: "Fees vary by program. Please check the college fee/admission page or contact the office for exact amounts.",
    events: "College hosts annual cultural, technical and sports events.",
    internship: "Internships are arranged through campus placements and industry tie-ups; check placement cell for openings.",
    directions: "College is centrally located at Railway lines, Dufferin Chowk, Solapur — use local transport or maps for directions.",
    syllabus: "Syllabus and semester info is published on the college/university portal — check the syllabus page.",
    scholarship: "Scholarships/financial aid may be available per institute/state policy — contact admin for criteria.",
    grievance: "The website has a Grievance Portal and student support channels for complaints and redressal.",
    updates: "For notices and latest updates check the Official Website’s Notice/News section.",
    parking: "Yes, parking facility is available for students and staff."
};

// -------------------- 3) Build and train classifier --------------------
const classifier = new natural.BayesClassifier();

trainingExamples.forEach(item => classifier.addDocument(item.text, item.intent));

// Additional augmenting examples (small)
[
    ["tell me the address", "address"],
    ["what programs do you provide", "courses"],
    ["phone number please", "contact"],
    ["how to apply for admission", "admission_process"],
    ["documents needed for admission", "documents"],
    ["hostel availability", "hostel"],
    ["what are the fees", "fees"]
].forEach(([text, intent]) => classifier.addDocument(text, intent));

// Train
classifier.train();

// -------------------- 4) Chat endpoint --------------------
app.post("/chat", (req, res) => {
    try {
        const userMsg = (req.body.message || "").toString().trim();
        if (!userMsg) return res.json({ reply: "Please type a question.", intent: null, confidence: 1 });

        const normalized = userMsg.toLowerCase();

        // get classifications with scores
        const classifications = classifier.getClassifications(normalized);
        // classifications is array of {label, value} sorted descending
        const top = classifications[0] || null;
        const confidence = top ? top.value : 0;

        // set a threshold for "unsure"
        const threshold = 0.75; // tweak if you want more/less strict
        let reply = "Sorry! I don't understand that. Please rephrase or check the website.";
        let intent = null;

        if (top && confidence >= threshold) {
            intent = top.label;
            reply = answers[intent] || reply;
        } else {
            // low confidence fallback: attempt some keyword fallback
            if (normalized.includes("address") || normalized.includes("located") || normalized.includes("where")) {
                intent = "address";
                reply = answers.address;
            } else if (normalized.includes("phone") || normalized.includes("contact") || normalized.includes("email")) {
                intent = "contact";
                reply = answers.contact;
            } else if (normalized.includes("courses") || normalized.includes("courses") || normalized.includes("email")) {
                intent = "courses";
                reply = answers.courses;
            }
            // else keep default "don't understand"
        }

        return res.json({ reply, intent, confidence });
    } catch (err) {
        console.error("Chat error:", err);
        return res.json({ reply: "Server error. Try again later.", intent: null, confidence: 0 });
    }
});

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));