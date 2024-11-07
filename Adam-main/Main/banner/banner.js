document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const submenuContainer = document.querySelector('.submenu-container');
    let timeout;

    header.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        submenuContainer.style.display = 'block';
        setTimeout(() => {
            submenuContainer.style.opacity = '1';
        }, 10);
    });

    header.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            submenuContainer.style.opacity = '0';
            setTimeout(() => {
                submenuContainer.style.display = 'none';
            }, 300);
        }, 100);
    });

    submenuContainer.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });

    submenuContainer.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            submenuContainer.style.opacity = '0';
            setTimeout(() => {
                submenuContainer.style.display = 'none';
            }, 300);
        }, 100);
    });
});