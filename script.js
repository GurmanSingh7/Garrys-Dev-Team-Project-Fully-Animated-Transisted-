
        // Rain Effect
        const rainCanvas = document.getElementById('rainCanvas');
        const ctx = rainCanvas.getContext('2d');
        let raindrops = [];
        let animationId = null;

        function resizeCanvas() {
            rainCanvas.width = window.innerWidth;
            rainCanvas.height = window.innerHeight;
        }

        class Raindrop {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * rainCanvas.width;
                this.y = Math.random() * -rainCanvas.height;
                this.speed = Math.random() * 8 + 12;
                this.length = Math.random() * 20 + 10;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.width = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.y += this.speed;
                if (this.y > rainCanvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.width * 0.5, this.y + this.length);
                ctx.strokeStyle = `rgba(150, 200, 255, ${this.opacity})`;
                ctx.lineWidth = this.width;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }

        function initRain() {
            raindrops = [];
            const dropCount = Math.floor((rainCanvas.width * rainCanvas.height) / 15000);
            for (let i = 0; i < Math.min(dropCount, 200); i++) {
                raindrops.push(new Raindrop());
            }
        }

        function animateRain() {
            ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
            raindrops.forEach(drop => {
                drop.update();
                drop.draw();
            });
            animationId = requestAnimationFrame(animateRain);
        }

        // Parallax Effect
        function handleParallax() {
            const scrollY = window.scrollY;
            const layers = document.querySelectorAll('.city-layer');
            
            layers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) || 0.1;
                const yPos = -(scrollY * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        }

        // Typewriter Effect
        function typeWriter(element, text, speed = 40) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML = text.substring(0, i + 1) + '<span class="cursor"></span>';
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.innerHTML = text;
                }
            }
            type();
        }

        // Intersection Observer for typewriter
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const quoteEl = entry.target.querySelector('.quote-text');
                    if (quoteEl && !quoteEl.dataset.typed) {
                        const text = quoteEl.dataset.quote;
                        quoteEl.dataset.typed = 'true';
                        setTimeout(() => typeWriter(quoteEl, text, 30), Math.random() * 300);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.quote-card').forEach(card => {
            quoteObserver.observe(card);
        });

        // Timeline items animation
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.6s ease';
            timelineObserver.observe(item);
        });

        // Character cards animation
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.character-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });

        // Theme cards animation
        const themeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.theme-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            card.style.transition = 'all 0.5s ease';
            themeObserver.observe(card);
        });

        // Glitch effect intensification on hover
        const glitchTitle = document.querySelector('.glitch-title');
        glitchTitle.addEventListener('mouseenter', () => {
            glitchTitle.style.animation = 'textShadow 0.3s infinite';
        });
        glitchTitle.addEventListener('mouseleave', () => {
            glitchTitle.style.animation = 'textShadow 4s infinite';
        });

        // Initialize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initRain();
        });

        window.addEventListener('scroll', () => {
            handleParallax();
        });

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function handleReducedMotion() {
            if (prefersReducedMotion.matches) {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
                ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
            } else {
                initRain();
                animateRain();
            }
        }

        prefersReducedMotion.addEventListener('change', handleReducedMotion);

        // Start everything
        resizeCanvas();
        handleReducedMotion();