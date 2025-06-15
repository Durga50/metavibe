<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <title>KD MetaVibe</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta content="" name="keywords">
        <meta content="" name="description">

        <!-- Google Web Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Playball&display=swap" rel="stylesheet">
        <link rel="icon" href="img/logo.jpeg" type="image/x-icon">
        <!-- Icon Font Stylesheet -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

        <!-- Libraries Stylesheet -->
        <link href="lib/animate/animate.min.css" rel="stylesheet">
        <link href="lib/lightbox/css/lightbox.min.css" rel="stylesheet">
        <link href="lib/owlcarousel/owl.carousel.min.css" rel="stylesheet">

        <!-- Customized Bootstrap Stylesheet -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- Template Stylesheet -->
        <link href="css/style.css" rel="stylesheet">
        
        <!-- Custom Cursor -->
        <div class="cursor-core" style="opacity:0;"></div>
        
        <script>
            const core = document.querySelector('.cursor-core');
            let sprinkleTimeout = null;

            function showCore(x, y) {
                core.style.opacity = 1;
                core.style.left = x + 'px';
                core.style.top = y + 'px';
                clearTimeout(sprinkleTimeout);
                sprinkleTimeout = setTimeout(() => { core.style.opacity = 0; }, 300);
            }

            function sprinkle(x, y) {
                const count = 12;
                for (let i = 0; i < count; i++) {
                    const angle = (Math.PI * 2 / count) * i + Math.random() * 0.2;
                    const distance = 12 + Math.random() * 12;
                    const dot = document.createElement('div');
                    dot.className = 'cursor-particle';
                    dot.style.left = x + 'px';
                    dot.style.top = y + 'px';
                    dot.style.opacity = 1;
                    document.body.appendChild(dot);

                    // Animate outward
                    setTimeout(() => {
                        dot.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.7)`;
                        dot.style.opacity = 0;
                    }, 10);

                    // Remove after animation
                    setTimeout(() => dot.remove(), 400);
                }
            }

            document.addEventListener('mousemove', e => {
                showCore(e.clientX, e.clientY);
                sprinkle(e.clientX, e.clientY);
            });
        </script>
    </head>

    <body>

        <!-- Spinner Start -->
        <div id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
            <div class="spinner-grow text-primary" role="status"></div>
        </div>
        <!-- Spinner End -->

        <div id="net-bg"></div>
        <div id="net-bg2"></div>
        <div id="net-bg3"></div>


        <!-- Navbar start -->
        <div class="container-fluid nav-bar">
            <div class="container">
                <nav class="navbar navbar-light navbar-expand-lg py-4">
                    <img src="img/logo.png" alt="logo" class="logo">
                    <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="fa fa-bars text-primary"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <div class="navbar-nav mx-auto">
                            <a href="index.php" class="nav-item nav-link active">Home</a>
                            <a href="about.php" class="nav-item nav-link">About</a>
                            <a href="services.php" class="nav-item nav-link">Services</a>
                            <a href="team.php" class="nav-item nav-link">Team</a>
                            <a href="careers.php" class="nav-item nav-link">Careers</a>
                            <a href="contact.php" class="nav-item nav-link">Contact</a>
                        </div>
                        
                        <a href="contact.php" class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill">Start Your Journey</a>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Navbar End -->

        <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>

