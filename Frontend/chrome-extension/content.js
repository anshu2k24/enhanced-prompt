function waitForElement(selector) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      }
    }, 500);
  });
}

async function getTokenSavings(originalPrompt, enhancedPrompt) {
  const response = await fetch("http://localhost:4000/tokenize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalPrompt, enhancedPrompt }),
  });
  const data = await response.json();
  return data;
}

(async () => {
  const targetDiv = await waitForElement(".ql-editor.textarea.new-input-ui");

  if (!targetDiv) {
    console.log("❌ Could not find prompt area in Gemini.");
    return;
  }

  console.log("✅ Found prompt area in Gemini");

  if (document.querySelector("#enhance-btn")) {
    console.log("ℹ️ Button already exists");
    return;
  }

  const button = document.createElement("button");
  button.id = "enhance-btn";
  button.innerText = "✨ Enhance";
  button.style.marginTop = "8px";
  button.style.padding = "6px 12px";
  button.style.border = "none";
  button.style.borderRadius = "6px";
  button.style.background = "#10a37f";
  button.style.color = "white";
  button.style.cursor = "pointer";
  button.style.fontSize = "14px";

  targetDiv.parentElement.appendChild(button);

  button.addEventListener("click", async () => {
    console.log("🟢 Enhance button clicked");
    const prompt = targetDiv.innerText;
    console.log(prompt);
    if (!prompt) {
      alert("Please enter a prompt to enhance.");
      return;
    }
    button.innerText = "Enhancing...";
    button.disabled = true;

    try {
      const response = await fetch("http://localhost:3000/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const enhancedPrompt = data.enhancedPrompt;

      targetDiv.innerText = enhancedPrompt;

      try {
        const originalP = prompt;
        const enhancedP = enhancedPrompt;
        // const originalP = "what a drity world this is-> my g algebra can u tell the basics of algebra pleaseeeeee";
        // const enhancedP = "Dirty world. Teacher bad at algebra. Explain algebra basics.";
        const savingsData = await getTokenSavings(originalP, enhancedP);

        alert(`✨ Enhancement Complete!
        \n- Tokens Saved: ${
          savingsData.savedTokens
        } (${savingsData.savingsPercentage.toFixed(2)}%) 
        \n- Carbon Footprint Saved: ${savingsData.carbonSaved.toFixed(
          5
        )} kg CO₂`);
      } catch (err) {
        console.error("❌ Failed to fetch token savings:", err);
        alert("Couldn't calculate token savings.");
      }
    } catch (error) {
      console.error("🔴 Error enhancing prompt:", error);
      alert("Failed to enhance prompt. Please try again.");
    } finally {
      button.innerText = "✨ Enhance";
      button.disabled = false;
    }
  });
})();
