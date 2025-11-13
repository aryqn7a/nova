const chat = document.getElementById('chat');
const synth = window.speechSynthesis;

async function sendMessage() {
  const input = document.getElementById('userInput');
  const msg = input.value.trim();
  if (!msg) return;
  addMessage('user', msg);
  input.value = '';

  const res = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });
  const data = await res.json();
  addMessage('nova', data.reply);
  speak(data.reply);
}

function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = sender;
  div.textContent = `${sender.toUpperCase()}: ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = synth.getVoices().find(v => v.name.includes("Female")) || null;
  synth.speak(utter);
}
