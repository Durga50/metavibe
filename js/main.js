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
    let lastParticleTime = 0; // To control particle spawning rate
    const particleInterval = 30; // milliseconds between particles for stardust

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create aura ripple on mouse movement
        const aura = document.createElement('div');
        aura.className = 'aura-ripple';
        cursorContainer.appendChild(aura);
        aura.style.left = mouseX + 'px';
        aura.style.top = mouseY + 'px';
        // Remove aura after animation
        aura.addEventListener('animationend', () => aura.remove());
    });

    document.addEventListener('mousedown', (e) => {
        const clickRippleElement = document.createElement('div');
        clickRippleElement.className = 'aura-ripple'; // Using aura-ripple for styling consistency
        clickRippleElement.style.background = 'transparent'; // Make it transparent for border effect
        clickRippleElement.style.border = '2px solid rgba(96, 165, 250, 0.7)'; // Border for the ripple
        cursorContainer.appendChild(clickRippleElement);
        clickRippleElement.style.left = e.clientX + 'px';
        clickRippleElement.style.top = e.clientY + 'px';
        clickRippleElement.style.animation = 'clickRipple 0.8s ease-out forwards';
        clickRippleElement.addEventListener('animationend', () => clickRippleElement.remove());
    });

    function animateCursor() {
        // Smoothly move the main cursor dot
        cursorX += (mouseX - cursorX) * 0.15; // Adjust smoothing factor
        cursorY += (mouseY - cursorY) * 0.15; // Adjust smoothing factor
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';

        // Create stardust particles at a controlled rate
        const currentTime = Date.now();
        if (currentTime - lastParticleTime > particleInterval) {
            const particle = document.createElement('div');
            particle.className = 'stardust-particle'; // Changed class name
            cursorContainer.appendChild(particle);

            const size = Math.random() * 6 + 2; // Smaller random size between 2px and 8px
            const angle = Math.random() * Math.PI * 2; // Random direction
            const distance = Math.random() * 25 + 5; // Random distance between 5px and 30px

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            // Spawn particles slightly behind the smoothed cursor position for a trailing effect
            particle.style.left = cursorX + Math.cos(angle) * 5 + 'px'; // Small offset
            particle.style.top = cursorY + Math.sin(angle) * 5 + 'px'; // Small offset
            
            // Animate particle movement and fade
            // Reusing fadeInOut animation, but it can be more specific for stardust if needed
            const animationDuration = Math.random() * 1.5 + 1; // Random duration between 1s and 2.5s
            particle.style.animationDuration = animationDuration + 's';
            particle.style.animationName = 'fadeInOut'; // Ensure fadeInOut is used

            particle.animate([
                { transform: `translate(-50%, -50%) translate(0, 0)`, opacity: 0, filter: 'blur(1px)' },
                { transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`, opacity: 0.8, filter: 'blur(0px)' },
                { transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance * 1.5}px, ${Math.sin(angle) * distance * 1.5}px)`, opacity: 0, filter: 'blur(2px)' }
            ], {
                duration: animationDuration * 1000, // Convert to milliseconds
                easing: 'ease-out',
                fill: 'forwards'
            }).onfinish = () => particle.remove(); // Remove particle after animation

            lastParticleTime = currentTime; // Update last particle creation time
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for clickable elements
    const clickableElements = document.querySelectorAll('a, button, input, textarea, select, .btn');

    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
        });
    });

})(jQuery);

