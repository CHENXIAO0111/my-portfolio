(function () {
  var root = document.documentElement;
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.dataset.theme = "dark";
  }

  var themeBtn = document.getElementById("theme-toggle");

  function syncThemeBtn() {
    if (!themeBtn) return;
    themeBtn.textContent = root.dataset.theme === "dark" ? "浅色模式" : "深色模式";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      if (root.dataset.theme === "dark") {
        delete root.dataset.theme;
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
      }
      syncThemeBtn();
    });
  }
  syncThemeBtn();

  var topBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (!topBtn) return;
    topBtn.classList.toggle("visible", window.scrollY > 400);
  });
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();