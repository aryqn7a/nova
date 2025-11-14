async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  const userText = input.value.trim();
  if (!userText) return;

  chat.innerHTML += `<p><b>USER:</b> ${userText}</p>`;
  input.value = "";

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  chat.innerHTML += `<p><b>NOVA:</b> ${data.reply}</p>`;
}
