document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".menu-primary");
  if (!nav) return;

  const here = new URL(location.href);
  const herePath = here.pathname.replace(/\/index\.html$/, "/");

  nav.querySelectorAll("a[href]").forEach(a => {
    const target = new URL(a.getAttribute("href"), here.origin).pathname
      .replace(/\/index\.html$/, "/");
    if (target === herePath) {
      a.setAttribute("aria-current", "page");
    }
  });
});
