const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const COPY_LABEL = "Copier l'email dans le presse-papier";
const COPIED_LABEL = "Email copié";
const COPY_RESET_MS = 2000;

document.querySelectorAll(".copy-email").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const area = document.createElement("textarea");
      area.value = email;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }

    btn.classList.add("is-copied");
    btn.setAttribute("aria-label", COPIED_LABEL);
    btn.setAttribute("title", "Copié !");

    window.setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.setAttribute("aria-label", COPY_LABEL);
      btn.setAttribute("title", "Copier l'email");
    }, COPY_RESET_MS);
  });
});
