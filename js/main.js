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
                            `<span>` +
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

    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorContainer.appendChild(cursorGlow);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0; // Tracks the interpolated position of the cursor glow
    let cursorY = 0; // Tracks the interpolated position of the cursor glow
    let isMoving = false; // Flag to check if the mouse is currently moving
    let lastMouseX = 0;
    let lastMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if cursor is moving
        isMoving = Math.abs(mouseX - lastMouseX) > 1 || Math.abs(mouseY - lastMouseY) > 1; // Threshold for movement
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    });

    document.addEventListener('mousedown', (e) => {
        // Re-introduce Warp Jump on click (optional, based on user preference)
        const warpJumpElement = document.createElement('div');
        warpJumpElement.className = 'warp-jump-ripple'; // You'll need to ensure this CSS class is defined or removed.
        cursorContainer.appendChild(warpJumpElement);
        warpJumpElement.style.left = e.clientX + 'px';
        warpJumpElement.style.top = e.clientY + 'px';
        warpJumpElement.animate([
            { width: '0px', height: '0px', opacity: 0.8, border: '3px solid rgba(96, 165, 250, 0.8)', transform: `translate(-50%, -50%) scale(0)` },
            { width: '80px', height: '80px', opacity: 0, border: '0px solid rgba(96, 165, 250, 0.8)', transform: `translate(-50%, -50%) scale(1.5)` }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        }).onfinish = () => warpJumpElement.remove();
    });

    function animateCursor() {
        // Smoothly move the single cursorGlow element
        cursorX += (mouseX - cursorX) * 0.2; // Adjusted responsiveness for smooth follow
        cursorY += (mouseY - cursorY) * 0.2; // Adjusted responsiveness for smooth follow

        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';

        // Control opacity based on movement
        cursorGlow.style.opacity = isMoving ? '1' : '0';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for clickable elements (now targets the single cursorGlow)
    const clickableElements = document.querySelectorAll('a, button, input, textarea, select, .btn, [onclick], [href]');

    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorGlow.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.3)'; // Scale up main glow on hover
            cursorGlow.style.boxShadow = '0 0 150px rgba(96, 165, 250, 0.8), inset 0 0 60px rgba(128, 0, 128, 0.6)'; // Stronger hover glow
        });
        element.addEventListener('mouseleave', () => {
            cursorGlow.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)'; // Return to normal size
            cursorGlow.style.boxShadow = '0 0 150px rgba(96, 165, 250, 0.6), inset 0 0 60px rgba(128, 0, 128, 0.4)'; // Return to normal glow
        });
    });

})(jQuery);

