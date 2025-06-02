// Dynamic years and months of experience
const careerStartDate = new Date(2021, 5); // June 2021 (months are 0-based)
const currentDate = new Date();
const diffYears = currentDate.getFullYear() - careerStartDate.getFullYear();
const diffMonths = currentDate.getMonth() - careerStartDate.getMonth();

let years = diffYears;
let months = diffMonths;

if (diffMonths < 0) {
  years--;
  months = 12 + diffMonths;
}

const experienceText =
  months > 0
    ? `${years} year${years !== 1 ? "s" : ""} ${months} month${
        months !== 1 ? "s" : ""
      }`
    : `${years} year${years !== 1 ? "s" : ""}`;

document.getElementById("experience-years").textContent = experienceText;

// Animate skill bars when skills section scrolls into view
function animateSkills() {
  document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
    const fill = bar.getAttribute("data-fill");
    bar.style.width = fill;
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// Section reveal on scroll
function revealSections() {
  document.querySelectorAll(".reveal").forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  const skillsSection = document.getElementById("skills");
  if (isInViewport(skillsSection)) {
    animateSkills();
  }
  revealSections();
});

window.addEventListener("load", () => {
  const skillsSection = document.getElementById("skills");
  if (isInViewport(skillsSection)) {
    animateSkills();
  }
  revealSections();
});

// Intro typing effect
const introText = "Full Stack Developer, Backend Specialist, Problem Solver";
const introEl = document.querySelector(".intro");
let idx = 0;

function typeIntro() {
  if (idx <= introText.length) {
    introEl.textContent = introText.substring(0, idx++);
    setTimeout(typeIntro, 100);
  } else {
    setTimeout(() => {
      idx = 0;
      introEl.textContent = "";
      typeIntro();
    }, 3000);
  }
}
typeIntro();

// Dark/light theme toggle icons & sync
const themeToggleBtns = document.querySelectorAll(
  "#theme-toggle, #theme-toggle-mobile"
);

function updateIcons(isDark) {
  themeToggleBtns.forEach((btn) => {
    btn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.setAttribute(
      "title",
      isDark ? "Switch to Light Mode" : "Switch to Dark Mode"
    );
  });
}

themeToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    updateIcons(isDark);
  });
});

// Initialize toggle icons on load
updateIcons(document.body.classList.contains("dark"));

// Hamburger nav toggle
const navToggleBtn = document.getElementById("nav-toggle");
const navbar = document.getElementById("navbar");

navToggleBtn.addEventListener("click", () => {
  const expanded =
    navToggleBtn.getAttribute("aria-expanded") === "true" || false;
  navToggleBtn.setAttribute("aria-expanded", !expanded);
  navbar.classList.toggle("open");
});

// Close nav menu on link click (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("open")) {
      navbar.classList.remove("open");
      navToggleBtn.setAttribute("aria-expanded", false);
    }
  });
});

// Dynamic footer year
document.getElementById("current-year").textContent = currentYear;

// Active nav link highlighting on scroll and click
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll("nav ul li a");

function updateActiveLink() {
  let index = sections.length;

  while (--index && window.scrollY + 90 < sections[index].offsetTop) {}

  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[index].classList.add("active");
}

window.addEventListener("scroll", updateActiveLink);

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70, // header offset
        behavior: "smooth",
      });
    }
    // close nav menu if mobile open
    if (navbar.classList.contains("open")) {
      navbar.classList.remove("open");
      navToggleBtn.setAttribute("aria-expanded", false);
    }
  });
});

// Reveal sections on load in case already visible
window.addEventListener("load", revealSections);

const mobileThemeToggle = document.getElementById("theme-toggle-mobile");

mobileThemeToggle.addEventListener("click", () => {
  if (navbar.classList.contains("open")) {
    navbar.classList.remove("open");
    navToggleBtn.setAttribute("aria-expanded", false);
  }
});

document.querySelectorAll(".toggle-roles-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const rolesList = document.getElementById(
      button.getAttribute("aria-controls")
    );
    if (rolesList) {
      if (expanded) {
        rolesList.hidden = true;
        button.setAttribute("aria-expanded", "false");
      } else {
        rolesList.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    }
  });
});
