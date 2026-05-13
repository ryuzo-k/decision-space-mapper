function copyText(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const original = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }).catch(() => {
    button.textContent = "Copy failed";
  });
}

for (const button of document.querySelectorAll("[data-copy-target]")) {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    copyText(target.textContent.trim(), button);
  });
}
