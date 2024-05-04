document.addEventListener('DOMContentLoaded', () => {

   // Observer pour les sections
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fadeInSection(entry.target); // Appelle la fonction pour ajouter la classe fadeIn à la section
            animateTitles(entry.target); // Appelle la fonction pour animer les titres de la section
            sectionObserver.unobserve(entry.target); // Arrête d'observer la section une fois qu'elle est visible
        }
    });
}, { rootMargin: '-100px 0px -100px 0px' }); // Définit la marge autour de la fenêtre de visualisation

// Observation de chaque section
document.querySelectorAll('.story, #characters, #place, #studio, footer').forEach(section => sectionObserver.observe(section));

// Ajoute la classe de fadeIn à la section visible
function fadeInSection(section) {
    section.classList.add('fadeIn'); // Ajoute la classe CSS 'fadeIn' à la section pour appliquer une transition de fondu en utilisant CSS
}

// Anime les titres des sections
function animateTitles(section) {
    const title = section.querySelector('h2, h3'); // Sélectionne le titre h2 ou h3 de la section
    if (title) { // Vérifie si un titre existe
        const words = title.textContent.split(' '); // Divise le texte du titre en mots
        title.innerHTML = ''; // Efface le contenu initial du titre

        words.forEach((word, index) => { // Pour chaque mot dans le titre
            const span = document.createElement('span'); // Crée un élément span pour envelopper chaque mot
            span.textContent = word + ' '; // Définit le texte du span avec le mot et un espace
            span.style.display = 'inline-block'; // Définit le style pour être en ligne
            span.style.marginRight = '15px'; // Définit une marge à droite pour chaque mot
            span.style.opacity = '0'; // Définit l'opacité à 0 pour commencer
            span.style.transform = 'translateY(100%)'; // Déplace le mot vers le bas pour commencer
            span.style.transition = 'opacity 0.8s ease-in, transform 1.2s ease-in'; // Définit une transition pour l'opacité et la translation

            const delay = index === 0 ? 400 : index * 600; // Calcul du délai pour chaque mot en fonction de son index
            setTimeout(() => { // Exécute le code après un certain délai
                span.style.opacity = '1'; // Augmente l'opacité pour afficher le mot
                span.style.transform = 'translateY(0)'; // Anime le mot vers le haut pour le positionner correctement
            }, delay);

            title.appendChild(span); // Ajoute le span au titre
        });
    }
}
 // Effet de parallaxe entre le titre et la vidéo dans le header
window.addEventListener('scroll', () => {
    // Sélection des éléments HTML nécessaires
    const video = document.getElementById('banner-video'); // Sélection de la vidéo dans l'en-tête
    const title = document.getElementById('banner-image'); // Sélection du titre dans l'en-tête
    const placeSection = document.querySelector('.banner'); // Sélection de la section qui contient les éléments

    // Récupération de la position de la section dans le document
    const sectionOffsetTop = placeSection.offsetTop;

    // Récupération de la position de défilement de la fenêtre
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Vérification si la position de défilement dépasse la position de la section
    if (scrollPosition >= sectionOffsetTop) {
        // Calcul du déplacement parallaxe en fonction de la position de défilement
        const parallax = (scrollPosition - sectionOffsetTop) / 4;

        // Limitation de la valeur de déplacement maximum
        const translationY = Math.min(parallax, 100);

        // Application du déplacement à la vidéo et au titre
        video.style.transform = 'translateY(' + (-translationY) + 'px)'; // Déplacement de la vidéo vers le haut (parallaxe inversée)
        title.style.transform = 'translateY(' + (translationY) + 'px)'; // Déplacement du titre vers le bas (parallaxe)
    }
});


    // Initialisation du Swiper
    new Swiper(".swiper-container", {
    // Options de configuration du Swiper
    direction: 'horizontal', // Définit la direction du défilement à l'horizontale
    centeredSlides: true, // Centre les diapositives actives
    slidesPerView: "auto", // Définit le nombre de diapositives visibles en même temps (calculé automatiquement)
    speed: 2000, // Définit la vitesse de transition entre les diapositives (en millisecondes)
    autoplay: {
    delay: 2000, // Définit le délai entre chaque diapositive (en millisecondes)
    disableOnInteraction: false, // L'autoplay continue même si l'utilisateur interagit avec le Swiper
    },
    effect: 'coverflow', // Définit l'effet de transition des diapositives (coverflow)
    loop: true, // Active la boucle infinie
    coverflowEffect: {
    slideShadows: false, // Désactive l'ombre des diapositives dans l'effet coverflow
    rotate: 60, // Définit l'angle de rotation des diapositives en degrés
    stretch: 0, // Définit l'étirement horizontal des diapositives
    depth: 100, // Définit la profondeur de la perspective des diapositives
    modifier: 1, // Définit le coefficient de modification de la distance entre les diapositives dans l'effet coverflow
    },
});


    // Translation du nuage lors du défilement de la page
    window.addEventListener('scroll', () => {
        const cloud = document.querySelector('.big_cloud');
        const littleCloud = document.querySelector('.little_cloud');
        const placeSection = document.getElementById('place');

        const sectionOffsetTop = placeSection.offsetTop;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        if (scrollPosition >= sectionOffsetTop) {
            const parallax = (scrollPosition - sectionOffsetTop) / 4;
            const translationX = Math.min(parallax, 300);

            cloud.style.transform = 'translateX(' + (-translationX) + 'px)';
            littleCloud.style.transform = 'translateX(' + (-translationX) + 'px)';
        }
    });

        const video = document.getElementById('banner-video');
        const banner = document.querySelector('.banner');
    
        // Fonction pour cacher la vidéo et afficher l'image de fallback
        function hideVideoShowFallback() {
            video.style.display = 'none';
            banner.style.backgroundImage = 'block';
        }
    
        // Fonction pour afficher la vidéo et cacher l'image de fallback
        function showVideoHideFallback() {
            video.style.display = 'block';
            banner.style.backgroundImage = 'none'; // Remettre l'image de fond par défaut
        }
    
        // Vérifier si la largeur de l'écran est inférieure ou égale à 768 pixels (taille typique des appareils mobiles)
        const isMobile = window.screen.width <= 768;
    
        // Cacher la vidéo et afficher l'image de fallback si c'est un appareil mobile
        if (isMobile) {
            hideVideoShowFallback();
        }
    
        // Gérer le chargement et les erreurs de la vidéo
        video.addEventListener('loadedmetadata', function() {
            hideVideoShowFallback(); // Cacher la vidéo et afficher l'image de fallback lors du chargement
        });
    
        video.addEventListener('canplay', function() {
            if (!isMobile) {
                showVideoHideFallback(); // Afficher la vidéo et cacher l'image de fallback si ce n'est pas un appareil mobile
            }
        });
    
        video.addEventListener('error', function() {
            hideVideoShowFallback(); // Cacher la vidéo et afficher l'image de fallback en cas d'erreur
        });
    });    

// Gestion de l'ouverture et de la fermeture de la modale avec jQuery
jQuery(document).ready(function($) {
    // Lorsque l'élément avec la classe "modal-open" est cliqué
    $(".modal-open").click(function() {
        // Animer la hauteur et l'opacité de l'élément avec la classe "modal__content"
        // pour ouvrir ou fermer la modale avec une transition de 1000 millisecondes (1 seconde)
        $(".modal__content").animate({ height: "toggle", opacity: "toggle" }, 1000)
            // Ajouter ou supprimer la classe "open" pour indiquer l'état de la modale
            .toggleClass("open");
        // Ajouter ou supprimer la classe "close" pour indiquer l'état du bouton de fermeture
        $(".modal__burger").toggleClass("close");
    });

    // Lorsqu'un lien (<a>) est cliqué
    $("a").click(function() {
        // Vérifier si la modale est ouverte
        if ($(".modal__content").hasClass("open")) {
            // Si la modale est ouverte, animer la hauteur et l'opacité de la modale
            // pour la fermer avec une transition de 1000 millisecondes (1 seconde)
            $(".modal__content").animate({ height: "toggle", opacity: "toggle" }, 1000);
            // Supprimer la classe "open" pour indiquer que la modale est fermée
            $(".modal__content").removeClass("open");
            // Supprimer la classe "close" pour réinitialiser l'état du bouton de fermeture
            $(".modal__burger").removeClass("close");
        }
    });
});
