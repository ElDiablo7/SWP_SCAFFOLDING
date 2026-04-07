/**
 * SWP Scaffolding Reusable Components
 */

const components = {
    header: `
        <nav class="glass-panel">
            <div class="container flex" style="justify-content: space-between; align-items: center; height: var(--nav-height);">
                <a href="/" class="logo flex" style="align-items: center; gap: 10px;">
                    <img src="/assets/images/3d-logo.png" alt="SWP Scaffolding" style="height: 50px;">
                    <div style="font-family: 'Outfit'; font-weight: 900; line-height: 1;">
                        <span style="color: var(--electric-blue); font-size: 1.5rem;">SWP</span><br>
                        <span style="font-size: 0.8rem; letter-spacing: 0.2rem; color: var(--text-muted);">SCAFFOLDING</span>
                    </div>
                </a>
                <ul class="nav-links flex" style="gap: 2rem; align-items: center;">
                    <li><a href="/">Home</a></li>
                    <li class="dropdown">
                        <a href="/domestic-scaffolding">Services ⌄</a>
                    </li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/case-studies">Real Jobs</a></li>
                    <li><a href="/contact" class="btn btn-primary" style="padding: 0.6rem 1.2rem;">Quick Quote</a></li>
                </ul>
            </div>
        </nav>
    `,
    footer: `
        <footer>
            <div class="container section-padding">
                <div class="auto-grid" style="grid-template-columns: 2fr 1fr 1fr 1fr;">
                    <div class="footer-brand">
                        <img src="/assets/images/3d-logo.png" alt="SWP Scaffolding" style="height: 60px; margin-bottom: 1.5rem;">
                        <p style="color: var(--text-muted); margin-bottom: 2rem; max-width: 300px;">
                            Professional scaffolding solutions across London & Surrey. Strength, Precision, and Safety in every build.
                        </p>
                        <div class="social-links flex" style="gap: 1rem;">
                            <!-- Social Icons -->
                        </div>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1.5rem;">Services</h4>
                        <ul style="color: var(--text-muted); display: grid; gap: 0.5rem;">
                            <li><a href="/domestic-scaffolding">Domestic Scaffolding</a></li>
                            <li><a href="/commercial-scaffolding">Commercial Scaffolding</a></li>
                            <li><a href="/industrial-scaffolding">Industrial Scaffolding</a></li>
                            <li><a href="/temporary-roof-scaffolding">Temporary Roofs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1.5rem;">Locations</h4>
                        <ul style="color: var(--text-muted); display: grid; gap: 0.5rem;">
                            <li><a href="/scaffolding-london">London</a></li>
                            <li><a href="/scaffolding-surrey">Surrey</a></li>
                            <li><a href="/scaffolding-croydon">Croydon</a></li>
                            <li><a href="/scaffolding-sutton">Sutton</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="margin-bottom: 1.5rem;">Contact</h4>
                        <ul style="color: var(--text-muted); display: grid; gap: 1rem;">
                            <li><strong style="color: #fff;">HQ:</strong> Mitcham, Surrey</li>
                            <li><strong style="color: #fff;">Phone:</strong> 07904 693259</li>
                            <li><strong style="color: #fff;">Email:</strong> info@swpscaffolding.co.uk</li>
                        </ul>
                    </div>
                </div>
                <div style="border-top: 1px solid var(--glass-border); margin-top: 4rem; padding-top: 2rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
                    &copy; 2026 SWP Scaffolding. Part of the GRACE-X AI™ Lead Engine.
                </div>
            </div>
        </footer>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    const headerEl = document.getElementById('main-header');
    const footerEl = document.getElementById('main-footer');
    
    if (headerEl) headerEl.innerHTML = components.header;
    if (footerEl) footerEl.innerHTML = components.footer;
});
