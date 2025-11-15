async function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chat");

  let userMsg = input.value;
  if (!userMsg) return;

  chat.innerHTML += `<p><b>You:</b> ${userMsg}</p>`;
  input.value = "";

  let response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });

  let data = await response.json();

  chat.innerHTML += `<p><b>NOVA:</b> ${data.reply}</p>`;
}
