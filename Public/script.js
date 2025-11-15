async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const msg = input.value;

  chat.innerHTML += `<p><b>USER:</b> ${msg}</p>`;

  const response = await fetch("/api/chat", {    // <— Safe endpoint
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await response.json();

  chat.innerHTML += `<p><b>NOVA:</b> ${data.reply}</p>`;
}
