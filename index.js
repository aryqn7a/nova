body: JSON.stringify({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "You are NOVA, an advanced AI assistant inspired by JARVIS." },
    { role: "user", content: userMsg }
  ]
})
