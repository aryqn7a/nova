async function sendMessage() {
  let input = document.getElementById("userInput");
  let chat = document.getElementById("chat");

  let userMsg = input.value.trim();
  if (!userMsg) return;

  chat.innerHTML += `<p><b>You:</b> ${userMsg}</p>`;
  input.value = "";

  try {
    let response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg })
    });

    let data = await response.json();

    // Hard fallback in case server returns null/undefined
    let reply = data?.reply;
    if (!reply || reply === "undefined" || reply === "null") {
      reply = "NOVA: I couldn't process that.";
    }

    chat.innerHTML += `<p><b>NOVA:</b> ${reply}</p>`;
  } catch (err) {
    chat.innerHTML += `<p><b>NOVA:</b> Network error.</p>`;
  }
}
