console.log('\'Allo \'Allo!');

document.addEventListener('DOMContentLoaded', function(){

    console.log('load svg4everybody');
    svg4everybody();

    //Hunt element to dispplay only if visible on viewport
    var sections = document.querySelectorAll('.info-section__item');

    for(var i = 0; i < sections.length; i++){

        inViewport(sections[i], isVisible);
    }

    function isVisible(el) {

        el.classList.add('visible');
    }

});
