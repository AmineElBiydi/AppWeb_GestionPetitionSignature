document.addEventListener('DOMContentLoaded', async () => {
    await checkLoginStatus();
    await fetchUserPetitions();

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) logoutButton.addEventListener('click', logout);
});

async function checkLoginStatus() {
    try {
        const response = await fetch('../BackEnd/apiCheckSession.php');
        const data = await response.json();

        if (data.loggedIn) {
            document.getElementById('login-button-nav').classList.add('hidden');
            document.getElementById('user-display').classList.remove('hidden');
            document.getElementById('user-name').textContent = data.name;
        } else {
            // If not logged in, redirect to login page
            window.location.href = 'auth-standalone.html';
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        window.location.href = 'auth-standalone.html';
    }
}

async function fetchUserPetitions() {
    try {
        const response = await fetch('../BackEnd/apiUserPetitions.php');
        const petitions = await response.json();
        renderUserPetitions(petitions);
    } catch (error) {
        console.error('Error fetching user petitions:', error);
    }
}

function renderUserPetitions(petitions) {
    const container = document.getElementById('user-petitions-container');
    const noPetitionsMessage = document.getElementById('no-petitions');
    container.innerHTML = '';

    if (!petitions || petitions.length === 0) {
        noPetitionsMessage.classList.remove('hidden');
    } else {
        noPetitionsMessage.classList.add('hidden');
        petitions.forEach(petition => {
            container.innerHTML += createPetitionCard(petition);
        });
    }
}

function createPetitionCard(petition) {
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
        <div class="card">
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold leading-tight">${petition.TitreP}</h3>
                    <span class="badge ${isEnded ? 'badge-completed' : 'badge-trending'}">${daysLeftText}</span>
                </div>
                <p class="text-sm text-muted-foreground">${petition.DescriptionP.substring(0, 100)}...</p>
            </div>
            <div class="manage-card-footer">
                <button class="btn btn-outline" onclick="showEditModal(${petition.IDP})">Edit</button>
                <button class="btn btn-danger" onclick="handleDeletePetition(${petition.IDP})">Delete</button>
            </div>
        </div>
    `;
}

function showEditModal(petitionId) {
    const modal = document.getElementById('edit-modal');
    // Fetch petition data to pre-fill the form
    fetch(`../BackEnd/apiInfoPetition.php?id=${petitionId}`)
        .then(response => response.json())
        .then(petition => {
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="text-2xl font-bold">Edit Petition</h1>
                        <button class="modal-close" onclick="closeEditModal()">
                            <svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-form" onsubmit="handleUpdatePetition(event, ${petitionId})">
                            <div class="space-y-4">
                                <div>
                                    <label for="edit-description" class="font-bold mb-2 block">Description</label>
                                    <textarea id="edit-description" name="description" class="input w-full" rows="6" required>${petition.DescriptionP}</textarea>
                                </div>
                                <div>
                                    <label for="edit-date" class="font-bold mb-2 block">End Date</label>
                                    <input type="date" id="edit-date" name="dateFin" class="input w-full" value="${petition.DateFinP}" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            modal.classList.remove('hidden');
            document.body.classList.add('modal-open');
        });
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

async function handleUpdatePetition(event, petitionId) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('idp', petitionId);

    try {
        const response = await fetch('../BackEnd/apiUpdatePetition.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            showCustomAlert('Petition updated successfully!', 'success');
            closeEditModal();
            fetchUserPetitions(); // Refresh the list
        } else {
            showCustomAlert(result.message || 'Failed to update petition.', 'error');
        }
    } catch (error) {
        console.error('Error updating petition:', error);
        showCustomAlert('An unexpected error occurred.', 'error');
    }
}

async function handleDeletePetition(petitionId) {
    showConfirmationModal(
        'Are you sure you want to delete this petition?',
        'This action is permanent and cannot be undone.',
        async () => {
            const formData = new FormData();
            formData.append('idp', petitionId);

            try {
                const response = await fetch('../BackEnd/apiDeletePetition.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    showCustomAlert('Petition deleted successfully.', 'info');
                    fetchUserPetitions(); // Refresh the list
                } else {
                    showCustomAlert(result.message || 'Failed to delete petition.', 'error');
                }
            } catch (error) {
                console.error('Error deleting petition:', error);
                showCustomAlert('An unexpected error occurred.', 'error');
            }
        }
    );
}

async function logout() {
    await fetch('../BackEnd/apiLogout.php');
    window.location.href = 'index.html';
}

function showCustomAlert(message, type = 'success', duration = 3500) {
    const alertTypes = {
        success: {
            bgGradient: 'linear-gradient(135deg, #24e169ff 0%, #24e169ff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            title: 'Success'
        },
        error: {
            bgGradient: 'linear-gradient(135deg, #f0556fff 0%, #f0556fff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><line x1="15" y1="9" x2="9" y2="15" stroke-linecap="round" stroke-linejoin="round"/><line x1="9" y1="9" x2="15" y2="15" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            title: 'Error'
        },
        info: {
            bgGradient: 'linear-gradient(135deg, #669ffcff 0%, #669ffcff 100%)',
            icon: `<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" opacity="0.2" fill="currentColor"/><line x1="12" y1="16" x2="12" y2="12" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="8" x2="12.01" y2="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
            title: 'Information'
        }
    };

    const config = alertTypes[type] || alertTypes.info;
    let alertContainer = document.getElementById('custom-alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'custom-alert-container';
        alertContainer.className = 'custom-alert-container';
        document.body.appendChild(alertContainer);
    }

    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.style.background = config.bgGradient;
    alertDiv.setAttribute('role', 'alert');

    const progressBar = document.createElement('div');
    progressBar.className = 'alert-progress-bar';
    progressBar.style.background = 'rgba(255, 255, 255, 0.4)';
    progressBar.style.animation = `alert-progress ${duration}ms linear`;

    alertDiv.innerHTML = `
        <div class="custom-alert-icon">${config.icon}</div>
        <div style="flex: 1;">
            <p style="margin: 0; font-size: 13px; font-weight: 600; color: white; opacity: 0.95; margin-bottom: 2px;">${config.title}</p>
            <p class="custom-alert-message" style="font-size: 14px; font-weight: 400; color: white; opacity: 0.9;">${message}</p>
        </div>
        <div class="flex justify-center">
            <div class="g-recaptcha" data-sitekey="6LdABvUrAAAAALrMMwz9DRQX3-5VdVRopKa8y4C2"></div>
        </div>
        <button class="custom-alert-close-btn" style="color: white;" aria-label="Close notification">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    `;
    alertDiv.appendChild(progressBar);
    alertContainer.prepend(alertDiv);

    const closeAlert = () => {
        alertDiv.classList.add('exiting');
        setTimeout(() => {
            alertDiv.remove();
            if (alertContainer.children.length === 0) {
                alertContainer.remove();
            }
        }, 300);
    };

    const timer = setTimeout(closeAlert, duration);

    alertDiv.querySelector('.custom-alert-close-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(timer);
        closeAlert();
    });
}

function showConfirmationModal(title, message, onConfirm) {
    // Remove existing confirmation modal if any
    const existingModal = document.getElementById('confirmation-modal');

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'confirmation-modal';
    modalOverlay.className = 'modal-overlay confirmation-overlay';

    modalOverlay.innerHTML = `
        <div class="confirmation-dialog">
            <div class="confirmation-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 class="confirmation-title">${title}</h3>
            <p class="confirmation-message">${message}</p>
            <div class="confirmation-actions">
                <div class="flex justify-center">
                  <div class="g-recaptcha" data-sitekey="6LdABvUrAAAAALrMMwz9DRQX3-5VdVRopKa8y4C2"></div>
                </div>
                <button id="confirm-cancel-btn" class="btn btn-outline">Cancel</button>
                <button id="confirm-delete-btn" class="btn btn-danger">Yes, delete it</button>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);
    document.body.classList.add('modal-open');

    const closeModal = () => {
        modalOverlay.remove();
        document.body.classList.remove('modal-open');
    };

    modalOverlay.querySelector('#confirm-cancel-btn').addEventListener('click', closeModal);
    modalOverlay.querySelector('#confirm-delete-btn').addEventListener('click', () => {
        onConfirm();
        closeModal();
    });
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

function validateRecaptcha() {
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        showCustomAlert('Please complete the CAPTCHA verification.', 'error');
        return false;
    }
    return true;
}