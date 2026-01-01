const resourcesData = [
    {
        id: 1,
        title: "Free Clinic Directory",
        category: "medical",
        description: "Find free and charitable clinics in your local area for primary care services.",
        link: "#",

        tags: ["clinic", "doctor", "free", "primary care"]
    },
    {
        id: 2,
        title: "Pet Food Pantry Network",
        category: "veterinary",
        description: "Distribution centers providing free pet food and supplies to owners in financial need.",
        link: "#",

        tags: ["food", "supplies", "assistance", "dog", "cat"]
    },
    {
        id: 3,
        title: "Medication Assistance Program",
        category: "medical",
        description: "Financial aid for prescription medications for low-income individuals.",
        link: "#",

        tags: ["rx", "medicine", "pharmacy", "grant"]
    },
    {
        id: 4,
        title: "Emergency Vet Fund",
        category: "veterinary",
        description: "Grants for emergency veterinary surgery and critical care procedures.",
        link: "#",

        tags: ["emergency", "surgery", "trauma", "grant"]
    },
    {
        id: 5,
        title: "Telehealth Access Point",
        category: "medical",
        description: "Connect with doctors via video call for non-emergency medical advice.",
        link: "#",

        tags: ["remote", "video", "consultation"]
    },
    {
        id: 6,
        title: "Low-Cost Spay/Neuter",
        category: "veterinary",
        description: "Affordable sterilization services to help control the pet population.",
        link: "#",

        tags: ["surgery", "population", "cats", "dogs"]
    },
    {
        id: 7,
        title: "Depression Support Guide",
        category: "mental",
        description: "Understand symptoms, warning signs, and find hope. You are not alone.",
        link: "https://www.helpguide.org/articles/depression/depression-symptoms-and-warning-signs.htm",

        tags: ["depression", "sadness", "mental", "suicide prevention"]
    },
    {
        id: 8,
        title: "Stress Management Tools",
        category: "mental",
        description: "Techniques to deal with overwhelming stress, burnout, and financial worries.",
        link: "https://www.helpguide.org/articles/stress/stress-management.htm",

        tags: ["stress", "anxiety", "burnout", "work"]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Shared Mobile Nav Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll (shared)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Resource Logic
    const resourcesGrid = document.getElementById('resourcesGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    if (resourcesGrid) {
        let currentCategory = 'all';
        let currentSearch = '';

        function renderResources() {
            resourcesGrid.innerHTML = '';

            const filtered = resourcesData.filter(item => {
                const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
                const searchLower = currentSearch.toLowerCase();
                const matchesSearch = item.title.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower) ||
                    item.tags.some(tag => tag.toLowerCase().includes(searchLower));

                return matchesCategory && matchesSearch;
            });

            if (filtered.length === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
                filtered.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    // Animation
                    card.style.animation = 'fadeInUp 0.5s ease forwards';

                    let icon = '❓';
                    if (item.category === 'medical') icon = '🏥';
                    if (item.category === 'veterinary') icon = '🐾';
                    if (item.category === 'mental') icon = '🧠';

                    card.innerHTML = `
                        <a href="${item.link}" target="_blank" style="text-decoration: none;">
                            <h3 style="color: var(--primary-color); margin-bottom: 0.5rem; transition: color 0.3s;" onmouseover="this.style.color='var(--accent-color)'" onmouseout="this.style.color='var(--primary-color)'">${icon} ${item.title}</h3>
                        </a>
                        <span style="display:inline-block; font-size:0.8rem; background:#f0f0f0; padding:2px 8px; border-radius:4px; margin-bottom:1rem; text-transform:uppercase; letter-spacing:1px; color:#666;">${item.category}</span>
                        <p style="margin-bottom: 1rem; color: #555;">${item.description}</p>
                        <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid #eee;">
                             
                        </div>
                    `;
                    resourcesGrid.appendChild(card);
                });
            }
        }

        // Init
        renderResources();

        // Search Event
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderResources();
        });

        // Filter Events
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update UI
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Logic
                currentCategory = btn.getAttribute('data-category');
                renderResources();
            });
        });
    }
});
