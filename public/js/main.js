// Utility functions
function showLoading() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    document.body.appendChild(spinner);
}

function hideLoading() {
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}

function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.container-xl');
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// AJAX setup
$.ajaxSetup({
    beforeSend: function() {
        showLoading();
    },
    complete: function() {
        hideLoading();
    },
    error: function(xhr) {
        const error = xhr.responseJSON?.error || 'Có lỗi xảy ra';
        showAlert(error, 'danger');
    }
});

// Form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Handle form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('form')) {
        if (!validateForm(e.target)) {
            e.preventDefault();
            showAlert('Vui lòng điền đầy đủ thông tin', 'danger');
        }
    }
});

// Handle input validation
document.addEventListener('input', function(e) {
    if (e.target.matches('input[required], select[required], textarea[required]')) {
        if (e.target.value.trim()) {
            e.target.classList.remove('is-invalid');
        } else {
            e.target.classList.add('is-invalid');
        }
    }
});

// Handle modal events
document.addEventListener('show.bs.modal', function(e) {
    const modal = e.target;
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        form.querySelectorAll('.is-invalid').forEach(input => {
            input.classList.remove('is-invalid');
        });
    }
});

// Handle tab events
document.addEventListener('shown.bs.tab', function(e) {
    const target = e.target.getAttribute('data-bs-target');
    const tabContent = document.querySelector(target);
    if (tabContent) {
        tabContent.scrollIntoView({ behavior: 'smooth' });
    }
});

// Handle responsive navigation
document.addEventListener('click', function(e) {
    if (e.target.matches('.navbar-toggler')) {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar) {
            navbar.classList.toggle('show');
        }
    }
});

// Handle scroll to top
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '↑';
scrollToTop.className = 'scroll-to-top';
scrollToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
`;

document.body.appendChild(scrollToTop);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
        scrollToTop.style.display = 'block';
    } else {
        scrollToTop.style.display = 'none';
    }
});

scrollToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 