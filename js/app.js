
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
            } else if ( !ability[damage] && !ability[element] ) {
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

const classTypes = {
    'B': {
        'name': 'Basic Humanoid',
        'class': 'basic'
    },
    'A': {
        'name': 'Advanced Humanoid',
        'class': 'advanced'
    },
    'S': {
        'name': 'Special Humanoid',
        'class': 'special'
    },
    'D': {
        'name': 'Demihuman',
        'class': 'demi'
    },
    'M': {
        'name': 'Monster',
        'class': 'monster'
    },
    'U': {
        'name': 'Unique',
        'class': 'special'
    }
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
    '38': {
        'name': 'Unknown',
        'icon': 'img/icons/icon-unknown.png'
    }
};

const alignments = {
    '0': 'Unknown',
    '1': 'Lawful',
    '2': 'Neutral',
    '3': 'Chaotic'
};

const clans = {
    '0': {
        'name': 'Unknown'
    },
    '1': {
        'name': 'Walister'
    },
    '2': {
        'name': 'Galgastan'
    },
    '3': {
        'name': 'Bakram'
    },
    '4': {
        'name': 'Xenobia'
    },
    '5': {
        'name': 'Lodis'
    },
    '6': {
        'name': 'Bolmocca'
    },
    '7': {
        'name': 'Balboede'
    }
};

const statBonusGeneric = {
    'human1': {
        'hp': 8,
        'mp': -8,
        'str': 4,
        'vit': 4,
        'dex': 0,
        'agi': 0,
        'avd': 0,
        'int': -4,
        'mnd': -4,
        'res': -2
    },
    'human2': {
        'hp': 0,
        'mp': -8,
        'str': 0,
        'vit': 0,
        'dex': 4,
        'agi': 4,
        'avd': 4,
        'int': -4,
        'mnd': -4,
        'res': -2
    },
    'human3': {
        'hp': -8,
        'mp': 8,
        'str': -2,
        'vit': -2,
        'dex': -2,
        'agi': -2,
        'avd': 0,
        'int': 4,
        'mnd': 4,
        'res': 2
    },
    'monster1': {
        'hp': 0,
        'mp': 0,
        'str': 4,
        'vit': -2,
        'dex': 4,
        'agi': -2,
        'avd': -2,
        'int': 0,
        'mnd': 0,
        'res': -2
    },
    'monster2': {
        'hp': 12,
        'mp': 0,
        'str': -2,
        'vit': 4,
        'dex': -4,
        'agi': -2,
        'avd': -4,
        'int': 0,
        'mnd': 0,
        'res': 2
    },
    'monster3': {
        'hp': -12,
        'mp': 0,
        'str': -2,
        'vit': -2,
        'dex': 2,
        'agi': 4,
        'avd': 4,
        'int': 0,
        'mnd': 0,
        'res': 0
    }
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
        'name': 'Percentage',
        'icon': 'img/icons/damage-percentage.png'
    },
    '5': {
        'name': 'Raw',
        'icon': 'img/icons/damage-raw.png'
    },
    '6': {
        'name': 'Void',
        'icon': 'img/icons/damage-void.png'
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

const itemSets = [
    {
        'id': 1,
        'name': 'Legion',
        'active': 0,
        'passive': 190
    },
    {
        'id': 2,
        'name': 'Ogre',
        'active': 0,
        'passive': 195
    },
    {
        'id': 3,
        'name': 'Shadowmaster',
        'active': 277,
        'passive': 0
    },
    {
        'id': 4,
        'name': "Ji'ygla",
        'active': 0,
        'passive': 200
    },
    {
        'id': 5,
        'name': 'Dragonslayer',
        'active': 312,
        'passive': 0
    }
];

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
        'icon': 'img/icons/ability-artofwar.png'
    },
    '12n': {
        'name': 'Art of War - Ninjutsu',
        'icon': 'img/icons/ability-ninjutsu.png'
    },
    '12d': {
        'name': 'Art of War - Dances',
        'icon': 'img/icons/ability-wardance.png'
    },
    '12s': {
        'name': 'Art of War - Songs',
        'icon': 'img/icons/ability-song.png'
    },
    '12b': {
        'name': 'Art of War - Grenades',
        'icon': 'img/icons/ability-bomb.png'
    },
    '12g': {
        'name': 'Art of War - Geomancy',
        'icon': 'img/icons/ability-geomancy.png'
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
        'name': 'Trap',
        'icon': 'img/icons/ability-trap.png'
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
        'name': 'Fist Finisher',
        'icon': 'img/icons/equip-claw.png'
    },
    '23': {
        'name': 'Dagger Finisher',
        'icon': 'img/icons/equip-dagger.png'
    },
    '24': {
        'name': '1H Sword Finisher',
        'icon': 'img/icons/equip-sword1h.png'
    },
    '25': {
        'name': '2H Sword Finisher',
        'icon': 'img/icons/equip-sword2h.png'
    },
    '26': {
        'name': 'Axe Finisher',
        'icon': 'img/icons/equip-axe1h.png'
    },
    '27': {
        'name': 'Finisher'
    },
    '28': {
        'name': 'Spear Finisher',
        'icon': 'img/icons/equip-spear2h.png'
    },
    '29': {
        'name': 'Hammer Finisher',
        'icon': 'img/icons/equip-hammer2h.png'
    },
    '30': {
        'name': 'Finisher'
    },
    '31': {
        'name': '1H Katana Finisher',
        'icon': 'img/icons/equip-sword2h.png'
    },
    '32': {
        'name': '2H Katana Finisher',
        'icon': 'img/icons/equip-sword2h.png'
    },
    '33': {
        'name': 'Cudgel Finisher',
        'icon': 'img/icons/equip-cudgel2h.png'
    },
    '34': {
        'name': 'Finisher'
    },
    '35': {
        'name': 'Whip Finisher',
        'icon': 'img/icons/equip-whip.png'
    },
    '36': {
        'name': 'Spellbook Finisher',
        'icon': 'img/icons/equip-spellbook.png'
    },
    '37': {
        'name': 'Instrument Finisher',
        'icon': 'img/icons/equip-instrument.png'
    },
    '38': {
        'name': 'Finisher'
    },
    '39': {
        'name': 'Finisher'
    },
    '40': {
        'name': 'Sidearm Finisher',
        'icon': 'img/icons/equip-sidearm.png'
    },
    '41': {
        'name': 'Bow Finisher',
        'icon': 'img/icons/equip-bow2h.png'
    },
    '42': {
        'name': 'Crossbow Finisher',
        'icon': 'img/icons/equip-crossbow2h.png'
    },
    '43': {
        'name': 'Fusil Finisher',
        'icon': 'img/icons/equip-fusil2h.png'
    }
};

const skillType = {
    '1': {
        'name': 'Support',
        'icon': 'img/icons/skill-support.png'
    },
    '1w': {
        'name': 'Weapon Skill'
    },
    '1ma': {
        'name': 'Mastery'
    },
    '1mr': {
        'name': 'Mastery'
    },
    '1md': {
        'name': 'Mastery'
    },
    '1mo': {
        'name': 'Mastery'
    },
    '1ar': {
        'name': 'Support'
    },
    '1as': {
        'name': 'Support'
    },
    '2': {
        'name': 'Action',
        'icon': 'img/icons/skill-action.png'
    },
    '2ie': {
        'name': 'Action'
    },
    '3': {
        'name': 'Command',
        'icon': 'img/icons/skill-command.png'
    },
    '4': {
        'name': 'Special',
        'icon': 'img/icons/skill-special.png'
    }
};

const skillGroup = {
    '1': {
        'name': 'Defense Mastery',
        'symbol': 'DM'
    },
    '3': {
        'name': 'Aura',
        'symbol': 'A'
    },
    '4': {
        'name': 'Counterhit',
        'symbol': 'CH'
    },
    '5': {
        'name': 'Bash',
        'symbol': 'B'
    },
    '6': {
        'name': 'Golem Core',
        'symbol': 'GC'
    },
    '18': {
        'name': 'Clarity',
        'symbol': 'CL'
    },
    '19': {
        'name': 'Efficacy',
        'symbol': 'EF'
    },
    '21': {
        'name': 'Jump',
        'symbol': 'J'
    },
    '22': {
        'name': 'Wade',
        'symbol': 'WD'
    },
    '24': {
        'name': 'Field Alchemy',
        'symbol': 'FA'
    },
    '25': {
        'name': 'Max TP',
        'symbol': 'TP'
    },
    '27': {
        'name': 'Tactician',
        'symbol': 'T'
    },
    '31': {
        'name': 'Mirror Instill',
        'symbol': 'MI'
    },
    '32': {
        'name': 'Mirror Mastery',
        'symbol': 'MM'
    },
    '33': {
        'name': 'Mirror',
        'symbol': 'M'
    },
    '34': {
        'name': 'Ward',
        'symbol': 'W'
    },
    '35': {
        'name': 'Mirror Resonance',
        'symbol': 'MR'
    }
};

const skillPassives = {
    'var-w': {
        'text': 'Adds <b>4 Offense</b> and <b>10% Hit Chance</b> per <b>Rank</b> to <b>[insert1]</b> Attacks and Finishers'
    },
    '1': {
        'insert1': 'Fist'
    },
    '2': {
        'insert1': 'Dagger'
    },
    '3': {
        'insert1': '1H Sword'
    },
    '4': {
        'insert1': '2H Sword'
    },
    '5': {
        'insert1': 'Axe'
    },
    '7': {
        'insert1': 'Spear'
    },
    '8': {
        'insert1': 'Hammer'
    },
    '10': {
        'insert1': '1H Katana'
    },
    '11': {
        'insert1': '2H Katana'
    },
    '12': {
        'insert1': 'Cudgel'
    },
    '14': {
        'insert1': 'Whip'
    },
    '15': {
        'insert1': 'Spellbook'
    },
    '16': {
        'insert1': 'Instrument'
    },
    '17': {
        'insert1': 'Sidearm'
    },
    '18': {
        'insert1': 'Bow'
    },
    '19': {
        'insert1': 'Crossbow'
    },
    '20': {
        'insert1': 'Fusil'
    },
    'var-mr': {
        'text': 'Adds <b>5 Offense</b> per <b>Rank</b> to any hits delivered against <b>[insert1]</b> units'
    },
    '22': {
        'insert1': 'Human'
    },
    '23': {
        'insert1': 'Beast'
    },
    '24': {
        'insert1': 'Reptile'
    },
    '25': {
        'insert1': 'Dragon'
    },
    '26': {
        'insert1': 'Divine'
    },
    '27': {
        'insert1': 'Umbra'
    },
    '28': {
        'insert1': 'Faerie'
    },
    '29': {
        'insert1': 'Phantom'
    },
    '30': {
        'insert1': 'Golem'
    },
    'var-ma': {
        'text': 'Adds <b>4 Offense/Power</b> per <b>Rank</b> to any <b>[insert1]</b> Element hits | Adds <b>Toughness/Resilience</b> against any incoming <b>[insert1]</b> Element hits by <b>3</b> per <b>Rank</b>'
    },
    '31': {
        'insert1': 'Air'
    },
    '32': {
        'insert1': 'Earth'
    },
    '33': {
        'insert1': 'Lightning'
    },
    '34': {
        'insert1': 'Water'
    },
    '35': {
        'insert1': 'Fire'
    },
    '36': {
        'insert1': 'Ice'
    },
    '37': {
        'insert1': 'Divine'
    },
    '38': {
        'insert1': 'Dark'
    },
    '39': {
        'text': 'Adds a separate chance of <b>5%</b>(?) per <b>Rank</b> to <b>Parry</b> a <b>Melee</b> Basic Attack, if Avoiding it fails'
    },
    '40': {
        'text': 'Adds a separate chance of <b>5%</b>(?) per <b>Rank</b> to <b>Parry</b> a <b>Ranged</b> Basic Attack, if Avoiding it fails'
    },
    '41': {
        'text': 'Reduces the target\'s <b>Parry</b> chance by <b>4%</b>(?) per <b>Rank</b>'
    },
    'var-ie': {
        'text': 'If <b>Augment [insert1]</b> is also equipped, this skill will reduce the <b>Final Damage</b> of the same element by <b>4%</b> per <b>Augment Rank</b>'
    },
    '71': {
        'insert1': 'Air'
    },
    '72': {
        'insert1': 'Earth'
    },
    '73': {
        'insert1': 'Lightning'
    },
    '74': {
        'insert1': 'Water'
    },
    '75': {
        'insert1': 'Fire'
    },
    '76': {
        'insert1': 'Ice'
    },
    '77': {
        'insert1': 'Light'
    },
    '78': {
        'insert1': 'Darkness'
    },
    'var-ar': {
        'text': 'Stops the <b>Enemy</b> unit movement in an area of [insert1]'
    },
    '80': {
        'insert1': '<b>1</b> tile to the front, side and rear'
    },
    '81': {
        'insert1': '<b>1</b> tile to the front or rear and <b>2</b> to the side'
    },
    '82': {
        'insert1': '<b>1</b> tile to the front, front-left, front-right or rear and <b>3</b> to the side'
    },
    '83': {
        'insert1': '<b>2</b> tiles to the front or rear, <b>1</b> tiles to the front-left or front-right and <b>3</b> to the side'
    },
    '84': {
        'insert1': '<b>3</b> tiles to the front or rear, <b>2</b> tiles to the front-left or front-right and <b>4</b> to the side'
    },
    'group-4': {
        'text': 'Counters a <b>Melee</b> Basic Attack if the attacker is within range, dealing <b>[insert1]%</b> of normal damage'
    },
    '87': {
        'insert1': '50'
    },
    '88': {
        'insert1': '75'
    },
    '89': {
        'insert1': '100'
    },
    'group-5': {
        'text': 'Grants a <b>[insert1]%</b> chance to knock the target back with a Basic Attack.'
    },
    '92': {
        'insert1': '50'
    },
    '93': {
        'insert1': '75'
    },
    '94': {
        'insert1': '100'
    },
    '96': {
        'text': 'Adds 25% to <b>Attack Damage Bonus</b>'
    },
    '102': {
        'text': 'Adds 50% to <b>Attack Damage Resistance</b>'
    },
    '111': {
        'text': 'Adds 25% to <b>Spell Damage Resistance</b>'
    },
    '112': {
        'text': 'Adds 50% to <b>Spell Damage Resistance</b>'
    },
    '117': {
        'text': 'Adds 50% to <b>Melee Attack Hit Chance</b>'
    },
    '141': {
        'text': 'Adds <b>25%</b> to <b>Status Spell Evasion</b>'
    },
    'group-18': {
        'text': 'Increases the rate of natural <b class="pink">MP</b> restoration by <b>[insert1]%</b>'
    },
    '156': {
        'insert1': '25'
    },
    '157': {
        'insert1': '50'
    },
    '158': {
        'insert1': '75'
    },
    '159': {
        'insert1': '100'
    },
    'group-19': {
        'text': 'Reduces the amount of spent <b class="pink">MP</b> by <b>[insert1]%</b>'
    },
    '162': {
        'insert1': '10'
    },
    '163': {
        'insert1': '15'
    },
    '164': {
        'insert1': '20'
    },
    'group-34': {
        'text': 'Grants immunity to [insert1]'
    },
    '166': {
        'insert1': '<b>Petrify</b>'
    },
    '167': {
        'insert1': '<b>Stun</b>'
    },
    '168': {
        'insert1': '<b>Sleep</b>'
    },
    '169': {
        'insert1': '<b>Charm</b> and <b>Bewitch</b>'
    },
    '170': {
        'insert1': '<b>Spendthrift</b> and <b>Paranoia</b>'
    },
    '172': {
        'insert1': '<b>Silence</b>'
    },
    '173': {
        'insert1': '<b>Slow</b>'
    },
    '174': {
        'insert1': '<b>Bind</b>, <b>Shackle</b> and <b>Stop</b>'
    },
    '175': {
        'insert1': '<b>Leaden</b>'
    },
    '176': {
        'insert1': '<b>Frighten</b>'
    },
    '177': {
        'insert1': '<b>Poison</b>'
    },
    '178': {
        'insert1': '<b>Wither</b> and <b>Curse</b>'
    },
    '179': {
        'insert1': '<b>Most Status Effects</b>'
    },
    '181': {
        'text': 'Increases the <b>Movement Range</b> by <b>1</b>'
    },
    'group-21': {
        'text': 'Increases the Up/Down <b>Jump Range</b> by <b>[insert1]</b>'
    },
    '183': {
        'insert1': '1'
    },
    '184': {
        'insert1': '2'
    },
    'group-22': {
        'text': 'Allows moving through <b>Water</b> tiles at a movement cost of <b>[insert1]</b>'
    },
    '185': {
        'insert1': '2'
    },
    '186': {
        'insert1': '1'
    },
    'var-as': {
        'text': 'Prevents <b>Undead</b> units from entering the area of [insert1]'
    },
    '188': {
        'insert1': '<b>1</b> tile to the front, side and rear'
    },
    '189': {
        'insert1': '<b>2</b> tiles to the front, side or rear and <b>1</b> tile diagonally'
    },
    '190': {
        'text': 'The unit is ignored by enemies unless it\'s the last one standing'
    },
    '191': {
        'text': 'Grants immunity to <b>Knockback</b>'
    },
    '192': {
        'text': 'Enables the <b>Double Attack</b> command when two <b>Melee</b> weapons are equipped'
    },
    '193': {
        'text': 'Shows the <b>Trajectory</b> of <b>Ranged Attacks</b>'
    },
    '194': {
        'text': 'Grants immunity to <b>Rampart Aura</b> | Reduces the <b>Movement Range</b> by <b class="red">1</b>'
    },
    '195': {
        'text': 'Greatly increases the unit\'s <b>Offense</b>, <b>Power</b>, <b>Toughness</b> and <b>Resilience</b>'
    },
    '196': {
        'text': 'Allows the use of advanced consumable items'
    },
    '197': {
        'text': 'Allows the use of all consumable items'
    },
    '200': {
        'text': 'Greatly increases the unit\'s <b>Ranged Attack</b>'
    },
    'group-25': {
        'text': 'Increases the unit\'s <b>Max</b> <b class="orange">TP</b> by <b>[insert1]</b>'
    },
    '202': {
        'insert1': '50'
    },
    '204': {
        'insert1': '100'
    },
    '207': {
        'text': 'Improves the <b>Buried Treasure</b> found'
    },
    'group-27': {
        'text': 'Increases the rate of natural <b class="orange">TP</b> restoration by <b>[insert1]%</b>'
    },
    '209': {
        'insert1': '10'
    },
    '210': {
        'insert1': '40'
    },
    '213': {
        'text': 'Reflects <b>20%</b> of <b>Attack</b> Damage taken back to the attacker'
    },
    '216': {
        'text': 'Reflects <b>20%</b> of <b>Spell</b> Damage taken back to the caster'
    },
    '219': {
        'text': 'Absorbs <b>40%</b> of the <b class="pink">MP</b> Cost when hit by a <b>Damage Spell</b>'
    }
};

const npcClasses = {
    '71': {
        'name': 'NPC Knight Commander'
    },
    '72': {
        'name': 'Death Templar'
    },
    '73': {
        'name': 'Dark Bishop'
    },
    '76': {
        'name': 'Dark Lord (Dorgalua)'
    },
    '77': {
        'name': 'Dark Lord (Ogre)'
    },
    '78': {
        'name': 'Revenant (Rodrick)'
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
    '5': 'Fly',
    '6': 'Float'
};

const movementPerk = {
    '7': 'Wade',
    '8': 'Swim',
    '10': 'Lava'
};
