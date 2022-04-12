let burger = document.getElementById("burger");
let navigation = document.getElementById("navigation");
let overlay = document.getElementById("brand-overlay");

burger.addEventListener("click", () => {
  navigation.classList.toggle("nav-active");
  overlay.classList.toggle("brand__overlay-active");
});
