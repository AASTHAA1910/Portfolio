// Active Link Functionality...
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar-nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Scrollable Functionality...
const links = document.querySelectorAll('.sidebar-nav a');
const section = document.querySelectorAll('main section');

function showSection(id) {
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    const target = document.querySelector(id);
    if (target) target.classList.add('active-section');
}

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        links.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const targetId = this.getAttribute('href');
        showSection(targetId);
    });
});

// Show home section by default
window.onload = () => {
    showSection('#home');
};