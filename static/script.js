async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const userText = input.value.trim();
    if (userText === "") return;

    // Show user message
    chatBox.innerHTML += `<div class="user"><b>You:</b> ${userText}</div>`;
    input.value = "";

    // Typing indicator
    chatBox.innerHTML += `<div id="typing" class="bot">Bot is typing...</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    const response = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: userText })
    });

    const data = await response.json();

    // Remove typing text
    document.getElementById("typing").remove();

    // Show bot response
    chatBox.innerHTML += `<div class="bot"><b>Bot:</b><br>${data.result}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
