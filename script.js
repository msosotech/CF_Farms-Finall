
/* =====================================================
   CF FARMS & AGRO
   RESPONSIVE WEBSITE JAVASCRIPT
   ===================================================== */

document.documentElement.classList.add("js-enabled");


/* ================= 1. PRELOADER ================= */

const preloader = document.getElementById("preloader");

function hidePreloader() {
    if (!preloader) return;

    preloader.classList.add("hide");
}

window.addEventListener("load", hidePreloader, { once: true });

setTimeout(hidePreloader, 3000);


/* ================= 2. MOBILE NAVIGATION ================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {

    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");
    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {

    if (!menuToggle || !navigation) return;

    navigation.classList.add("open");
    menuToggle.classList.add("active");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
}

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navigation.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    // Close menu after selecting a link
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu using Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    // Close menu when clicking outside
    document.addEventListener("click", event => {

        const clickedInside =
            navigation.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInside && navigation.classList.contains("open")) {
            closeMenu();
        }

    });

    // Close menu when returning to desktop layout
    window.addEventListener("resize", () => {

        if (window.innerWidth > 1050) {
            closeMenu();
        }

    });

}


/* ================= 3. COPYRIGHT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* ================= 4. STICKY HEADER ================= */

const header = document.getElementById("header");

function updateHeader() {

    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 50);

}

window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();


/* ================= 5. BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {

    if (!backToTop) return;

    backToTop.classList.toggle("show", window.scrollY > 500);

}

window.addEventListener("scroll", updateBackToTop, { passive: true });

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ================= 6. SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }

    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("revealed");
    });

}


/* ================= 7. ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        const linkId = link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            linkId === `#${currentId}`
                        );

                    });

                }

            });

        },

        {
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0
        }

    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


/* ================= 8. IMAGE OPTIMISATION ================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.decoding = "async";

    if (image.classList.contains("brand-logo")) {
        image.loading = "eager";
    } else {
        image.loading = "lazy";
    }

});


/* ================= 9. CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const fullName = document.getElementById("fullName")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const subject = document.getElementById("subject")?.value;
        const message = document.getElementById("message")?.value.trim();

        if (!fullName || !email || !subject || !message) {

            if (formNotice) {
                formNotice.textContent =
                    "Please complete all the required fields.";
            }

            return;
        }

        const emailSubject = encodeURIComponent(
            `CF Farms & Agro - ${subject}`
        );

        const emailBody = encodeURIComponent(
            `Name: ${fullName}\n` +
            `Email: ${email}\n` +
            `Enquiry Type: ${subject}\n\n` +
            `Message:\n${message}`
        );

        const emailLink =
            `mailto:cffarmsagro@gmail.com?subject=${emailSubject}&body=${emailBody}`;

        if (formNotice) {
            formNotice.textContent =
                "Opening your email application. Please review and send your enquiry.";
        }

        window.location.href = emailLink;

    });

}


/* ================= 10. CONSOLE INFORMATION ================= */

console.log(
    "%cCF FARMS & AGRO",
    "color: #26734D; font-size: 24px; font-weight: bold;"
);

console.log(
    "%cGrowing Food. Building Futures.",
    "color: #D8A83E; font-size: 13px;"
);

console.log("Welcome to CF Farms & Agro.");
