const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }else {
            entry.target.classList.remove('visible');
        }
    })
});

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

const observer_right = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }else {
            entry.target.classList.remove('visible');
        }
    })
});

document.querySelectorAll('.right-scroll-animate').forEach(el => observer.observe(el));