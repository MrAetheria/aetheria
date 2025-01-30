document.addEventListener('DOMContentLoaded', function() {
    const versionSelect = document.getElementById('version-select');
    const downloadButton = document.getElementById('download-button');
    const settingsButton = document.querySelector('.settings-button');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsButton = document.getElementById('close-settings');
    const optimizeCheckbox = document.getElementById('optimize-checkbox');
    const snowCheckbox = document.getElementById('snow-checkbox');
    const instructionPanel = document.getElementById('instructionPanel');
    const instructionButton = document.querySelector('.instruction-button');
    const particlesJSContainer = document.getElementById('particles-js');
    const body = document.body;
    const registerButton = document.querySelector('.register-button');
    const registerModalButton = document.querySelector('.register-button-modal');
    const loginButton = document.querySelector('.login-button');
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const closeAuthButtons = document.querySelectorAll('.auth-close');
    const authButtons = document.getElementById('authButtons');
    const userPanel = document.getElementById('userPanel');
    const userNameDisplay = document.getElementById('userName');
    const userTimeDisplay = document.getElementById('userTime');
    const userButton = document.querySelector('.user-button');
    const userInfo = document.getElementById('userInfo');
    const themeSelect = document.getElementById('theme-select');
    const profileButton = document.getElementById('profileButton');
    const profileModal = document.getElementById('profileModal');
    const profileCloseButton = document.querySelector('.profile-close');
    const saveProfileButton = document.getElementById('saveProfileButton');
    const profileUsernameDisplay = document.getElementById('profileUsername');
    const profileEmailDisplay = document.getElementById('profileEmail');
    const profileSubscriptionDisplay = document.getElementById('profileSubscription');
    const profileNameInput = document.getElementById('profile-name-input');
    const profileEmailInput = document.getElementById('profile-email-input');
    const profilePasswordInput = document.getElementById('profile-password-input');
    const subscriptionStatusDisplay = document.getElementById('subscriptionStatus');
    const downloadList = document.getElementById('download-list');
    let optimizedMode = false;
    let startTime = null;
    let intervalId = null;
    let currentTheme = 'red';
    let userSubscription = 'Free';
    let userProfile = {
        username: 'Username',
        email: 'user@email.com',
        password: ''
    };

     // Функция для применения темы из локального хранилища
   function applyTheme(theme) {
       currentTheme = theme;
       const elements = document.querySelectorAll('.auth-buttons button, .auth-content button, #close-settings, .profile-content button, #saveProfileButton');
       elements.forEach(function(el) {
           el.classList.remove('red', 'orange', 'blue', 'green','rainbow','snow');
           el.classList.add(theme);
       });
       localStorage.setItem('theme', theme);
         if(theme === 'snow') {
            body.style.backgroundColor = '#fff';
             body.style.color = '#1a1a1a';
             body.style.backgroundImage = 'none';
             body.style.backgroundSize = '100%';
        } else{
              body.style.backgroundColor = '#1a1a1a';
            body.style.color = '#fff';
            body.style.backgroundImage = "url('https://i.imgur.com/u9Q79vK.png')";
             body.style.backgroundSize = '400%';
        }
   }


    // Функция для обновления данных профиля в личном кабинете
    function updateProfileDisplay() {
        profileUsernameDisplay.textContent = userProfile.username;
        profileEmailDisplay.textContent = userProfile.email;
        profileSubscriptionDisplay.textContent = userSubscription;
    }
  // Функция для отображения менеджера загрузок
     function addDownloadItem(link, name) {
        const listItem = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = name;
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Отменить';
        cancelButton.addEventListener('click', function() {
            listItem.remove();
        });
        listItem.appendChild(nameSpan);
        listItem.appendChild(cancelButton);
        downloadList.appendChild(listItem);
         // Открываем ссылку в новой вкладке
         window.open(link, '_blank');
    }
    // Получение темы из локального хранилища
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        applyTheme(storedTheme);
        themeSelect.value = storedTheme;
    }

    // Обработчик смены темы
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });

    // Инициализация частиц снега
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                },
                "onclick": {
                    "enable": false,
                },
            },
            "modes": {
                "bubble": {
                    "distance": 400,
                    "size": 4,
                    "duration": 2,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Функция для запуска таймера
    function startTimer() {
        startTime = Date.now();
        intervalId = setInterval(updateTimer, 60000);
    }

    // Функция для обновления таймера
    function updateTimer() {
        if (!startTime) return;
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        userTimeDisplay.textContent = `${minutes} минут`;
    }

    // Функция для отображения панели пользователя
    function showUserPanel(username, email) {
        userProfile.username = username;
        userProfile.email = email;
        updateProfileDisplay();
        authButtons.style.display = 'none';
        userPanel.style.display = 'flex';
        userNameDisplay.textContent = username;
        subscriptionStatusDisplay.textContent = userSubscription;
        startTimer();
    }

    loginButton.addEventListener('click', function() {
        loginModal.style.display = 'flex';
    });

    registerModalButton.addEventListener('click', function() {
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });

    closeAuthButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    profileButton.addEventListener('click', function() {
        profileModal.style.display = 'flex';
    });

    profileCloseButton.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });

    saveProfileButton.addEventListener('click', function() {
        const newName = profileNameInput.value.trim();
        const newEmail = profileEmailInput.value.trim();
        const newPassword = profilePasswordInput.value.trim();
        if (newName) {
            userProfile.username = newName;
        }
        if (newEmail) {
            userProfile.email = newEmail;
        }
        if (newPassword) {
            userProfile.password = newPassword;
        }
        updateProfileDisplay();
        profileModal.style.display = 'none';
    });


    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const username = usernameInput.value;
        const email = emailInput.value;
        showUserPanel(username, email);
        registerModal.style.display = 'none';
    });

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const usernameInput = this.querySelector('input[type="text"]');
        const username = usernameInput.value;
        const email = usernameInput.value;
        showUserPanel(username, email);
        loginModal.style.display = 'none';
    });

    instructionButton.addEventListener('click', function() {
        instructionPanel.classList.toggle('show');
    });

    settingsButton.addEventListener('click', function() {
        settingsModal.style.display = 'flex';
    });

    closeSettingsButton.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    optimizeCheckbox.addEventListener('change', function() {
        optimizedMode = this.checked;
        snowCheckbox.disabled = optimizedMode;
        const launcherWindow = document.querySelector('.launcher-window');
        if (optimizedMode) {
            launcherWindow.classList.add('optimized');
            particlesJSContainer.classList.remove('show');
            instructionPanel.classList.remove('show');
        } else {
            launcherWindow.classList.remove('optimized');
            if (snowCheckbox.checked) {
                particlesJSContainer.classList.add('show');
            }
        }
    });

    snowCheckbox.addEventListener('change', function() {
        if (this.checked && !optimizedMode) {
            particlesJSContainer.classList.add('show');
        } else {
            particlesJSContainer.classList.remove('show');
        }
    });

    versionSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const link = selectedOption.getAttribute('data-link');
        const size = selectedOption.getAttribute('data-size');
        const description = selectedOption.getAttribute('data-description');

        if (link) {
            downloadButton.removeAttribute('disabled');
            downloadButton.addEventListener('click', function() {
               addDownloadItem(link, selectedOption.textContent);
            });
            const versionDescription = document.querySelector('.launcher-window .version-description');
            if (versionDescription) {
                versionDescription.textContent = description || 'Описание недоступно';
            }
             const versionSize = document.querySelector('.launcher-window .version-size');
            if (versionSize) {
                versionSize.textContent = `Размер: ${size}`;
            }
        } else {
            downloadButton.setAttribute('disabled', true);
            downloadButton.onclick = null;
        }
    });

    userButton.addEventListener('click', function() {
        userInfo.classList.toggle('show');
    });

    const trailElements = [];
    const trailCount = 7;
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trailElements.push(trail);
        document.body.appendChild(trail);
    }

    document.addEventListener('mousemove', function(e) {
        trailElements.forEach((trail, index) => {
            const delay = (index + 1) * 5;
            setTimeout(() => {
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
                const size = Math.random() * 10 + 5;
                const opacity = Math.random() * 0.6 + 0.2;
                trail.style.width = size + 'px';
                trail.style.height = size + 'px';
                trail.style.opacity = opacity;
            }, delay);
        });
        body.style.backgroundPosition = `${50 + (e.clientX - window.innerWidth / 2) / 50}% ${50 + (e.clientY - window.innerHeight / 2) / 50}%`;
    });
});