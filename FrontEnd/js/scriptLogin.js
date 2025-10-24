// State
let currentLanguage = 'en';
let currentTab = 'login';

// Translations
const translations = {
  en: {
    welcomeBack: "Welcome Back",
    welcomeDesc: "Sign in to manage your football field reservations",
    createAccount: "Create Account",
    createDesc: "Join us to book and manage football fields",
    login: "Login",
    signUp: "Sign Up",
    email: "Email",
    emailPlaceholder: "name@example.com",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    fullNamePlaceholder: "John Doe",
    phoneNumber: "Phone Number",
    phonePlaceholder: "+1 (555) 000-0000",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    orContinue: "Or continue with",
    signInGoogle: "Sign in with Google",
    signUpGoogle: "Sign up with Google",
    terms: "I agree to the terms and conditions",
    termsFooter: "By continuing, you agree to our Terms of Service",
  },
  ar: {
    welcomeBack: "مرحباً بعودتك",
    welcomeDesc: "قم بتسجيل الدخول لإدارة حجوزات ملعب كرة القدم",
    createAccount: "إنشاء حساب",
    createDesc: "انضم إلينا لحجز وإدارة ملاعب كرة القدم",
    login: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    email: "البريد الإلكتروني",
    emailPlaceholder: "name@example.com",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أحمد محمد",
    phoneNumber: "رقم الهاتف",
    phonePlaceholder: "+966 555 000 000",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    orContinue: "أو المتابعة باستخدام",
    signInGoogle: "تسجيل الدخول بواسطة Google",
    signUpGoogle: "إنشاء حساب بواسطة Google",
    terms: "أوافق على الشروط والأحكام",
    termsFooter: "من خلال المتابعة، فإنك توافق على شروط الخدمة الخاصة بنا",
  },
};

// // Initialize floating icons
// function initFloatingIcons() {
//   const container = document.getElementById('floating-icons');
//   const movePaths = ['move-path-1', 'move-path-2', 'move-path-3', 'move-path-4'];
//   // Note: 'strategy.png' is currently a black image and won't be visible.
//   const iconSources = ['icons/football.png', 'icons/stadium.png'];
//   const gridCells = 20;
//   const gridCols = 5;
//   const gridRows = 4;
  
//   for (let i = 0; i < gridCells; i++) {
//     const row = Math.floor(i / gridCols);
//     const col = i % gridCols;

//     // Calculate position within a grid cell with some randomness
//     const cellWidth = 100 / gridCols;
//     const cellHeight = 100 / gridRows;
//     const left = col * cellWidth + Math.random() * (cellWidth - 5); // -5 to keep it from edge
//     const top = row * cellHeight + Math.random() * (cellHeight - 5);

//     const item = {
//       src: iconSources[Math.floor(Math.random() * iconSources.length)],
//       pos: {
//         top: `${top}%`,
//         left: `${left}%`,
//       }
//     };

//     const iconWrapper = document.createElement('div');
//     iconWrapper.className = 'floating-icon';
    
//     const iconImage = document.createElement('img');
//     iconImage.src = item.src;
//     iconImage.alt = 'Floating decorative icon';
//     iconWrapper.appendChild(iconImage);
    
//     // Set initial position from data
//     Object.assign(iconWrapper.style, item.pos);
    
//     // --- NEW: Apply random animations ---
//     const floatDuration = Math.random() * 15 + 20; // 20s to 35s
//     const moveDuration = Math.random() * 20 + 25; // 25s to 45s
//     const randomMovePath = movePaths[Math.floor(Math.random() * movePaths.length)];
//     const pulseDuration = Math.random() * 4 + 3; // 3s to 7s
//     const animationDelay = Math.random() * 5; // 0s to 5s delay

//     iconWrapper.style.animation = `
//       ${randomMovePath} ${moveDuration}s ease-in-out infinite,
//       float ${floatDuration}s ease-in-out infinite
//     `;
//     iconImage.style.animation = `pulse-glow ${pulseDuration}s ease-in-out infinite alternate`;
//     iconWrapper.style.animationDelay = `${animationDelay}s`;
    
//     container.appendChild(iconWrapper);
//   }
// }


function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  updateLanguage();
}

// Update language
function updateLanguage() {
  const t = translations[currentLanguage];
  const app = document.getElementById('app');
  
  app.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('language-text').textContent = currentLanguage === 'en' ? 'العربية' : 'English';
  
  const elementsToTranslate = {
    '#login-title': 'welcomeBack', '#login-desc': 'welcomeDesc', '#signup-title': 'createAccount',
    '#signup-desc': 'createDesc', '.tab-text-login': 'login', '.tab-text-signup': 'signUp',
    '#label-email': 'email', '#label-password': 'password', '#label-remember': 'rememberMe',
    '#forgot-password': 'forgotPassword', '#login-button': 'login', '#or-continue': 'orContinue',
    '#or-continue-signup': 'orContinue', '#google-signin': 'signInGoogle', '#google-signup': 'signUpGoogle',
    '#terms-footer': 'termsFooter', '#terms-footer-signup': 'termsFooter', '#label-fullname': 'fullName',
    '#label-email-signup': 'email', '#label-phone': 'phoneNumber', '#label-password-signup': 'password',
    '#label-confirm-password': 'confirmPassword', '#label-terms': 'terms', '#signup-button': 'createAccount'
  };

  Object.entries(elementsToTranslate).forEach(([selector, key]) => {
    document.querySelectorAll(selector).forEach(el => el.textContent = t[key]);
  });

  document.getElementById('signup-name').placeholder = t.fullNamePlaceholder;
  document.getElementById('signup-phone').placeholder = t.phonePlaceholder;
  document.getElementById('login-email').placeholder = t.emailPlaceholder;
  document.getElementById('signup-email').placeholder = t.emailPlaceholder;
}

// Switch tabs
function switchTab(tab) {
  if (currentTab === tab) return;
  
  currentTab = tab;
  const cardContainer = document.getElementById('card-container');
  cardContainer.classList.toggle('flipped', tab === 'signup');
  
  // Update tab buttons on front
  document.getElementById('tab-login').classList.toggle('bg-white', tab === 'login');
  document.getElementById('tab-login').classList.toggle('text-black', tab === 'login');
  document.getElementById('tab-login').classList.toggle('shadow-md', tab === 'login');
  document.getElementById('tab-login').classList.toggle('text-white/80', tab !== 'login');
  
  document.getElementById('tab-signup').classList.toggle('bg-white', tab === 'signup');
  document.getElementById('tab-signup').classList.toggle('text-black', tab === 'signup');
  document.getElementById('tab-signup').classList.toggle('shadow-md', tab === 'signup');
  document.getElementById('tab-signup').classList.toggle('text-white/80', tab !== 'signup');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // initFloatingIcons(); // This now handles all animation setup
  
  document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
  
  document.querySelectorAll('.tab-button, .tab-button-back').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.currentTarget.dataset.tab));
  });
});

// --- NEW: Mouse-reactive glare effect ---
document.querySelectorAll('.card-face').forEach(card => {
  const glare = card.querySelector('.card-glare');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
  card.addEventListener('mouseenter', () => glare.style.opacity = 1);
  card.addEventListener('mouseleave', () => glare.style.opacity = 0);
});

function  showCustomAlert(message, type = 'success') {
    // Remove existing alert if any
    const existingAlert = document.getElementById('custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alertDiv = document.createElement('div');
    alertDiv.id = 'custom-alert';
    
    let bgColor, icon;
    
    if (type === 'success') {
        bgColor = '#10b981';
        icon = '<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else if (type === 'newSign') {
        bgColor = '#8b5cf6';
        icon = '<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>';
    } else {
        bgColor = '#ef4444'; 
        icon = '<svg style="width: 24px; height: 24px; flex-shrink: 0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    }

    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideDown 0.3s ease-out;
    `;

    alertDiv.innerHTML = `
        ${icon}
        <p style="flex: 1; margin: 0; font-size: 15px; font-weight: 500;">${message}</p>
        <button id="alert-close-btn" style="
            background: transparent;
            color: white;
            border: none;
            padding: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: background 0.2s;
        " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='transparent'">
            <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    // Add CSS animations
    if (!document.getElementById('alert-animations')) {
        const style = document.createElement('style');
        style.id = 'alert-animations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(alertDiv);

    // Close alert function with animation
    const closeAlert = () => {
        alertDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    };

    // Auto-dismiss after 5 seconds
    const autoDismiss = setTimeout(closeAlert, 5000);

    // Manual close button
    document.getElementById('alert-close-btn').addEventListener('click', () => {
        clearTimeout(autoDismiss);
        closeAlert();
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

document.addEventListener('DOMContentLoaded', () => {
    // Handle login form submission via AJAX
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

    if (!validateRecaptcha()) {
    return;
    }
    
    const formData = new FormData(e.target);
    formData.append('g-recaptcha-response', grecaptcha.getResponse());
        
        const xhr = new XMLHttpRequest();
        
        xhr.open('POST', '../BackEnd/apiSignIn.php', true);
        
        xhr.onload = function() {
            
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    
                    if (data.success) {
                        showCustomAlert(data.message, 'success');
                        e.target.reset();
                        
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    } else {
                        showCustomAlert(data.message || 'Login failed. Please try again.', 'error');
                    }
                } catch (error) {
                    console.error('Failed to parse JSON:', error);
                    console.error('Response was:', xhr.responseText);
                    showCustomAlert('An error occurred while processing the response. Please try again.', 'error');
                }
            } else {
                console.error('Request failed. Status:', xhr.status);
                showCustomAlert('An error occurred. Please try again.', 'error');
            }
        };
        
        xhr.onerror = function() {
            console.error('A network error occurred.');
            showCustomAlert('A network error occurred. Please check your connection.', 'error');
        };
        
        xhr.send(formData);
    });

    // Handle sign-up form submission via AJAX
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateRecaptcha()) {
            return;
        }
    
        const formData = new FormData(e.target);
        formData.append('g-recaptcha-response', grecaptcha.getResponse());

        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            showCustomAlert('Passwords do not match.', 'error');
            return;
        }

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '../BackEnd/apiSignup.php', true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.success) {
                        showCustomAlert(data.message, 'success');
                        e.target.reset();
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    } else {
                        showCustomAlert(data.message || 'Sign up failed. Please try again.', 'error');
                    }
                } catch (error) {
                    console.error('Failed to parse JSON:', error);
                    showCustomAlert('An error occurred while processing the response.', 'error');
                }
            } else {
                console.error('Request failed. Status:', xhr.status);
                showCustomAlert('An error occurred. Please try again.', 'error');
            }
        };

        xhr.onerror = function() {
            console.error('A network error occurred.');
            showCustomAlert('A network error occurred. Please check your connection.', 'error');
        };

        xhr.send(formData);
    });
  
});