// pages/dashboard.js
import { useState, useEffect } from "react";
import { humanType } from "../lib/humanTyper";

export default function Dashboard() {
const [docs, setDocs] = useState([]);
const [selectedDoc, setSelectedDoc] = useState("");
const [essay, setEssay] = useState("");
const [duration, setDuration] = useState(30);
const [progress, setProgress] = useState(0);
const [isTyping, setIsTyping] = useState(false);

// Fetch Google Docs
useEffect(() => {
fetch("/api/docs")
.then((res) => res.json())
.then(setDocs)
.catch(console.error);
}, []);

// Function to send a single character to Google Docs
const sendChar = async (char) => {
await fetch("/api/type", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ docId: selectedDoc, text: char }),
});
};

// Start typing using humanType
const startTyping = async () => {
if (!selectedDoc) return alert("Select a document!");
if (!essay) return alert("Paste your essay first!");
setIsTyping(true);
setProgress(0);

let typedChars = 0;

await humanType(essay, async (char) => {
await sendChar(char);
typedChars += 1;
setProgress(Math.round((typedChars / essay.length) * 100));
}, duration);

setIsTyping(false);
alert("Typing finished!");
};

return (
<div className="p-10">
<h1 className="text-3xl font-bold mb-4">Dashboard</h1>

<label>Select a Google Doc:</label>
<select
className="border p-2 w-full mb-4"
onChange={(e) => setSelectedDoc(e.target.value)}
disabled={isTyping}
>
<option value="">--Choose a document--</option>
{docs.map((d) => (
<option key={d.id} value={d.id}>
{d.name}
</option>
))}
</select>

<label>Paste your essay:</label>
<textarea
rows="10"
className="w-full border p-2 mb-4"
value={essay}
onChange={(e) => setEssay(e.target.value)}
disabled={isTyping}
></textarea>

<label>
Typing duration (minutes): {duration}{" "}
{isTyping && "(Typing in progress, cannot change)"}
</label>
<input
type="range"
min="5"
max="180"
value={duration}
onChange={(e) => setDuration(Number(e.target.value))}
className="w-full mb-4"
disabled={isTyping}
/>

<div className="border h-6 w-full mb-4">
<div
className="bg-green-600 h-full"
style={{ width: `${progress}%` }}
/>
</div>

<button
className="bg-green-600 text-white px-6 py-3 rounded"
onClick={startTyping}
disabled={isTyping}
>
{isTyping ? "Typing..." : "Start Typing"}
</button>
</div>
);
}