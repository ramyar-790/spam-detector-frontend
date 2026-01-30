const checkBtn = document.getElementById("checkBtn");
const messageInput = document.getElementById("messageInput"); // make sure same id in HTML
const resultCard = document.getElementById("resultCard");

checkBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (!message) {
    resultCard.textContent = "Please enter a message!";
    resultCard.className = "card";
    return;
  }

  fetch("https://spam-detector-backend-2-qmrf.onrender.com/predict", {
    // backend Render URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.prediction === "spam") {
        resultCard.textContent = "🚫 SPAM";
        resultCard.className = "card spam";
      } else {
        resultCard.textContent = "✅ NOT SPAM";
        resultCard.className = "card not-spam";
      }
    })
    .catch((err) => {
      resultCard.textContent = "❌ Error connecting to backend!";
      resultCard.className = "card";
      console.error(err);
    });
});
