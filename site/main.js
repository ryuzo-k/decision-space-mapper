const repo = "ryuzo-k/decision-space-mapper";
const repoUrl = `https://github.com/${repo}`;
const skillsCommand = `npx skills add ${repo}`;

const installPrompt = `Install Decision Foundation from the open skills ecosystem.

Run this command:

${skillsCommand}

If the command asks which agent to install for, choose the current environment.

After installing, use it to extract my current options, expand the missing alternatives, and map coherent candidate paths before recommending one.

Source:
${repoUrl}`;

function copyText(text, button) {
  navigator.clipboard.writeText(text.trim()).then(() => {
    const previous = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = previous;
    }, 1200);
  });
}

document.querySelector("#install-prompt").textContent = installPrompt;

document.querySelector("#copy-install-prompt")?.addEventListener("click", (event) => {
  copyText(installPrompt, event.currentTarget);
});

document.querySelector("#copy-skills-command")?.addEventListener("click", (event) => {
  copyText(skillsCommand, event.currentTarget);
});
