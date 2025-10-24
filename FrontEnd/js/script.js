let allPetitions = []; 
let petitiomMaxSignatures = [];
let signatureCounts = {};
let currentSortOrder = 'DESC'; 
let searchQuery = '';
let visibleCount = 9; 
const PETITIONS_PER_PAGE = 6;
const nbrOfSignature = 5;
let dataPetition = null; 
let LastestSignatures = null;
let IDP = -1;
let currentDate = new Date().toDateString();
let totalNbSignatures = 0;
let totalNbPititions = 0;

// Custom Alert Function
function showCustomAlert(message, type = 'success', duration = 3500) {
    const alertTypes = {
        success: {
            bgGradient: 'linear-gradient(135deg, #24e169ff 0%, #24e169ff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" opacity="0.2" fill="currentColor"/>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            title: 'Success'
        },
        newSign: {
            bgGradient: 'linear-gradient(135deg, #b274ecff 0%, #b274ecff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" opacity="0.2" fill="currentColor"/>
                <path d="M12 20h9" stroke-linecap="round"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            title: 'New Signature'
        },
        newPetition: {
            bgGradient: 'linear-gradient(135deg, #53baeaff 0%, #53baeaff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" opacity="0.2" fill="currentColor"/>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14 2 14 8 20 8" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="18" x2="12" y2="12" stroke-linecap="round"/>
                <line x1="9" y1="15" x2="15" y2="15" stroke-linecap="round"/>
            </svg>`,
            title: 'New Petition'
        },
        newMaxPetition: {
            bgGradient: 'linear-gradient(135deg, #f07837ff 0%, #f07837ff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0; animation: pulse-scale 2s ease-in-out infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" opacity="0.2" fill="currentColor"/>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            title: 'Trending Update'
        },
        error: {
            bgGradient: 'linear-gradient(135deg, #f0556fff 0%, #f0556fff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            title: 'Error'
        },
        info: {
            bgGradient: 'linear-gradient(135deg, #669ffcff 0%, #669ffcff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" opacity="0.2" fill="currentColor"/>
                <line x1="12" y1="16" x2="12" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="8" x2="12.01" y2="8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
            title: 'Information'
        }
    };

    const config = alertTypes[type] || alertTypes.info;

    // Create or get container
    let alertContainer = document.getElementById('custom-alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'custom-alert-container';
        alertContainer.className = 'custom-alert-container';
        document.body.appendChild(alertContainer);
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.style.background = config.bgGradient;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.setAttribute('aria-live', 'polite');

    // Create and style the progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.4);
        width: 100%;
        transform-origin: left;
        animation: progress-bar ${duration}ms linear;
    `;
    progressBar.className = 'alert-progress-bar';
    progressBar.style.background = 'rgba(255, 255, 255, 0.4)';
    progressBar.style.animation = `alert-progress ${duration}ms linear`;

    alertDiv.innerHTML = `
        <div class="custom-alert-icon">${config.icon}</div>
        <div style="flex: 1;">
            <p style="margin: 0; font-size: 13px; font-weight: 600; opacity: 0.95; margin-bottom: 2px;">${config.title}</p>
            <p class="custom-alert-message" style="font-size: 14px; font-weight: 400; opacity: 0.9;">${message}</p>
            <p class="custom-alert-message" style="font-size: 14px; font-weight: 400; color: white; opacity: 0.9;">${message}</p>
        </div>
        <button class="custom-alert-close-btn" aria-label="Close notification">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    alertDiv.querySelector('.custom-alert-close-btn').style.color = 'white';
    alertDiv.appendChild(progressBar);
    alertContainer.prepend(alertDiv);
    updateAlertStack();

    let autoDismissTimer;
    let progressPaused = false;

    const startTimer = () => {
        autoDismissTimer = setTimeout(closeAlert, duration);
        if (!progressPaused) {
            progressBar.style.animationPlayState = 'running';
        }
    };

    const stopTimer = () => {
        clearTimeout(autoDismissTimer);
        progressBar.style.animationPlayState = 'paused';
        progressPaused = true;
    };

    const closeAlert = () => {
        stopTimer();
        alertDiv.classList.add('exiting');
        setTimeout(() => {
            alertDiv.remove();
            updateAlertStack();
            if (alertContainer.children.length === 0) {
                alertContainer.remove();
            }
        }, 300);
    };

    function updateAlertStack() {
        const alerts = Array.from(alertContainer.children);
        // The new CSS handles stacking via flexbox, so we just need to
        // ensure only the top one is interactive if we were to stack them visually.
        // Since they are in a column, all are interactive. This function can be simplified or removed.
        alerts.forEach((alert, index) => {
            alert.style.transform = `translateY(${index * 12}px) scale(${1 - index * 0.05})`;
            alert.style.zIndex = 100 - index;
            alert.style.opacity = index < 3 ? (1 - index * 0.2) : 0;
            alert.style.pointerEvents = index === 0 ? 'auto' : 'none';
        });
    }

    // Event listeners
    alertDiv.addEventListener('mouseenter', stopTimer);
    alertDiv.addEventListener('mouseleave', () => {
        progressPaused = false;
        startTimer();
    });
    alertDiv.querySelector('.custom-alert-close-btn').addEventListener('click', closeAlert);

    // Add click to dismiss on the alert itself (except close button)
    alertDiv.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-alert-close-btn')) {
            closeAlert();
        }
    });

    startTimer();
}
// Add keyframe animation for progress bar
if (!document.querySelector('#alert-progress-animation')) {
    const style = document.createElement('style');
    style.id = 'alert-progress-animation';
    style.textContent = `
        @keyframes progress-bar {
            from { transform: scaleX(1); }
            to { transform: scaleX(0); }
        }
        @keyframes pulse-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

async function toggleSearch() {
    const searchBar = document.getElementById('search-bar');
    const searchIcon = document.getElementById('search-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (searchBar.classList.contains('hidden')) {
        searchBar.classList.remove('hidden');
        searchIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        searchBar.classList.add('hidden');
        searchIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.getElementById('search-input').value = '';
        searchQuery = ''; 
        renderMaxPetition();
        renderPetitions(); 
    }
}

function renderMaxPetition() {
    const section = document.getElementById('max-petitions-section');
    const container = document.getElementById('max-petitions-signatures-container');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    container.innerHTML = ''; 
    
    if (searchQuery || !petitiomMaxSignatures || petitiomMaxSignatures.length === 0) {
        section.classList.add('hidden');
        return;
    }
    
    section.classList.remove('hidden');
    petitiomMaxSignatures.forEach(petition => {
        const cardHTML = createMaxPetitionCard(petition); // Use the new function
        container.innerHTML += cardHTML;
    });

    // --- Scroll functionality ---
    const scrollAmount = 374; // Card width (350) + gap (24)

    const checkScroll = () => {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        scrollLeftBtn.classList.toggle('hidden', container.scrollLeft <= 0);
        scrollRightBtn.classList.toggle('hidden', container.scrollLeft >= maxScrollLeft - 1);
    };

    scrollLeftBtn.onclick = () => container.scrollBy(-scrollAmount, 0);
    scrollRightBtn.onclick = () => container.scrollBy(scrollAmount, 0);
    container.addEventListener('scroll', checkScroll);

    // Initial check
    checkScroll();
}

function createMaxPetitionCard(petition) {
    const sigCount = signatureCounts[petition.IDP] || 0;
    const createdDate = new Date(petition.DateAjoutP).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const endDate = new Date(petition.DateFinP);
    const today = new Date();
    const isEnded = today > endDate;
    let daysLeftText = '';
    if (isEnded) {
        daysLeftText = 'Ended';
    } else {
        const diffTime = Math.abs(endDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        daysLeftText = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;
    }
    return `
        <div class="card max-petition-card" onclick="showForm(${petition.IDP})">
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <p class="text-sm text-muted-foreground">Created: ${createdDate}</p>
                    <span class="badge badge-trending">Trending</span>
                </div>
                <h3 class="text-lg font-semibold leading-tight mb-2">${petition.TitreP}</h3>
                <p class="text-sm text-muted-foreground">${petition.DescriptionP.substring(0, 80)}...</p>
            </div>
            <div class="px-6 pb-6 space-y-3">
                <div class="flex items-center justify-between text-sm">
                    <span class="font-semibold">${sigCount.toLocaleString()} signatures</span>
                    <span class="text-muted-foreground">${daysLeftText}</span>
                </div>
                <button class="btn btn-primary w-full" onclick="event.stopPropagation(); showForm(${petition.IDP});">
                    ${isEnded ? 'View Petition' : 'View & Sign'}
                </button>
            </div>
        </div>
    `;
}

function renderPetitions() {
    const noResults = document.getElementById('no-results');
    const container = document.getElementById('petitions-container');
    container.innerHTML = ''; 
    noResults.classList.add('hidden');

    let filteredPetitions = allPetitions;
    if (searchQuery) {
        filteredPetitions = allPetitions.filter(petition => {
            const title = petition.TitreP.toLowerCase();
            const author = petition.NomPorteurP.toLowerCase();
            return title.includes(searchQuery) || author.includes(searchQuery);
        });
    }

    if (filteredPetitions.length === 0) {
        noResults.classList.remove('hidden');
        document.getElementById('show-more-container').classList.add('hidden');
        return; 
    }

    if (currentSortOrder === 'DESC') {
        filteredPetitions.sort((a, b) => new Date(b.DateAjoutP) - new Date(a.DateAjoutP));
    } else {
        filteredPetitions.sort((a, b) => new Date(a.DateAjoutP) - new Date(b.DateAjoutP));
    }

    const petitionsToDisplay = filteredPetitions.slice(0, visibleCount);

    petitionsToDisplay.forEach(petition => {
        const cardHTML = createPetitionCard(petition);
        container.innerHTML += cardHTML;
    });

    const showMoreContainer = document.getElementById('show-more-container');
    if (visibleCount < filteredPetitions.length) {
        showMoreContainer.classList.remove('hidden');
    } else {
        showMoreContainer.classList.add('hidden');
    }
}

function toggleSort() {
    
    currentSortOrder = (currentSortOrder === 'DESC') ? 'ASC' : 'DESC';

    const sortLabel = document.getElementById('sort-label');
    sortLabel.textContent = (currentSortOrder === 'DESC') ? 'Newest First' : 'Oldest First';

    renderPetitions();
}

function filterPetitions() {
    searchQuery = document.getElementById('search-input').value.toLowerCase();
    renderMaxPetition();
    renderPetitions();
}

function showMore() {
    const container = document.getElementById('petitions-container');
    const currentCount = visibleCount;
    visibleCount += PETITIONS_PER_PAGE;

    const newPetitions = allPetitions.slice(currentCount, visibleCount);

    newPetitions.forEach(petition => {
        const cardHTML = createPetitionCard(petition);
        container.innerHTML += cardHTML;
    });

    const showMoreContainer = document.getElementById('show-more-container');
    if (visibleCount >= allPetitions.length) {
        showMoreContainer.classList.add('hidden');
    }
}

function createPetitionCard(petition) {
    const sigCount = signatureCounts[petition.IDP] || 0;
    const createdDate = new Date(petition.DateAjoutP).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const endDate = new Date(petition.DateFinP);
    const today = new Date();
    const isEnded = today > endDate;
    let daysLeftText = '';
    if (isEnded) {
        daysLeftText = 'Ended';
    } else {
        const diffTime = Math.abs(endDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            daysLeftText = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;
    }

    return `
        <div class="bg-card text-card-foreground border border-border rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
            <div class="p-6">
                <p class="text-sm text-muted-foreground">Created on: ${createdDate}</p><br/>
                <h3 class="text-lg leading-none mb-2">${petition.TitreP}</h3>
                <p class="text-sm text-muted-foreground">${petition.DescriptionP.substring(0, 100)}</p>
            </div>
            <div class="px-6 pb-6 space-y-4">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-2">
                            <svg class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <span>${sigCount} signatures</span>
                        </div>
                    </div>
                    <div class="w-full bg-muted rounded-full h-2"><div class="bg-primary h-2 rounded-full transition-all" style="width: 0%"></div></div>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-muted-foreground">by ${petition.NomPorteurP}</p>
                    <p class="text-muted-foreground">${daysLeftText}</p>
                </div>
            </div>
            <div class="px-6 pb-6">
                <button class="btn btn-primary w-full" onclick="showForm(${petition.IDP})">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    ${isEnded ? 'View Petition' : 'View & Sign'}
                </button>
            </div>
        </div>
    `;
}

async function showForm(idF){
    const modalOverlay = document.getElementById('petition-modal');
    modalOverlay.innerHTML = '';
    modalOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open'); // Disable background scroll
    IDP = idF ;
    try {
        await selectPetition(IDP) ;
        await selectSignaturPetition(IDP);
        if (dataPetition == null ) {
            modalOverlay.innerHTML = `<div class="modal-content"><p>Error: Petition not found.</p><button class="modal-close" onclick="closeModal()">X</button></div>`;
            return;
        }
        const endDate = new Date(dataPetition.DateFinP);
        const today = new Date();
        const isEnded = today > endDate;
        let daysLeftText = '';
        if (isEnded) {
            daysLeftText = 'Ended';
        } else {
            const diffTime = Math.abs(endDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            daysLeftText = `${diffDays} ${diffDays === 1 ? 'day' : 'days'} left`;
        }

        let signaturesHTML = '';
        if (LastestSignatures && LastestSignatures.length > 0) {
            const nbr = Math.min(nbrOfSignature, LastestSignatures.length);
            for (i = 0 ; i < nbr ; i++){
                signaturesHTML += createSignatureHTML(LastestSignatures[i]);
            }
            } else {
            signaturesHTML = '<p class="text-muted-foreground text-center py-4">Be the first to sign!</p>';
        }

        modalOverlay.innerHTML = `
        <div class="modal-content">
            <!-- Sticky Header -->
            <div class="modal-header">
                <h1 class="text-2xl font-bold">${dataPetition.TitreP}</h1>
                <button class="modal-close" onclick="closeModal()">
                    <svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <!-- Scrollable Body -->
            <div class="modal-body">
                <div class="space-y-6">
                    <!-- Petition Description -->
                    <p class="text-lg text-muted-foreground">${dataPetition.DescriptionP}</p>

                    <!-- Key Details Section -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b py-4" style="border-color: var(--border);">
                        <div class="flex items-center gap-2">
                            <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <p><span class="font-semibold">Created:</span> ${new Date(dataPetition.DateAjoutP).toLocaleDateString()}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="icon" viewBox="0 0 24 24"><path d="M8 2v4"></path><path d="M16 2v4"></path><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"></path><path d="M19 16v6"></path><path d="M22 19h-6"></path></svg>
                            <p><span class="font-semibold">Ends:</span> ${new Date(dataPetition.DateFinP).toLocaleDateString()} (${daysLeftText})</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="icon" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <p><span class="font-semibold">Author:</span> ${dataPetition.NomPorteurP}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <a href="mailto:${dataPetition.Email}" class="text-blue-600 hover:underline">${dataPetition.Email}</a>
                        </div>
                    </div>

                    <!-- Signature Count & Progress -->
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <p class="text-lg font-bold">Signatures: <span id="count">${dataPetition.sigCount}</span></p>
                            <!-- If you have a target, you can add it here -->
                            <!-- <p class="text-muted-foreground">Target: 10,000</p> -->
                        </div>
                        
                    </div>

                    <!-- Latest Signatures Section -->
                    <div id = "lastSignatures" "class="border-t pt-4 mt-6" style="border-color: var(--border);">
                        <h2 class="text-xl font-bold mb-2">Latest Signatures</h2>
                        ${signaturesHTML}
                    </div>

                    <!-- Sign Petition Button -->
                    <div id='signaturFormButton' class="text-center mt-6 ${isEnded ? 'hidden' : ''}">
                        <button class="btn btn-primary text-lg px-6 py-3" onclick="showSignaturForm()">Sign the Petition</button>
                    </div>

                    <!-- Signature Form (hidden by default) -->
                    <div id ="SignaturForm" class="border-t pt-6 mt-6 hidden ${isEnded ? 'hidden' : ''}" style="border-color: var(--border);">
                        <h2 class="text-2xl font-bold text-center mb-4">Add Your Signature</h2>
                        <p class="text-muted-foreground text-center mb-6">Fill out the form below to add your signature and support this cause.</p>
                        <form id = 'signatureForm' action="../BackEnd/signPetition.php" method="POST" class="flex flex-col gap-4">
                            <input type="hidden" name="idp" value="${dataPetition.IDP}">
                                <div>
                                    <label for="prenom" class="font-bold mb-2 block text-left">First Name:</label>
                                    <input type="text" id="prenom" name="prenom" class="input w-full" placeholder="Enter your first name" required>
                                </div>
                                <div>
                                    <label for="nom" class="font-bold mb-2 block text-left">Last Name:</label>
                                    <input type="text" id="nom" name="nom" class="input w-full" placeholder="Enter your last name" required>
                                </div>
                                <div>
                                    <label for="email" class="font-bold mb-2 block text-left">Email Address:</label>
                                    <input type="email" id="email" name="email" class="input w-full" placeholder="Enter your email address" required>
                                </div>
                                <div>
                                    <label for="country" class="font-bold mb-2 block text-left">Country:</label>
                                <select id="country" name="country" class="input w-full" required>
                                    <option value="" disabled selected>Select your country</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</-option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="North Korea">North Korea</option>
                                    <option value="Norway">Norway</option>
                                </select>
                            </div>
                            <div class="flex justify-center">
                                <div class="g-recaptcha" data-sitekey="6LdABvUrAAAAALrMMwz9DRQX3-5VdVRopKa8y4C2"></div>
                            </div>
                            <button type="submit" class="btn btn-primary">Sign the Petition</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        `;
    } catch (error) {
        console.error('Failed to load petition:', error);
        modalOverlay.innerHTML = `<div class="modal-content"><p>Could not load petition details. Please try again later.</p><button class="modal-close" onclick="closeModal()">X</button></div>`;
    }
}

function showSignaturForm(){
    const signatureForm = document.getElementById('SignaturForm');
    const signaturFormButton = document.getElementById('signaturFormButton');
    signatureForm.classList.remove('hidden');
    signatureForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Scroll to the form
    signaturFormButton.classList.add('hidden');
}

function showCreatePetitionForm() {
    const modalOverlay = document.getElementById('petition-modal');
    modalOverlay.innerHTML = '';
    modalOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <!-- Sticky Header -->
            <div class="modal-header">
                <h1 class="text-2xl font-bold">Create New Petition</h1>
                <button class="modal-close" onclick="closeModal()">
                    <svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <!-- Scrollable Body -->
            <div class="modal-body">
                <div class="space-y-6">
                    <p class="text-muted-foreground text-center">Fill out the form below to create your petition and make your voice heard.</p>
                    
                    <form id="createPetitionForm" action="../BackEnd/createPetition.php" method="POST" class="flex flex-col gap-4">
                        <div>
                            <label for="titre" class="font-bold mb-2 block text-left">Petition Title:</label>
                            <input type="text" id="titre" name="titre" class="input w-full" placeholder="Enter petition title" required>
                        </div>
                        
                        <div>
                            <label for="description" class="font-bold mb-2 block text-left">Description:</label>
                            <textarea id="description" name="description" class="input w-full" rows="6" placeholder="Describe your petition and why it matters..." required></textarea>
                        </div>
                        
                        <div>
                            <label for="nomPorteur" class="font-bold mb-2 block text-left">Your Name:</label>
                            <input type="text" id="nomPorteur" name="nomPorteur" class="input w-full" placeholder="Enter your full name" required>
                        </div>
                        
                        <div>
                            <label for="emailPorteur" class="font-bold mb-2 block text-left">Your Email:</label>
                            <input type="email" id="emailPorteur" name="emailPorteur" class="input w-full" placeholder="Enter your email address" required>
                        </div>
                        
                        <div>
                            <label for="dateFin" class="font-bold mb-2 block text-left">End Date:</label>
                            <input type="date" id="dateFin" name="dateFin" class="input w-full" required>
                        </div>
                        <div class="flex justify-center">
                            <div class="g-recaptcha" data-sitekey="6LdABvUrAAAAALrMMwz9DRQX3-5VdVRopKa8y4C2"></div>
                        </div>                        
                        <button type="submit" class="btn btn-primary">Create Petition</button>
                    </form>
                </div>
            </div>
        </div>
    `;

}

function createSignatureHTML(signature) {
    const signatureDate = new Date(signature.DateS).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `
        <div class="signature-item flex items-center gap-4 py-3">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                ${signature.PrenomS.charAt(0)}${signature.NomS.charAt(0)}
            </div>
            <div>
                <p class="font-semibold">${signature.PrenomS} ${signature.NomS.charAt(0)}.</p>
                <p class="text-sm text-muted-foreground">from ${signature.PaysS} on ${signatureDate}</p>
            </div>
        </div>`;
}

function addSignatureToList(newSignatureData) {
    const signaturesContainer = document.getElementById('lastSignatures');
    if (!signaturesContainer) return;

    const firstSignMessage = signaturesContainer.querySelector('p');
    if (firstSignMessage && firstSignMessage.textContent.includes('first to sign')) {
        firstSignMessage.classList.add('hidden');
    }
    
    // Find the h2 heading
    const heading = signaturesContainer.querySelector('h2');
    
    // Create the signature HTML
    const signatureHTML = createSignatureHTML(newSignatureData);
    
    // Find the first signature item (div with class signature-item)
    const firstSignature = signaturesContainer.querySelector('.signature-item');
    
    if (firstSignature) {
        // Insert before the first signature using insertAdjacentHTML
        firstSignature.insertAdjacentHTML('beforebegin', signatureHTML);
    } else if (heading) {
        // No signatures yet, insert after heading
        heading.insertAdjacentHTML('afterend', signatureHTML);
    } else {
        // Fallback
        signaturesContainer.insertAdjacentHTML('beforeend', signatureHTML);
    }
    
    // Remove the last signature if we exceed the limit
    const allSignatures = signaturesContainer.querySelectorAll('.signature-item');
    if (allSignatures.length > nbrOfSignature) {
        allSignatures[allSignatures.length - 1].remove();
    }
    
    // Update the signature count
    const countElement = document.getElementById('count');
    if (countElement) {
        const currentCount = parseInt(countElement.textContent) || 0;
        countElement.textContent = currentCount + 1;
    }
}

async function getAllpertitions(){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();   

        xhr.open('GET', '../BackEnd/apiPetition.php', true);

        xhr.onload = function() {
            if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                allPetitions = data.petitions ;
                signatureCounts = data.signatures ;
                petitiomMaxSignatures = data.maxPetitionSignatur ;
                resolve(data);
            } catch (error) {
                console.error('Failed to parse initial JSON data:', error);
            }
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
        };
        xhr.onerror = function() {
            console.error('A network error occurred.');
        };
        
        xhr.send();
    }); 
}

async function selectSignaturPetition(idp) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../BackEnd/apiInfoPetitonSignatur.php?id=' + idp, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    // Handle empty or null responses from PHP
                    if (!xhr.responseText || xhr.responseText === 'null') {
                        LastestSignatures = null;
                        resolve(null);
                        return;
                    }
                    const data = JSON.parse(xhr.responseText);
                    LastestSignatures = data;
                    resolve(data); // to inform that i finished to return to continue executing 
                } catch (error) {
                    reject(new Error('Failed to parse JSON for petition: ' + error.message));
                }
            } else {
                reject(new Error('Request failed. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function() {
            reject(new Error('A network error occurred.'));
        };
        xhr.send();
    });
}

async function selectPetition(idp) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../BackEnd/apiInfoPetition.php?id=' + idp, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    // Handle empty or null responses from PHP
                    if (!xhr.responseText || xhr.responseText === 'null') {
                        dataPetition = null;
                        resolve(null);
                        return;
                    }
                    const data = JSON.parse(xhr.responseText);
                    dataPetition = data;
                    resolve(data); // to inform that i finished to return to continue executing 
                } catch (error) {
                    reject(new Error('Failed to parse JSON for petition: ' + error.message));
                }
            } else {
                reject(new Error('Request failed. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function() {
            reject(new Error('A network error occurred.'));
        };
        xhr.send();
    });
}

async function selectNbrSignaturs() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../BackEnd/apiInfoPetitonSignatur.php?id=' + 0 , true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    // Handle empty or null responses from PHP
                    if (!xhr.responseText || xhr.responseText === 'null') {
                        totalNbSignatures = null;
                        resolve(null);
                        return;
                    }
                    const data = JSON.parse(xhr.responseText);
                    totalNbSignatures = data;
                    resolve(data); // to inform that i finished to return to continue executing 
                } catch (error) {
                    reject(new Error('Failed to parse JSON for petition: ' + error.message));
                }
            } else {
                reject(new Error('Request failed. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function() {
            reject(new Error('A network error occurred.'));
        };
        xhr.send();
    });
}
    
async function selctNbrPetition() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../BackEnd/apiInfoPetition.php?id=' + 0 , true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    // Handle empty or null responses from PHP
                    if (!xhr.responseText || xhr.responseText === 'null') {
                        totalNbPititions = null;
                        resolve(null);
                        return;
                    }
                    const data = JSON.parse(xhr.responseText);
                    totalNbPititions = data;
                    resolve(data); // to inform that i finished to return to continue executing 
                } catch (error) {
                    reject(new Error('Failed to parse JSON for petition: ' + error.message));
                }
            } else {
                reject(new Error('Request failed. Status: ' + xhr.status));
            }
        };

        xhr.onerror = function() {
            reject(new Error('A network error occurred.'));
        };
        xhr.send();
    });
}

function updateSignatures(pastNbrSignatures){
    diff = LastestSignatures.length -pastNbrSignatures ;
    if(diff < 5){
        for (i = diff -1 ; i >= 0  ; i--){
            addSignatureToList(LastestSignatures[i]);
            showCustomAlert(`${LastestSignatures[i].PrenomS} ${LastestSignatures[i].NomS} has added a new signature added to this petition!`, 'newSign')
        }
    }else {
        for (i = 5 ; i >= 0  ; i--){
            addSignatureToList(LastestSignatures[i]);
            showCustomAlert(`${LastestSignatures[i].PrenomS} ${LastestSignatures[i].NomS} has added a new signature added to this petition!`, 'newSign')
        }
    }
    
}

setInterval(async () => {
    const newDate = new Date().toDateString();
    if(IDP != -1){
        const previousLength = LastestSignatures ? LastestSignatures.length : 0;
        await selectSignaturPetition(IDP);
        if(LastestSignatures && LastestSignatures.length > previousLength){
            updateSignatures(previousLength);
        }
    }else if (newDate != currentDate) {
        currentDate = newDate;
        await getAllpertitions();
        renderPetitions();
        renderMaxPetition();
    }else {
        const currentNBSign = totalNbSignatures;
        const cuurentNbsPetition = totalNbPititions ;
        const maxPetitions = petitiomMaxSignatures ;
        const currentSingCount = signatureCounts ;
        await selectNbrSignaturs();
        await selctNbrPetition();

        if(totalNbSignatures > currentNBSign){
            await getAllpertitions();

            if(currentSingCount[maxPetitions[0].IDP] != signatureCounts[petitiomMaxSignatures[0].IDP] || maxPetitions.length != petitiomMaxSignatures.length){
                showCustomAlert("The Petitions with max nember of signatures has updated !!","newMaxPetition");
                renderMaxPetition();
            }
            if(cuurentNbsPetition < totalNbPititions ){
                const diff = totalNbPititions-cuurentNbsPetition ;
                const name = diff == 1 ? 'petition' : 'petitions';
                
                showCustomAlert(`New ${name} ${diff === 1 ? 'has' : 'have'} been added!`,'newPetition');
            }
            renderPetitions();
            
        }else if (totalNbPititions > cuurentNbsPetition){
            const diff = totalNbPititions-cuurentNbsPetition ;
            const name = diff == 1 ? 'petition' : 'petitions';
                  
            showCustomAlert(`New ${name} ${diff === 1 ? 'has' : 'have'} been added!`,'newPetition');
            await getAllpertitions();
            renderPetitions();
            if(cuurentNbsPetition == 0 ){
                showCustomAlert("The Petitions with max nember of signatures has updated !!","newMaxPetition");
                renderMaxPetition();
            } 
        }else if (totalNbPititions < cuurentNbsPetition){
            const diff = cuurentNbsPetition-totalNbPititions ;
            const name = diff == 1 ? 'petition' : 'petitions';
                  
            showCustomAlert(`A ${name} ${diff === 1 ? 'has' : 'have'} been deleted!`,'erreur');
            await getAllpertitions();
            renderPetitions();
            if(cuurentNbsPetition == 0 ){
                showCustomAlert("The Petitions with max nember of signatures has updated !!","newMaxPetition");
                renderMaxPetition();
            }
        } 
    }
    
}, 1000);

function closeModal() {
    const modalOverlay = document.getElementById('petition-modal');
    modalOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open'); // Re-enable background scroll
    dataPetition = null ;
    LastestSignatures = null ;
    IDP = -1 ;
}

async function checkLoginStatus() {
    try {
        const response = await fetch('../BackEnd/apiCheckSession.php');
        const data = await response.json();

        const loginButton = document.getElementById('login-button-nav');
        const userDisplay = document.getElementById('user-display');
        const userName = document.getElementById('user-name');
        const createPetitionBtn = document.querySelector('button[onclick="showCreatePetitionForm()"]');

        if (data.loggedIn) {
            loginButton.classList.add('hidden');
            userDisplay.classList.remove('hidden');
            userName.textContent = data.name;
            createPetitionBtn.classList.remove('hidden');
        } else {
            loginButton.classList.remove('hidden');
            userDisplay.classList.add('hidden');
            // Hide create petition button if not logged in
            createPetitionBtn.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
}

async function logout() {
    await fetch('../BackEnd/apiLogout.php');
    // Update UI immediately
    document.getElementById('login-button-nav').classList.remove('hidden');
    document.getElementById('user-display').classList.add('hidden');
    document.querySelector('button[onclick="showCreatePetitionForm()"]').classList.add('hidden');
    showCustomAlert('You have been logged out.', 'info');
}


// --- INITIALIZATION ---
// This code runs when the page has finished loading.
document.addEventListener('DOMContentLoaded', async () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '../BackEnd/apiPetition.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                allPetitions = data.petitions ;
                signatureCounts = data.signatures ;
                petitiomMaxSignatures = data.maxPetitionSignatur ;
                renderMaxPetition();
                renderPetitions();
                checkLoginStatus(); // Check login status after loading petitions

            } catch (error) {
                console.error('Failed to parse initial JSON data:', error);
            }
        } else {
            console.error('Request failed. Status:', xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('A network error occurred.');
    };
    
    xhr.send();

    await selectNbrSignaturs();
    await selctNbrPetition();

    const logoutButton = document.getElementById('logout-button');
    if(logoutButton) logoutButton.addEventListener('click', logout);

    // Handle form submission via AJAX
    document.addEventListener('submit', function(e) {
            if (e.target && e.target.id === 'signatureForm') {
                e.preventDefault();
                if (!validateRecaptcha()) {
                return;
            }
        
            const formData = new FormData(e.target);
            formData.append('g-recaptcha-response', grecaptcha.getResponse());
                
            const xhr = new XMLHttpRequest();
            
            xhr.open('POST', '../BackEnd/signPetition.php', true);
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        
                        if (data.success) {
                            // Signature saved successfully
                            showCustomAlert(data.message, 'success');
                            e.target.reset();
                            
                            // Optionally close the form or modal
                            const signatureForm = document.getElementById('SignaturForm');
                            if (signatureForm) {
                                signatureForm.classList.add('hidden');
                            }
                            const signaturFormButton = document.getElementById('signaturFormButton');
                            if (signaturFormButton) {
                                signaturFormButton.classList.remove('hidden');
                            }
                        } else {
                            // Signature already exists
                            showCustomAlert(data.message, 'error');
                        }
                    } catch (error) {
                        console.error('Failed to parse JSON:', error);
                        showCustomAlert('An error occurred while processing the response. Please try again.', 'error');
                    }
                } else {
                    console.error('Request failed. Status:', xhr.status);
                    showCustomAlert('An error occurred while submitting your signature. Please try again.', 'error');
                }
            };
            
            xhr.onerror = function() {
                console.error('A network error occurred.');
                showCustomAlert('An error occurred while submitting your signature. Please try again.', 'error');
            };
            
            xhr.send(formData);
        }
        
        // Handle create petition form submission
        if (e.target && e.target.id === 'createPetitionForm') {
            e.preventDefault();
            if (!validateRecaptcha()) {
                return;
            }
        
            const formData = new FormData(e.target);
            formData.append('g-recaptcha-response', grecaptcha.getResponse());
            
            const xhr = new XMLHttpRequest();
            
            xhr.open('POST', '../BackEnd/createPetition.php', true);
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        
                        if (data.success) {
                            // Petition created successfully
                            showCustomAlert(data.message, 'success');
                            e.target.reset();
                            closeModal();
                            
                            // Optionally reload petitions
                            location.reload();
                        } else {
                            // Error creating petition
                            showCustomAlert(data.message, 'error');
                        }
                    } catch (error) {
                        console.error('Failed to parse JSON:', error);
                        showCustomAlert('An error occurred while processing the response. Please try again.', 'error');
                    }
                } else {
                    console.error('Request failed. Status:', xhr.status);
                    showCustomAlert('An error occurred while creating your petition. Please try again.', 'error');
                }
            };
            
            xhr.onerror = function() {
                console.error('A network error occurred.');
                showCustomAlert('An error occurred while creating your petition. Please try again.', 'error');
            };
            
            xhr.send(formData);
        }
    });

    // Add event listeners to close the modal
    const modalOverlay = document.getElementById('petition-modal');
    modalOverlay.addEventListener('click', (event) => {
        // Close if clicking on the overlay, but not the content inside
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
});

function validateRecaptcha() {
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        showCustomAlert('Please complete the CAPTCHA verification.', 'error');
        return false;
    }
    return true;
}