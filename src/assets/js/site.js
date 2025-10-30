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
    let lineupList = document.getElementById('lineup-list') || document.getElementById('schedule-list');
    let artistDetail = document.getElementById('artist-detail');
    let artistDetailContent = document.getElementById('artist-detail-content');
    let topBackButton = document.getElementById('back-to-lineup') || document.getElementById('back-to-schedule');
    let scrollPosition = 0;

    // Function to handle back navigation
    function goBack() {
        // Swap views back
        artistDetail.style.display = 'none';
        lineupList.style.display = 'block';

        // Restore scroll position
        window.scrollTo(0, scrollPosition);
    }

    for(var i = 0; i < links.length; i++){
        links[i].addEventListener('click', function(event) {
            event.preventDefault();

            // Store current scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Get artist content and display
            let slug = this.dataset.slug;
            let targetHtml = document.getElementById(slug).innerHTML;

            // Clear content but keep the top back button, then append new content
            artistDetailContent.innerHTML = '';
            artistDetailContent.appendChild(topBackButton);
            artistDetailContent.insertAdjacentHTML('beforeend', targetHtml);

            // Get artist name from the inserted content
            let artistContainer = artistDetailContent.querySelector('[data-artist-name]');
            let artistName = artistContainer ? artistContainer.dataset.artistName : '';

            // Determine back button color based on artist name
            let buttonColor = 'white';
            if (artistName === 'Finlay Shakespeare' || artistName === 'Heidemann / Mingot / Klint') {
                buttonColor = 'black';
            }

            // Add click handlers to all back buttons (using class) and set their color
            let backButtons = document.querySelectorAll('.back-button');
            backButtons.forEach(function(btn) {
                btn.addEventListener('click', goBack);
                btn.style.color = buttonColor;
            });

            // Add click handler to artist image
            let artistImage = artistDetailContent.querySelector('.artist-image-container img');
            if (artistImage) {
                artistImage.style.cursor = 'pointer';
                artistImage.addEventListener('click', goBack);
            }

            // Swap views
            lineupList.style.display = 'none';
            artistDetail.style.display = 'block';

            // Scroll to top
            window.scrollTo(0, 0);
        }, false);
    }

    // Top back button handler (initial setup)
    topBackButton.addEventListener('click', goBack);

    // Back on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && artistDetail.style.display === 'block') {
            goBack();
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