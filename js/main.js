document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects('all');
    renderExperience();
    setupFilters();
    setupSmoothScroll();
});

// Render Skills
function renderSkills() {
    const webContainer = document.getElementById('web-skills');
    const dataContainer = document.getElementById('data-skills');

    skills.web.forEach(skill => {
        webContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
    });

    skills.data.forEach(skill => {
        dataContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
    });
}

// Render Projects
function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'glass-card project-card';
        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link">
                        <i data-lucide="github" width="16"></i> Code
                    </a>
                    ${project.demo !== '#' ? `
                    <a href="${project.demo}" target="_blank" class="project-link">
                        <i data-lucide="external-link" width="16"></i> Demo
                    </a>` : ''}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Re-initialize icons for new elements
    lucide.createIcons();
}

// Render Experience & Education
function renderExperience() {
    const container = document.querySelector('.experience-timeline');
    container.innerHTML = ''; // Clear existing content

    // Experience Section
    const expTitle = document.createElement('h3');
    expTitle.className = 'timeline-title';
    expTitle.innerHTML = '<i data-lucide="briefcase"></i> Experience';
    expTitle.style.cssText = 'color: var(--text-primary); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; font-size: 1.2rem;';
    container.appendChild(expTitle);

    experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'glass-card';
        item.style.marginBottom = '1.5rem';
        item.style.padding = '1.5rem';
        item.innerHTML = `
            <h3 style="color: var(--accent-primary); margin-bottom: 0.5rem;">${exp.role}</h3>
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">${exp.company} | <span style="font-size: 0.9rem; color: var(--text-secondary);">${exp.period}</span></h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">${exp.desc}</p>
        `;
        container.appendChild(item);
    });

    // Education Section
    const eduTitle = document.createElement('h3');
    eduTitle.className = 'timeline-title';
    eduTitle.innerHTML = '<i data-lucide="graduation-cap"></i> Education';
    eduTitle.style.cssText = 'color: var(--text-primary); margin: 2rem 0 1.5rem 0; display: flex; align-items: center; gap: 10px; font-size: 1.2rem;';
    container.appendChild(eduTitle);

    education.forEach(edu => {
        const item = document.createElement('div');
        item.className = 'glass-card';
        item.style.marginBottom = '1.5rem';
        item.style.padding = '1.5rem';
        item.innerHTML = `
            <h3 style="color: var(--accent-secondary); margin-bottom: 0.5rem;">${edu.degree}</h3>
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">${edu.school} | <span style="font-size: 0.9rem; color: var(--text-secondary);">${edu.period}</span></h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">${edu.desc}</p>
        `;
        container.appendChild(item);
    });
}

// Setup Filters
function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            buttons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Render
            renderProjects(btn.dataset.filter);
        });
    });
}

// Smooth Scroll for Navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
