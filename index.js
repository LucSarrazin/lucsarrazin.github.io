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

/*

// 1) Créer une carte par projet à partir de projects.js
const grille = document.getElementById('grille');
projects.forEach((p, i) => {
  const a = document.createElement('a');
  a.className = 'card';
  a.href = 'projet.html?id=' + p.slug;            // la fiche lit cet "id" dans l'adresse
  a.dataset.cat = p.cat;
  a.hidden = p.cat !== 'jeu';                      // au départ on ne montre que les jeux
  a.style.setProperty('--r', (i % 5 - 2) * 0.8 + 'deg'); // petite inclinaison
  a.innerHTML = (p.img[0] ? `<img src="${encodeURI(p.img[0])}" alt="" loading="lazy">` : '') +
    `<h3>${p.title}</h3><small>${p.date}</small><p>${p.desc}</p>`;
  grille.appendChild(a);
});

*/

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(element => {
    observer.observe(element);
});


//Lenis documentation         
// Lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


// preloader loading screen

/*window.addEventListener('load', function() {
    var preloader = document.querySelector('.loader-wrapper');
    preloader.style.display = 'none'; // Masquer le préchargeur
});*/

const overlay = document.getElementById('fade-overlay');

export let oneTime = false;
export function fadeToBlack() {
    oneTime = true;
    overlay.classList.add('active');
    
    setTimeout(function(){
        fadeFromBlack();
        oneTime = false;
    }, 2000);
}

export function fadeFromBlack() {
    overlay.classList.remove('active');
}
