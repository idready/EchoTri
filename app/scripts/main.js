console.log('\'Allo \'Allo!');

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.init = false;

document.addEventListener('DOMContentLoaded', function(){

    console.log('load svg4everybody');
    svg4everybody();

    // Lazysizes
    lazySizes.init();

    //Hunt element to dispplay only if visible on viewport
    var sections = document.querySelectorAll('.info-section__item');
    var count = 0;
    var timer;

    for(var i = 0; i < sections.length; i++){

        var el = sections[i];
        var watcher = inViewport(el, isVisible);
        var isInViewport = inViewport(el);
        timer = setTimeout(watcher.watch, 1000);
        inViewport(el, isVisible);

        setTimeout(function(){

            // console.log(el, ' is in viewport : ',isInViewport);
            if (isInViewport) {

            } else {

            }
        }, 1500);

    }

    function isVisible(el) {
        // console.log('Watching: '+el);
        el.classList.add('visible');
    }

});
