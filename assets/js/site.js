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

addArtistDetailHandler = function(linkClassname) {
    let links = document.querySelectorAll(linkClassname);
    let lineupList = document.getElementById('lineup-list');
    let artistDetail = document.getElementById('artist-detail');
    let artistDetailContent = document.getElementById('artist-detail-content');
    let backButton = document.getElementById('back-to-lineup');
    let scrollPosition = 0;

    for(var i = 0; i < links.length; i++){
        links[i].addEventListener('click', function(event) {
            event.preventDefault();

            // Store current scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Get artist content and display
            let slug = this.dataset.slug;
            let targetHtml = document.getElementById(slug).innerHTML;

            // Clear content but keep the back button, then append new content
            artistDetailContent.innerHTML = '';
            artistDetailContent.appendChild(backButton);
            artistDetailContent.insertAdjacentHTML('beforeend', targetHtml);

            // Swap views
            lineupList.style.display = 'none';
            artistDetail.style.display = 'block';

            // Scroll to top
            window.scrollTo(0, 0);
        }, false);
    }

    // Back button handler
    backButton.addEventListener('click', function() {
        // Swap views back
        artistDetail.style.display = 'none';
        lineupList.style.display = 'block';

        // Restore scroll position
        window.scrollTo(0, scrollPosition);
    });

    // Back on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && artistDetail.style.display === 'block') {
            backButton.click();
        }
    });
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