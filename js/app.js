
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

    activateTooltips();
});

function activateTooltips () {
    let tooltipButtons = document.querySelectorAll('[data-tooltip]');
    tooltipButtons.forEach( (element) => {
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            if (!document.querySelector('.tooltip')) {
                element.classList.add('open');
                let tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                if (element.getAttribute('data-position') === 'bottom')
                    tooltip.classList.add('bottom');
                if (element.getAttribute('data-size') === 'large')
                    tooltip.classList.add('large');
                let tooltipData = element.getAttribute('data-tooltip');
                if (tooltipData.startsWith('obtain-')) {
                    tooltip.innerHTML = listObtains(parseInt(tooltipData.match(/\d+/g)[0]));
                } else if (tooltipData.startsWith('itemset-')) {
                    tooltip.innerHTML = itemSets.find((row) => row['id'] === parseInt(tooltipData.match(/\d+/g)[0])).description ;
                    let setPieces = JSON.parse(element.getAttribute('data-setpieces'));
                    let setList = document.createElement('ul');
                    setPieces.forEach((item) => {
                        let piece = document.createElement('li');
                            piece.innerHTML = '<img src="' + item.icon + '">';
                            piece.innerHTML += '<span>' + item.name + '</span>';
                        setList.appendChild(piece);
                    });
                    tooltip.appendChild(setList);
                } else if (tooltipData.startsWith('status-')) {
                    let matches = tooltipData.match(/(\d+)/g);
                    if (matches.length === 2) {
                        tooltip.innerHTML = statusEffects[matches[0]][matches[1]].effect;
                    } else {
                        tooltip.innerHTML = statusEffects[matches[0]].effect;
                    }
                } else if (tooltipData.startsWith('scalingdmg-')) {
                    let matches = tooltipData.match(/(\d+)/g);
                    let formula = damageScaling[matches[0]];
                    tooltip.innerHTML =
                        (formula.attack.str !== 0 ? `<b>` + formula.attack.str + `</b> x Strength<br>` : ``) +
                        (formula.attack.vit !== 0 ? `<b>` + formula.attack.vit + `</b> x Vitality<br>` : ``) +
                        (formula.attack.dex !== 0 ? `<b>` + formula.attack.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.attack.int !== 0 ? `<b>` + formula.attack.int + `</b> x Intelligence<br>` : ``) +
                        (formula.attack.mnd !== 0 ? `<b>` + formula.attack.mnd + `</b> x Mind<br>` : ``) +
                        (formula.attack.res !== 0 ? `<b>` + formula.attack.res + `</b> x Resistance<br>` : ``) +
                        ((formula.attack.wpatk !== 0 && (formula.attack.wpatk === formula.attack.aratk && formula.attack.wpatk === formula.attack.jwatk)) ?
                            `<b>` + formula.attack.wpatk + `</b> x Equipment ATK<br>` :
                            (formula.attack.wpatk !== 0 ? `<b>` + formula.attack.wpatk + `</b> x Weapon ATK<br>` : ``) +
                            (formula.attack.shatk !== 0 ? `<b>` + formula.attack.shatk + `</b> x Shield ATK<br>` : ``) +
                            (formula.attack.aratk !== 0 ? `<b>` + formula.attack.aratk + `</b> x Armor ATK<br>` : ``) +
                            (formula.attack.jwatk !== 0 ? `<b>` + formula.attack.jwatk + `</b> x Jewelry ATK<br>` : ``)) +
                        (formula.attack.clsatk !== 0 ? `<b>` + formula.attack.clsatk + `</b> x Class ATK<br>` : ``) +
                        ((formula.attack.wpdef !== 0 && (formula.attack.wpdef === formula.attack.ardef && formula.attack.wpdef === formula.attack.jwdef)) ?
                            `<b>` + formula.attack.wpdef + `</b> x Equipment DEF<br>` :
                            (formula.attack.wpdef !== 0 ? `<b>` + formula.attack.wpdef + `</b> x Weapon DEF<br>` : ``) +
                            (formula.attack.shdef !== 0 ? `<b>` + formula.attack.shdef + `</b> x Shield DEF<br>` : ``) +
                            (formula.attack.ardef !== 0 ? `<b>` + formula.attack.ardef + `</b> x Armor DEF<br>` : ``) +
                            (formula.attack.jwdef !== 0 ? `<b>` + formula.attack.jwdef + `</b> x Jewelry DEF<br>` : ``)) +
                        (formula.attack.clsdef !== 0 ? `<b>` + formula.attack.clsdef + `</b> x Class DEF<br>` : ``) +
                        (formula.attack.wskl !== 0 ? `<b>` + formula.attack.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        (formula.attack.aug !== 0 ? `<b>` + formula.attack.aug + `</b> x Augment Skill Rank<br>` : ``) +
                        (formula.attack.rac !== 0 ? `<b>` + formula.attack.rac + `</b> x Racial Skill Rank<br>` : ``) +
                        `<div class="text-center"><b>VS</b></div>` +
                        (formula.defend.str !== 0 ? `<b>` + formula.defend.str + `</b> x Strength<br>` : ``) +
                        (formula.defend.vit !== 0 ? `<b>` + formula.defend.vit + `</b> x Vitality<br>` : ``) +
                        (formula.defend.dex !== 0 ? `<b>` + formula.defend.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.defend.int !== 0 ? `<b>` + formula.defend.int + `</b> x Intelligence<br>` : ``) +
                        (formula.defend.mnd !== 0 ? `<b>` + formula.defend.mnd + `</b> x Mind<br>` : ``) +
                        (formula.defend.res !== 0 ? `<b>` + formula.defend.res + `</b> x Resistance<br>` : ``) +
                        ((formula.defend.wpatk !== 0 && (formula.defend.wpatk === formula.defend.aratk && formula.defend.wpatk === formula.defend.jwatk)) ?
                            `<b>` + formula.attack.wpatk + `</b> x Equipment ATK<br>` :
                            (formula.defend.wpatk !== 0 ? `<b>` + formula.defend.wpatk + `</b> x Weapon ATK<br>` : ``) +
                            (formula.defend.shatk !== 0 ? `<b>` + formula.defend.shatk + `</b> x Shield ATK<br>` : ``) +
                            (formula.defend.aratk !== 0 ? `<b>` + formula.defend.aratk + `</b> x Armor ATK<br>` : ``) +
                            (formula.defend.jwatk !== 0 ? `<b>` + formula.defend.jwatk + `</b> x Jewelry ATK<br>` : ``)) +
                        (formula.defend.clsatk !== 0 ? `<b>` + formula.defend.clsatk + `</b> x Class ATK<br>` : ``) +
                        ((formula.defend.wpdef !== 0 && (formula.defend.wpdef === formula.defend.ardef && formula.defend.wpdef === formula.defend.jwdef)) ?
                            `<b>` + formula.defend.wpdef + `</b> x Equipment DEF<br>` :
                            (formula.defend.wpdef !== 0 ? `<b>` + formula.defend.wpdef + `</b> x Weapon DEF<br>` : ``) +
                            (formula.defend.shdef !== 0 ? `<b>` + formula.defend.shdef + `</b> x Shield DEF<br>` : ``) +
                            (formula.defend.ardef !== 0 ? `<b>` + formula.defend.ardef + `</b> x Armor DEF<br>` : ``) +
                            (formula.defend.jwdef !== 0 ? `<b>` + formula.defend.jwdef + `</b> x Jewelry DEF<br>` : ``)) +
                        (formula.defend.clsdef !== 0 ? `<b>` + formula.defend.clsdef + `</b> x Class DEF<br>` : ``) +
                        (formula.defend.wskl !== 0 ? `<b>` + formula.defend.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        (formula.defend.aug !== 0 ? `<b>` + formula.defend.aug + `</b> x Augment Skill Rank<br>` : ``) +
                        (formula.defend.rac !== 0 ? `<b>` + formula.defend.rac + `</b> x Racial Skill Rank<br>` : ``)
                        ;
                } else if (tooltipData.startsWith('scalingacc-')) {
                    let matches = tooltipData.match(/(\d+)/g);
                    let formula = accuracyScaling[matches[0]];
                    tooltip.innerHTML =
                        (formula.attack.dex !== 0 ? `<b>` + formula.attack.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.attack.agi !== 0 ? `<b>` + formula.attack.agi + `</b> x Agility<br>` : ``) +
                        (formula.attack.int !== 0 ? `<b>` + formula.attack.int + `</b> x Intelligence<br>` : ``) +
                        (formula.attack.mnd !== 0 ? `<b>` + formula.attack.mnd + `</b> x Mind<br>` : ``) +
                        (formula.attack.avd !== 0 ? `<b>` + formula.attack.avd + `</b> x Avoidance<br>` : ``) +
                        (formula.attack.wskl !== 0 ? `<b>` + formula.attack.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        `<div class="text-center"><b>VS</b></div>` +
                        (formula.defend.dex !== 0 ? `<b>` + formula.defend.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.defend.agi !== 0 ? `<b>` + formula.defend.agi + `</b> x Agility<br>` : ``) +
                        (formula.defend.int !== 0 ? `<b>` + formula.defend.int + `</b> x Intelligence<br>` : ``) +
                        (formula.defend.mnd !== 0 ? `<b>` + formula.defend.mnd + `</b> x Mind<br>` : ``) +
                        (formula.defend.avd !== 0 ? `<b>` + formula.defend.avd + `</b> x Avoidance<br>` : ``) +
                        (formula.defend.wskl !== 0 ? `<b>` + formula.defend.wskl + `</b> x Weapon Skill Rank<br>` : ``)
                    ;
                } else {
                    tooltip.innerHTML = tooltips[tooltipData];
                }
                element.appendChild(tooltip);
            }
        });
    });
    if(tooltipButtons.length) {
        document.addEventListener('click', function () {
            let openTooltip = document.querySelector('.tooltip');
            if(openTooltip) {
                openTooltip.parentNode.classList.remove('open');
                fadeOut(openTooltip);
            }
        });
    }
}

function listObtains (itemId) {
    let obtainElement = document.createElement('div');
    let obtain = obtains.find((row) => row['id'] === itemId);
    let obtainWays = obtain.obtained.split(' | ');
    obtainWays.forEach((obt) => {
        if ( obt.indexOf('Obtained ') >= 0 ) {
            obt = obt.replace('Obtained ','');
            let locations = obt.split(', ');
            let infoGet = document.createElement('ul');
            infoGet.classList.add('get');
            infoGet.innerHTML = '<b>Received</b>';
            locations.forEach( (obt) => {
                let get = document.createElement('li');
                get.innerText = obt;
                infoGet.appendChild(get);
            });
            obtainElement.appendChild(infoGet);
        }
        if (obt.indexOf('Buy in ') >= 0) {
            obt = obt.replace('Buy in ','');
            let locations = obt.split(', ');
            let infoBuy = document.createElement('ul');
            infoBuy.classList.add('buy');
            infoBuy.innerHTML = '<b>Buy in</b>';
            locations.forEach( (obt) => {
                let buy = document.createElement('li');
                buy.innerText = obt;
                infoBuy.appendChild(buy);
            });
            obtainElement.appendChild(infoBuy);
        }
        if (obt.indexOf('Dropped by ') >= 0) {
            obt = obt.replace('Dropped by ','');
            let locations = obt.split(', ');
            let infoDrop = document.createElement('ul');
            infoDrop.classList.add('drop');
            infoDrop.innerHTML = '<b>Dropped by</b>';
            locations.forEach( (obt) => {
                let drop = document.createElement('li');
                drop.innerText = obt;
                infoDrop.appendChild(drop);
            });
            obtainElement.appendChild(infoDrop);
        }
        if (obt.indexOf('Stolen from ') >= 0) {
            obt = obt.replace('Stolen from ','');
            let locations = obt.split(', ');
            let infoSteal = document.createElement('ul');
            infoSteal.classList.add('steal');
            infoSteal.innerHTML = '<b>Stolen from</b>';
            locations.forEach( (obt) => {
                let steal = document.createElement('li');
                steal.innerText = obt;
                infoSteal.appendChild(steal);
            });
            obtainElement.appendChild(infoSteal);
        }
        if (obt.indexOf('Craft with ') >= 0) {
            obt = obt.replace('Craft with ','');
            let infoCraft = document.createElement('ul');
            infoCraft.classList.add('craft');
            infoCraft.innerHTML = '<b>Craft with <span class="green">' + obt + '</span></b>';
            let ingredients = [];
            let ingNum = 0;
            for (let i = 1; i <= 4; i++) {
                if ( obtain['ing' + i] ) {
                    if ( i > 1 && obtain['ing' + (i - 1)] === obtain['ing' + i] ) {
                        ingredients[ingNum - 1]['amt']++;
                    } else {
                        ingredients.push({
                            'id': obtain['ing' + i],
                            'amt': 1
                        });
                        ingNum++;
                    }
                }
            }
            ingredients.forEach( (ing) => {
                let ingredient = obtains.find((row) => row['id'] === ing.id);
                let craft = document.createElement('li');
                craft.innerHTML = '<span>' + ingredient.name + '</span><b>x' + ing.amt + '</b>';
                infoCraft.appendChild(craft);
            });
            obtainElement.appendChild(infoCraft);
        }
        if (obt.indexOf('Auctioned from ') >= 0) {
            obt = obt.replace('Auctioned from ','');
            let locations = obt.split(', ');
            let infoAuction = document.createElement('ul');
            infoAuction.classList.add('auction');
            infoAuction.innerHTML = '<b>Auctioned from</b>';
            locations.forEach( (obt) => {
                let auction = document.createElement('li');
                auction.innerText = obt;
                infoAuction.appendChild(auction);
            });
            obtainElement.appendChild(infoAuction);
        }
    });
    return obtainElement.innerHTML;
}

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

function unmaskBits (integer) {

    let unmaskedBits = [0,0,0,0,0,0,0,0];
    if (integer >= 128) {
        unmaskedBits[7] = 1;
        integer = integer - 128;
    }
    if (integer >= 64) {
        unmaskedBits[6] = 1;
        integer = integer - 64;
    }
    if (integer >= 32) {
        unmaskedBits[5] = 1;
        integer = integer - 32;
    }
    if (integer >= 16) {
        unmaskedBits[4] = 1;
        integer = integer - 16;
    }
    if (integer >= 8) {
        unmaskedBits[3] = 1;
        integer = integer - 8;
    }
    if (integer >= 4) {
        unmaskedBits[2] = 1;
        integer = integer - 4;
    }
    if (integer >= 2) {
        unmaskedBits[1] = 1;
        integer = integer - 2;
    }
    if (integer >= 1) {
        unmaskedBits[0] = 1;
    }
    return unmaskedBits;
}

function getOpposingElement (element) {
    switch (element) {
        case 1:
            return 6;
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3;
        case 5:
            return 4;
        case 6:
            return 5;
        case 7:
            return 8;
        case 8:
            return 7;
    }
}

function getEffectText (ability, effectSet) {
    let effectProperties = {};
    let effect1 = 'eff' + effectSet + '1';
    let effect2 = 'eff' + effectSet + '2';
    let scaling = 'eff' + effectSet + 'scale';
    let formula = 'eff' + effectSet + 'form';
    let power = 'eff' + effectSet + 'pow';
    let self = 'eff' + effectSet + 'self';
    let target = 'eff' + effectSet + 'trg';
    let hit1 = 'eff' + effectSet + 'hitch1';
    let hit2 = 'eff' + effectSet + 'hitch2';
    let accuracy = 'eff' + effectSet + 'acc';
    let damage = 'eff' + effectSet + 'dmgt';
    let element = 'eff' + effectSet + 'ele';

    let effectText = '';
    if (ability[effect1] === 1) {
        if ( ability[scaling] > 0 ) {
            effectText += `<span data-tooltip="scalingdmg-` + ability[scaling] + `" data-position="bottom" data-size="large">` + damageScaling[ability[scaling]].name + `</span>`;
            if ( ability.typ >= 22 && ability.typ <= 43 ) effectText += ' +W.Skill';
        } else {
            effectText += 'Damage ';
        }
        if ( ability[formula] === 0 && ability.eff1form === 16 )
            effectText += 'for User\'s MaxHP - CurrentHP if Above 50%, or CurrentHP if Below';
        else if (ability[formula] === 0)
            effectText += 'for the Amount of Main';
        else if (ability[formula] === 1)
            effectText += 'for the Amount of Previous';
        else if (ability[formula] === 10)
            effectText += 'for ' + ability[power] + '% of Current HP';
        else if (ability[formula] === 16)
            effectText += 'for MaxHP - CurrentHP';
        else if (ability[power] > 0)
            effectText += ' +' + ability[power];
    } else if (ability[effect1] === 2) {
        if (ability[scaling] === 1)
            effectText += 'Spell Heal' + (ability[power] > 0 ? ' +' + ability[power] : '');
        else {
            effectText += 'Heal ';
            if ( ability[formula] === 9 || ability[formula] === 14 )
                effectText += 'for ' + ability[power] + '% of Max';
            else if (ability[formula] === 10)
                effectText += 'for ' + ability[power] + '% of Current';
            else if (ability[formula] === 0)
                effectText += 'for the Amount of Main';
            else if (ability[formula] === 1)
                effectText += 'for the Amount of Previous';
            else
                effectText += ability[power];
        }
    } else if (ability[effect1] === 4) {
        if ( ability[scaling] > 0 ) {
            effectText += `<span data-tooltip="scalingdmg-` + ability[scaling] + `" data-position="bottom" data-size="large">` + damageScaling[ability[scaling]].name + `</span>`;
            if ( ability.typ >= 22 && ability.typ <= 43 ) effectText += ' +W.Skill';
        } else {
            effectText += 'Damage';
        }
        effectText += ' to MP ';
        if ( ability[formula] === 17 || ability[formula] === 18 )
            effectText += 'for ' + ability[power] + '% of Current';
        else if (ability[formula] === 16)
            effectText += 'for 100% of Max';
        else if (ability[power] > 0)
            effectText += '+' + ability[power];
    } else if (ability[effect1] === 5) {
        effectText += 'Charge MP ';
        if (ability[formula] === 21 )
            effectText += 'for ' + ability[power] + '% of Max';
        else if (ability[formula] === 0)
            effectText += 'for the Amount of Main';
        else if (ability[formula] === 1)
            effectText += 'for the Amount of Previous';
        else
            effectText += ability[power];
    } else if (ability[effect1] === 8) {
        if ( ability[scaling] > 0 ) {
            effectText += `<span data-tooltip="scalingdmg-` + ability[scaling] + `" data-position="bottom" data-size="large">` + damageScaling[ability[scaling]].name + `</span>`;
            if ( ability.typ >= 22 && ability.typ <= 43 ) effectText += ' +W.Skill';
        } else {
            effectText += 'Damage';
        }
        effectText += ' to TP ';
        if (ability[formula] === 23)
            effectText += 'for ' + ability[power] + '% of Current';
        else if (ability[formula] === 16)
            effectText += 'for 100% of Max';
        else if (ability[formula] === 5)
            effectText += ability[power] + ' - ' + ability[power] * 1.5;
        else
            effectText += ability[power];
    } else if (ability[effect1] === 9) {
        effectText += 'Charge TP ';
        if (ability[formula] === 10)
            effectText += 'for ' + ability[power] + '% of Current HP';
        if (ability[formula] === 23)
            effectText += 'for ' + ability[power] + '% of Current TP';
        else if (ability[formula] === 0)
            effectText += 'for the Amount of Main';
        else if (ability[formula] === 1)
            effectText += 'for the Amount of Previous';
        else
            effectText += ability[power];
    } else if (ability[effect1] === 12) {
        effectText += 'Delay RT by ' + ability[power];
    } else if (ability[effect1] === 18) {
        let duration = '';
        if (ability[formula] === 6)
            duration = ' for ' + ability[power] + ' Turns';
        else if (ability[formula] === 8)
            duration = ' for ' + ability[power] * 10 + ' RT';
        effectText += '<span data-tooltip="status-18-' + ability[effect2] + '">'
            + statusEffects[18][ability[effect2]].name + '</span>' + duration;
    } else if (ability[effect1] === 19) {
        effectText += 'Remove ' +  '<span data-tooltip="status-18-' + ability[effect2] + '">'
        + statusEffects[18][ability[effect2]].name + '</span>';
    } else if (ability[effect1] === 20) {
        effectText += 'Ready ' +  '<span data-tooltip="status-20-' + ability[effect2] + '">'
        + statusEffects[20][ability[effect2]].name + '</span>';
    } else if (ability[effect1] === 65) {
        effectText += 'Raise ' + baseStats[ability[effect2]].name + ' Permanently by ' + ability[power] / 10 + ' points';
    } else {
        effectText += statusEffects[ability[effect1]].name;
    }

    let restrictText = '';
    if ( ability[self] || ability[target] ) {
        if (ability[self])
            restrictText = 'Self';
        else if (ability[target] === 22 && ability[effect1] === 35)
            restrictText = 'Clones';
        else
            restrictText = abilityTargeting[ability[target]];
    } else
        restrictText = '—';

    let accuracyText = '';
    if ([2,3].includes(ability[hit1]) || ability[hit1] === 5 && ability[hit2] > 0) {
        accuracyText = ability[hit2] + '%';
    } else if (ability[hit1] === 4) {
        accuracyText = '100%';
    } else if ([7,8].includes(ability[hit1])) {
        accuracyText = ability[hit2] + '% + 10%/Skill Rank';
    } else if (ability[accuracy] > 0) {
        accuracyText = `<span data-tooltip="scalingacc-` + ability[accuracy] + `" data-position="bottom" data-size="large">` + accuracyScaling[ability[accuracy]].name + `</span>`;
    } else {
        accuracyText = '—';
    }
    if ([1,3,4].includes(ability[hit1])) {
        accuracyText += ' if Main Hits';
    } else if (ability[hit1] === 5) {
        accuracyText += ' if Previous Hits';
    }

    let damageProps = [];
    if ([1,4,8].includes(ability[effect1])) {
        if ([10, 16, 17, 18, 23].includes(ability[formula])) {
            let damageProp = {};
            damageProp['name'] = damageTypes[4].name;
            damageProp['icon'] = damageTypes[4].icon;
            damageProps.push(damageProp);
        } else {
            let damageProp = {};
            if ( ability[scaling] === 20 || ability[formula] === 5 ) {
                damageProp['name'] = damageTypes[5].name;
                damageProp['icon'] = damageTypes[5].icon;
            } else if ( [0,1].includes(ability[formula]) ) {
                damageProp['name'] = damageTypes[4].name;
                damageProp['icon'] = damageTypes[4].icon;
            } else if ( !ability[damage] && !ability[element] && ability[formula] !== 4 ) {
                damageProp['name'] = damageTypes[6].name;
                damageProp['icon'] = damageTypes[6].icon;
            } else if (ability[damage]) {
                damageProp['name'] = damageTypes[ability[damage]].name;
                damageProp['icon'] = damageTypes[ability[damage]].icon;
            }
            if (damageProp.name) {
                damageProps.push(damageProp);
                damageProp = {};
            }
            if (ability[element]) {
                damageProp['name'] = elements[ability[element]].name;
                damageProp['icon'] = elements[ability[element]].icon;
                damageProps.push(damageProp);
            }
        }
    }

    effectProperties['effect'] = effectText;
    effectProperties['restrict'] = restrictText;
    effectProperties['accuracy'] = accuracyText;
    effectProperties['damage'] = damageProps;
    return effectProperties;
}
