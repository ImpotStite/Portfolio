const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function setupSiteHeader() {
  const shell = document.getElementById("site-header-shell");
  const trigger = document.getElementById("site-header-trigger");
  if (!shell || !trigger) return;

  const setHeaderHeight = () => {
    document.documentElement.style.setProperty(
      "--site-header-height",
      `${shell.offsetHeight}px`
    );
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      shell.classList.toggle("is-scrolled", !entry.isIntersecting);
      setHeaderHeight();
    },
    { threshold: 0, rootMargin: "1px 0px 0px 0px" }
  );

  observer.observe(trigger);
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);
}

setupSiteHeader();

const COPY_RESET_MS = 2000;

function setupCopyButtons(selector, getValue, labels) {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = getValue(btn);
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
      }

      btn.classList.add("is-copied");
      btn.setAttribute("aria-label", labels.copied);
      btn.setAttribute("title", "Copié !");

      window.setTimeout(() => {
        btn.classList.remove("is-copied");
        btn.setAttribute("aria-label", labels.copy);
        btn.setAttribute("title", labels.titleCopy);
      }, COPY_RESET_MS);
    });
  });
}

setupCopyButtons(".copy-email", (btn) => btn.dataset.email, {
  copy: "Copier l'email dans le presse-papier",
  copied: "Email copié",
  titleCopy: "Copier l'email",
});

setupCopyButtons(".copy-phone", (btn) => btn.dataset.phone, {
  copy: "Copier le numéro dans le presse-papier",
  copied: "Numéro copié",
  titleCopy: "Copier le numéro",
});

function setupSkillBars() {
  const section = document.getElementById("competences");
  if (!section) return;

  const bars = section.querySelectorAll(".skill-item__bar");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = () => {
    bars.forEach((bar, index) => {
      const width = bar.dataset.width;
      if (!width) return;

      const apply = () => {
        bar.style.width = width;
      };

      if (reducedMotion) {
        apply();
      } else {
        window.setTimeout(apply, 200 + index * 60);
      }
    });
  };

  if (reducedMotion) {
    animate();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(section);
}

setupSkillBars();

function setupTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

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

  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 150}ms`;
    observer.observe(item);
  });
}

setupTimeline();
