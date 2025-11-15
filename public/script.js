async function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chat");

  let userMsg = input.value;
  if (!userMsg) return;

  chat.innerHTML += `<p><b>You:</b> ${userMsg}</p>`;
  input.value = "";

  let res = await fetch("/nova", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg })
  });

  let data = await res.json();

  chat.innerHTML += `<p><b>NOVA:</b> ${data.reply}</p>`;
}
