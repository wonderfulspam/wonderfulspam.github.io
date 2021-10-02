addArtistClickHandler = function(linkClassname, targetId) {
    let links = document.querySelectorAll(linkClassname);
    for(var i = 0; i < links.length; i++){
        links[i].addEventListener('click', function(event) {
            event.preventDefault();
            let slug = this.dataset.slug;
            let artistHtml = document.getElementById(slug).innerHTML;
            document.getElementById(targetId).innerHTML = artistHtml;
        }, false);
    }
}