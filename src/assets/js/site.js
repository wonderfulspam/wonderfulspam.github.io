addCopyClickHandler = function(linkClassname, targetId) {
    let links = document.querySelectorAll(linkClassname);
    for(var i = 0; i < links.length; i++){
        links[i].addEventListener('click', function(event) {
            event.preventDefault();
            let slug = this.dataset.slug;
            let targetHtml = document.getElementById(slug).innerHTML;
            document.getElementById(targetId).innerHTML = targetHtml;
        }, false);
    }
}

// Mobile burger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const nav = document.getElementById('main-nav');

    if (burgerMenu && nav) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const menuLinks = nav.querySelectorAll('.menu-item-link');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!burgerMenu.contains(event.target) && !nav.contains(event.target)) {
                burgerMenu.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
});