const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const headerShell = document.getElementById("site-header-shell");
const headerTrigger = document.getElementById("site-header-trigger");

if (headerShell && headerTrigger) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty(
      "--site-header-height",
      `${headerShell.offsetHeight}px`
    );
  };

  new IntersectionObserver(
    ([entry]) => {
      headerShell.classList.toggle("is-scrolled", !entry.isIntersecting);
      updateHeaderHeight();
    },
    { threshold: 0, rootMargin: "1px 0px 0px 0px" }
  ).observe(headerTrigger);

  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }
}

document.querySelectorAll(".copy-email").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    if (!email) return;

    await copyText(email);
    btn.classList.add("is-copied");
    btn.setAttribute("aria-label", "Email copié");
    btn.setAttribute("title", "Copié !");

    setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.setAttribute("aria-label", "Copier l'email");
      btn.setAttribute("title", "Copier l'email");
    }, 2000);
  });
});

document.querySelectorAll(".copy-phone").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const phone = btn.dataset.phone;
    if (!phone) return;

    await copyText(phone);
    btn.classList.add("is-copied");
    btn.setAttribute("aria-label", "Numéro copié");
    btn.setAttribute("title", "Copié !");

    setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.setAttribute("aria-label", "Copier le numéro");
      btn.setAttribute("title", "Copier le numéro");
    }, 2000);
  });
});

const skillsSection = document.getElementById("competences");
if (skillsSection) {
  const bars = skillsSection.querySelectorAll(".skill-item__bar");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateBars = () => {
    bars.forEach((bar, i) => {
      const width = bar.dataset.width;
      if (!width) return;

      if (reducedMotion) {
        bar.style.width = width;
      } else {
        setTimeout(() => {
          bar.style.width = width;
        }, 200 + i * 60);
      }
    });
  };

  if (reducedMotion) {
    animateBars();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBars();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(skillsSection);
  }
}

const timelineItems = document.querySelectorAll(".timeline-item");
if (timelineItems.length) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    timelineItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    timelineItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 150}ms`;
      observer.observe(item);
    });
  }
}
