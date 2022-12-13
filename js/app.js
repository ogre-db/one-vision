
document.addEventListener('DOMContentLoaded', function() {

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

});

function openPanel (panel) {

    if ( ! panel.classList.contains('open') ) {
        panel.classList.add('open', 'fade-from-right');
    }
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

function forEach (array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
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
        if ( ability[scaling] >= 21 && ability[scaling] <= 27 )
            effectText += 'Spell ';
        else if (ability[scaling] === 20)
            effectText += 'Raw ';
        else if ( ability[scaling] >= 31 && ability[scaling] <= 37 )
            effectText += 'Attack ';
        effectText += 'Damage ';
        if ( ability[scaling] === 31 || ability[scaling] === 33 )
            effectText += 'STR/DEX';
        else if ( ability[scaling] === 35 || ability[scaling] === 37 )
            effectText += 'DEX/STR';
        if ( ability.typ >= 22 && ability.typ <= 43 && ability[formula] > 1 )
            effectText += ' +W.Skill';
        if ( ability[scaling] === 33 || ability[scaling] === 37 )
            effectText += ' +TP';
        if (ability[scaling] === 20)
            effectText += 100 / ability[power] + 'X';
        else if ( ability[formula] === 0 && ability.eff1form === 16 )
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
        effectText += statusEffects[18][ability[effect2]].name;
        if (ability[formula] === 6)
            effectText += ' for ' + ability[power] + ' Turns';
        else if (ability[formula] === 8)
            effectText += ' for ' + ability[power] * 10 + ' RT';
    } else if (ability[effect1] === 19) {
        effectText += 'Remove ' + statusEffects[18][ability[effect2]].name;
    } else if (ability[effect1] === 20) {
        effectText += statusEffects[20][ability[effect2]].name;
    } else if (ability[effect1] === 65) {
        effectText += 'Raise ' + baseStats[ability[effect2]].name + ' Permanently by ' + ability[power] / 10 + ' points';
    } else {
        effectText += statusEffects[ability[effect1]].name;
    }

    let restrictText = '';
    if ( ability[self] || ability[target] ) {
        if (ability[self])
            restrictText = 'Self';
        else
            restrictText = abilityTargeting[ability[target]];
    } else
        restrictText = '—';

    let accuracyText = '';
    if (ability[hit1] === 1) {
        accuracyText = '100% if Previous Hits';
    } else if (ability[hit1] === 2) {
        accuracyText = ability[hit2] + '%';
    } else if (ability[hit1] === 3) {
        accuracyText = ability[hit2] + '% if Main Hits';
    } else if (ability[hit1] === 4) {
        accuracyText = '100% if Main Hits';
    } else if (ability[hit1] === 8) {
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

    let damageText = '';
    if ([1,4,8].includes(ability[effect1])) {
        if ([10,16,17,18,23].includes(ability[formula]))
            damageText = damageTypes[4].name;
        else {
            if ( ability[scaling] === 20 || ability[formula] === 5 )
                damageText += damageTypes[5].name;
            else if ( !ability[damage] && !ability[element] )
                damageText = damageTypes[6].name;
            else if (ability[damage])
                damageText = damageTypes[ability[damage]].name;
            if (ability[element]) {
                if (damageText.length > 0)
                    damageText += ' ';
                damageText += elements[ability[element]].name;
            }

        }
    } else {
        damageText = '—';
    }

    effectProperties['effect'] = effectText;
    effectProperties['restrict'] = restrictText;
    effectProperties['accuracy'] = accuracyText;
    effectProperties['damage'] = damageText;
    return effectProperties;
}

const elements = {
    '0': {
        'name': 'None',
        'icon': 'img/icons/icon-blank.png'
    },
    '1': {
        'name': 'Air',
        'icon': 'img/icons/element-air.png'
    },
    '2': {
        'name': 'Earth',
        'icon': 'img/icons/element-earth.png'
    },
    '3': {
        'name': 'Lightning',
        'icon': 'img/icons/element-lightning.png'
    },
    '4': {
        'name': 'Water',
        'icon': 'img/icons/element-water.png'
    },
    '5': {
        'name': 'Fire',
        'icon': 'img/icons/element-fire.png'
    },
    '6': {
        'name': 'Ice',
        'icon': 'img/icons/element-ice.png'
    },
    '7': {
        'name': 'Light',
        'icon': 'img/icons/element-light.png'
    },
    '8': {
        'name': 'Dark',
        'icon': 'img/icons/element-dark.png'
    },
    '9': {
        'name': 'Draconic',
        'icon': 'img/icons/element-dark.png'
    },
    '10': {
        'name': 'Necromancy',
        'icon': 'img/icons/element-dark.png'
    },
    '12': {
        'name': 'Art Of War',
        'icon': 'img/icons/element-dark.png'
    },
};

const races = {
    '0': {
        'name': 'None',
        'icon': 'img/icons/icon-blank.png'
    },
    '2': {
        'name': 'Human',
        'icon': 'img/icons/damage-human.png'
    },
    '4': {
        'name': 'Beast',
        'icon': 'img/icons/damage-beast.png'
    },
    '6': {
        'name': 'Reptile',
        'icon': 'img/icons/damage-reptile.png'
    },
    '8': {
        'name': 'Dragon',
        'icon': 'img/icons/damage-dragon.png'
    },
    '10': {
        'name': 'Divine',
        'icon': 'img/icons/damage-divine.png'
    },
    '12': {
        'name': 'Umbra',
        'icon': 'img/icons/damage-umbra.png'
    },
    '14': {
        'name': 'Faerie',
        'icon': 'img/icons/damage-faerie.png'
    },
    '16': {
        'name': 'Phantom',
        'icon': 'img/icons/damage-phantom.png'
    },
    '18': {
        'name': 'Golem',
        'icon': 'img/icons/damage-golem.png'
    },
};

const damageTypes = {
    '0': {
        'name': 'None',
        'icon': 'img/icons/icon-blank.png'
    },
    '1': {
        'name': 'Crushing',
        'icon': 'img/icons/damage-crush.png'
    },
    '2': {
        'name': 'Slashing',
        'icon': 'img/icons/damage-slash.png'
    },
    '3': {
        'name': 'Piercing',
        'icon': 'img/icons/damage-pierce.png'
    },
    '4': {
        'name': 'Percentage'
    },
    '5': {
        'name': 'Raw'
    },
    '6': {
        'name': 'Void'
    }
};

const types = {
    '32': {
        'name': 'Consumables',
        'icon': 'img/icons/item-consumable.png'
    },
    '33': {
        'name': 'Treasure',
        'icon': 'img/icons/item-treasure.png'
    },
    '34': {
        'name': 'Arcana',
        'icon': 'img/icons/item-arcana.png'
    },
    '35': {
        'name': 'Classmarks',
        'icon': 'img/icons/item-classmark.png'
    },
    '36': {
        'name': 'Ingredients',
        'icon': 'img/icons/item-material.png'
    },
    '37': {
        'name': 'Recipes',
        'icon': 'img/icons/item-recipe.png'
    },
    '161': {
        'name': 'Fists',
        'icon1': 'img/icons/equip-claw.png',
        'icon2': 'img/icons/equip-claw.png'
    },
    '162': {
        'name': 'Daggers',
        'icon1': 'img/icons/equip-dagger.png',
        'icon2': 'img/icons/equip-dagger.png'
    },
    '163': {
        'name': '1H Swords',
        'icon1': 'img/icons/equip-sword1h.png',
        'icon2': 'img/icons/equip-sword1hb.png'
    },
    '164': {
        'name': '2H Swords',
        'icon1': 'img/icons/equip-sword2h.png',
        'icon2': 'img/icons/equip-sword2h.png'
    },
    '165': {
        'name': 'Axes',
        'icon1': 'img/icons/equip-axe1h.png',
        'icon2': 'img/icons/equip-axe2h.png'
    },
    '167': {
        'name': 'Spears',
        'icon1': 'img/icons/equip-spear1h.png',
        'icon2': 'img/icons/equip-spear2h.png'
    },
    '168': {
        'name': 'Hammers',
        'icon1': 'img/icons/equip-hammer1h.png',
        'icon2': 'img/icons/equip-hammer2h.png'
    },
    '170': {
        'name': '1H Katana',
        'icon1': 'img/icons/equip-katana1h.png',
        'icon2': 'img/icons/equip-katana1h.png'
    },
    '171': {
        'name': '2H Katana',
        'icon1': 'img/icons/equip-katana2h.png',
        'icon2': 'img/icons/equip-katana2h.png'
    },
    '172': {
        'name': 'Staves',
        'icon1': 'img/icons/equip-cudgel1h.png',
        'icon2': 'img/icons/equip-cudgel2h.png'
    },
    '174': {
        'name': 'Whips',
        'icon1': 'img/icons/equip-whip.png',
        'icon2': 'img/icons/equip-whip.png'
    },
    '175': {
        'name': 'Spellbooks',
        'icon1': 'img/icons/equip-spellbook.png',
        'icon2': 'img/icons/equip-spellbook.png'
    },
    '176': {
        'name': 'Instruments',
        'icon1': 'img/icons/equip-instrument.png',
        'icon2': 'img/icons/equip-instrument.png'
    },
    '177': {
        'name': 'Sidearms',
        'icon1': 'img/icons/equip-sidearm.png',
        'icon2': 'img/icons/equip-throwing.png'
    },
    '178': {
        'name': 'Bows',
        'icon1': 'img/icons/equip-bow1h.png',
        'icon2': 'img/icons/equip-bow2h.png'
    },
    '179': {
        'name': 'Crossbows',
        'icon1': 'img/icons/equip-crossbow1h.png',
        'icon2': 'img/icons/equip-crossbow2h.png'
    },
    '180': {
        'name': 'Fusils',
        'icon1': 'img/icons/equip-fusil1h.png',
        'icon2': 'img/icons/equip-fusil2h.png'
    },
    '245': {
        'name': 'Lobber',
        'icon1': 'img/icons/equip-lobber.png',
        'icon2': 'img/icons/equip-lobber.png'
    },
    '261': {
        'name': 'Innate Melee',
        'icon1': 'img/icons/equip-unarmed.png',
        'icon2': 'img/icons/equip-unarmed.png'
    },
    '277': {
        'name': 'Innate Ranged',
        'icon1': 'img/icons/equip-throw.png',
        'icon2': 'img/icons/equip-throw.png'
    },
    '290': {
        'name': 'Innate Melee',
        'icon1': 'img/icons/equip-unarmed.png',
        'icon2': 'img/icons/equip-unarmed.png'
    },
    '291': {
        'name': 'Innate Ranged',
        'icon1': 'img/icons/equip-throw.png',
        'icon2': 'img/icons/equip-throw.png'
    },
    '345': {
        'name': 'Innate Lobber',
        'icon1': 'img/icons/equip-lobber.png',
        'icon2': 'img/icons/equip-lobber.png'
    },
    '182': {
        'name': 'Shields',
        'iconc': 'img/icons/equip-shieldcloth.png',
        'iconl': 'img/icons/equip-shieldlight.png',
        'iconh': 'img/icons/equip-shieldheavy.png'
    },
    '23': {
        'name': 'Helms',
        'iconc': 'img/icons/equip-helmcloth.png',
        'iconl': 'img/icons/equip-helmlight.png',
        'iconh': 'img/icons/equip-helmheavy.png',
        'iconm': 'img/icons/equip-helmmage.png',
        'icona': 'img/icons/equip-helmsniper.png'
    },
    '24': {
        'name': 'Body Armor',
        'iconc': 'img/icons/equip-armorcloth.png',
        'iconl': 'img/icons/equip-armorlight.png',
        'iconh': 'img/icons/equip-armorheavy.png',
        'iconm': 'img/icons/equip-armormage.png',
        'icona': 'img/icons/equip-armorlight.png'
    },
    '25': {
        'name': 'Armguards',
        'iconc': 'img/icons/equip-armcloth.png',
        'iconl': 'img/icons/equip-armlight.png',
        'iconh': 'img/icons/equip-armheavy.png',
        'iconm': 'img/icons/equip-armmage.png',
        'icona': 'img/icons/equip-armsniper.png',
        'icond': 'img/icons/equip-armhealer.png'
    },
    '27': {
        'name': 'Legguards',
        'iconc': 'img/icons/equip-legcloth.png',
        'iconl': 'img/icons/equip-leglight.png',
        'iconh': 'img/icons/equip-legheavy.png',
        'iconm': 'img/icons/equip-legmage.png',
        'icona': 'img/icons/equip-legsniper.png',
        'icond': 'img/icons/equip-leghealer.png'
    },
    '29': {
        'name': 'Jewelry',
        'icon': 'img/icons/equip-jewelry.png',
    }
};

const armorTypes = {
    'c': {
        'name': 'Cloth'
    },
    'l': {
        'name': 'Light'
    },
    'h': {
        'name': 'Heavy'
    },
    'm': {
        'name': 'Mage'
    },
    'a': {
        'name': 'Sniper'
    },
    'd': {
        'name': 'Healer'
    }
};

const scalingFormula = {
    '0': {
        'name': '—'
    },
    '1': {
        'name': 'Str/<small>Dex</small>'
    },
    '5': {
        'name': 'Dex/<small>Str</small>'
    },
    '7': {
        'name': 'Dex/<small>Str</small>'
    },
    '20': {
        'name': 'Level'
    }
};

const accuracyFormula = {
    '0': {
        'name': '—'
    },
    '1': {
        'name': 'Melee'
    },
    '3': {
        'name': 'Ranged'
    },
    '7': {
        'name': 'Ranged'
    },
    '9': {
        'name': 'Melee'
    },
    '22': {
        'name': '100%'
    }
};

const attackType = {
    '1': {
        'name': 'Direct'
    },
    '2': {
        'name': 'Line'
    },
    '11': {
        'name': 'Straight'
    },
    '12': {
        'name': 'Arc'
    },
    '24': {
        'name': 'Lob Item'
    },
    '25': {
        'name': 'Line-Shot'
    }
};

const itemSets = {
    '1': {
        'name': 'Legion'
    },
    '2': {
        'name': 'Ogre'
    },
    '3': {
        'name': 'Shadowmaster'
    },
    '4': {
        'name': "Ji'ygla"
    },
    '5': {
        'name': 'Dragonslayer'
    }
};

const abilityRangeType = {
    '0': {
        'name': '—'
    },
    '1': {
        'name': 'Direct'
    },
    '2': {
        'name': 'Line'
    },
    '3': {
        'name': 'Indirect'
    },
    '4': {
        'name': 'Indirect'
    },
    '5': {
        'name': 'Indirect'
    },
    '6': {
        'name': 'Self'
    },
    '7': {
        'name': 'Special'
    },
    '10': {
        'name': 'Self AoE'
    },
    '11': {
        'name': 'Cone'
    },
    '12': {
        'name': 'Indirect'
    },
    '14': {
        'name': 'All Enemies'
    },
    '16': {
        'name': 'Ground'
    }
};

const abilityTargeting = {
    '0': '—',
    '1': 'Self, Enemies',
    '2': 'Self, Allies',
    '3': 'Living',
    '4': '—',
    '5': 'Allies, Enemies',
    '6': 'Enemies',
    '7': 'Allies',
    '8': 'Living Except Self',
    '9': 'Floating Units',
    '10': 'Undead',
    '11': 'Stilled Undead',
    '12': 'Front-Facing Foes with Clear Line of Sight and no Shield Equipped',
    '13': 'Humans',
    '14': 'Beasts',
    '15': 'Reptiles',
    '16': 'Dragons',
    '17': 'Divine',
    '18': 'Umbra',
    '19': 'Faeries',
    '20': 'Phantoms',
    '21': 'Golems',
    '22': 'Incapacitated',
    '23': 'Male Only',
    '24': 'Incapacitated, Stilled',
    '25': 'No Obstacles',
    '26': 'All',
    '27': 'Zombies',
    '28': 'Skeletons, Ghosts'
};

const statusEffects = {
    '1': {
        'name': 'Damage HP'
    },
    '2': {
        'name': 'Restore HP'
    },
    '3': {
        'name': 'Incapacitate'
    },
    '4': {
        'name': 'Damage MP'
    },
    '5': {
        'name': 'Charge MP'
    },
    '6': {
        'name': 'Reset MP to Zero'
    },
    '7': {
        'name': '—'
    },
    '8': {
        'name': 'Damage TP'
    },
    '9': {
        'name': 'Restore TP'
    },
    '10': {
        'name': 'Reset TP to Zero'
    },
    '11': {
        'name': '—'
    },
    '12': {
        'name': 'Delay RT'
    },
    '13': {
        'name': 'Advance RT to Zero'
    },
    '14': {
        'name': 'Rewind RT Countdown Back to Start'
    },
    '15': {
        'name': '—'
    },
    '16': {
        'name': 'Change Facing'
    },
    '17': {
        'name': 'Exorcise'
    },
    '18': {
        'name': 'inflict',
        '0': {
            'name': 'Incapacitated'
        },
        '1': {
            'name': 'Deceased'
        },
        '2': {
            'name': 'Still Undead'
        },
        '3': {
            'name': 'Near Death'
        },
        '4': {
            'name': 'Sleep'
        },
        '5': {
            'name': 'Charm'
        },
        '6': {
            'name': 'Bewitch'
        },
        '7': {
            'name': 'Spendthrift'
        },
        '8': {
            'name': 'Paranoia'
        },
        '9': {
            'name': 'Stun'
        },
        '10': {
            'name': 'Silence'
        },
        '11': {
            'name': 'Petrify'
        },
        '12': {
            'name': 'Bind'
        },
        '13': {
            'name': 'Shackle'
        },
        '14': {
            'name': 'Stop'
        },
        '15': {
            'name': 'Poison'
        },
        '16': {
            'name': 'Poison'
        },
        '17': {
            'name': 'Hobble'
        },
        '18': {
            'name': 'Leaden'
        },
        '19': {
            'name': 'Wither'
        },
        '20': {
            'name': 'Addle'
        },
        '21': {
            'name': 'Curse'
        },
        '22': {
            'name': 'Frighten'
        },
        '23': {
            'name': 'Quicken'
        },
        '24': {
            'name': 'Slow'
        },
        '25': {
            'name': '—'
        },
        '26': {
            'name': 'Nimble'
        },
        '27': {
            'name': 'Waterwalk'
        },
        '28': {
            'name': '—'
        },
        '29': {
            'name': 'Lavawalk'
        },
        '30': {
            'name': 'Blinkwalk'
        },
        '31': {
            'name': 'Cloudwalk'
        },
        '32': {
            'name': 'Windwalk'
        },
        '33': {
            'name': 'Renewal'
        },
        '34': {
            'name': 'Pain Aura'
        },
        '35': {
            'name': 'Nullify One Attack or Item'
        },
        '36': {
            'name': 'Negate One Spell'
        },
        '37': {
            'name': 'Sanctify'
        },
        '38': {
            'name': 'Battering Ram'
        },
        '39': {
            'name': 'Strengthen'
        },
        '40': {
            'name': 'Weaken'
        },
        '41': {
            'name': 'Spellcraft'
        },
        '42': {
            'name': 'Feeblemind'
        },
        '43': {
            'name': 'Healcraft'
        },
        '44': {
            'name': 'Spoilheal'
        },
        '45': {
            'name': 'Fortify'
        },
        '46': {
            'name': 'Breach'
        },
        '47': {
            'name': 'Resilient'
        },
        '48': {
            'name': 'Rupture'
        },
        '49': {
            'name': 'Truestrike'
        },
        '50': {
            'name': 'Falsestrike'
        },
        '51': {
            'name': 'Trueflight'
        },
        '52': {
            'name': 'Falseflight'
        },
        '53': {
            'name': 'Spellstrike'
        },
        '54': {
            'name': 'Spellslip'
        },
        '55': {
            'name': 'Dodge'
        },
        '56': {
            'name': 'Stagger'
        },
        '57': {
            'name': 'Sidestep'
        },
        '58': {
            'name': 'Misstep'
        },
        '59': {
            'name': 'Air-bringer'
        },
        '60': {
            'name': 'Earth-bringer'
        },
        '61': {
            'name': 'Lightning-bringer'
        },
        '62': {
            'name': 'Water-bringer'
        },
        '63': {
            'name': 'Lightning-bringer'
        },
        '64': {
            'name': 'Ice-bringer'
        },
        '65': {
            'name': 'Light-bringer'
        },
        '66': {
            'name': 'Dark-bringer'
        },
        '67': {
            'name': 'Silence-Bringer'
        },
        '68': {
            'name': 'Stun-Bringer'
        },
        '69': {
            'name': 'Poison-Bringer'
        },
        '70': {
            'name': 'Resist Air'
        },
        '71': {
            'name': 'Resist Earth'
        },
        '72': {
            'name': 'Resist Lightning'
        },
        '73': {
            'name': 'Resist Water'
        },
        '74': {
            'name': 'Resist Fire'
        },
        '75': {
            'name': 'Resist Ice'
        },
        '76': {
            'name': 'Resist Light'
        },
        '77': {
            'name': 'Resist Dark'
        },
        '78': {
            'name': 'Air-averse'
        },
        '79': {
            'name': 'Earth-averse'
        },
        '80': {
            'name': 'Lightning-averse'
        },
        '81': {
            'name': 'Water-averse'
        },
        '82': {
            'name': 'Fire-averse'
        },
        '83': {
            'name': 'Ice-averse'
        },
        '84': {
            'name': 'Light-averse'
        },
        '85': {
            'name': 'Dark-averse'
        }
    },
    '19': {
        'name': 'remove'
    },
    '20': {
        'name': 'ready',
        '1': {
            'name': 'Mighty Strike'
        },
        '2': {
            'name': 'Surestrike'
        },
        '3': {
            'name': 'Double Strike'
        },
        '4': {
            'name': 'Tremendous Shot'
        },
        '5': {
            'name': 'Sureshot'
        },
        '6': {
            'name': 'Double Shot'
        },
        '7': {
            'name': 'Conserve RT'
        },
        '8': {
            'name': 'Extend'
        },
        '9': {
            'name': "Mother's Blessing"
        },
        '10': {
            'name': 'Conserve MP'
        },
        '11': {
            'name': 'Old Phalanx'
        },
        '12': {
            'name': 'Guardian Force'
        },
        '13': {
            'name': 'Fearful Impact'
        },
        '14': {
            'name': 'Berserk'
        },
        '15': {
            'name': 'Last Resort'
        },
        '16': {
            'name': 'Meat Shield'
        },
        '17': {
            'name': 'Blade Spirit'
        },
        '18': {
            'name': "Mind's Eye"
        },
        '19': {
            'name': 'Preempt'
        },
        '20': {
            'name': 'Dragonslayer'
        },
        '21': {
            'name': 'Dragonsbane'
        },
        '22': {
            'name': 'Empower Dragon'
        },
        '23': {
            'name': 'Repel Dragon'
        },
        '24': {
            'name': 'Concentration'
        },
        '25': {
            'name': 'Steelstance'
        },
        '26': {
            'name': 'Sneak Attack'
        },
        '27': {
            'name': 'Sharpshoot'
        },
        '28': {
            'name': 'Course Correction'
        },
        '29': {
            'name': 'Beastslayer'
        },
        '30': {
            'name': 'Beastbane'
        },
        '31': {
            'name': 'Empower Beast'
        },
        '32': {
            'name': 'Repel Beast'
        },
        '33': {
            'name': 'Golemsbane'
        },
        '34': {
            'name': 'Empower Golem'
        },
        '35': {
            'name': 'Reflection'
        },
        '36': {
            'name': 'Evilsbane'
        },
        '37': {
            'name': 'Taunt'
        },
        '38': {
            'name': 'Aquaveil'
        },
        '39': {
            'name': 'Gordian Lock'
        },
        '40': {
            'name': "Nature's Touch"
        },
        '41': {
            'name': 'Echoing Voice'
        },
        '42': {
            'name': 'Resounding Voice'
        },
        '43': {
            'name': 'Dash'
        },
        '44': {
            'name': 'Instinct'
        },
        '45': {
            'name': 'Spike Skin'
        },
        '46': {
            'name': 'Flanking'
        },
        '47': {
            'name': 'Broaden Force'
        },
        '48': {
            'name': 'Apostate'
        },
        '49': {
            'name': 'Ivory Tower'
        }
    },
    '21': {
        'name': 'Worsen weather'
    },
    '22': {
        'name': 'Improve weather'
    },
    '23': {
        'name': 'Remove a single buff'
    },
    '24': {
        'name': 'Clear a single debuff'
    },
    '25': {
        'name': 'Fully clear debuffs'
    },
    '26': {
        'name': 'Face the User'
    },
    '27': {
        'name': 'Knockback'
    },
    '28': {
        'name': 'Meditate'
    },
    '29': {
        'name': 'Recruit'
    },
    '30': {
        'name': 'Convert TP to HP'
    },
    '31': {
        'name': 'Convert TP to MP'
    },
    '32': {
        'name': 'Spendthrift'
    },
    '33': {
        'name': 'Rampart Clone'
    },
    '34': {
        'name': 'Sanctuary Clone'
    },
    '35': {
        'name': 'Shadowbreak'
    },
    '36': {
        'name': 'Flee the Battlefield'
    },
    '37': {
        'name': 'Teleport the Target Unit'
    },
    '38': {
        'name': 'Disarm Trap on Tile'
    },
    '39': {
        'name': 'Disarm Random Tile'
    },
    '40': {
        'name': 'Detect Trap'
    },
    '41': {
        'name': 'Remove Readied Skill'
    },
    '42': {
        'name': 'Random Facing'
    },
    '43': {
        'name': 'Display Points'
    },
    '44': {
        'name': 'Steal'
    },
    '45': {
        'name': 'Set Trap'
    },
    '46': {
        'name': 'Prevent Undead from Rising'
    },
    '47': {
        'name': 'Prevent Reviving'
    },
    '48': {
        'name': 'Absorb or Share MP'
    },
    '49': {
        'name': 'Summon Reinforcements'
    },
    '50': {
        'name': 'Enable Reviving'
    },
    '51': {
        'name': 'Clear Zombification'
    },
    '52': {
        'name': 'Create Doppelganger'
    },
    '53': {
        'name': 'Turn into Zombie'
    },
    '54': {
        'name': 'Move Incapacitated or Stilled Unit'
    },
    '55': {
        'name': 'Turn into Skeleton or Ghost'
    },
    '56': {
        'name': 'Turn into Lich'
    },
    '57': {
        'name': 'Turn into Angel Knight'
    },
    '58': {
        'name': 'Turn into Human'
    },
    '59': {
        'name': 'Swap Bodies with Enemy'
    },
    '60': {
        'name': 'Turn User into Weapon'
    },
    '61': {
        'name': 'Remove 1 Heart'
    },
    '62': {
        'name': 'Restore 1 Heart'
    },
    '63': {
        'name': 'Convert TP into HP (split)'
    },
    '64': {
        'name': 'Petrification Gaze'
    },
    '65': {
        'name': 'Raise Stat Permanently'
    },
    '66': {
        'name': '—'
    },
    '67': {
        'name': "Consume Jack o' Lantern"
    },
    '68': {
        'name': "Create Jack o' Lantern"
    },
    '69': {
        'name': 'Create Barricade'
    },
    '70': {
        'name': 'Reveal Elemental Affinity'
    },
    '71': {
        'name': 'Destroy Barricade'
    },
    '72': {
        'name': 'Advance RT counter by TP/MP spent (split)'
    },
    '73': {
        'name': 'Raise Luck Temporarily'
    },
    '74': {
        'name': 'Move Again'
    }
};

const abilityType = {
    '0': {
        'name': 'Item Effect',
        'icon': 'img/icons/ability-item.png'
    },
    '1': {
        'name': 'Air Magic',
        'icon': 'img/icons/element-air.png'
    },
    '2': {
        'name': 'Earth Magic',
        'icon': 'img/icons/element-earth.png'
    },
    '3': {
        'name': 'Lightning Magic',
        'icon': 'img/icons/element-lightning.png'
    },
    '4': {
        'name': 'Water Magic',
        'icon': 'img/icons/element-water.png'
    },
    '5': {
        'name': 'Fire Magic',
        'icon': 'img/icons/element-fire.png'
    },
    '6': {
        'name': 'Ice Magic',
        'icon': 'img/icons/element-ice.png'
    },
    '7': {
        'name': 'Divine Magic',
        'icon': 'img/icons/element-light.png'
    },
    '8': {
        'name': 'Dark Magic',
        'icon': 'img/icons/element-dark.png'
    },
    '9': {
        'name': 'Draconic Magic',
        'icon': 'img/icons/ability-draconic.png'
    },
    '10': {
        'name': 'Necromancy',
        'icon': 'img/icons/ability-necromancy.png'
    },
    '11': {
        'name': '—'
    },
    '12': {
        'name': 'Art of War',
        'icon': 'img/icons/ability-artofwar.png',
        'iconn': 'img/icons/ability-ninjutsu.png',
        'icond': 'img/icons/ability-wardance.png',
        'icons': 'img/icons/ability-song.png',
        'iconb': 'img/icons/ability-bomb.png',
        'icong': 'img/icons/ability-geomancy.png'

    },
    '13': {
        'name': '—'
    },
    '14': {
        'name': '—'
    },
    '15': {
        'name': '—'
    },
    '16': {
        'name': 'Item Effect',
        'icon': 'img/icons/ability-item.png'
    },
    '17': {
        'name': 'Trap'
    },
    '18': {
        'name': 'Special Ability',
        'icon': 'img/icons/ability-special.png'
    },
    '19': {
        'name': 'Action Ability',
        'icon': 'img/icons/ability-action.png'
    },
    '20': {
        'name': 'Event Effect'
    },
    '21': {
        'name': '—'
    },
    '22': {
        'name': 'Finisher'
    },
    '23': {
        'name': 'Finisher'
    },
    '24': {
        'name': 'Finisher'
    },
    '25': {
        'name': 'Finisher'
    },
    '26': {
        'name': 'Finisher'
    },
    '27': {
        'name': 'Finisher'
    },
    '28': {
        'name': 'Finisher'
    },
    '29': {
        'name': 'Finisher'
    },
    '30': {
        'name': 'Finisher'
    },
    '31': {
        'name': 'Finisher'
    },
    '32': {
        'name': 'Finisher'
    },
    '33': {
        'name': 'Finisher'
    },
    '34': {
        'name': 'Finisher'
    },
    '35': {
        'name': 'Finisher'
    },
    '36': {
        'name': 'Finisher'
    },
    '37': {
        'name': 'Finisher'
    },
    '38': {
        'name': 'Finisher'
    },
    '39': {
        'name': 'Finisher'
    },
    '40': {
        'name': 'Finisher'
    },
    '41': {
        'name': 'Finisher'
    },
    '42': {
        'name': 'Finisher'
    },
    '43': {
        'name': 'Finisher'
    }
};

const storyPoints = {
    '1': 'at the start of Chapter 1',
    '2': 'at the middle of Chapter 1',
    '3': 'at the end of Chapter 1',
    '4': 'at the start of Chapter 2',
    '5': 'at the middle of Chapter 2',
    '6': 'at the end of Chapter 2',
    '7': 'at the start of Chapter 3',
    '8': 'at the middle of Chapter 3',
    '9': 'at the end of Chapter 3',
    '10': 'at the start of Chapter 4',
    '11': 'in Chapter 4 after Hagia Banhamuba',
    '12': 'in Chapter 4 after Barnicia',
    '13': 'in Chapter 4 after Heim',
    '14': 'after CODA - Episode 1',
    '15': 'after CODA - Final Episode',
    '201': 'when the class is acquired (Deneb has to be recruited)',
    '202': 'when the class is acquired (Deneb has to be recruited)',
    '203': 'when the class is acquired (Deneb has to be recruited)',
    '204': 'when the class is acquired (Deneb has to be recruited)',
    '205': 'when the class is acquired (Deneb has to be recruited)'
};

const baseStats = {
    '0': {
        'name': 'HP'
    },
    '1': {
        'name': 'MP'
    },
    '2': {
        'name': 'Strength'
    },
    '3': {
        'name': 'Vitality'
    },
    '4': {
        'name': 'Dexterity'
    },
    '5': {
        'name': 'Agility'
    },
    '6': {
        'name': 'Avoidance'
    },
    '7': {
        'name': 'Intelligence'
    },
    '8': {
        'name': 'Mind'
    },
    '9': {
        'name': 'Resistance'
    },
    '10': {
        'name': 'Luck'
    }
};

const movementType = {
    '1': '2/3',
    '2': '3/4',
    '3': '1/2',
    '4': 'Warp',
    '5': 'Fly'
};

const movementPerk = {
    '7': 'Wade',
    '8': 'Swim',
    '10': 'Lava'
};

const classChangeSets = [
    {'ccset': '0', 'name': 'All'},
    {'ccset': '1', 'name': 'Human'},
    {'ccset': '14', 'name': 'Special Human'},
    {'ccset': '2', 'name': 'Hawkman'},
    {'ccset': '3', 'name': 'Lizardman'},
    {'ccset': '4', 'name': 'Lamia'},
    {'ccset': '5', 'name': 'Orc'},
    {'ccset': '9', 'name': 'Gremlin'},
    {'ccset': '8', 'name': 'Fairy'},
    {'ccset': '10', 'name': 'Pumpkinhead'},
    {'ccset': '6', 'name': 'Skeleton'},
    {'ccset': '7', 'name': 'Ghost'},
    {'ccset': '11', 'name': 'Dragon'},
    {'ccset': '-', 'name': '-'},
    {'ccset': '16', 'name': 'Denam'},
    {'ccset': '17', 'name': 'Vyce'},
    {'ccset': '18', 'name': 'Catiua'},
    {'ccset': '19', 'name': 'Lanselot'},
    {'ccset': '20', 'name': 'Warren'},
    {'ccset': '21', 'name': 'Canopus'},
    {'ccset': '22', 'name': 'Mirdyn'},
    {'ccset': '23', 'name': 'Gildas'},
    {'ccset': '24', 'name': 'Cerya'},
    {'ccset': '25', 'name': 'Sherri'},
    {'ccset': '26', 'name': 'Cistina'},
    {'ccset': '27', 'name': 'Olivya'},
    {'ccset': '28', 'name': 'Deneb'},
    {'ccset': '29', 'name': 'Iuria'},
    {'ccset': '30', 'name': 'Ozma'},
    {'ccset': '38', 'name': 'Lindl'},
    {'ccset': '31', 'name': 'Leonar'},
    {'ccset': '32', 'name': 'Ravness'},
    {'ccset': '33', 'name': 'Azelstan'},
    {'ccset': '35', 'name': 'Hobyrim'},
    {'ccset': '13', 'name': 'Oelias'},
    {'ccset': '15', 'name': 'Cressida'},
    {'ccset': '37', 'name': 'Ganpp'},
    {'ccset': '12', 'name': 'Ocionne'},
    {'ccset': '34', 'name': 'Tamuz'}
];