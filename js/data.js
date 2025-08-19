
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
        'dex': 6,
        'agi': 6,
        'avd': 6,
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
        'agi': -4,
        'avd': 0,
        'int': 4,
        'mnd': 4,
        'res': 2
    },
    'monster1': {
        'hp': 0,
        'mp': 0,
        'str': 6,
        'vit': -2,
        'dex': 2,
        'agi': 0,
        'avd': -8,
        'int': 0,
        'mnd': 0,
        'res': -2
    },
    'monster2': {
        'hp': 8,
        'mp': 0,
        'str': 0,
        'vit': 6,
        'dex': -4,
        'agi': -8,
        'avd': -8,
        'int': 0,
        'mnd': 0,
        'res': 2
    },
    'monster3': {
        'hp': -8,
        'mp': 0,
        'str': -2,
        'vit': -2,
        'dex': 6,
        'agi': 4,
        'avd': 4,
        'int': 0,
        'mnd': 0,
        'res': -2
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

const itemTypes = {
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
        'icona': 'img/icons/equip-jewelry.png'
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
    '15': {
        'name': 'Line-First'
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
        'passive': 190,
        'description': '<b>Effect:</b><br/><small><i>(wear at least 3 set items)</i></small><br/><p>Wearer will not be directly attacked by enemies, unless they\'re the last standing unit on the field</p>'
    },
    {
        'id': 2,
        'name': 'Ogre',
        'active': 0,
        'passive': 195,
        'description': '<b>Effect:</b><br/><small><i>(wear at least 3 set items)</i></small><br/><p>Wearer gains a 1.2x multiplier to <b>Offense</b> and <b>Spell Power</b>, as well as a 1.5x multiplier to <b>Toughness</b> and <b>Resilience</b></p>'
    },
    {
        'id': 3,
        'name': 'Shadowmaster',
        'active': 277,
        'passive': 0,
        'description': '<b>Effect:</b><br/><small><i>(wear at least 3 set items)</i></small><br/><p>Wearer gains the use of <b>Evil Deeds</b> active skill</p>'
    },
    {
        'id': 4,
        'name': "Sniper",
        'active': 0,
        'passive': 200,
        'description': '<b>Effect:</b><br/><small><i>(wear at least 3 set items)</i></small><br/><p>Wearer gains a 1.3x multiplier to <b>ranged offense</b></p>'
    },
    {
        'id': 5,
        'name': 'Dragonslayer',
        'active': 312,
        'passive': 0,
        'description': '<b>Effect:</b><br/><small><i>(wear at least 3 set items)</i></small><br/><p>Wearer gains the use of <b>Dragonslayer</b> active skill</p>'
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
            'name': 'Incapacitated',
            'effect': 'Incapacitated units will lose 1 heart when their timer reaches zero'
        },
        '1': {
            'name': 'Deceased',
            'effect': 'Deceased units have lost all 3 hearts and cannot be used anymore'
        },
        '2': {
            'name': 'Stilled',
            'effect': 'Stilled undead will revive when their death counter reaches zero'
        },
        '3': {
            'name': 'Near Death',
            'effect': 'The unit is on critically low HP'
        },
        '4': {
            'name': 'Sleep',
            'effect': 'Sleeping units cannot move or act on their turn<p><small><i>Taking damage will remove Sleep</i></small></p>'
        },
        '5': {
            'name': 'Charm',
            'effect': 'The unit will act as if it belongs to the enemy team<p><small><i>Taking damage will remove Charm</i></small></p>'
        },
        '6': {
            'name': 'Bewitch',
            'effect': 'The unit will act as if it belongs to the enemy team and lose a small amount of loyalty each turn<p><small><i>Unlike Charm, Bewitch is not removed by taking damage</i></small></p>'
        },
        '7': {
            'name': 'Spendthrift',
            'effect': 'Player cannot control the unit and loses some Goth each turn'
        },
        '8': {
            'name': 'Paranoia',
            'effect': 'Player cannot control the unit, it will run from allies and refuse aid<br>Increases Attack and Projectile Spell Evasion by ' + Math.abs(accuracyScaling[1].defend.prnoia) + '%<br>Reduces Spell Evasion by ' + Math.abs(accuracyScaling[21].defend.prnoia) + '%'
        },
        '9': {
            'name': 'Stun',
            'effect': 'Performing any action except active skills will fail 50% of the time<br>Reduces Attack and Projectile Spell Evasion by ' + Math.abs(accuracyScaling[1].defend.stn) + '%<p><small><i>Disables Counterhit, Mind\'s Eye and Preempt</i></small></p>'
        },
        '10': {
            'name': 'Silence',
            'effect': 'Silenced units are unable to cast spells<p><small><i>Abilities from Magic, Necromancy and Art of War command sets count as spells</i></small></p><p><small><i>Spells on items can still be used</i></small></p>'
        },
        '11': {
            'name': 'Petrify',
            'effect': 'Petrified units cannot move or act on their turn<br>Increases Attack and Spell Resistance by ' + Math.abs(damageScaling[1].defend.ptrfy) + '%'
        },
        '12': {
            'name': 'Bind',
            'effect': 'Movement is disabled</br><p><small><i>Bound units can still be knocked back or moved through other means</i></small></p>'
        },
        '13': {
            'name': 'Shackle',
            'effect': 'Performing actions is disabled (except active skills)<p><small><i>Overwrites Bind</i></small></p>'
        },
        '14': {
            'name': 'Stop',
            'effect': 'RT counter is stopped for the unit, preventing its turn from coming<p><small><i>Overwrites Bind and Shackle</i></small></p><p><small><i>The unit can still react with Counterhit, Mind\'s Eye and Preempt</i></small></p>'
        },
        '15': {
            'name': 'Poison',
            'effect': 'Deals a fixed amount of damage every 50 RT ticks</br><p><small><i>Poisoned units are immune to Sleep and taking poison damage will remove Charm</i></small></p>'
        },
        '16': {
            'name': 'Poison',
            'effect': 'Deals a fixed amount of damage every 50 RT ticks</br><p><small><i>Poisoned units are immune to Sleep and taking poison damage will remove Charm</i></small></p>'
        },
        '17': {
            'name': 'Hobble',
            'effect': 'Movement is reduced by 1'
        },
        '18': {
            'name': 'Leaden',
            'effect': 'Lowers up/down Jump value to 1 and disables Flying</br>Reduces Attack and Projectile Spell Evasion by ' + Math.abs(accuracyScaling[1].defend.ldn) + '%'
        },
        '19': {
            'name': 'Wither',
            'effect': 'Reduces Max HP by 20%'
        },
        '20': {
            'name': 'Addle',
            'effect': 'Reduces Max MP by 20%'
        },
        '21': {
            'name': 'Curse',
            'effect': 'Reduces Max HP/MP by 20% and temporarily lowers Luck to lowest value<p><small><i>Disables Counterhit, Mind\'s Eye and Preempt</i></small></p>'
        },
        '22': {
            'name': 'Frighten',
            'effect': 'Reduces Offense, Spell Power, Toughness and Resilience'
        },
        '23': {
            'name': 'Quicken',
            'effect': 'Quickens the unit\'s RT counter by 50%'
        },
        '24': {
            'name': 'Slow',
            'effect': 'Slows the unit\'s RT counter by 50%'
        },
        '25': {
            'name': '—'
        },
        '26': {
            'name': 'Nimble',
            'effect': 'The unit ignores height difference while moving'
        },
        '27': {
            'name': 'Waterwalk',
            'effect': 'The unit can walk and stop on water with no penalty'
        },
        '28': {
            'name': '—'
        },
        '29': {
            'name': 'Lavawalk',
            'effect': 'The unit can walk and stop on lava with no penalty'
        },
        '30': {
            'name': 'Warp',
            'effect': 'The unit ignores height difference and physical obstacles while moving<p><small><i>It is still stopped by Rampart Aura</i></small></p>'
        },
        '31': {
            'name': 'Levitate',
            'effect': 'The unit ignores traps, can walk over water at no penalty, has their base jump set to 2&#8593;/4&#8595;, and counts as standing at +1 elevation'
        },
        '32': {
            'name': 'Fly',
            'effect': 'The unit ignores height difference and all obstacles while moving'
        },
        '33': {
            'name': 'Renewal',
            'effect': 'Restores a fixed amount of HP every 50 RT ticks'
        },
        '34': {
            'name': 'Pain Aura',
            'effect': 'Reduces damage resistance by ' + Math.abs(damageScaling[1].defend.pnra) + '% and reflects a part of damage received to the attacker'
        },
        '35': {
            'name': 'Nullify',
            'effect': 'The unit ignores one non-spell effect, regardless if it\'s harmful or not<p><small><i>Abilities from Magic, Necromancy and Art of War command sets count as spells</i></small></p>'
        },
        '36': {
            'name': 'Negate',
            'effect': 'The unit ignores one spell effect, regardless if it\'s harmful or not<p><small><i>Abilities from Magic, Necromancy and Art of War command sets count as spells</i></small></p>'
        },
        '37': {
            'name': 'Sanctify',
            'effect': 'Undead can not stop on tiles next to the unit'
        },
        '38': {
            'name': 'Battering Ram',
            'effect': 'The unit ignores Rampart Aura while moving'
        },
        '39': {
            'name': 'Strengthen',
            'effect': 'Increases Attack Damage Bonus by ' + Math.abs(damageScaling[1].attack.strngthn) + '%'
        },
        '40': {
            'name': 'Weaken',
            'effect': 'Reduces Attack Damage Bonus by ' + Math.abs(damageScaling[1].attack.wkn) + '%'
        },
        '41': {
            'name': 'Spellcraft',
            'effect': 'Increases Spell Damage Bonus by ' + Math.abs(damageScaling[37].attack.spllcrft) + '%'
        },
        '42': {
            'name': 'Feeblemind',
            'effect': 'Reduces Spell Damage Bonus by ' + Math.abs(damageScaling[37].attack.fblmnd) + '%'
        },
        '43': {
            'name': 'Healcraft',
            'effect': 'Increases the Spell Healing amount by 25%<p><small><i>Only works on healing that isn\'t a percentage or fixed amount</i></small></p>'
        },
        '44': {
            'name': 'Spoilheal',
            'effect': 'Reduces the Spell Healing amount by 35%<p><small><i>Only works on healing that isn\'t a percentage or fixed amount</i></small></p>'
        },
        '45': {
            'name': 'Fortify',
            'effect': 'Increases Attack Resistance by ' + Math.abs(damageScaling[1].defend.frtfy) + '%'
        },
        '46': {
            'name': 'Breach',
            'effect': 'Reduces Attack Resistance by ' + Math.abs(damageScaling[1].defend.brch) + '%'
        },
        '47': {
            'name': 'Resilient',
            'effect': 'Increases Spell Resistance by ' + Math.abs(damageScaling[37].defend.rslnt) + '%'
        },
        '48': {
            'name': 'Rupture',
            'effect': 'Reduces Spell Resistance by ' + Math.abs(damageScaling[37].defend.rptr) + '%'
        },
        '49': {
            'name': 'Precision',
            'effect': 'Increases Accuracy by ' + Math.abs(accuracyScaling[1].attack.prcsn) + '%'
        },
        '50': {
            'name': 'Blind',
            'effect': 'Reduces Accuracy by ' + Math.abs(accuracyScaling[1].attack.blnd) + '%'
        },
        '51': {
            'name': 'REMOVED',
            'effect': 'Increases Ranged Accuracy by 50%'
        },
        '52': {
            'name': 'REMOVED',
            'effect': 'Reduces Ranged Accuracy by 50%'
        },
        '53': {
            'name': 'Spellstrike',
            'effect': 'Increases Spell Accuracy by ' + Math.abs(accuracyScaling[21].attack.spllstrk) + '%'
        },
        '54': {
            'name': 'Spellslip',
            'effect': 'Reduces Spell Accuracy by ' + Math.abs(accuracyScaling[21].attack.spllslp) + '%'
        },
        '55': {
            'name': 'Dodge',
            'effect': 'Increases Evasion by ' + Math.abs(accuracyScaling[1].defend.ddg) + '%'
        },
        '56': {
            'name': 'Stagger',
            'effect': 'Reduces Evasion by ' + Math.abs(accuracyScaling[1].defend.stggr) + '%'
        },
        '57': {
            'name': 'Ward',
            'effect': 'Increases Spell Evasion by ' + Math.abs(accuracyScaling[21].defend.wrd) + '%'
        },
        '58': {
            'name': 'Daze',
            'effect': 'Reduces Spell Evasion by ' + Math.abs(accuracyScaling[21].defend.dzd) + '%'
        },
        '59': {
            'name': 'Air-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Air damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '60': {
            'name': 'Earth-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Earth damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '61': {
            'name': 'Lightning-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Lightning damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '62': {
            'name': 'Water-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Water damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '63': {
            'name': 'Fire-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Fire damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '64': {
            'name': 'Ice-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Ice damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '65': {
            'name': 'Light-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Light damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '66': {
            'name': 'Dark-bringer',
            'effect': 'Adds 25% of Attack damage dealt as extra Dark damage<p><small><i>This damage increases Augment rank, but is unaffected by any bonuses</i></small></p>'
        },
        '67': {
            'name': 'Silence-Bringer',
            'effect': 'Attacks inflict Silence on hit'
        },
        '68': {
            'name': 'Stun-Bringer',
            'effect': 'Attacks inflict Stun on hit'
        },
        '69': {
            'name': 'Poison-Bringer',
            'effect': 'Attacks inflict Poison on hit'
        },
        '70': {
            'name': 'Resist Air',
            'effect': 'Increases Air Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '71': {
            'name': 'Resist Earth',
            'effect': 'Increases Earth Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '72': {
            'name': 'Resist Lightning',
            'effect': 'Increases Lightning Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '73': {
            'name': 'Resist Water',
            'effect': 'Increases Water Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '74': {
            'name': 'Resist Fire',
            'effect': 'Increases Fire Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '75': {
            'name': 'Resist Ice',
            'effect': 'Increases Ice Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '76': {
            'name': 'Resist Light',
            'effect': 'Increases Light Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '77': {
            'name': 'Resist Dark',
            'effect': 'Increases Dark Resistance by ' + Math.abs(damageScaling[1].defend.elres) + '%'
        },
        '78': {
            'name': 'Air-averse',
            'effect': 'Reduces Air Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '79': {
            'name': 'Earth-averse',
            'effect': 'Reduces Earth Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '80': {
            'name': 'Lightning-averse',
            'effect': 'Reduces Lightning Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '81': {
            'name': 'Water-averse',
            'effect': 'Reduces Water Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '82': {
            'name': 'Fire-averse',
            'effect': 'Reduces Fire Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '83': {
            'name': 'Ice-averse',
            'effect': 'Reduces Ice Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '84': {
            'name': 'Light-averse',
            'effect': 'Reduces Light Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        },
        '85': {
            'name': 'Dark-averse',
            'effect': 'Reduces Dark Resistance by ' + Math.abs(damageScaling[1].defend.elave) + '%'
        }
    },
    '19': {
        'name': 'remove'
    },
    '20': {
        'name': 'ready',
        '1': {
            'name': 'Mighty Strike',
            'effect': 'Next Melee attack is a guaranteed critical hit with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '2': {
            'name': 'Surestrike',
            'effect': 'Next Melee attack hits with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '3': {
            'name': 'Double Strike',
            'effect': 'Next Melee attack hits twice<p><small><i>Both attacks cost RT</i></small></p>'
        },
        '4': {
            'name': 'Tremendous Shot',
            'effect': 'Next Ranged attack is a guaranteed critical hit with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p><p><small><i>Does not work on Fusils</i></small></p>'
        },
        '5': {
            'name': 'Sureshot',
            'effect': 'Next Ranged attack hits with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p><p><small><i>Does not work on Fusils</i></small></p>'
        },
        '6': {
            'name': 'Double Shot',
            'effect': 'Next Ranged attack hits twice<p><small><i>You can\'t attack past the designated weapon range with this ability</i></small></p><p><small><i>Both attacks cost RT</i></small></p><p><small><i>Does not work on Fusils or Lobber</i></small></p>'
        },
        '7': {
            'name': 'Conserve RT',
            'effect': 'Next Spell costs no RT'
        },
        '8': {
            'name': 'Extend',
            'effect': 'Next Spell has 3 extra Range'
        },
        '9': {
            'name': "Mother's Blessing",
            'effect': 'Next Divine spell heals for twice the amount<p><small><i>If the spell doesn\'t heal, the effect is wasted</i></small></p><p><small><i>Percentage healing isn\'t affected</i></small></p>'
        },
        '10': {
            'name': 'Conserve MP',
            'effect': 'Next Spell costs no MP'
        },
        '11': {
            'name': 'Old Phalanx',
            'effect': 'Damage taken is reduced by 90% until next turn<br>Disables Counterhit'
        },
        '12': {
            'name': 'Guardian Force',
            'effect': 'Redirects 50% of damage taken by allies within 2 tiles to the user\'s HP until next turn'
        },
        '13': {
            'name': 'Fearful Impact',
            'effect': 'Next Melee attack hits with 100% accuracy and inflicts Fear<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '14': {
            'name': 'Berserk',
            'effect': 'Next Melee attack will hit all tiles in front and to the sides of the user<p><small><i>All units struck will Counterhit, if able</i></small></p>'
        },
        '15': {
            'name': 'Last Resort',
            'effect': 'Next Melee attack is delivered as if the user\'s STR is 50% higher'
        },
        '16': {
            'name': 'Meat Shield',
            'effect': 'Allies within 2 tiles will absorb 50% of the damage taken by the user until next turn'
        },
        '17': {
            'name': 'Blade Spirit',
            'effect': 'Next Katana attack is delivered as if the weapon\'s ATK score is 25% higher'
        },
        '18': {
            'name': "Mind's Eye",
            'effect': 'User is guaranteed to evade all basic Melee attacks until next turn'
        },
        '19': {
            'name': 'Preempt',
            'effect': 'User will intercept all basic Melee attacks with an attack of their own, if in range'
        },
        '20': {
            'name': 'Dragonslayer',
            'effect': 'Next attack will have 50% higher Offense and ATK against Dragons and hit with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '21': {
            'name': 'Dragonsbane',
            'effect': 'Next Melee attack will have 25% higher Offense and ATK against Dragons'
        },
        '22': {
            'name': 'Empower Dragon',
            'effect': 'Next attack by a Dragon will deal increased damage'
        },
        '23': {
            'name': 'Repel Dragon',
            'effect': 'User is guaranteed to evade all attacks from Dragons until next turn<br>Disables Counterhit'
        },
        '24': {
            'name': 'Concentration',
            'effect': 'Next Ninjutsu will hit with 100% accuracy'
        },
        '25': {
            'name': 'Steelstance',
            'effect': 'Toughness, Resilience and DEF are 50% higher until next turn'
        },
        '26': {
            'name': 'Sneak Attack',
            'effect': 'Next Melee attack will have 30% higher Offense and ATK if delivered from behind'
        },
        '27': {
            'name': 'Sharpshoot',
            'effect': 'Next Fusil attack is a guaranteed critical hit with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '28': {
            'name': 'Course Correction',
            'effect': 'Next Fusil attack will ignore obstacles and hit with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '29': {
            'name': 'Beastslayer',
            'effect': 'Next attack will have 50% higher Offense and ATK against Beasts and hit with 100% accuracy<p><small><i>This also guarantees the weapon on hit effect, if any</i></small></p>'
        },
        '30': {
            'name': 'Beastbane',
            'effect': 'Next Melee attack will have 25% higher Offense and ATK against Beasts'
        },
        '31': {
            'name': 'Empower Beast',
            'effect': 'Next attack by a Beast will deal increased damage'
        },
        '32': {
            'name': 'Repel Beast',
            'effect': 'User is guaranteed to evade all attacks from Beasts until next turn<br>Disables Counterhit'
        },
        '33': {
            'name': 'Golemsbane',
            'effect': 'Next Melee attack will have 25% higher Offense and ATK against Golems'
        },
        '34': {
            'name': 'Empower Golem',
            'effect': 'Next attack by a Golem will deal increased damage'
        },
        '35': {
            'name': 'Reflection',
            'effect': 'Next Spell cast on the user will be reflected back on the caster'
        },
        '36': {
            'name': 'Evilsbane',
            'effect': 'Next Melee attack will have 25% higher Offense and ATK against Umbra'
        },
        '37': {
            'name': 'Taunt',
            'effect': 'The user is more likely to be attacked by enemies until next turn<p><small><i>Supposedly</i></small></p>'
        },
        '38': {
            'name': 'Aquaveil',
            'effect': 'Until the next attack, user is treated as standing in water'
        },
        '39': {
            'name': 'Gordian Lock',
            'effect': 'Damage taken is reduced by 90% until next turn and added to the user\'s TP reserves<br>Disables Counterhit'
        },
        '40': {
            'name': "Nature's Touch",
            'effect': 'Next Spell will have a 1.5x bonus to damage dealt'
        },
        '41': {
            'name': 'Echoing Voice',
            'effect': 'Next Song will have double Duration'
        },
        '42': {
            'name': 'Resounding Voice',
            'effect': 'Next Song will have 1 extra Area'
        },
        '43': {
            'name': 'Dash',
            'effect': 'Next Movement will have 3 extra Range'
        },
        '44': {
            'name': 'Instinct',
            'effect': 'Next Special skill will hit with 100% accuracy<p><small><i>This also guarantees the skill on hit effect, if any</i></small></p>'
        },
        '45': {
            'name': 'Spike Skin',
            'effect': 'Damage taken is reduced by 80% until next turn and reflected to the attacker<br>Disables Counterhit'
        },
        '46': {
            'name': 'Feint',
            'effect': 'Next Attack will have the same accuracy as if it was delivered from behind'
        },
        '47': {
            'name': 'Broaden Force',
            'effect': 'Rampart Aura will count as being 1 tier higher until next turn<p><small><i>This is the only way to have Rampart Aura V</i></small></p>'
        },
        '48': {
            'name': 'Apostate',
            'effect': 'The unit ignores all spell effects until next turn, regardless if they\'re harmful or not<p><small><i>Abilities from Magic, Necromancy and Art of War command sets count as spells</i></small></p>'
        },
        '49': {
            'name': 'Ivory Tower',
            'effect': 'The unit ignores all non-spell effects until next turn, regardless if they\'re harmful or not<p><small><i>Abilities from Magic, Necromancy and Art of War command sets count as spells</i></small></p>'
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
    '9s': {
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
        'icon': 'img/icons/equip-katana1h.png'
    },
    '32': {
        'name': '2H Katana Finisher',
        'icon': 'img/icons/equip-katana2h.png'
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
        'text': 'Adds <b>' + damageScaling[1].attack.wskl + ' Offense</b> and <b>' + accuracyScaling[1].attack.wskl +'% Hit Chance</b> per <b>Rank</b> to <b>[insert1]</b> Attacks and Finishers'
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
        'text': 'Adds <b>' + damageScaling[1].attack.rac + ' Offense</b> per <b>Rank</b> to any hits delivered against <b>[insert1]</b> units'
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
        'text': 'Adds <b>' + damageScaling[1].attack.aug + ' Offense/Power</b> per <b>Rank</b> to any <b>[insert1]</b> Element hits | Adds <b>' + damageScaling[1].defend.aug + ' Toughness/Resilience</b> per <b>Rank</b> against any incoming <b>[insert2]</b> Element hits'
    },
    '31': {
        'insert1': 'Air',
        'insert2': 'Air'
    },
    '32': {
        'insert1': 'Earth',
        'insert2': 'Earth'
    },
    '33': {
        'insert1': 'Lightning',
        'insert2': 'Lightning'
    },
    '34': {
        'insert1': 'Water',
        'insert2': 'Water'
    },
    '35': {
        'insert1': 'Fire',
        'insert2': 'Fire'
    },
    '36': {
        'insert1': 'Ice',
        'insert2': 'Ice'
    },
    '37': {
        'insert1': 'Light',
        'insert2': 'Dark'
    },
    '38': {
        'insert1': 'Dark',
        'insert2': 'Light'
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
        'text': 'If <b>Augment [insert1]</b> is also equipped, this skill will reduce the <b>Final Damage</b> of any incoming <b>[insert2]</b> Element hits by <b>4%</b> per <b>Augment Rank</b>'
    },
    '71': {
        'insert1': 'Air',
        'insert2': 'Air'
    },
    '72': {
        'insert1': 'Earth',
        'insert2': 'Earth'
    },
    '73': {
        'insert1': 'Lightning',
        'insert2': 'Lightning'
    },
    '74': {
        'insert1': 'Water',
        'insert2': 'Water'
    },
    '75': {
        'insert1': 'Fire',
        'insert2': 'Fire'
    },
    '76': {
        'insert1': 'Ice',
        'insert2': 'Ice'
    },
    '77': {
        'insert1': 'Light',
        'insert2': 'Dark'
    },
    '78': {
        'insert1': 'Darkness',
        'insert2': 'Light'
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
        'text': 'Adds <b>25%</b> to <b>Attack Damage Bonus</b>'
    },
    '102': {
        'text': 'Adds <b>50%</b> to <b>Attack Damage Resistance</b>'
    },
    '111': {
        'text': 'Adds <b>25%</b> to <b>Spell Damage Resistance</b>'
    },
    '112': {
        'text': 'Adds <b>50%</b> to <b>Spell Damage Resistance</b>'
    },
    '117': {
        'text': 'Adds <b>50%</b> to <b>Melee Attack Hit Chance</b>'
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

const derivedStatList = {
    1: {
        formula: 'damage',
        formulaId: 1,
        side: 'attack'
    },
    2: {
        formula: 'damage',
        formulaId: 7,
        side: 'attack'
    },
    3: {
        formula: 'damage',
        formulaId: 13,
        side: 'attack'
    },
    4: {
        formula: 'damage',
        formulaId: 19,
        side: 'attack'
    },
    5: {
        formula: 'damage',
        formulaId: 1,
        side: 'defend'
    },
    6: {
        formula: 'accuracy',
        formulaId: 1,
        side: 'attack'
    },
    7: {
        formula: 'accuracy',
        formulaId: 1,
        side: 'defend'
    },
    8: {
        formula: 'damage',
        formulaId: 37,
        side: 'attack'
    },
    9: {
        formula: 'damage',
        formulaId: 37,
        side: 'defend'
    },
    10: {
        formula: 'accuracy',
        formulaId: 21,
        side: 'attack'
    },
    11: {
        formula: 'accuracy',
        formulaId: 21,
        side: 'defend'
    },
    12: {
        formula: 'accuracy',
        formulaId: 23,
        side: 'attack'
    },
    13: {
        formula: 'accuracy',
        formulaId: 23,
        side: 'defend'
    },
    14: {
        formula: 'accuracy',
        formulaId: 25,
        side: 'defend'
    },
    15: {
        formula: 'accuracy',
        formulaId: 29,
        side: 'defend'
    },
    16: {
        formula: 'accuracy',
        formulaId: 27,
        side: 'attack'
    },
    17: {
        formula: 'accuracy',
        formulaId: 27,
        side: 'defend'
    }
}