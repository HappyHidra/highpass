//  Search window
const search = document.querySelector(".header-search__item"),
  searchWindow = document.querySelector(".search-window"),
  searchBtn = document.querySelector(".search-window__submit-btn"),
  inputResult = document.querySelector(".search-window__descr");

search.addEventListener("click", () => {
  search.classList.toggle("header-search__item_active"),
    searchWindow.classList.toggle("search-window_active");
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault(),
    (inputResult.value = ""),
    search.classList.toggle("header-search__item_active"),
    searchWindow.classList.toggle("search-window_active");
});

inputResult.addEventListener("click", (e) => {
  e.preventDefault(), inputResult.removeAttribute("placeholder");
});
inputResult.addEventListener("blur", (e) => {
  e.preventDefault(),
    inputResult.setAttribute("placeholder", "Что будем искать");
});

// Input Errors
const errors = {};

const inputForm = document.querySelector(".about__form");
const aboutInput = document.querySelector(".about__input");
const errorsEl = document.querySelector(".errors");

//  1 form
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = aboutInput.value;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
    delete errors.sendEmail;
    aboutInput.classList.remove("is-invalid");
    errorsEl.style.display = "none";
  } else {
    errors.sendEmail = "Недопустимый формат";
    aboutInput.classList.add("is-invalid");
    errorsEl.style.display = "block";
    errorsEl.textContent = errors.sendEmail;
  }
});

aboutInput.addEventListener("input", (e) => {
  errorsEl.style.display = "none";
  aboutInput.classList.remove("is-invalid");
});

//  2 form
const contactsForm = document.querySelector(".contacts__form");
const contactsInput = document.querySelector(".contacts__inp_mail");
const errors2El = document.querySelector(".errors2");

contactsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = contactsInput.value;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputValue)) {
    delete errors.contactsEmail;
    contactsInput.classList.remove("is-invalid");
    errors2El.style.display = "none";
  } else {
    errors.contactsEmail = "Недопустимый формат";
    contactsInput.classList.add("is-invalid");
    errors2El.style.display = "block";
    errors2El.textContent = errors.contactsEmail;
  }
});

contactsInput.addEventListener("input", (e) => {
  errors2El.style.display = "none";
  contactsInput.classList.remove("is-invalid");
});

// Burger
const burger = document.querySelector(".burger"),
  menu = document.querySelector(".header-nav__menu_small"),
  menuLinks = document.querySelectorAll(".nav-menu__item"),
  closeBtn = document.querySelector(".burger-search__item_close");

closeBtn.addEventListener("click", () => {
  burger.style.display = "block";
  closeBtn.style.display = "none";
  menu.classList.remove("header__menu_active"),
    document.body.classList.remove("stop-scroll");
});

burger.addEventListener("click", () => {
  // burger.classList.toggle("burger_active"),
  burger.style.display = "none";
  closeBtn.style.display = "block";
  menu.classList.toggle("header__menu_active"),
    document.body.classList.toggle("stop-scroll");
}),
  menuLinks.forEach((e) => {
    e.addEventListener("click", () => {
      // burger.classList.remove("burger_active"),
      burger.style.display = "block";
      closeBtn.style.display = "none";
      menu.classList.remove("header__menu_active"),
        document.body.classList.remove("stop-scroll");
    });
  });

//  Map
document.getElementById("map").addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelector(".contacts__desc")
    .classList.toggle("contacts__desc_active");
});

document.querySelector(".contacts__close").addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelector(".contacts__desc")
    .classList.remove("contacts__desc_active");
});
