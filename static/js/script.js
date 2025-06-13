// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80; // Высота фиксированного header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Закрываем мобильное меню при клике на ссылку
        const nav = document.querySelector('.nav-container');
        if (nav.classList.contains('mobile-menu-active')) {
            nav.classList.remove('mobile-menu-active');
        }
    });
});

// Мобильное меню
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Открыть меню');
    
    nav.insertBefore(menuButton, nav.firstChild);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('mobile-menu-active');
        menuButton.innerHTML = nav.classList.contains('mobile-menu-active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && nav.classList.contains('mobile-menu-active')) {
            nav.classList.remove('mobile-menu-active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
};

// Проверка ширины экрана и создание мобильного меню
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Обработка изменения размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-button')) {
                createMobileMenu();
            }
        } else {
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.remove();
            }
            const nav = document.querySelector('.nav-container');
            if (nav) {
                nav.classList.remove('mobile-menu-active');
            }
        }
    }, 250);
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .service-card').forEach((el) => {
    observer.observe(el);
});

// Обработка формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Отправка формы:', data);
        
        // Очистка формы и показ сообщения об успехе
        this.reset();
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    });
}

// Анимация для кнопок
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseover', function() {
        if (window.innerWidth > 768) { // Только для десктопа
            this.style.transform = 'scale(1.05)';
        }
    });
    
    button.addEventListener('mouseout', function() {
        if (window.innerWidth > 768) { // Только для десктопа
            this.style.transform = 'scale(1)';
        }
    });
});

// Добавление стилей для анимации
const style = document.createElement('style');
style.textContent = `
    .product-card, .service-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .product-card.visible, .service-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
        padding: 0.5rem;
        transition: transform 0.3s ease;
    }
    
    .mobile-menu-button:hover {
        transform: scale(1.1);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }
        
        .nav-container {
            flex-direction: column;
        }
        
        .nav-links {
            display: none;
            flex-direction: column;
            width: 100%;
            text-align: center;
        }
        
        .nav-container.mobile-menu-active .nav-links {
            display: flex;
        }
    }
`;

document.head.appendChild(style);

// Функции для работы с модальными окнами
function openOrderModal() {
    document.getElementById('orderModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Разблокируем прокрутку страницы
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openRegisterModal() {
    closeLoginModal();
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модальных окон при клике вне их области
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target === orderModal) {
        closeOrderModal();
    }
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === registerModal) {
        closeRegisterModal();
    }
}

// Обработка отправки формы заказа
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Здесь можно добавить отправку данных на сервер
        console.log('Отправка заказа:', data);
        
        // Очистка формы и показ сообщения об успехе
        this.reset();
        closeOrderModal();
        alert('Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время.');
    });
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Вход:', data);
    
    // Очистка формы и закрытие модального окна
    this.reset();
    closeLoginModal();
    alert('Вы успешно вошли в систему!');
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Проверка совпадения паролей
    if (data.password !== data['confirm-password']) {
        alert('Пароли не совпадают!');
        return;
    }
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Регистрация:', data);
    
    // Очистка формы и закрытие модального окна
    this.reset();
    closeRegisterModal();
    alert('Регистрация успешно завершена! Теперь вы можете войти в систему.');
}); 
