// 1. Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
}, { passive: true });

// 2. Counter animation:
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const rawTarget = el.dataset.target || el.innerText;
            const target = parseInt(rawTarget, 10);
            
            if (isNaN(target)) {
                observer.unobserve(el);
                return;
            }
            
            let count = 0;
            const speed = target / 50; 
            const update = () => {
                if (count < target && document.contains(el)) {
                    count += Math.ceil(speed);
                    el.textContent = count > target ? target : count;
                    requestAnimationFrame(update);
                }
            };
            update();
            observer.unobserve(el); 
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(n => observer.observe(n));

// 3. Footer Injection 
function injectFooter() {
    const container = document.getElementById('footer-container');
    if (!container || container.dataset.injected) return;
    container.dataset.injected = 'true';

    container.innerHTML = `
    <footer class="py-5">
        <div class="container px-4 px-md-5">
            <div class="row g-5">
                <div class="col-12 col-md-4">
                    <h4 class="text-white mb-3 footer-heading">Contact</h4>
                    <p class="muted-text mb-2">pslogistics@porto.space</p>
                    <p class="muted-text mb-4">+62 (555) 0123 4567</p>
                    <div class="d-flex gap-4 mb-3">
                        <a href="https://x.com" class="muted-text fs-5 text-decoration-none"><i class="bi bi-twitter-x"></i></a>
                        <a href="https://linkedin.com" class="muted-text fs-5 text-decoration-none"><i class="bi bi-linkedin"></i></a>
                        <a href="https://instagram.com" class="muted-text fs-5 text-decoration-none"><i class="bi bi-instagram"></i></a>
                    </div>
                    <div class="label-text" style="opacity: 0.6; font-size: 0.8rem;">&copy; 2026 PORTO SPACE CORP.</div>
                </div>
                <div class="col-12 col-md-4">
                    <h4 class="text-white mb-3 footer-heading">Navigation</h4>
                    <div class="d-flex flex-column gap-2">
                        <a href="index.html" class="muted-text text-decoration-none">Home</a>
                        <a href="about.html" class="muted-text text-decoration-none">About Us</a>
                        <a href="services.html" class="muted-text text-decoration-none">Services</a>
                        <a href="fleet.html" class="muted-text text-decoration-none">Fleet</a>
                        <a href="contact.html" class="muted-text text-decoration-none">Contact</a>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <h4 class="text-white mb-3 footer-heading">Legal</h4>
                    <div class="d-flex flex-column gap-2">
                        <a href="#" class="muted-text text-decoration-none">Terms</a>
                        <a href="#" class="muted-text text-decoration-none">Compliance</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;
}

injectFooter();
