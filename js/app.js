
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

async function fetchJSON(url) {

    let response = await fetch(url);
    return response.json();
}

function isOdd(num) {
    return (num % 2 === 1);
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function matchByColumn( array, column, value) {
    let index = false;
    array.some(function (col, i) {
        if (col[column] === value) {
            index = i;
        }
    });
    return index;
}

const elements = {
    '0': {
        'name': 'None',
        'icon1': 'img/icons/icon-blank.png',
        'icon2': 'img/icons/icon-blank.png'
    },
    '1': {
        'name': 'Air',
        'icon1': 'img/icons/element-air.png',
        'icon2': 'img/icons/damage-air.png'
    },
    '2': {
        'name': 'Earth',
        'icon1': 'img/icons/element-earth.png',
        'icon2': 'img/icons/damage-earth.png'
    },
    '3': {
        'name': 'Lightning',
        'icon1': 'img/icons/element-lightning.png',
        'icon2': 'img/icons/damage-lightning.png'
    },
    '4': {
        'name': 'Water',
        'icon1': 'img/icons/element-water.png',
        'icon2': 'img/icons/damage-water.png'
    },
    '5': {
        'name': 'Fire',
        'icon1': 'img/icons/element-fire.png',
        'icon2': 'img/icons/damage-fire.png'
    },
    '6': {
        'name': 'Ice',
        'icon1': 'img/icons/element-ice.png',
        'icon2': 'img/icons/damage-ice.png'
    },
    '7': {
        'name': 'Light',
        'icon1': 'img/icons/element-light.png',
        'icon2': 'img/icons/damage-light.png'
    },
    '8': {
        'name': 'Dark',
        'icon1': 'img/icons/element-dark.png',
        'icon2': 'img/icons/damage-dark.png'
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
    }
};

const types = {
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
        'name': 'Monster Melee',
        'icon1': 'img/icons/equip-armheavy.png',
        'icon2': 'img/icons/equip-armheavy.png'
    },
    '290': {
        'name': 'Innate Melee',
        'icon1': 'img/icons/equip-armheavy.png',
        'icon2': 'img/icons/equip-armheavy.png'
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
    }
};

const scalingFormula = {
    '0': {
        'name': '—'
    },
    '1': {
        'name': '<strong class="blue">Str</strong>/Dex'
    },
    '5': {
        'name': '<strong class="green">Dex</strong>/Str'
    },
    '7': {
        'name': '<strong class="green">Dex</strong>/Str'
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
    '12': 'Front-Facing Foes',
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
    '1': {
        'name': 'Air Magic'
    },
    '2': {
        'name': 'Earth Magic'
    },
    '3': {
        'name': 'Lightning Magic'
    },
    '4': {
        'name': 'Water Magic'
    },
    '5': {
        'name': 'Fire Magic'
    },
    '6': {
        'name': 'Ice Magic'
    },
    '7': {
        'name': 'Divine Magic'
    },
    '8': {
        'name': 'Dark Magic'
    },
    '9': {
        'name': 'Draconic Magic'
    },
    '10': {
        'name': 'Necromancy'
    },
    '11': {
        'name': '—'
    },
    '12': {
        'name': 'Art of War'
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
        'name': 'Item Effect'
    },
    '17': {
        'name': 'Trap Effect'
    },
    '18': {
        'name': 'Special Ability'
    },
    '19': {
        'name': 'Action Ability'
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