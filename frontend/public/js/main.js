async function getAIResponse() {
    const query = document.getElementById('searchInput').value;
    const responseBox = document.getElementById('aiResponse');

    if (!query) {
        responseBox.innerHTML = "Please type a question!";
        responseBox.style.display = "block";
        return;
    }

    responseBox.innerHTML = "Thinking... 💭";
    responseBox.style.display = "block";

    try {
        const response = await fetch("http://localhost:5001/api/openai/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: query })
        });

        const data = await response.json();
        responseBox.innerHTML = data.answer;
    } catch (error) {
        responseBox.innerHTML = "Error fetching response. Try again later.";
    }
}
