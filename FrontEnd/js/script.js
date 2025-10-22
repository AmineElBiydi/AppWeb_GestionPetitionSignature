let allPetitions = []; 
let signatureCounts = {};
let currentSortOrder = 'DESC'; 
let searchQuery = '';
let visibleCount = 9; 
const PETITIONS_PER_PAGE = 6;
let dataPetition = null; 


function toggleSearch() {
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
        renderPetitions(); 
    }
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

    let daysLeftText = '';
    const endDate = new Date(petition.DateFinP);
    const today = new Date();
    if (today > endDate) {
        daysLeftText = 'Ended';
    } else {
        const diffTime = Math.abs(endDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        daysLeftText = `${diffDays} ${diffDays === 1 ? 'day left' : 'days left'}`;
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
                <button class="btn btn-primary w-full" onclick="showForm(${petition.IDP})" ">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    View & Sign
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
    

    try {
        await selectPetition(idF); 

        if (dataPetition == null ) {
            modalOverlay.innerHTML = `<div class="modal-content"><p>Error: Petition not found.</p><button class="modal-close" onclick="closeModal()">X</button></div>`;
            return;
        }
        const endDate = new Date(dataPetition.DateFinP);
        const today = new Date();
        if (today > endDate) {
            daysLeftText = 'Ended';
        } else {
            const diffTime = Math.abs(endDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            daysLeftText = `${diffDays} ${diffDays === 1 ? 'day left' : 'days left'}`;
        }
        modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">
                <svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="petition-info">
                <h1 class="text-2xl font-bold mb-4">${dataPetition.TitreP}</h1>
                <p class="text-muted-foreground">${dataPetition.DescriptionP}</p>
            </div>
            <div class="petition-info flex-col gap-4">
                <p class="font-bold">Date Ajout:${dataPetition.DateAjoutP}</p>
                <p class="font-bold">Date Fin:${dataPetition.DateFinP}</p>
                <p class="font-bold">${daysLeftText}</p>
            </div>
            <div class="signature-count my-6 text-center">
                <p class="font-bold">Join <span id="count">${dataPetition.sigCount || 0}</span> others in signing this petition!</p>
            </div>
            <div class="signature-count my-6 text-center">
                <p class="font-bold">L'email d'autheur de la petition : ${dataPetition.Email}</p>
            </div>
            <div id='signaturFormButton' class="signature-count my-6 text-center">
                <button class="btn btn-primary" onclick="showSignaturForm()">Sign the Petition</button>
            </div>
            <div id ="SignaturForm" class="signature-count my-6 text-center hidden">
                <form action="../BackEnd/signPetition.php" method="POST" class="flex flex-col gap-4 ">
                    <h2 class="text-xl font-bold text-center">Sign the Petition</h2>
                    <input type="hidden" name="idp" value="${dataPetition.IDP}">
                   <div><label for="prenom" class="font-bold mb-2 block">First Name:</label><input type="text" id="prenom" name="prenom" class="input w-full" placeholder="Enter your first name" required></div>
                    <div><label for="nom" class="font-bold mb-2 block">Last Name:</label><input type="text" id="nom" name="nom" class="input w-full" placeholder="Enter your last name" required></div>
                    <div><label for="email" class="font-bold mb-2 block">Email Address:</label><input type="email" id="email" name="email" class="input w-full" placeholder="Enter your email address" required></div>
                    <div>
                        <label for="country" class="font-bold mb-2 block">Country:</label>
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
                    </div>
                    <button type="submit" class="btn btn-primary">Sign the Petition</button>
                </form>
            </div>
        </div>
        `;
    } catch (error) {
        console.error('Failed to load petition:', error);
        modalOverlay.innerHTML = `<div class="modal-content"><p>Could not load petition details. Please try again later.</p><button class="modal-close" onclick="closeModal()">X</button></div>`;
    }
}

async function selectPetition(idp) {
    await fetch('../BackEnd/apiInfoPetiton.php?id='+idp)
        .then(response => response.json())
        .then(data => {
           dataPetition = data ; 
        });
}

function showSignaturForm(){
    const signatureForm = document.getElementById('SignaturForm');
    const signaturFormButton = document.getElementById('signaturFormButton');
    signatureForm.classList.remove('hidden');
    signatureForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Scroll to the form
    signaturFormButton.classList.add('hidden');
}


function closeModal() {
    const modalOverlay = document.getElementById('petition-modal');
    modalOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open'); // Re-enable background scroll
    dataPetition = null ; 
}

// --- INITIALIZATION ---
// This code runs when the page has finished loading.
document.addEventListener('DOMContentLoaded', () => {
    fetch('../BackEnd/apiPetition.php')
        .then(response => response.json())
        .then(data => {
            allPetitions = data.petitions;
            signatureCounts = data.signatures;
            renderPetitions(); 
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