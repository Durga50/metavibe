(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    // Enhanced Counter Animation
    function animateCounter(element, target, duration = 1000) {
        let start = 0;
        const increment = target / (duration / 10);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 10);
    }

    // Initialize counters when they come into view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    // Observe all counter elements
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });

    // Typing Effect for Hero Welcome Text
    const welcomeTextElement = document.getElementById('hero-welcome-text');
    const staticPrefix = "Welcome to ";
    const textToType = "KD MetaVibe";
    let charIndex = 0;
    const typingSpeed = 70; // Adjust typing speed (milliseconds per character)
    const eraseSpeed = 30; // Adjust erasing speed
    const newTextDelay = 1500; // Delay before typing new text

    function typeText() {
        if (charIndex < textToType.length) {
            welcomeTextElement.innerHTML = staticPrefix + textToType.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            colorText(); // Apply color after typing is complete
            setTimeout(eraseText, newTextDelay);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            // Remove coloring before erasing and erase the dynamic part
            welcomeTextElement.innerHTML = staticPrefix + textToType.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, eraseSpeed);
        } else {
            setTimeout(typeText, typingSpeed);
        }
    }

    function colorText() {
        const coloredText = staticPrefix +
                            `<span class="text-primary">` +
                            textToType +
                            `</span>`;
        welcomeTextElement.innerHTML = coloredText;
    }

    // Start the typing animation when the page loads
    if (welcomeTextElement) {
        welcomeTextElement.textContent = staticPrefix; // Set the static prefix initially
        setTimeout(typeText, 500); // Small delay before starting to type
    }

    // Magnetic Cursor Effect
    const cursorContainer = document.createElement('div');
    cursorContainer.id = 'cursor-effect-container';
    document.body.appendChild(cursorContainer);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorContainer.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let lastParticleTime = 0; 
    const particleInterval = 20; // Increased frequency for more dust
    let isHoveringClickable = false; // To track hover state for gravitational pull

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create aura ripple on mouse movement (less frequent)
        if (Date.now() % 100 < 20) { // Reduced frequency for aura ripples
            const aura = document.createElement('div');
            aura.className = 'aura-ripple';
            cursorContainer.appendChild(aura);
            aura.style.left = mouseX + 'px';
            aura.style.top = mouseY + 'px';
            aura.addEventListener('animationend', () => aura.remove());
        }
    });

    document.addEventListener('mousedown', (e) => {
        const warpJumpElement = document.createElement('div');
        warpJumpElement.className = 'warp-jump-ripple'; // New class for warp jump
        cursorContainer.appendChild(warpJumpElement);
        warpJumpElement.style.left = e.clientX + 'px';
        warpJumpElement.style.top = e.clientY + 'px';
        warpJumpElement.addEventListener('animationend', () => warpJumpElement.remove());
    });

    function animateCursor() {
        // Smoothly move the main cursor dot
        cursorX += (mouseX - cursorX) * 0.15; 
        cursorY += (mouseY - cursorY) * 0.15; 
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';

        // Create cosmic dust particles at a controlled rate
        const currentTime = Date.now();
        if (currentTime - lastParticleTime > particleInterval) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-dust-particle'; // Changed class name
            cursorContainer.appendChild(particle);

            const size = Math.random() * 5 + 1; // Smaller random size between 1px and 6px
            let angle = Math.random() * Math.PI * 2; // Random direction
            const distance = Math.random() * 30 + 10; // Random distance

            // Gravitational Pull: Adjust particle direction if hovering over clickable element
            if (isHoveringClickable) {
                // Simple adjustment: particles move slightly towards the cursor center
                angle += (Math.random() - 0.5) * 0.5; // Slight deviation
            }

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = cursorX + 'px'; // Spawn from cursor
            particle.style.top = cursorY + 'px';
            
            // Apply cosmicDustAnimation
            particle.animate([
                { transform: `translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg)`, opacity: 0, filter: 'blur(1px)' },
                { transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1) rotate(180deg)`, opacity: 0.8, filter: 'blur(0px)' },
                { transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance * 1.5}px, ${Math.sin(angle) * distance * 1.5}px) scale(0) rotate(360deg)`, opacity: 0, filter: 'blur(2px)' }
            ], {
                duration: Math.random() * 2000 + 1000, // Random duration between 1s and 3s
                easing: 'ease-out',
                fill: 'forwards'
            }).onfinish = () => particle.remove(); 

            lastParticleTime = currentTime; 
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for clickable elements (updated for gravitational pull)
    const clickableElements = document.querySelectorAll('a, button, input, textarea, select, .btn, [onclick], [href]');

    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            isHoveringClickable = true; // Set hover state
        });
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            isHoveringClickable = false; // Reset hover state
        });
    });

})(jQuery);

