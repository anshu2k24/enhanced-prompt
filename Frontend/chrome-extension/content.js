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

function createEnhanceButton() {
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
  return button;
}

async function initializeForPlatform(platformConfig) {
  const targetDiv = await waitForElement(platformConfig.selector);

  if (!targetDiv) {
    console.log(`❌ Could not find prompt area in ${platformConfig.name}`);
    return;
  }

  console.log(`✅ Found prompt area in ${platformConfig.name}`);

  if (document.querySelector("#enhance-btn")) {
    console.log("ℹ️ Button already exists");
    return;
  }

  const button = createEnhanceButton();
  platformConfig.insertButton(button, targetDiv);

  button.addEventListener("click", async () => {
    console.log("🟢 Enhance button clicked");
    const prompt = platformConfig.getPrompt(targetDiv);
    
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

      platformConfig.setPrompt(targetDiv, enhancedPrompt);

      try {
        const savingsData = await getTokenSavings(prompt, enhancedPrompt);
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
}

// Platform-specific configurations
const platformConfigs = [
  {
    name: "Gemini",
    selector: ".ql-editor.textarea.new-input-ui",
    getPrompt: (el) => el.innerText,
    setPrompt: (el, prompt) => { el.innerText = prompt; },
    insertButton: (button, target) => target.parentElement.appendChild(button)
  },
  {
    name: "Lovable",
    selector: "#chatinput",
    getPrompt: (el) => el.value,
    setPrompt: (el, prompt) => { el.value = prompt; },
    insertButton: (button, target) => target.parentElement.appendChild(button)
  },
  {
    name: "Chatgpt",
    selector: "#text-prompt",
    getPrompt: (el) => el.value,
    setPrompt: (el, prompt) => { el.value = prompt; },
    insertButton: (button, target) => target.parentElement.appendChild(button)
  },
  {
    name: "Claude",
    selector: ".ProseMirror",
    getPrompt: (el) => el.innerText,
    setPrompt: (el, prompt) => { el.innerText = prompt; },
    insertButton: (button, target) => {
      const container = target.closest(".flex.flex-col.w-full")?.parentElement;
      if (container) container.appendChild(button);
    }
  },
  {
    name: "Perplexity",
    selector: ".textarea-wrap textarea",
    getPrompt: (el) => el.value,
    setPrompt: (el, prompt) => { el.value = prompt; },
    insertButton: (button, target) => {
      const container = target.closest(".textarea-wrap");
      if (container) container.appendChild(button);
    }
  },
  {
    name: "Deepseek",
    selector: ".b13855df",
    getPrompt: (el) => el.value,
    setPrompt: (el, prompt) => { el.value = prompt; },
    insertButton: (button, target) => {
      const container = target.closest(".b13855df");
      if (container) container.appendChild(button);
    }
  }
];

// Try to initialize for all platforms
platformConfigs.forEach(platformConfig => {
  initializeForPlatform(platformConfig).catch(err => {
    console.error(`Error initializing for ${platformConfig.name}:`, err);
  });
});