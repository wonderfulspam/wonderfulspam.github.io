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