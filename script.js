document.getElementById("sentiment-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const text = document.getElementById("text-input").value;
    const resultDiv = document.getElementById("result");
    resultDiv.classList.add("hidden");
    resultDiv.textContent = "💫 Analyzing...";
  
    try {
      const res = await fetch("/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
  
      const data = await res.json();
      const label = data[0].label;
  
      let emoji = label === "POSITIVE" ? "🌈✨💖" : "🌧️😢💔";
      let cssClass = label === "POSITIVE" ? "positive" : "negative";
  
      resultDiv.innerHTML = `<span class="${cssClass}">${emoji} ${label}! ${emoji}</span>`;
      resultDiv.classList.remove("hidden");
    } catch (error) {
      resultDiv.innerHTML = "⚠️ Error analyzing sentiment. Try again!";
      resultDiv.classList.remove("hidden");
    }
  });
  