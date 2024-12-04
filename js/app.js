
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
                event.target.classList.add('open');
                let tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                let tooltipText = '';
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
                } else {
                    tooltip.innerHTML = tooltips[tooltipData];
                }
                event.target.appendChild(tooltip);
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
        if ( ability[scaling] === 37 )
            effectText += 'Spell ';
        else if (ability[scaling] === 39)
            effectText += 'Raw ';
        else if ( ability[scaling] <= 19 )
            effectText += 'Attack ';
        effectText += 'Damage ';
        if ( ability[scaling] === 3 || ability[scaling] === 5 )
            effectText += 'STR/DEX';
        else if ( ability[scaling] === 9 || ability[scaling] === 11 )
            effectText += 'DEX/STR';
        else if ( ability[scaling] === 15 || ability[scaling] === 17 )
            effectText += 'MND/INT';
        else if ( ability[scaling] === 19 )
            effectText += 'VIT/STR';
        if ( ability.typ >= 22 && ability.typ <= 43 && ability[scaling] >= 1 && ability[scaling] <= 17 )
            effectText += ' +W.Skill';
        if ( ability[scaling] === 5 || ability[scaling] === 11 || ability[scaling] === 17 )
            effectText += ' +TP';
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
            effectText += ' +' + (ability[scaling] === 27 ? ability[power] + 40 : ability[power]);
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
        if ( ability[scaling] >= 21 && ability[scaling] <= 27 )
            effectText += 'Spell ';
        else if (ability[scaling] === 20)
            effectText += 'Raw ';
        else if ( ability[scaling] >= 31 && ability[scaling] <= 37 )
            effectText += 'Attack ';
        effectText += 'MP Damage ';
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
        if ( ability[scaling] >= 21 && ability[scaling] <= 27 )
            effectText += 'Spell ';
        else if (ability[scaling] === 20)
            effectText += 'Raw ';
        else if ( ability[scaling] >= 31 && ability[scaling] <= 37 )
            effectText += 'Attack ';
        effectText += 'TP Damage ';
        if (ability[formula] === 23)
            effectText += 'for ' + ability[power] + '% of Current';
        else if (ability[formula] === 16)
            effectText += 'for 100% of Max';
        else if (ability[scaling] === 23)
            effectText += '+' + ability[power];
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
    if ([2,3].includes(ability[hit1])) {
        accuracyText = ability[hit2] + '%';
    } else if (ability[hit1] === 4) {
        accuracyText = '100%';
    } else if ([7,8].includes(ability[hit1])) {
        accuracyText = ability[hit2] + '% + 10%/Skill Rank';
    } else if (ability[accuracy] === 1) {
        accuracyText = 'Melee Attack';
    } else if (ability[accuracy] === 3) {
        accuracyText = 'Projectile Attack';
    } else if (ability[accuracy] === 5) {
        accuracyText = 'Gaze Spell';
    } else if (ability[accuracy] === 7) {
        accuracyText = 'Projectile Spell';
    } else if (ability[accuracy] === 9) {
        accuracyText = 'Forbidden Spell';
    } else if (ability[accuracy] === 11) {
        accuracyText = 'Debuff Spell';
    } else if (ability[accuracy] === 17) {
        accuracyText = 'Melee Attack + TP';
    } else if (ability[accuracy] === 19) {
        accuracyText = 'Projectile Attack + TP';
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
