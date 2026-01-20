(function () {
  // Highlight active nav link
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if ((path === "" && href.includes("index.html")) || href.endsWith(path)) {
      a.classList.add("active");
    }
  });

  // Simple "copy email" button (optional)
  const copyBtn = document.querySelector("[data-copy-email]");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-copy-email");
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Email copied ✅";
        setTimeout(() => (copyBtn.textContent = "Copy email"), 1500);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();
