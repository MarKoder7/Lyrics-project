document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".menu-btn").addEventListener("click", function () {
      document
        .querySelectorAll('*[class^="menu"]')
        .forEach((item) => item.classList.toggle("show"));
    });
  });
