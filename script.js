/**
 * GESTION DU PANNEAU LATÉRAL (FORMATION)
 */
function openPanel(formation) {
    const panel = document.getElementById("formationPanel");
    const title = document.getElementById("panel-title");
    const content = document.getElementById("panel-content");
    const overlay = document.getElementById("panelOverlay");

    if (formation === "lafayette") {
        title.innerText = "Lycée Polyvalent La Fayette";
        content.innerHTML = `
            <p><strong>Diplôme :</strong> Bac STI2D – SIN</p>
            <p><strong>Année :</strong> 2021 - 2025</p>
            <p><strong>Obtention :</strong> Oui – Mention Assez Bien</p>
            <h3>Objectif de la formation</h3>
            <p>Le parcours STI2D (Sciences et Technologies de l’Industrie et du Développement Durable) est accessible dès la première. En terminale j’ai dû choisir entre plusieurs spécialités, j’ai choisi : SIN (Système d’Information Numérique). Ce parcours “permet d’acquérir des compétences technologiques étendues, transversales à tous les domaines industriels, ainsi que des compétences approfondies dans un champ de spécialité.</p>
            <h3>Pourquoi la STI2D ?</h3>
            <p>J'ai choisi la STI2D car elle offre une approche plus pratique que théorique. Je visais le parcours SIN depuis la seconde ayant un grand intérêt pour l'informatique et surtout l'électronique.</p>
            <h3>Et maintenant ?</h3>
            <p>J'ai obtenu mon baccalauréat mention assez bien avec un lot de connaissances en électronique (Arduino), programmation, en réseaux, en traitement du signal. Mais aussi des connaissances sur le développement durable.</p>
        `;
    } else if (formation === "uca") {
        title.innerText = "IUT Clermont Auvergne";
        content.innerHTML = `
            <p><strong>Diplôme :</strong> BUT Réseaux et Télécommunications</p>
            <p><strong>Année :</strong> 2025 - Présent</p>
            <p><strong>Statut :</strong> 1ère année</p>
            <h3>Objectif de la formation</h3>
            <p>Le BUT Réseaux et Télécommunications est une formation en 3 ans visant à former des techniciens dans le domaines des réseaux informatiques, des télécommunications et de la cybersécurité à partir de la deuxième année.</p>
            <h3>Pourquoi ce BUT ?</h3>
            <p>J'ai choisi ce BUT et cet IUT afin de poursuivre ma formation et développer des compétences techniques dans le domaine de la cybersécurité plus particulièrement. Ce BUT correspond à mon projet d'avenir : exercer un métier dans la <strong>blue team / red team</strong>.</p>
            <h3>Et maintenant ?</h3>
            <p>L'année est toujours en cours, mais je me bats afin de la réussir.</p>
        `;
    }

    panel.classList.add("open");
    overlay.style.display = "block";
}

function closePanel() {
    document.getElementById("formationPanel").classList.remove("open");
    document.getElementById("panelOverlay").style.display = "none";
}

/**
 * GESTION DE LA LIGHTBOX
 */
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}


// --- GESTION DES ONGLETS PRINCIPAUX (Techniques vs Humaines) ---
function switchMainTab(event, type) {
    const sidebar = document.getElementById('sidebar-techniques');
    const allSubContents = document.querySelectorAll('.sub-cat-content');
    const displayZone = document.querySelector('.skills-content-display');
    const contentHumaines = document.getElementById('humaines-content');
    
    // 1. Reset des boutons du haut
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (type === 'humaines') {
        // Mode Humaines : on cache la sidebar et TOUS les contenus techniques
        sidebar.style.display = 'none';
        allSubContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        // On affiche uniquement le bloc des compétences humaines et on l'étire
        contentHumaines.style.display = 'block';
        contentHumaines.classList.add('active');
        if (displayZone) displayZone.style.width = '100%';
    } else {
        // Mode Techniques : on réaffiche la sidebar
        sidebar.style.display = 'flex';
        contentHumaines.style.display = 'none';
        contentHumaines.classList.remove('active');
        
        // On force l'affichage du premier onglet (Réseaux) pour éviter le vide
        showSubCategory('res');
    }
}

// --- GESTION DE LA SIDEBAR (Switch entre Réseaux, Programmation, etc.) ---
function showSubCategory(id) {
    // 1. On cache ABSOLUMENT tous les blocs de contenu
    const allSubContents = document.querySelectorAll('.sub-cat-content');
    allSubContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });

    // 2. On retire l'état actif de tous les boutons de la sidebar
    document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('active'));

    // 3. On affiche SEULEMENT celui qu'on a sélectionné
    const targetContent = document.getElementById(id);
    if (targetContent) {
        targetContent.style.display = 'block';
        targetContent.classList.add('active');
    }

    // 4. On met en surbrillance le bouton cliqué
    const activeBtn = Array.from(document.querySelectorAll('.side-btn')).find(btn => btn.getAttribute('onclick').includes(id));
    if (activeBtn) activeBtn.classList.add('active');
}

// --- GESTION DES ACCORDÉONS ---
function toggleAcc(header) {
    const item = header.parentElement;
    const isOpen = item.classList.contains('open');
    
    // On ferme les autres accordéons du MÊME bloc pour que ce soit propre
    const parentBlock = item.closest('.sub-cat-content');
    parentBlock.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
    
    // Si il n'était pas ouvert, on l'ouvre
    if (!isOpen) {
        item.classList.add('open');
    }
}


// --- GESTION DES FENÊTRES MODALES PROJETS ---
function openProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        // Empêche le défilement de la page en arrière-plan
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Rétablit le défilement de la page
        document.body.style.overflow = 'auto';
    }
}

// Fermer la modale si on clique à l'extérieur du contenu
window.onclick = function(event) {
    const modals = document.querySelectorAll('.project-modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeProjectModal(modal.id);
        }
    });
}