
document.addEventListener('DOMContentLoaded', function() {

    let obtains = [];

    const panelClose = document.querySelector('#panelClose');
    if (panelClose) {
        panelClose.addEventListener('click', function (event) {
            closePanel(event);
        });
    }

    const acordionButtons = document.querySelectorAll('button.accordion-title');
    if (acordionButtons) {
        let duration = 250;
        acordionButtons.forEach( (element) => {
            element.addEventListener('click', function (event) {
                let contentParent = event.target.parentNode;
                let accordionContent = contentParent.querySelector('.accordion-content');
                let contentHeight = accordionContent.offsetHeight;
                if (contentParent.classList.contains('open')) {
                    contentHeight = accordionContent.offsetHeight;
                    accordionContent.style.height = contentHeight + 'px';
                    accordionContent.style.transition = duration + 'ms height ease';
                    setTimeout(function() {
                        accordionContent.style.height = '0';
                        setTimeout(function() {
                            accordionContent.style.transition = '';
                            contentParent.classList.toggle('open');
                        }, duration);
                    }, 1);
                } else {
                    accordionContent.style.height = 'auto';
                    contentHeight = accordionContent.offsetHeight;
                    accordionContent.style.height = '0';
                    accordionContent.style.transition = duration + 'ms height ease';
                    setTimeout(function() {
                        contentParent.classList.toggle('open');
                        accordionContent.style.height = contentHeight + 'px';
                        setTimeout(function() {
                            accordionContent.style.height = 'auto';
                            accordionContent.style.transition = '';
                        }, duration);
                    }, 1);
                }
            });
        });
    }

    const sidePanel = document.querySelector('#sidePanel');
    if (sidePanel) {
        sidePanel.addEventListener('animationend', function (event) {
            sidePanel.classList.remove('fade-from-right', 'fade-to-right');
            if (event.animationName === 'fadeToRight') sidePanel.classList.remove('open');
        });
    }

    let stickyHeader = document.querySelector('#stickyHeader');
    if (stickyHeader) {
        const stickyTrigger = document.querySelector('#stickyTrigger');
        const itemList = document.querySelector('#itemList');

        let observeStickyTrigger = new IntersectionObserver( toggleSticky, {threshold: 0});
        observeStickyTrigger.observe(stickyTrigger);

        function toggleSticky() {
            stickyHeader.classList.toggle('fixed');
            if (stickyHeader.classList.contains('fixed')) {
                itemList.style.paddingTop = stickyHeader.clientHeight + 'px';
            } else {
                itemList.style.paddingTop = '0px';
            }
        }
    }

    let galleries = document.querySelectorAll('.ov-gallery');
    if (galleries) {
        let galleryData = [];
        galleries.forEach((gallery, galleryIndex) => {
            gallery.setAttribute('data-index', galleryIndex.toString());
            let sources = [];
            let galleryImages = gallery.querySelectorAll('img');
            galleryImages.forEach((image, imageIndex) => {
                sources.push(image.src);
                image.setAttribute('data-index', imageIndex.toString());
                image.addEventListener('click', function () {
                    showGallery(galleryIndex, imageIndex);
                });
            });
            galleryData.push(sources);
        });

        function showGallery(galleryIndex, imageIndex) {
            let gallery = galleryData[galleryIndex];
            let galleryContainer = document.createElement('div');
            galleryContainer.id = 'galleryModal';
            let imageContainer = document.createElement('div');
            let image = document.createElement('img');
            image.src = gallery[imageIndex];
            image.setAttribute('data-index', imageIndex);
            imageContainer.append(image);

            let closeButton = document.createElement('button');
            closeButton.classList.add('close-button');
            closeButton.addEventListener('click', function () {
                galleryContainer.remove();
            });
            imageContainer.append(closeButton);

            if (gallery.length > 1) {
                let prevButton = document.createElement('button');
                prevButton.classList.add('prev-button');
                prevButton.addEventListener('click', function () {
                    imageIndex > 0 ? imageIndex-- : imageIndex = gallery.length - 1;
                    image.src = gallery[imageIndex];
                });
                imageContainer.append(prevButton);
                let nextButton = document.createElement('button');
                nextButton.classList.add('next-button');
                nextButton.addEventListener('click', function () {
                    imageIndex < gallery.length - 1 ? imageIndex++ : imageIndex = 0;
                    image.src = gallery[imageIndex];
                });
                imageContainer.append(nextButton);
            }

            galleryContainer.append(imageContainer);
            document.body.append(galleryContainer);
        }
    }

    if (document.querySelectorAll('[data-tooltip]').length) {
        activateTooltips();
    }

});

function openPanel (panel) {
    if ( ! panel.classList.contains('open') ) {
        panel.classList.add('open', 'fade-from-right');
    }
    document.querySelectorAll('[data-tooltip]').forEach( (element) => {
        element.classList.remove('open');
    });
}
function closePanel (close) {
    close.target.closest('#sidePanel').classList.add('fade-to-right');
    document.querySelector('tr.selected').classList.remove('selected');
}

function swapEffectStart ( panel, content ) {
    if ( panel.classList.contains('open') ) {
        content.classList.add('blur-cycle');
    }
}
function swapEffectRemove ( panel, content ) {
    if ( panel.classList.contains('open') ) {
        setTimeout( function () {
            content.classList.remove('blur-cycle');
        }, 500)
    }
}

function fadeOut (element) {
    element.style.animation = 'fadeOut 250ms forwards ease';
    setTimeout(() => element.remove(), 250);
}

async function fetchJSON (url) {
    let response = await fetch(url);
    return response.json();
}

function isOdd (num) {
    return (num % 2 === 1);
}

function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
