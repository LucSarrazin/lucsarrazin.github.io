// Typed.js
new Typed('#typed',{
    strings : ['développeur logiciel','développeur front-end', 'développeur back-end','développeur web', 'développeur gameplay','développeur jeux vidéo', 'créateur de contenu'],
    typeSpeed : 100,
    delaySpeed : 40,
    backSpeed : 40,
    loop : true
});

// Particles.js
particlesJS.load('particles-js', 'particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
});

// Change Date
document.getElementById("year").textContent = new Date().getFullYear();

// AOS
AOS.init();

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
    
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(element => {
    observer.observe(element);
});


//Lenis documentation         
// Lenis
const lenis = new Lenis();
// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// preloader loading screen

/*window.addEventListener('load', function() {
    var preloader = document.querySelector('.loader-wrapper');
    preloader.style.display = 'none'; // Masquer le préchargeur
});*/
