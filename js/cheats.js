
document.addEventListener('DOMContentLoaded', function() {

    const magicJson = 'data/magic.json';

    const templateTweaker = document.getElementById('templateTweaker'),
        tempTwTemplate = document.getElementById('tempTwTemplate'),
        tempTwSprite = document.getElementById('tempTwSprite'),
        tempTwColor = document.getElementById('tempTwColor'),
        tempTwPortrait = document.getElementById('tempTwPortrait'),
        tempTwCcset = document.getElementById('tempTwCcset'),
        tempTwResult = document.getElementById('tempTwResult'),
        tempTwSwitchRoster = document.getElementById('tempTwSwitchRoster'),
        tempTwSwitchResult = document.getElementById('tempTwSwitchResult'),
        classLevelSetter = document.getElementById('classLevelSetter'),
        classLvClass = document.getElementById('classLvClass'),
        classLvLevel = document.getElementById('classLvLevel'),
        classLvResult = document.getElementById('classLvResult'),
        characterRenamer = document.getElementById('characterRenamer'),
        chRenameRoster = document.getElementById('chRenameRoster'),
        chRenameName = document.getElementById('chRenameName'),
        chRenameResult = document.getElementById('chRenameResult'),
        spellTeacher = document.getElementById('spellTeacher'),
        spTeachSpells = document.getElementById('spTeachSpells'),
        spTeachRoster = document.getElementById('spTeachRoster'),
        spTeachResult = document.getElementById('spTeachResult');

    let magic = [];

    async function loadGenerators() {

        // Template Tweaker
        characterTemplates.forEach( (item) => {
            let option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
            tempTwTemplate.append(option);
        });
        characterSprites.forEach( (item) => {
            let option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
            tempTwSprite.append(option);
        });
        spriteColors.forEach( (item) => {
            let option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
            tempTwColor.append(option);
        });
        characterPortraits.forEach( (item) => {
            let option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
            tempTwPortrait.append(option);
        });
        classChangeSets.forEach( (item) => {
            let option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
            tempTwCcset.append(option);
        });

        generateTempTwCodes();
        generateTempTwSwitchCodes();

        templateTweaker.querySelectorAll('select').forEach( (element) => {
            element.onchange = function(){
                generateTempTwCodes();
                generateTempTwSwitchCodes();
            };
        });
        templateTweaker.querySelectorAll('input').forEach( (element) => {
            element.oninput = function(){
                generateTempTwSwitchCodes();
            };
        });

        // Class Level
        availableClasses.forEach( (item) => {
            let option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
            classLvClass.append(option);
        });

        generateClassLvCodes();

        classLevelSetter.querySelectorAll('select').forEach( (element) => {
            element.onchange = function(){
                generateClassLvCodes();
            };
        });
        classLevelSetter.querySelectorAll('input').forEach( (element) => {
            element.oninput = function(){
                generateClassLvCodes();
            };
        });

        // Character Renamer
        generateChRenameCodes();

        characterRenamer.querySelectorAll('input').forEach( (element) => {
            element.oninput = function(){
                generateChRenameCodes();
            };
        });

        // Spell Teacher
        magic = await fetchJSON(magicJson);
        let categoryName = '';
        let fieldset = null;
        magic.forEach( (item) => {
            if ( abilityType[item.typ]['name'] !== categoryName ) {
                if (fieldset !== null)
                    spTeachSpells.appendChild(fieldset);
                categoryName = abilityType[item.typ]['name'];
                fieldset = document.createElement('fieldset');
                let legend = document.createElement('legend');
                    let classImg = document.createElement('img');
                        classImg.src = abilityType[item.typ]['icon'];
                    let legendText = document.createElement('span');
                        legendText.textContent = categoryName;
                    let selectAllLabel = document.createElement('label');
                        let selectAll = document.createElement('input');
                            selectAll.type = 'checkbox';
                        selectAllLabel.innerHTML += 'all';
                        selectAllLabel.appendChild(selectAll);
                    legend.append(classImg, legendText, selectAllLabel);
                fieldset.appendChild(legend);
            }
            let input = document.createElement('input');
                input.type = 'checkbox';
                input.id = item.id;
            let label = document.createElement('label');
                label.appendChild(input);
                if (item.unique)
                    label.classList.add('orange');
                else if ([219,220,226].includes(item.id))
                    label.classList.add('red');
                let spellName = document.createElement('span');
                    spellName.innerHTML += item.name;
                label.appendChild(spellName);
            let breaker = document.createElement('br');
            fieldset.append(label, breaker);
        });
        spTeachSpells.appendChild(fieldset);

        spellTeacher.querySelectorAll('input').forEach( (element) => {
            element.oninput = function(){
                if (!this.id) {
                    let groupChecks = this.closest('fieldset').querySelectorAll('input[id]');
                    if (this.checked) {
                        groupChecks.forEach( (box) => {
                            box.checked = true;
                        });
                    } else {
                        groupChecks.forEach( (box) => {
                            box.checked = false;
                        });
                    }
                } else if (element.type === 'checkbox') {
                    if (this.closest('fieldset').querySelectorAll('input[id]:not(:checked)').length === 0)
                        this.closest('fieldset').querySelector('input:not([id])').checked = true;
                    else
                        this.closest('fieldset').querySelector('input:not([id])').checked = false;
                }
                generateSpTeachCodes();
            };
        });
    }

    function generateTempTwCodes() {

        tempTwResult.innerHTML = '';
        if (tempTwTemplate.value === '') {
            tempTwResult.innerHTML = '<span class="red">No template selected</span>';
        } else if ( tempTwSprite.value === '' && tempTwColor.value === '' && tempTwPortrait.value === '' && tempTwCcset.value === '' ) {
            tempTwResult.innerHTML = '<span class="red">No tweaks selected</span>';
        } else {
            let template = parseInt(tempTwTemplate.value);
            tempTwResult.innerHTML += '_C0 Template Change (' + tempTwTemplate.options[tempTwTemplate.selectedIndex].text + ')';
            if (tempTwSprite.value !== '') {
                let sprite = parseInt(tempTwSprite.value);
                tempTwResult.innerHTML += '<br>_L 0x00' + decToHex(parseInt('4B138C', 16) + 64 * (template - 1), 3) + ' 0x000000' + decToHex(sprite, 1);
                if (template === 1)
                    tempTwResult.innerHTML += '<br>_L 0x00471E10 0x000000' + decToHex(sprite, 1) + '<br>_L 0x00471E12 0x000000' + decToHex(sprite, 1);
                if (template === 2)
                    tempTwResult.innerHTML += '<br>_L 0x00471E88 0x000000' + decToHex(sprite, 1) + '<br>_L 0x00471E8A 0x000000' + decToHex(sprite, 1);
                if (template === 3)
                    tempTwResult.innerHTML += '<br>_L 0x00471FF0 0x000000' + decToHex(sprite, 1) + '<br>_L 0x00471FF2 0x000000' + decToHex(sprite, 1);
            }
            if (tempTwColor.value !== '') {
                let color = parseInt(tempTwColor.value);
                tempTwResult.innerHTML += '<br>_L 0x00' + decToHex(parseInt('4B138F', 16) + 64 * (template - 1), 3) + ' 0x000000' + decToHex(color, 1);
                if (template === 1)
                    tempTwResult.innerHTML += '<br>_L 0x00471E14 0x000000' + decToHex(color, 1);
                if (template === 2)
                    tempTwResult.innerHTML += '<br>_L 0x00471E8C 0x000000' + decToHex(color, 1);
                if (template === 3)
                    tempTwResult.innerHTML += '<br>_L 0x00471FF4 0x000000' + decToHex(color, 1);
            }
            if (tempTwPortrait.value !== '') {
                let portrait = parseInt(tempTwPortrait.value);
                tempTwResult.innerHTML += '<br>_L 0x10' + decToHex(parseInt('4B1392', 16) + 64 * (template - 1), 3) + ' 0x0000' + decToHex(portrait, 2);
                if (template === 1)
                    tempTwResult.innerHTML += '<br>_L 0x80471DEA 0x000E0001<br>_L 0x1000' + decToHex(portrait, 2) + ' 0x00000000';
                if (template === 2)
                    tempTwResult.innerHTML += '<br>_L 0x80471E62 0x000E0001<br>_L 0x1000' + decToHex(portrait, 2) + ' 0x00000000';
                if (template === 3)
                    tempTwResult.innerHTML += '<br>_L 0x80471FCA 0x000E0001<br>_L 0x1000' + decToHex(portrait, 2) + ' 0x00000000';
            }
            if (tempTwCcset.value !== '') {
                let classSet = parseInt(tempTwCcset.value);
                tempTwResult.innerHTML += '<br>_L 0x00' + decToHex(parseInt('4B138A', 16) + 64 * (template - 1), 3) + ' 0x000000' + decToHex(classSet, 1);
            }
        }
    }

    function generateTempTwSwitchCodes() {

        tempTwSwitchResult.innerHTML = '';
        if (tempTwSwitchRoster.value === '') {
            tempTwSwitchResult.innerHTML = '<span class="red">No roster slot selected</span>';
        } else if (tempTwTemplate.value === '') {
            tempTwSwitchResult.innerHTML = '<span class="red">No special character template selected in the tweaker section</span>';
        } else {
            let rosterSlot = parseInt(tempTwSwitchRoster.value);
            let template = parseInt(tempTwTemplate.value);
            tempTwSwitchResult.innerHTML += '_C0 Change Unit ' + rosterSlot + ' to ' + tempTwTemplate.options[tempTwTemplate.selectedIndex].text;
            tempTwSwitchResult.innerHTML += '<br>_L 0x10' + decToHex(parseInt('2D84A4', 16) + 1164 * (rosterSlot - 1), 3) + ' 0x0000' + decToHex(template, 2);
        }
    }

    function generateClassLvCodes() {

        classLvResult.innerHTML = '';
        if (classLvClass.value === '') {
            classLvResult.innerHTML = '<span class="red">No class selected</span>';
        } else if ( classLvLevel.value === '' || classLvLevel.value < 1 || classLvLevel.value > 50 ) {
            classLvResult.innerHTML = '<span class="red">No valid level set</span>';
        } else {
            let targetClass = parseInt(classLvClass.value);
            let level = parseInt(classLvLevel.value);
            let exp = level/2 * (level - 1) * 40;
            classLvResult.innerHTML += '_C0 Set ' + classLvClass.options[classLvClass.selectedIndex].text + ' to level ' + classLvLevel.value;
            classLvResult.innerHTML += '<br>_L 0x20' + decToHex(parseInt('2E7E98', 16) + 8 * (targetClass - 1), 3) + ' 0x000000' + decToHex(level, 1);
            classLvResult.innerHTML += '<br>_L 0x20' + decToHex(parseInt('2E7E9C', 16) + 8 * (targetClass - 1), 3) + ' 0x0000' + decToHex(exp, 2);
        }
    }

    function generateChRenameCodes() {

        chRenameResult.innerHTML = '';
        if (chRenameRoster.value === '') {
            chRenameResult.innerHTML = '<span class="red">No roster slot selected</span>';
        } else if ( chRenameName.value === '' || chRenameName.value.length > 22 ) {
            chRenameResult.innerHTML = '<span class="red">No valid name entered</span>';
        } else {
            let rosterSlot = parseInt(chRenameRoster.value);
            let newName = '␂' + chRenameName.value;
            chRenameResult.innerHTML += '_C0 Rename Unit ' + chRenameRoster.value + ' to ' + chRenameName.value;
            let nameSegment = '';
            for (let i = 0; i < 24; i++) {
                if (newName.charAt(i))
                    nameSegment = decToHex(characterSymbols.find((row) => row['char'] === newName.charAt(i)).id, 1)  + nameSegment;
                else
                    nameSegment = '00' + nameSegment;
                if (i % 4 === 3) {
                    chRenameResult.innerHTML += '<br>_L 0x20' + decToHex(parseInt('2D847C', 16) + 1164 * (rosterSlot - 1) + (i - 3), 3) + ' 0x' + nameSegment;
                    nameSegment = '';
                }
            }
            chRenameResult.innerHTML += '<br>_L 0x80' + decToHex(parseInt('2D8494', 16) + 1164 * (rosterSlot - 1), 3) + ' 0x000F0001';
            chRenameResult.innerHTML += '<br>_L 0x00000000 0x00000000';
        }
    }

    function generateSpTeachCodes() {

        spTeachResult.innerHTML = '';
        if (spTeachRoster.value === '') {
            spTeachResult.innerHTML = '<span class="red">No roster slot selected</span>';
        } else {
            let rosterSlot = parseInt(spTeachRoster.value);
            spTeachResult.innerHTML += '_C0 Set Learned Spells For Unit ' + rosterSlot;
            let selectedSpellIds = [];
            let selectedSpells = document.querySelectorAll('#spTeachSpells input[id]:checked');
            selectedSpells.forEach( (element) => {
                selectedSpellIds.push(parseInt(element.id));
            });
            let spellSum = 0;
            let spellSegment = '';
            for (let i = 0; i < 264; i++) {
                if (selectedSpellIds.includes(i))
                    spellSum += 2 ** (i % 8);
                if ( i > 0 && i % 8 === 7) {
                    spellSegment = decToHex(spellSum, 1)  + spellSegment;
                    spellSum = 0;
                }
                if ( i > 0 && i % 24 === 23) {
                    spTeachResult.innerHTML += '<br>_L 0x20' + decToHex(parseInt('2D8586', 16) + 1164 * (rosterSlot - 1) + 3 * (parseInt(i / 24)), 3) + ' 0x00' + spellSegment;
                    spellSegment = '';
                }
            }
        }
    }

    function decToHex(number, bytes) {
        return number.toString(16).toUpperCase().padStart(bytes * 2, '0');
    }

    const characterTemplates = [
        {
            'id': 1,
            'name': 'Denam'
        },
        {
            'id': 2,
            'name': 'Vyce'
        },
        {
            'id': 3,
            'name': 'Catiua'
        },
        {
            'id': 4,
            'name': 'Lanselot'
        },
        {
            'id': 5,
            'name': 'Warren'
        },
        {
            'id': 6,
            'name': 'Canopus'
        },
        {
            'id': 7,
            'name': 'Mirdyn'
        },
        {
            'id': 8,
            'name': 'Gildas'
        },
        {
            'id': 9,
            'name': 'Cerya'
        },
        {
            'id': 10,
            'name': 'Sherri'
        },
        {
            'id': 11,
            'name': 'Cistina'
        },
        {
            'id': 12,
            'name': 'Olivya'
        },
        {
            'id': 13,
            'name': 'Deneb'
        },
        {
            'id': 16,
            'name': 'Donnalto'
        },
        {
            'id': 17,
            'name': 'Folcurt'
        },
        {
            'id': 18,
            'name': 'Bayin'
        },
        {
            'id': 19,
            'name': 'Arycelle'
        },
        {
            'id': 20,
            'name': 'Hobyrim'
        },
        {
            'id': 21,
            'name': 'Jeunan'
        },
        {
            'id': 22,
            'name': 'Ocionne'
        },
        {
            'id': 23,
            'name': 'Xapan'
        },
        {
            'id': 24,
            'name': 'Dievold'
        },
        {
            'id': 25,
            'name': 'Oelias'
        },
        {
            'id': 26,
            'name': 'Rudlum'
        },
        {
            'id': 27,
            'name': 'Ganpp'
        },
        {
            'id': 28,
            'name': 'Iuria'
        },
        {
            'id': 29,
            'name': 'Cressida'
        },
        {
            'id': 30,
            'name': 'Ozma'
        },
        {
            'id': 31,
            'name': 'Lindl'
        },
        {
            'id': 32,
            'name': 'Leonar'
        },
        {
            'id': 33,
            'name': 'Ravness'
        },
        {
            'id': 34,
            'name': 'Azelstan'
        },
        {
            'id': 38,
            'name': 'Ehlrig'
        },
        {
            'id': 39,
            'name': 'Berda the Younger'
        },
        {
            'id': 40,
            'name': 'Obda the Younger'
        },
        {
            'id': 133,
            'name': 'Sara'
        },
        {
            'id': 134,
            'name': 'Voltare'
        },
        {
            'id': 135,
            'name': 'Felicia'
        },
        {
            'id': 136,
            'name': 'Chamos'
        },
        {
            'id': 137,
            'name': 'Phaesta'
        },
        {
            'id': 138,
            'name': 'Tamuz'
        }
    ];

    const characterSprites = [
        {
            'id': 0,
            'name': 'Class-Dependent'
        },
        {
            'id': 5,
            'name': 'Andoras'
        },
        {
            'id': 6,
            'name': 'Female Archer'
        },
        {
            'id': 7,
            'name': 'Male Archer'
        },
        {
            'id': 8,
            'name': 'Azelstan'
        },
        {
            'id': 10,
            'name': 'Balxzephon'
        },
        {
            'id': 12,
            'name': 'Barbas'
        },
        {
            'id': 13,
            'name': 'Female Beast Tamer'
        },
        {
            'id': 14,
            'name': 'Male Beast Tamer'
        },
        {
            'id': 15,
            'name': 'Female Berserker'
        },
        {
            'id': 16,
            'name': 'Male Berserker'
        },
        {
            'id': 21,
            'name': 'Canopus'
        },
        {
            'id': 22,
            'name': 'Female Cleric'
        },
        {
            'id': 23,
            'name': 'Male Cleric'
        },
        {
            'id': 24,
            'name': 'Cockatrice'
        },
        {
            'id': 25,
            'name': 'Cressida'
        },
        {
            'id': 26,
            'name': 'Cyclops'
        },
        {
            'id': 27,
            'name': 'Catiua (fake)'
        },
        {
            'id': 28,
            'name': 'Deneb'
        },
        {
            'id': 29,
            'name': 'Denam'
        },
        {
            'id': 30,
            'name': 'Denam (lord)'
        },
        {
            'id': 31,
            'name': 'Female Divine Knight'
        },
        {
            'id': 32,
            'name': 'Male Divine Knight'
        },
        {
            'id': 33,
            'name': 'Templar'
        },
        {
            'id': 34,
            'name': 'Dorgalua'
        },
        {
            'id': 35,
            'name': 'Ogre'
        },
        {
            'id': 36,
            'name': 'Arc Dragon'
        },
        {
            'id': 37,
            'name': 'Cloud Dragon'
        },
        {
            'id': 38,
            'name': 'Dark Dragon'
        },
        {
            'id': 39,
            'name': 'Earth Dragon'
        },
        {
            'id': 40,
            'name': 'Flame Dragon'
        },
        {
            'id': 41,
            'name': 'Flood Dragon'
        },
        {
            'id': 42,
            'name': 'Frost Dragon'
        },
        {
            'id': 43,
            'name': 'Thunder Dragon'
        },
        {
            'id': 44,
            'name': 'Female Dragoon'
        },
        {
            'id': 45,
            'name': 'Male Dragoon'
        },
        {
            'id': 46,
            'name': 'Faerie'
        },
        {
            'id': 47,
            'name': 'Old Sorceress'
        },
        {
            'id': 48,
            'name': 'Ganpp'
        },
        {
            'id': 49,
            'name': 'Ghost'
        },
        {
            'id': 52,
            'name': 'Clay Golem'
        },
        {
            'id': 53,
            'name': 'Iron Golem'
        },
        {
            'id': 54,
            'name': 'Stone Golem'
        },
        {
            'id': 55,
            'name': 'Baldur Golem'
        },
        {
            'id': 56,
            'name': 'Imp'
        },
        {
            'id': 57,
            'name': 'Gryphon'
        },
        {
            'id': 58,
            'name': 'Gildas'
        },
        {
            'id': 59,
            'name': 'Female Fusilier'
        },
        {
            'id': 60,
            'name': 'Male Fusilier'
        },
        {
            'id': 61,
            'name': 'Hawkman'
        },
        {
            'id': 62,
            'name': 'Hobyrim'
        },
        {
            'id': 63,
            'name': 'Hydra'
        },
        {
            'id': 64,
            'name': 'Catiua'
        },
        {
            'id': 65,
            'name': 'Dark Catiua'
        },
        {
            'id': 66,
            'name': 'Princess Catiua'
        },
        {
            'id': 68,
            'name': 'Female Knight'
        },
        {
            'id': 69,
            'name': 'Male Knight'
        },
        {
            'id': 70,
            'name': 'Lamia'
        },
        {
            'id': 71,
            'name': 'Lanselot'
        },
        {
            'id': 72,
            'name': 'Lans Tartare'
        },
        {
            'id': 74,
            'name': 'Leonar'
        },
        {
            'id': 75,
            'name': 'Female Lich'
        },
        {
            'id': 76,
            'name': 'Male Lich'
        },
        {
            'id': 77,
            'name': 'Lindl'
        },
        {
            'id': 78,
            'name': 'Lizardman'
        },
        {
            'id': 81,
            'name': 'Martym'
        },
        {
            'id': 84,
            'name': 'Mirdyn'
        },
        {
            'id': 85,
            'name': 'Old Sorcerer'
        },
        {
            'id': 87,
            'name': 'Female Necromancer'
        },
        {
            'id': 88,
            'name': 'Male Necromancer'
        },
        {
            'id': 89,
            'name': 'Kunoichi'
        },
        {
            'id': 90,
            'name': 'Ninja'
        },
        {
            'id': 91,
            'name': 'Nybbas'
        },
        {
            'id': 92,
            'name': 'Octopus'
        },
        {
            'id': 93,
            'name': 'Olivya'
        },
        {
            'id': 94,
            'name': 'Orc'
        },
        {
            'id': 95,
            'name': 'Oelias'
        },
        {
            'id': 96,
            'name': 'Oz'
        },
        {
            'id': 97,
            'name': 'Ozma'
        },
        {
            'id': 99,
            'name': 'Pumpkinhead'
        },
        {
            'id': 100,
            'name': 'Ravness'
        },
        {
            'id': 101,
            'name': 'Rodrick'
        },
        {
            'id': 104,
            'name': 'Female Rogue'
        },
        {
            'id': 105,
            'name': 'Male Rogue'
        },
        {
            'id': 106,
            'name': 'Cerya'
        },
        {
            'id': 107,
            'name': 'Sherri'
        },
        {
            'id': 108,
            'name': 'Cistina'
        },
        {
            'id': 109,
            'name': 'Skeleton'
        },
        {
            'id': 110,
            'name': 'Witch'
        },
        {
            'id': 111,
            'name': 'Warlock'
        },
        {
            'id': 112,
            'name': 'Female Swordmaster'
        },
        {
            'id': 113,
            'name': 'Male Swordmaster'
        },
        {
            'id': 114,
            'name': 'Female Terror Knight'
        },
        {
            'id': 115,
            'name': 'Male Terror Knight'
        },
        {
            'id': 116,
            'name': 'Valkyrie'
        },
        {
            'id': 117,
            'name': 'Rune Fencer'
        },
        {
            'id': 119,
            'name': 'Vyce'
        },
        {
            'id': 121,
            'name': 'Volaq'
        },
        {
            'id': 123,
            'name': 'Warren'
        },
        {
            'id': 124,
            'name': 'Female Warrior'
        },
        {
            'id': 125,
            'name': 'Male Warrior'
        },
        {
            'id': 126,
            'name': 'Enchantress'
        },
        {
            'id': 127,
            'name': 'Wizard'
        },
        {
            'id': 131,
            'name': 'Iuria'
        },
        {
            'id': 132,
            'name': 'Xaebos'
        }
    ];

    const spriteColors = [
        {
            'id': 0,
            'name': 'Player Faction (green/blue)'
        },
        {
            'id': 1,
            'name': 'Bakram (purple/red)'
        },
        {
            'id': 2,
            'name': 'Galgastan (tan/navy)'
        },
        {
            'id': 3,
            'name': 'Undead (green/purple)'
        },
        {
            'id': 4,
            'name': 'Liberation Army (teal/brown)'
        },
        {
            'id': 5,
            'name': 'Outlaws (black/red)'
        },
        {
            'id': 6,
            'name': 'Other (purple)'
        },
        {
            'id': 10,
            'name': 'Special Color 1 (gold/red)'
        },
        {
            'id': 11,
            'name': 'Special Color 2 (silver/blue)'
        },
        {
            'id': 14,
            'name': 'Special Color 3 (red/black)'
        },
        {
            'id': 15,
            'name': 'Special Color 4 (red/blue)'
        },
        {
            'id': 255,
            'name': 'Faction-Dependent'
        }
    ];

    const characterPortraits = [
        {
            'id': 0,
            'name': 'Class-Dependent'
        },
        {
            'id': 1,
            'name': 'Woman'
        },
        {
            'id': 2,
            'name': 'Vyce\'s Father'
        },
        {
            'id': 3,
            'name': 'Old Woman'
        },
        {
            'id': 4,
            'name': 'Briam'
        },
        {
            'id': 5,
            'name': 'Arycelle (npc)'
        },
        {
            'id': 6,
            'name': 'Arycelle'
        },
        {
            'id': 7,
            'name': 'Andoras'
        },
        {
            'id': 8,
            'name': 'Female Archer 1'
        },
        {
            'id': 9,
            'name': 'Female Archer 2'
        },
        {
            'id': 10,
            'name': 'Female Archer 3'
        },
        {
            'id': 11,
            'name': 'Female Archer 4'
        },
        {
            'id': 12,
            'name': 'Female Archer 5'
        },
        {
            'id': 13,
            'name': 'Female Archer 6'
        },
        {
            'id': 14,
            'name': 'Female Archer 7'
        },
        {
            'id': 15,
            'name': 'Female Archer 8'
        },
        {
            'id': 16,
            'name': 'Female Archer 9'
        },
        {
            'id': 17,
            'name': 'Female Archer 10'
        },
        {
            'id': 18,
            'name': 'Male Archer 1'
        },
        {
            'id': 19,
            'name': 'Male Archer 2'
        },
        {
            'id': 20,
            'name': 'Male Archer 3'
        },
        {
            'id': 21,
            'name': 'Male Archer 4'
        },
        {
            'id': 22,
            'name': 'Male Archer 5'
        },
        {
            'id': 23,
            'name': 'Male Archer 6'
        },
        {
            'id': 24,
            'name': 'Male Archer 7'
        },
        {
            'id': 25,
            'name': 'Male Archer 8'
        },
        {
            'id': 26,
            'name': 'Male Archer 9'
        },
        {
            'id': 27,
            'name': 'Male Archer 10'
        },
        {
            'id': 28,
            'name': 'Azelstan'
        },
        {
            'id': 29,
            'name': 'Azelstan (sad)'
        },
        {
            'id': 30,
            'name': 'Balbatos'
        },
        {
            'id': 31,
            'name': 'Balxephon'
        },
        {
            'id': 32,
            'name': 'Barbas'
        },
        {
            'id': 33,
            'name': 'Female Beast Tamer 1'
        },
        {
            'id': 34,
            'name': 'Female Beast Tamer 2'
        },
        {
            'id': 35,
            'name': 'Female Beast Tamer 3'
        },
        {
            'id': 36,
            'name': 'Female Beast Tamer 4'
        },
        {
            'id': 37,
            'name': 'Female Beast Tamer 5'
        },
        {
            'id': 38,
            'name': 'Female Beast Tamer 6'
        },
        {
            'id': 39,
            'name': 'Female Beast Tamer 7'
        },
        {
            'id': 40,
            'name': 'Female Beast Tamer 8'
        },
        {
            'id': 41,
            'name': 'Female Beast Tamer 9'
        },
        {
            'id': 42,
            'name': 'Female Beast Tamer 10'
        },
        {
            'id': 43,
            'name': 'Male Beast Tamer 1'
        },
        {
            'id': 44,
            'name': 'Male Beast Tamer 2'
        },
        {
            'id': 45,
            'name': 'Male Beast Tamer 3'
        },
        {
            'id': 46,
            'name': 'Male Beast Tamer 4'
        },
        {
            'id': 47,
            'name': 'Male Beast Tamer 5'
        },
        {
            'id': 48,
            'name': 'Male Beast Tamer 6'
        },
        {
            'id': 49,
            'name': 'Male Beast Tamer 7'
        },
        {
            'id': 50,
            'name': 'Male Beast Tamer 8'
        },
        {
            'id': 51,
            'name': 'Male Beast Tamer 9'
        },
        {
            'id': 52,
            'name': 'Male Beast Tamer 10'
        },
        {
            'id': 53,
            'name': 'Sorceress'
        },
        {
            'id': 54,
            'name': 'Female Berserker 1'
        },
        {
            'id': 55,
            'name': 'Female Berserker 2'
        },
        {
            'id': 56,
            'name': 'Female Berserker 3'
        },
        {
            'id': 57,
            'name': 'Female Berserker 4'
        },
        {
            'id': 58,
            'name': 'Female Berserker 5'
        },
        {
            'id': 59,
            'name': 'Female Berserker 6'
        },
        {
            'id': 60,
            'name': 'Female Berserker 7'
        },
        {
            'id': 61,
            'name': 'Female Berserker 8'
        },
        {
            'id': 62,
            'name': 'Female Berserker 9'
        },
        {
            'id': 63,
            'name': 'Female Berserker 10'
        },
        {
            'id': 64,
            'name': 'Male Berserker 1'
        },
        {
            'id': 65,
            'name': 'Male Berserker 2'
        },
        {
            'id': 66,
            'name': 'Male Berserker 3'
        },
        {
            'id': 67,
            'name': 'Male Berserker 4'
        },
        {
            'id': 68,
            'name': 'Male Berserker 5'
        },
        {
            'id': 69,
            'name': 'Male Berserker 6'
        },
        {
            'id': 70,
            'name': 'Male Berserker 7'
        },
        {
            'id': 71,
            'name': 'Male Berserker 8'
        },
        {
            'id': 72,
            'name': 'Male Berserker 9'
        },
        {
            'id': 73,
            'name': 'Male Berserker 10'
        },
        {
            'id': 74,
            'name': 'Little Girl 1 (undead)'
        },
        {
            'id': 75,
            'name': 'Little Girl 1'
        },
        {
            'id': 76,
            'name': 'Brantyn'
        },
        {
            'id': 77,
            'name': 'Bayin'
        },
        {
            'id': 78,
            'name': 'Canopus'
        },
        {
            'id': 80,
            'name': 'Female Cleric 1'
        },
        {
            'id': 81,
            'name': 'Female Cleric 2'
        },
        {
            'id': 82,
            'name': 'Female Cleric 3'
        },
        {
            'id': 83,
            'name': 'Female Cleric 4'
        },
        {
            'id': 84,
            'name': 'Female Cleric 5'
        },
        {
            'id': 85,
            'name': 'Female Cleric 6'
        },
        {
            'id': 86,
            'name': 'Female Cleric 7'
        },
        {
            'id': 87,
            'name': 'Female Cleric 8'
        },
        {
            'id': 88,
            'name': 'Female Cleric 9'
        },
        {
            'id': 89,
            'name': 'Female Cleric 10'
        },
        {
            'id': 90,
            'name': 'Male Cleric 1'
        },
        {
            'id': 91,
            'name': 'Male Cleric 2'
        },
        {
            'id': 92,
            'name': 'Male Cleric 3'
        },
        {
            'id': 93,
            'name': 'Male Cleric 4'
        },
        {
            'id': 94,
            'name': 'Male Cleric 5'
        },
        {
            'id': 95,
            'name': 'Male Cleric 6'
        },
        {
            'id': 96,
            'name': 'Male Cleric 7'
        },
        {
            'id': 97,
            'name': 'Male Cleric 8'
        },
        {
            'id': 98,
            'name': 'Male Cleric 9'
        },
        {
            'id': 99,
            'name': 'Male Cleric 10'
        },
        {
            'id': 100,
            'name': 'Cockatrice 1'
        },
        {
            'id': 101,
            'name': 'Cockatrice 2'
        },
        {
            'id': 102,
            'name': 'Cockatrice 3'
        },
        {
            'id': 103,
            'name': 'Cockatrice 4'
        },
        {
            'id': 104,
            'name': 'Cockatrice 5'
        },
        {
            'id': 105,
            'name': 'Cockatrice 6'
        },
        {
            'id': 106,
            'name': 'Cockatrice 7'
        },
        {
            'id': 107,
            'name': 'Cressida'
        },
        {
            'id': 108,
            'name': 'Cyclops 1'
        },
        {
            'id': 109,
            'name': 'Cyclops 2'
        },
        {
            'id': 110,
            'name': 'Cyclops 3'
        },
        {
            'id': 111,
            'name': 'Cyclops 4'
        },
        {
            'id': 112,
            'name': 'Cyclops 5'
        },
        {
            'id': 113,
            'name': 'Cyclops 6'
        },
        {
            'id': 114,
            'name': 'Dievold'
        },
        {
            'id': 117,
            'name': 'Deneb'
        },
        {
            'id': 118,
            'name': 'Punkin'
        },
        {
            'id': 119,
            'name': 'Denam'
        },
        {
            'id': 120,
            'name': 'Denam (excited)'
        },
        {
            'id': 121,
            'name': 'Denam (dead)'
        },
        {
            'id': 122,
            'name': 'Denam (king)'
        },
        {
            'id': 123,
            'name': 'Denam (lord)'
        },
        {
            'id': 124,
            'name': 'Female Divine Knight 1'
        },
        {
            'id': 125,
            'name': 'Female Divine Knight 2'
        },
        {
            'id': 126,
            'name': 'Female Divine Knight 3'
        },
        {
            'id': 127,
            'name': 'Female Divine Knight 4'
        },
        {
            'id': 128,
            'name': 'Female Divine Knight 5'
        },
        {
            'id': 129,
            'name': 'Female Divine Knight 6'
        },
        {
            'id': 130,
            'name': 'Female Divine Knight 7'
        },
        {
            'id': 131,
            'name': 'Female Divine Knight 8'
        },
        {
            'id': 132,
            'name': 'Female Divine Knight 9'
        },
        {
            'id': 133,
            'name': 'Female Divine Knight 10'
        },
        {
            'id': 134,
            'name': 'Male Divine Knight 1'
        },
        {
            'id': 135,
            'name': 'Male Divine Knight 2'
        },
        {
            'id': 136,
            'name': 'Male Divine Knight 3'
        },
        {
            'id': 137,
            'name': 'Male Divine Knight 4'
        },
        {
            'id': 138,
            'name': 'Male Divine Knight 5'
        },
        {
            'id': 139,
            'name': 'Male Divine Knight 6'
        },
        {
            'id': 140,
            'name': 'Male Divine Knight 7'
        },
        {
            'id': 141,
            'name': 'Male Divine Knight 8'
        },
        {
            'id': 142,
            'name': 'Male Divine Knight 9'
        },
        {
            'id': 143,
            'name': 'Male Divine Knight 10'
        },
        {
            'id': 144,
            'name': 'Templar 1'
        },
        {
            'id': 145,
            'name': 'Templar 2'
        },
        {
            'id': 146,
            'name': 'Templar 3'
        },
        {
            'id': 147,
            'name': 'Templar 4'
        },
        {
            'id': 148,
            'name': 'Templar 5'
        },
        {
            'id': 149,
            'name': 'Templar 6'
        },
        {
            'id': 150,
            'name': 'Templar 7'
        },
        {
            'id': 151,
            'name': 'Templar 8'
        },
        {
            'id': 152,
            'name': 'Dorgalua'
        },
        {
            'id': 154,
            'name': 'Ogre'
        },
        {
            'id': 155,
            'name': 'Arc Dragon 1'
        },
        {
            'id': 156,
            'name': 'Arc Dragon 2'
        },
        {
            'id': 157,
            'name': 'Arc Dragon 3'
        },
        {
            'id': 158,
            'name': 'Arc Dragon 4'
        },
        {
            'id': 159,
            'name': 'Arc Dragon 5'
        },
        {
            'id': 160,
            'name': 'Arc Dragon 6'
        },
        {
            'id': 161,
            'name': 'Arc Dragon 7'
        },
        {
            'id': 162,
            'name': 'Arc Dragon 8'
        },
        {
            'id': 163,
            'name': 'Arc Dragon 9'
        },
        {
            'id': 164,
            'name': 'Arc Dragon 10'
        },
        {
            'id': 165,
            'name': 'Arc Dragon 11'
        },
        {
            'id': 166,
            'name': 'Arc Dragon 12'
        },
        {
            'id': 167,
            'name': 'Arc Dragon 13'
        },
        {
            'id': 168,
            'name': 'Cloud/Earth/Flame/Flood Dragon 1'
        },
        {
            'id': 169,
            'name': 'Cloud/Earth/Flame/Flood Dragon 2'
        },
        {
            'id': 170,
            'name': 'Cloud/Earth/Flame/Flood Dragon 3'
        },
        {
            'id': 171,
            'name': 'Cloud/Earth/Flame/Flood Dragon 4'
        },
        {
            'id': 172,
            'name': 'Cloud/Earth/Flame/Flood Dragon 5'
        },
        {
            'id': 173,
            'name': 'Cloud/Earth/Flame/Flood Dragon 6'
        },
        {
            'id': 174,
            'name': 'Cloud/Earth/Flame/Flood Dragon 7'
        },
        {
            'id': 175,
            'name': 'Cloud/Earth/Flame/Flood Dragon 8'
        },
        {
            'id': 176,
            'name': 'Cloud/Earth/Flame/Flood Dragon 9'
        },
        {
            'id': 177,
            'name': 'Cloud/Earth/Flame/Flood Dragon 10'
        },
        {
            'id': 178,
            'name': 'Dark Dragon 1'
        },
        {
            'id': 179,
            'name': 'Dark Dragon 2'
        },
        {
            'id': 180,
            'name': 'Dark Dragon 3'
        },
        {
            'id': 181,
            'name': 'Dark Dragon 4'
        },
        {
            'id': 182,
            'name': 'Dark Dragon 5'
        },
        {
            'id': 183,
            'name': 'Dark Dragon 6'
        },
        {
            'id': 184,
            'name': 'Dark Dragon 7'
        },
        {
            'id': 185,
            'name': 'Dark Dragon 8'
        },
        {
            'id': 186,
            'name': 'Dark Dragon 9'
        },
        {
            'id': 187,
            'name': 'Dark Dragon 10'
        },
        {
            'id': 188,
            'name': 'Earth Dragon'
        },
        {
            'id': 189,
            'name': 'Flame Dragon'
        },
        {
            'id': 190,
            'name': 'Flood Dragon'
        },
        {
            'id': 191,
            'name': 'Frost Dragon'
        },
        {
            'id': 192,
            'name': 'Storm Dragon'
        },
        {
            'id': 193,
            'name': 'Female Dragoon 1'
        },
        {
            'id': 194,
            'name': 'Female Dragoon 2'
        },
        {
            'id': 195,
            'name': 'Female Dragoon 3'
        },
        {
            'id': 196,
            'name': 'Female Dragoon 4'
        },
        {
            'id': 197,
            'name': 'Female Dragoon 5'
        },
        {
            'id': 198,
            'name': 'Female Dragoon 6'
        },
        {
            'id': 199,
            'name': 'Female Dragoon 7'
        },
        {
            'id': 200,
            'name': 'Female Dragoon 8'
        },
        {
            'id': 201,
            'name': 'Female Dragoon 9'
        },
        {
            'id': 202,
            'name': 'Female Dragoon 10'
        },
        {
            'id': 203,
            'name': 'Male Dragoon 1'
        },
        {
            'id': 204,
            'name': 'Male Dragoon 2'
        },
        {
            'id': 205,
            'name': 'Male Dragoon 3'
        },
        {
            'id': 206,
            'name': 'Male Dragoon 4'
        },
        {
            'id': 207,
            'name': 'Male Dragoon 5'
        },
        {
            'id': 208,
            'name': 'Male Dragoon 6'
        },
        {
            'id': 209,
            'name': 'Male Dragoon 7'
        },
        {
            'id': 210,
            'name': 'Male Dragoon 8'
        },
        {
            'id': 211,
            'name': 'Male Dragoon 9'
        },
        {
            'id': 212,
            'name': 'Male Dragoon 10'
        },
        {
            'id': 213,
            'name': 'Faerie 1'
        },
        {
            'id': 214,
            'name': 'Faerie 2'
        },
        {
            'id': 215,
            'name': 'Faerie 3'
        },
        {
            'id': 216,
            'name': 'Faerie 4'
        },
        {
            'id': 217,
            'name': 'Faerie 5'
        },
        {
            'id': 218,
            'name': 'Faerie 6'
        },
        {
            'id': 219,
            'name': 'Faerie 7'
        },
        {
            'id': 220,
            'name': 'Faerie 8'
        },
        {
            'id': 221,
            'name': 'Faerie 9'
        },
        {
            'id': 222,
            'name': 'Faerie 10'
        },
        {
            'id': 223,
            'name': 'Old Witch 1'
        },
        {
            'id': 224,
            'name': 'Folcurt'
        },
        {
            'id': 225,
            'name': 'Ganpp'
        },
        {
            'id': 226,
            'name': 'Wraith 1'
        },
        {
            'id': 227,
            'name': 'Wraith 2'
        },
        {
            'id': 228,
            'name': 'Wraith 3'
        },
        {
            'id': 229,
            'name': 'Wraith 4'
        },
        {
            'id': 230,
            'name': 'Wraith 5'
        },
        {
            'id': 231,
            'name': 'Wraith 6'
        },
        {
            'id': 232,
            'name': 'Wraith 7'
        },
        {
            'id': 233,
            'name': 'Wraith 8'
        },
        {
            'id': 234,
            'name': 'Wraith 9'
        },
        {
            'id': 235,
            'name': 'Wraith 10'
        },
        {
            'id': 236,
            'name': 'Gilbert'
        },
        {
            'id': 237,
            'name': 'Little Girl 2 (dead)'
        },
        {
            'id': 238,
            'name': 'Golem 1'
        },
        {
            'id': 239,
            'name': 'Golem 2'
        },
        {
            'id': 240,
            'name': 'Golem 3'
        },
        {
            'id': 241,
            'name': 'Golem 4'
        },
        {
            'id': 242,
            'name': 'Golem 5'
        },
        {
            'id': 243,
            'name': 'Golem 6'
        },
        {
            'id': 244,
            'name': 'Golem 7'
        },
        {
            'id': 245,
            'name': 'Golem 8'
        },
        {
            'id': 246,
            'name': 'Golem 9'
        },
        {
            'id': 247,
            'name': 'Golem 10'
        },
        {
            'id': 248,
            'name': 'Golem 11'
        },
        {
            'id': 249,
            'name': 'Golem 12'
        },
        {
            'id': 253,
            'name': 'Golem 13'
        },
        {
            'id': 261,
            'name': 'Imp 1'
        },
        {
            'id': 262,
            'name': 'Imp 2'
        },
        {
            'id': 263,
            'name': 'Imp 3'
        },
        {
            'id': 264,
            'name': 'Imp 4'
        },
        {
            'id': 265,
            'name': 'Imp 5'
        },
        {
            'id': 266,
            'name': 'Imp 6'
        },
        {
            'id': 267,
            'name': 'Imp 7'
        },
        {
            'id': 268,
            'name': 'Imp 8'
        },
        {
            'id': 269,
            'name': 'Imp 9'
        },
        {
            'id': 270,
            'name': 'Imp 10'
        },
        {
            'id': 271,
            'name': 'Gryphon 1'
        },
        {
            'id': 272,
            'name': 'Gryphon 2'
        },
        {
            'id': 273,
            'name': 'Gryphon 3'
        },
        {
            'id': 274,
            'name': 'Gryphon 4'
        },
        {
            'id': 275,
            'name': 'Gryphon 5'
        },
        {
            'id': 276,
            'name': 'Gryphon 6'
        },
        {
            'id': 277,
            'name': 'Gryphon 7'
        },
        {
            'id': 278,
            'name': 'Gildas'
        },
        {
            'id': 279,
            'name': 'Female Fusilier 1'
        },
        {
            'id': 280,
            'name': 'Female Fusilier 2'
        },
        {
            'id': 281,
            'name': 'Female Fusilier 3'
        },
        {
            'id': 282,
            'name': 'Female Fusilier 4'
        },
        {
            'id': 283,
            'name': 'Female Fusilier 5'
        },
        {
            'id': 284,
            'name': 'Female Fusilier 6'
        },
        {
            'id': 285,
            'name': 'Female Fusilier 7'
        },
        {
            'id': 286,
            'name': 'Female Fusilier 8'
        },
        {
            'id': 287,
            'name': 'Female Fusilier 9'
        },
        {
            'id': 288,
            'name': 'Female Fusilier 10'
        },
        {
            'id': 289,
            'name': 'Male Fusilier 1'
        },
        {
            'id': 290,
            'name': 'Male Fusilier 2'
        },
        {
            'id': 291,
            'name': 'Male Fusilier 3'
        },
        {
            'id': 292,
            'name': 'Male Fusilier 4'
        },
        {
            'id': 293,
            'name': 'Male Fusilier 5'
        },
        {
            'id': 294,
            'name': 'Male Fusilier 6'
        },
        {
            'id': 295,
            'name': 'Male Fusilier 7'
        },
        {
            'id': 296,
            'name': 'Male Fusilier 8'
        },
        {
            'id': 297,
            'name': 'Male Fusilier 9'
        },
        {
            'id': 298,
            'name': 'Male Fusilier 10'
        },
        {
            'id': 299,
            'name': 'Hawkman 1'
        },
        {
            'id': 300,
            'name': 'Hawkman 2'
        },
        {
            'id': 301,
            'name': 'Hawkman 3'
        },
        {
            'id': 302,
            'name': 'Hawkman 4'
        },
        {
            'id': 303,
            'name': 'Hawkman 5'
        },
        {
            'id': 304,
            'name': 'Hawkman 6'
        },
        {
            'id': 305,
            'name': 'Hawkman 7'
        },
        {
            'id': 306,
            'name': 'Hawkman 8'
        },
        {
            'id': 307,
            'name': 'Hawkman 9'
        },
        {
            'id': 308,
            'name': 'Hawkman 10'
        },
        {
            'id': 309,
            'name': 'Hobyrim'
        },
        {
            'id': 310,
            'name': 'Young Hobyrim'
        },
        {
            'id': 311,
            'name': 'Hydra 1'
        },
        {
            'id': 312,
            'name': 'Hydra 2'
        },
        {
            'id': 313,
            'name': 'Hydra 3'
        },
        {
            'id': 314,
            'name': 'Hydra 4'
        },
        {
            'id': 315,
            'name': 'Hydra 5'
        },
        {
            'id': 316,
            'name': 'Hydra 6'
        },
        {
            'id': 317,
            'name': 'Jenounes'
        },
        {
            'id': 318,
            'name': 'Catiua'
        },
        {
            'id': 319,
            'name': 'Catiua Dark (crying)'
        },
        {
            'id': 320,
            'name': 'Catiua Dark'
        },
        {
            'id': 321,
            'name': 'Catiua (princess)'
        },
        {
            'id': 322,
            'name': 'Catiua (queen)'
        },
        {
            'id': 323,
            'name': 'Catiua Princess (excited)'
        },
        {
            'id': 324,
            'name': 'Little Girl 2'
        },
        {
            'id': 325,
            'name': 'Female Knight 1'
        },
        {
            'id': 326,
            'name': 'Female Knight 2'
        },
        {
            'id': 327,
            'name': 'Female Knight 3'
        },
        {
            'id': 328,
            'name': 'Female Knight 4'
        },
        {
            'id': 329,
            'name': 'Female Knight 5'
        },
        {
            'id': 330,
            'name': 'Female Knight 6'
        },
        {
            'id': 331,
            'name': 'Female Knight 7'
        },
        {
            'id': 332,
            'name': 'Female Knight 8'
        },
        {
            'id': 333,
            'name': 'Female Knight 9'
        },
        {
            'id': 334,
            'name': 'Female Knight 10'
        },
        {
            'id': 335,
            'name': 'Male Knight 1'
        },
        {
            'id': 336,
            'name': 'Male Knight 2'
        },
        {
            'id': 337,
            'name': 'Male Knight 3'
        },
        {
            'id': 338,
            'name': 'Male Knight 4'
        },
        {
            'id': 339,
            'name': 'Male Knight 5'
        },
        {
            'id': 340,
            'name': 'Male Knight 6'
        },
        {
            'id': 341,
            'name': 'Male Knight 7'
        },
        {
            'id': 342,
            'name': 'Male Knight 8'
        },
        {
            'id': 343,
            'name': 'Male Knight 9'
        },
        {
            'id': 344,
            'name': 'Male Knight 10'
        },
        {
            'id': 345,
            'name': 'Lamia 1'
        },
        {
            'id': 346,
            'name': 'Lamia 2'
        },
        {
            'id': 347,
            'name': 'Lamia 3'
        },
        {
            'id': 348,
            'name': 'Lamia 4'
        },
        {
            'id': 349,
            'name': 'Lamia 5'
        },
        {
            'id': 350,
            'name': 'Lamia 6'
        },
        {
            'id': 351,
            'name': 'Lamia 7'
        },
        {
            'id': 352,
            'name': 'Lamia 8'
        },
        {
            'id': 353,
            'name': 'Lamia 9'
        },
        {
            'id': 354,
            'name': 'Lamia 10'
        },
        {
            'id': 355,
            'name': 'Lanselot'
        },
        {
            'id': 356,
            'name': 'Lanselot (tortured)'
        },
        {
            'id': 357,
            'name': 'Lanselot (wounded)'
        },
        {
            'id': 358,
            'name': 'Lans Tartare'
        },
        {
            'id': 360,
            'name': 'Leonar'
        },
        {
            'id': 361,
            'name': 'Female Lich 1'
        },
        {
            'id': 362,
            'name': 'Female Lich 2'
        },
        {
            'id': 363,
            'name': 'Female Lich 3'
        },
        {
            'id': 364,
            'name': 'Female Lich 4'
        },
        {
            'id': 365,
            'name': 'Female Lich 5'
        },
        {
            'id': 366,
            'name': 'Female Lich 6'
        },
        {
            'id': 367,
            'name': 'Female Lich 7'
        },
        {
            'id': 368,
            'name': 'Female Lich 8'
        },
        {
            'id': 369,
            'name': 'Female Lich 9'
        },
        {
            'id': 370,
            'name': 'Female Lich 10'
        },
        {
            'id': 371,
            'name': 'Male Lich 1'
        },
        {
            'id': 372,
            'name': 'Male Lich 2'
        },
        {
            'id': 373,
            'name': 'Male Lich 3'
        },
        {
            'id': 374,
            'name': 'Male Lich 4'
        },
        {
            'id': 375,
            'name': 'Male Lich 5'
        },
        {
            'id': 376,
            'name': 'Male Lich 6'
        },
        {
            'id': 377,
            'name': 'Male Lich 7'
        },
        {
            'id': 378,
            'name': 'Male Lich 8'
        },
        {
            'id': 379,
            'name': 'Male Lich 9'
        },
        {
            'id': 380,
            'name': 'Male Lich 10'
        },
        {
            'id': 381,
            'name': 'Lindl'
        },
        {
            'id': 382,
            'name': 'Lizardman 1'
        },
        {
            'id': 383,
            'name': 'Lizardman 2'
        },
        {
            'id': 384,
            'name': 'Lizardman 3'
        },
        {
            'id': 385,
            'name': 'Lizardman 4'
        },
        {
            'id': 386,
            'name': 'Lizardman 5'
        },
        {
            'id': 387,
            'name': 'Lizardman 6'
        },
        {
            'id': 388,
            'name': 'Lizardman 7'
        },
        {
            'id': 389,
            'name': 'Lizardman 8'
        },
        {
            'id': 390,
            'name': 'Lizardman 9'
        },
        {
            'id': 391,
            'name': 'Lizardman 10'
        },
        {
            'id': 392,
            'name': 'Rackham'
        },
        {
            'id': 395,
            'name': 'Mannaflora'
        },
        {
            'id': 396,
            'name': 'Martym'
        },
        {
            'id': 397,
            'name': 'Mirdyn'
        },
        {
            'id': 398,
            'name': 'Mreuva'
        },
        {
            'id': 399,
            'name': 'Female Necromancer 1'
        },
        {
            'id': 400,
            'name': 'Female Necromancer 2'
        },
        {
            'id': 401,
            'name': 'Female Necromancer 3'
        },
        {
            'id': 402,
            'name': 'Female Necromancer 4'
        },
        {
            'id': 403,
            'name': 'Female Necromancer 5'
        },
        {
            'id': 404,
            'name': 'Female Necromancer 6'
        },
        {
            'id': 405,
            'name': 'Female Necromancer 7'
        },
        {
            'id': 406,
            'name': 'Female Necromancer 8'
        },
        {
            'id': 407,
            'name': 'Female Necromancer 9'
        },
        {
            'id': 408,
            'name': 'Female Necromancer 10'
        },
        {
            'id': 409,
            'name': 'Male Necromancer 1'
        },
        {
            'id': 410,
            'name': 'Male Necromancer 2'
        },
        {
            'id': 411,
            'name': 'Male Necromancer 3'
        },
        {
            'id': 412,
            'name': 'Male Necromancer 4'
        },
        {
            'id': 413,
            'name': 'Male Necromancer 5'
        },
        {
            'id': 414,
            'name': 'Male Necromancer 6'
        },
        {
            'id': 415,
            'name': 'Male Necromancer 7'
        },
        {
            'id': 416,
            'name': 'Male Necromancer 8'
        },
        {
            'id': 417,
            'name': 'Male Necromancer 9'
        },
        {
            'id': 418,
            'name': 'Male Necromancer 10'
        },
        {
            'id': 419,
            'name': 'Kunoichi 1'
        },
        {
            'id': 420,
            'name': 'Kunoichi 2'
        },
        {
            'id': 421,
            'name': 'Kunoichi 3'
        },
        {
            'id': 422,
            'name': 'Kunoichi 4'
        },
        {
            'id': 423,
            'name': 'Kunoichi 5'
        },
        {
            'id': 424,
            'name': 'Kunoichi 6'
        },
        {
            'id': 425,
            'name': 'Kunoichi 7'
        },
        {
            'id': 426,
            'name': 'Kunoichi 8'
        },
        {
            'id': 427,
            'name': 'Kunoichi 9'
        },
        {
            'id': 428,
            'name': 'Kunoichi 10'
        },
        {
            'id': 429,
            'name': 'Ninja 1'
        },
        {
            'id': 430,
            'name': 'Ninja 2'
        },
        {
            'id': 431,
            'name': 'Ninja 3'
        },
        {
            'id': 432,
            'name': 'Ninja 4'
        },
        {
            'id': 433,
            'name': 'Ninja 5'
        },
        {
            'id': 434,
            'name': 'Ninja 6'
        },
        {
            'id': 435,
            'name': 'Ninja 7'
        },
        {
            'id': 436,
            'name': 'Ninja 8'
        },
        {
            'id': 437,
            'name': 'Ninja 9'
        },
        {
            'id': 438,
            'name': 'Ninja 10'
        },
        {
            'id': 439,
            'name': 'Iuria'
        },
        {
            'id': 440,
            'name': 'Nybbas'
        },
        {
            'id': 441,
            'name': 'Nybbas (lich)'
        },
        {
            'id': 442,
            'name': 'Octopus 1'
        },
        {
            'id': 443,
            'name': 'Octopus 2'
        },
        {
            'id': 444,
            'name': 'Octopus 3'
        },
        {
            'id': 445,
            'name': 'Octopus 4'
        },
        {
            'id': 446,
            'name': 'Octopus 5'
        },
        {
            'id': 447,
            'name': 'Octopus 6'
        },
        {
            'id': 448,
            'name': 'Octopus 7'
        },
        {
            'id': 449,
            'name': 'Octopus 8'
        },
        {
            'id': 450,
            'name': 'Octopus 9'
        },
        {
            'id': 451,
            'name': 'Octopus 10'
        },
        {
            'id': 452,
            'name': 'Olivya'
        },
        {
            'id': 453,
            'name': 'Orc 1'
        },
        {
            'id': 454,
            'name': 'Orc 2'
        },
        {
            'id': 455,
            'name': 'Orc 3'
        },
        {
            'id': 456,
            'name': 'Orc 4'
        },
        {
            'id': 457,
            'name': 'Orc 5'
        },
        {
            'id': 458,
            'name': 'Orc 6'
        },
        {
            'id': 459,
            'name': 'Orc 7'
        },
        {
            'id': 460,
            'name': 'Orc 8'
        },
        {
            'id': 461,
            'name': 'Orc 9'
        },
        {
            'id': 462,
            'name': 'Orc 10'
        },
        {
            'id': 463,
            'name': 'Oelias'
        },
        {
            'id': 465,
            'name': 'Ocionne'
        },
        {
            'id': 466,
            'name': 'Oz'
        },
        {
            'id': 467,
            'name': 'Ozma'
        },
        {
            'id': 468,
            'name': 'Ozma (serious)'
        },
        {
            'id': 469,
            'name': 'Prancet'
        },
        {
            'id': 470,
            'name': 'Prancet (dying)'
        },
        {
            'id': 471,
            'name': 'Donnalto'
        },
        {
            'id': 472,
            'name': 'Pumpkinhead 1'
        },
        {
            'id': 473,
            'name': 'Pumpkinhead 2'
        },
        {
            'id': 474,
            'name': 'Pumpkinhead 3'
        },
        {
            'id': 475,
            'name': 'Pumpkinhead 4'
        },
        {
            'id': 476,
            'name': 'Pumpkinhead 5'
        },
        {
            'id': 477,
            'name': 'Pumpkinhead 6'
        },
        {
            'id': 478,
            'name': 'Pumpkinhead 7'
        },
        {
            'id': 479,
            'name': 'Pumpkinhead 8'
        },
        {
            'id': 480,
            'name': 'Pumpkinhead 9'
        },
        {
            'id': 481,
            'name': 'Pumpkinhead 10'
        },
        {
            'id': 482,
            'name': 'Pumpkinhead 11'
        },
        {
            'id': 483,
            'name': 'Rudlum'
        },
        {
            'id': 484,
            'name': 'Ravness'
        },
        {
            'id': 486,
            'name': 'Rodrick'
        },
        {
            'id': 487,
            'name': 'Bearded Man'
        },
        {
            'id': 488,
            'name': 'Duke Ronway'
        },
        {
            'id': 489,
            'name': 'Female Rogue 1'
        },
        {
            'id': 490,
            'name': 'Female Rogue 2'
        },
        {
            'id': 491,
            'name': 'Female Rogue 3'
        },
        {
            'id': 492,
            'name': 'Female Rogue 4'
        },
        {
            'id': 493,
            'name': 'Female Rogue 5'
        },
        {
            'id': 494,
            'name': 'Female Rogue 6'
        },
        {
            'id': 495,
            'name': 'Female Rogue 7'
        },
        {
            'id': 496,
            'name': 'Female Rogue 8'
        },
        {
            'id': 497,
            'name': 'Female Rogue 9'
        },
        {
            'id': 498,
            'name': 'Female Rogue 10'
        },
        {
            'id': 499,
            'name': 'Male Rogue 1'
        },
        {
            'id': 500,
            'name': 'Male Rogue 2'
        },
        {
            'id': 501,
            'name': 'Male Rogue 3'
        },
        {
            'id': 502,
            'name': 'Male Rogue 4'
        },
        {
            'id': 503,
            'name': 'Male Rogue 5'
        },
        {
            'id': 504,
            'name': 'Male Rogue 6'
        },
        {
            'id': 505,
            'name': 'Male Rogue 7'
        },
        {
            'id': 506,
            'name': 'Male Rogue 8'
        },
        {
            'id': 507,
            'name': 'Male Rogue 9'
        },
        {
            'id': 508,
            'name': 'Male Rogue 10'
        },
        {
            'id': 509,
            'name': 'Cerya'
        },
        {
            'id': 510,
            'name': 'Sherri'
        },
        {
            'id': 511,
            'name': 'Sherri (wounded)'
        },
        {
            'id': 512,
            'name': 'Villager'
        },
        {
            'id': 513,
            'name': 'Cistina'
        },
        {
            'id': 514,
            'name': 'Skeleton 1'
        },
        {
            'id': 515,
            'name': 'Skeleton 2'
        },
        {
            'id': 516,
            'name': 'Skeleton 3'
        },
        {
            'id': 517,
            'name': 'Skeleton 4'
        },
        {
            'id': 518,
            'name': 'Skeleton 5'
        },
        {
            'id': 519,
            'name': 'Skeleton 6'
        },
        {
            'id': 520,
            'name': 'Skeleton 7'
        },
        {
            'id': 521,
            'name': 'Skeleton 8'
        },
        {
            'id': 522,
            'name': 'Skeleton 9'
        },
        {
            'id': 523,
            'name': 'Skeleton 10'
        },
        {
            'id': 524,
            'name': 'Witch 1'
        },
        {
            'id': 525,
            'name': 'Witch 2'
        },
        {
            'id': 526,
            'name': 'Witch 3'
        },
        {
            'id': 527,
            'name': 'Witch 4'
        },
        {
            'id': 528,
            'name': 'Witch 5'
        },
        {
            'id': 529,
            'name': 'Witch 6'
        },
        {
            'id': 530,
            'name': 'Witch 7'
        },
        {
            'id': 531,
            'name': 'Witch 8'
        },
        {
            'id': 532,
            'name': 'Witch 9'
        },
        {
            'id': 533,
            'name': 'Witch 10'
        },
        {
            'id': 534,
            'name': 'Warlock 1'
        },
        {
            'id': 535,
            'name': 'Warlock 2'
        },
        {
            'id': 536,
            'name': 'Warlock 3'
        },
        {
            'id': 537,
            'name': 'Warlock 4'
        },
        {
            'id': 538,
            'name': 'Warlock 5'
        },
        {
            'id': 539,
            'name': 'Warlock 6'
        },
        {
            'id': 540,
            'name': 'Warlock 7'
        },
        {
            'id': 541,
            'name': 'Warlock 8'
        },
        {
            'id': 542,
            'name': 'Warlock 9'
        },
        {
            'id': 543,
            'name': 'Warlock 10'
        },
        {
            'id': 544,
            'name': 'Old Sorcerer 1'
        },
        {
            'id': 545,
            'name': 'Old Sorcerer 2'
        },
        {
            'id': 546,
            'name': 'Old Sorcerer 3'
        },
        {
            'id': 547,
            'name': 'Old Sorcerer 4'
        },
        {
            'id': 548,
            'name': 'Old Sorcerer 5'
        },
        {
            'id': 549,
            'name': 'Old Sorcerer 6'
        },
        {
            'id': 550,
            'name': 'Old Sorcerer 7'
        },
        {
            'id': 551,
            'name': 'Old Sorcerer 8'
        },
        {
            'id': 552,
            'name': 'Old Sorcerer 9'
        },
        {
            'id': 553,
            'name': 'Old Sorcerer 10'
        },
        {
            'id': 554,
            'name': 'Old Sorceress 1'
        },
        {
            'id': 555,
            'name': 'Old Sorceress 2'
        },
        {
            'id': 556,
            'name': 'Old Sorceress 3'
        },
        {
            'id': 557,
            'name': 'Old Sorceress 4'
        },
        {
            'id': 558,
            'name': 'Old Sorceress 5'
        },
        {
            'id': 559,
            'name': 'Old Sorceress 6'
        },
        {
            'id': 560,
            'name': 'Old Sorceress 7'
        },
        {
            'id': 561,
            'name': 'Old Sorceress 8'
        },
        {
            'id': 562,
            'name': 'Old Sorceress 9'
        },
        {
            'id': 563,
            'name': 'Old Sorceress 10'
        },
        {
            'id': 564,
            'name': 'Female Swordmaster 1'
        },
        {
            'id': 565,
            'name': 'Female Swordmaster 2'
        },
        {
            'id': 566,
            'name': 'Female Swordmaster 3'
        },
        {
            'id': 567,
            'name': 'Female Swordmaster 4'
        },
        {
            'id': 568,
            'name': 'Female Swordmaster 5'
        },
        {
            'id': 569,
            'name': 'Female Swordmaster 6'
        },
        {
            'id': 570,
            'name': 'Female Swordmaster 7'
        },
        {
            'id': 571,
            'name': 'Female Swordmaster 8'
        },
        {
            'id': 572,
            'name': 'Female Swordmaster 9'
        },
        {
            'id': 573,
            'name': 'Female Swordmaster 10'
        },
        {
            'id': 574,
            'name': 'Male Swordmaster 1'
        },
        {
            'id': 575,
            'name': 'Male Swordmaster 2'
        },
        {
            'id': 576,
            'name': 'Male Swordmaster 3'
        },
        {
            'id': 577,
            'name': 'Male Swordmaster 4'
        },
        {
            'id': 578,
            'name': 'Male Swordmaster 5'
        },
        {
            'id': 579,
            'name': 'Male Swordmaster 6'
        },
        {
            'id': 580,
            'name': 'Male Swordmaster 7'
        },
        {
            'id': 581,
            'name': 'Male Swordmaster 8'
        },
        {
            'id': 582,
            'name': 'Male Swordmaster 9'
        },
        {
            'id': 583,
            'name': 'Male Swordmaster 10'
        },
        {
            'id': 584,
            'name': 'Female Terror Knight 1'
        },
        {
            'id': 585,
            'name': 'Female Terror Knight 2'
        },
        {
            'id': 586,
            'name': 'Female Terror Knight 3'
        },
        {
            'id': 587,
            'name': 'Female Terror Knight 4'
        },
        {
            'id': 588,
            'name': 'Female Terror Knight 5'
        },
        {
            'id': 589,
            'name': 'Female Terror Knight 6'
        },
        {
            'id': 590,
            'name': 'Female Terror Knight 7'
        },
        {
            'id': 591,
            'name': 'Female Terror Knight 8'
        },
        {
            'id': 592,
            'name': 'Female Terror Knight 9'
        },
        {
            'id': 593,
            'name': 'Female Terror Knight 10'
        },
        {
            'id': 594,
            'name': 'Male Terror Knight 1'
        },
        {
            'id': 595,
            'name': 'Male Terror Knight 2'
        },
        {
            'id': 596,
            'name': 'Male Terror Knight 3'
        },
        {
            'id': 597,
            'name': 'Male Terror Knight 4'
        },
        {
            'id': 598,
            'name': 'Male Terror Knight 5'
        },
        {
            'id': 599,
            'name': 'Male Terror Knight 6'
        },
        {
            'id': 600,
            'name': 'Male Terror Knight 7'
        },
        {
            'id': 601,
            'name': 'Male Terror Knight 8'
        },
        {
            'id': 602,
            'name': 'Male Terror Knight 9'
        },
        {
            'id': 603,
            'name': 'Male Terror Knight 10'
        },
        {
            'id': 604,
            'name': 'Gold Terror Knight'
        },
        {
            'id': 605,
            'name': 'King Tristan'
        },
        {
            'id': 606,
            'name': 'Valkyrie 1'
        },
        {
            'id': 607,
            'name': 'Valkyrie 2'
        },
        {
            'id': 608,
            'name': 'Valkyrie 3'
        },
        {
            'id': 609,
            'name': 'Valkyrie 4'
        },
        {
            'id': 610,
            'name': 'Valkyrie 5'
        },
        {
            'id': 611,
            'name': 'Valkyrie 6'
        },
        {
            'id': 612,
            'name': 'Valkyrie 7'
        },
        {
            'id': 613,
            'name': 'Valkyrie 8'
        },
        {
            'id': 614,
            'name': 'Valkyrie 9'
        },
        {
            'id': 615,
            'name': 'Valkyrie 10'
        },
        {
            'id': 616,
            'name': 'Rune Fencer 1'
        },
        {
            'id': 617,
            'name': 'Rune Fencer 2'
        },
        {
            'id': 618,
            'name': 'Rune Fencer 3'
        },
        {
            'id': 619,
            'name': 'Rune Fencer 4'
        },
        {
            'id': 620,
            'name': 'Rune Fencer 5'
        },
        {
            'id': 621,
            'name': 'Rune Fencer 6'
        },
        {
            'id': 622,
            'name': 'Rune Fencer 7'
        },
        {
            'id': 623,
            'name': 'Rune Fencer 8'
        },
        {
            'id': 624,
            'name': 'Rune Fencer 9'
        },
        {
            'id': 625,
            'name': 'Rune Fencer 10'
        },
        {
            'id': 626,
            'name': 'Old Witch 2'
        },
        {
            'id': 627,
            'name': 'Queen Vernotta'
        },
        {
            'id': 628,
            'name': 'Vyce'
        },
        {
            'id': 629,
            'name': 'Vyce (excited)'
        },
        {
            'id': 630,
            'name': 'Bearded Senator'
        },
        {
            'id': 631,
            'name': 'Vyce (wounded)'
        },
        {
            'id': 632,
            'name': 'Vyce (lawful)'
        },
        {
            'id': 633,
            'name': 'Vyce (chaotic)'
        },
        {
            'id': 634,
            'name': 'Vyce (chaotic grin)'
        },
        {
            'id': 635,
            'name': 'Senator'
        },
        {
            'id': 636,
            'name': 'Volaq'
        },
        {
            'id': 637,
            'name': 'Warren'
        },
        {
            'id': 638,
            'name': 'Female Warrior 1'
        },
        {
            'id': 639,
            'name': 'Female Warrior 2'
        },
        {
            'id': 640,
            'name': 'Female Warrior 3'
        },
        {
            'id': 641,
            'name': 'Female Warrior 4'
        },
        {
            'id': 642,
            'name': 'Female Warrior 5'
        },
        {
            'id': 643,
            'name': 'Female Warrior 6'
        },
        {
            'id': 644,
            'name': 'Female Warrior 7'
        },
        {
            'id': 645,
            'name': 'Female Warrior 8'
        },
        {
            'id': 646,
            'name': 'Female Warrior 9'
        },
        {
            'id': 647,
            'name': 'Female Warrior 10'
        },
        {
            'id': 648,
            'name': 'Male Warrior 1'
        },
        {
            'id': 649,
            'name': 'Male Warrior 2'
        },
        {
            'id': 650,
            'name': 'Male Warrior 3'
        },
        {
            'id': 651,
            'name': 'Male Warrior 4'
        },
        {
            'id': 652,
            'name': 'Male Warrior 5'
        },
        {
            'id': 653,
            'name': 'Male Warrior 6'
        },
        {
            'id': 654,
            'name': 'Male Warrior 7'
        },
        {
            'id': 655,
            'name': 'Male Warrior 8'
        },
        {
            'id': 656,
            'name': 'Male Warrior 9'
        },
        {
            'id': 657,
            'name': 'Male Warrior 10'
        },
        {
            'id': 658,
            'name': 'Enchantress 1'
        },
        {
            'id': 659,
            'name': 'Enchantress 2'
        },
        {
            'id': 660,
            'name': 'Enchantress 3'
        },
        {
            'id': 661,
            'name': 'Enchantress 4'
        },
        {
            'id': 662,
            'name': 'Enchantress 5'
        },
        {
            'id': 663,
            'name': 'Enchantress 6'
        },
        {
            'id': 664,
            'name': 'Enchantress 7'
        },
        {
            'id': 665,
            'name': 'Enchantress 8'
        },
        {
            'id': 666,
            'name': 'Enchantress 9'
        },
        {
            'id': 667,
            'name': 'Enchantress 10'
        },
        {
            'id': 668,
            'name': 'Wizard 1'
        },
        {
            'id': 669,
            'name': 'Wizard 2'
        },
        {
            'id': 670,
            'name': 'Wizard 3'
        },
        {
            'id': 671,
            'name': 'Wizard 4'
        },
        {
            'id': 672,
            'name': 'Wizard 5'
        },
        {
            'id': 673,
            'name': 'Wizard 6'
        },
        {
            'id': 674,
            'name': 'Wizard 7'
        },
        {
            'id': 675,
            'name': 'Wizard 8'
        },
        {
            'id': 676,
            'name': 'Wizard 9'
        },
        {
            'id': 677,
            'name': 'Wizard 10'
        },
        {
            'id': 678,
            'name': 'Xapan'
        },
        {
            'id': 679,
            'name': 'Vyce (zombie)'
        },
        {
            'id': 680,
            'name': 'Zombie Knight'
        },
        {
            'id': 681,
            'name': 'Zombie Necromancer'
        },
        {
            'id': 682,
            'name': 'Gildas (zombie)'
        },
        {
            'id': 683,
            'name': 'Leonar (zombie)'
        },
        {
            'id': 684,
            'name': 'Dark Skinned Hawkman'
        }
    ];

    const classChangeSets = [
        {
            'id': 0,
            'name': 'Can\'t Change'
        },
        {
            'id': 1,
            'name': 'Human'
        },
        {
            'id': 2,
            'name': 'Hawkman'
        },
        {
            'id': 3,
            'name': 'Lizardman'
        },
        {
            'id': 4,
            'name': 'Lamia'
        },
        {
            'id': 5,
            'name': 'Orc'
        },
        {
            'id': 6,
            'name': 'Skeleton'
        },
        {
            'id': 7,
            'name': 'Ghost'
        },
        {
            'id': 8,
            'name': 'Faerie'
        },
        {
            'id': 9,
            'name': 'Gremlin'
        },
        {
            'id': 10,
            'name': 'Pumpkinhead'
        },
        {
            'id': 11,
            'name': 'Dragon'
        },
        {
            'id': 12,
            'name': 'Ocionne'
        },
        {
            'id': 13,
            'name': 'Oelias'
        },
        {
            'id': 14,
            'name': 'Special Human'
        },
        {
            'id': 15,
            'name': 'Cressida'
        },
        {
            'id': 16,
            'name': 'Denam'
        },
        {
            'id': 17,
            'name': 'Vyce'
        },
        {
            'id': 18,
            'name': 'Catiua'
        },
        {
            'id': 19,
            'name': 'Lanselot'
        },
        {
            'id': 20,
            'name': 'Warren'
        },
        {
            'id': 21,
            'name': 'Canopus'
        },
        {
            'id': 22,
            'name': 'Mirdyn'
        },
        {
            'id': 23,
            'name': 'Gildas'
        },
        {
            'id': 24,
            'name': 'Cerya'
        },
        {
            'id': 25,
            'name': 'Sherri'
        },
        {
            'id': 26,
            'name': 'Cistina'
        },
        {
            'id': 27,
            'name': 'Olivya'
        },
        {
            'id': 28,
            'name': 'Deneb'
        },
        {
            'id': 29,
            'name': 'Iuria'
        },
        {
            'id': 30,
            'name': 'Ozma'
        },
        {
            'id': 31,
            'name': 'Leonar'
        },
        {
            'id': 32,
            'name': 'Ravness'
        },
        {
            'id': 33,
            'name': 'Azelstan'
        },
        {
            'id': 34,
            'name': 'Tamuz'
        },
        {
            'id': 35,
            'name': 'Hobyrim'
        },
        {
            'id': 38,
            'name': 'Lindl'
        },
        {
            'id': 37,
            'name': 'Ganpp'
        },
        {
            'id': 39,
            'name': 'Chamos'
        },
        {
            'id': 40,
            'name': 'Ehlrig'
        },
        {
            'id': 41,
            'name': 'Rudlum'
        },
        {
            'id': 42,
            'name': 'Dievold'
        }
    ];

    const availableClasses = [
        {
            'id': 1,
            'name': 'Warrior/Amazon'
        },
        {
            'id': 2,
            'name': 'Archer'
        },
        {
            'id': 3,
            'name': 'Wizard/Sorceress'
        },
        {
            'id': 4,
            'name': 'Cleric/Monk'
        },
        {
            'id': 5,
            'name': 'Spellblade/Valkyrie'
        },
        {
            'id': 6,
            'name': 'Knight'
        },
        {
            'id': 7,
            'name': 'Terror Knight'
        },
        {
            'id': 8,
            'name': 'Berserker/Freya'
        },
        {
            'id': 9,
            'name': 'Swordmaster/Blademaiden'
        },
        {
            'id': 10,
            'name': 'Dragoon'
        },
        {
            'id': 11,
            'name': 'Ninja/Kunoichi'
        },
        {
            'id': 12,
            'name': 'Rogue'
        },
        {
            'id': 13,
            'name': 'Fusilier'
        },
        {
            'id': 14,
            'name': 'Beast Tamer/Dragoner'
        },
        {
            'id': 15,
            'name': 'Warlock/Witch'
        },
        {
            'id': 16,
            'name': 'Necromancer'
        },
        {
            'id': 17,
            'name': 'Lich'
        },
        {
            'id': 18,
            'name': 'Angel Knight'
        },
        {
            'id': 19,
            'name': 'Hoplite'
        },
        {
            'id': 20,
            'name': 'Juggernaut/Maenad'
        },
        {
            'id': 21,
            'name': 'Patriarch/Matriarch'
        },
        {
            'id': 22,
            'name': 'Familiar'
        },
        {
            'id': 37,
            'name': 'Trickster'
        },
        {
            'id': 38,
            'name': 'Warden'
        },
        {
            'id': 27,
            'name': 'Welkin'
        },
        {
            'id': 28,
            'name': 'Nidhogg'
        },
        {
            'id': 29,
            'name': 'Raijin'
        },
        {
            'id': 30,
            'name': 'Ouroboros'
        },
        {
            'id': 31,
            'name': 'Flarebrass'
        },
        {
            'id': 32,
            'name': 'Amaroq'
        },
        {
            'id': 33,
            'name': 'Bahamut'
        },
        {
            'id': 34,
            'name': 'Tiamat'
        },
        {
            'id': 35,
            'name': 'Hydra'
        },
        {
            'id': 36,
            'name': 'Golem'
        },
        {
            'id': 40,
            'name': 'Gryphon'
        },
        {
            'id': 41,
            'name': 'Cockatrice'
        },
        {
            'id': 42,
            'name': 'Octopus'
        },
        {
            'id': 43,
            'name': 'Cyclops'
        },
        {
            'id': 51,
            'name': 'Lord/Lady'
        },
        {
            'id': 52,
            'name': 'Ranger'
        },
        {
            'id': 53,
            'name': 'Priest/Sibyl'
        },
        {
            'id': 54,
            'name': 'Heretic'
        },
        {
            'id': 55,
            'name': 'Prince/Princess'
        },
        {
            'id': 56,
            'name': 'Paladin'
        },
        {
            'id': 57,
            'name': 'Astromancer/Oracle'
        },
        {
            'id': 58,
            'name': 'Vartan'
        },
        {
            'id': 59,
            'name': 'White Knight'
        },
        {
            'id': 60,
            'name': 'Shaman'
        },
        {
            'id': 61,
            'name': 'Wicce'
        },
        {
            'id': 62,
            'name': 'Bard/Songstress'
        },
        {
            'id': 63,
            'name': 'Buccaneer'
        },
        {
            'id': 70,
            'name': 'Knight Commander (Ozma)'
        },
        {
            'id': 39,
            'name': 'Dragonborn'
        },
        {
            'id': 65,
            'name': 'Sacred Fist'
        },
        {
            'id': 66,
            'name': 'Geomancer'
        },
        {
            'id': 67,
            'name': 'Blade Knight'
        },
        {
            'id': 68,
            'name': 'Enchanter'
        },
        {
            'id': 74,
            'name': 'Commando'
        },
        {
            'id': 69,
            'name': 'Headhunter'
        },
        {
            'id': 75,
            'name': 'Death Knight'
        },
        {
            'id': 73,
            'name': 'Harbinger/Furia'
        },
        {
            'id': 71,
            'name': 'Knight Commander (NPC)'
        },
        {
            'id': 72,
            'name': 'Death Templar'
        }
    ];

    const characterSymbols = [
        {
            'id': 1,
            'char': '␂'
        },
        {
            'id': 32,
            'char': ' '
        },
        {
            'id': 33,
            'char': '!'
        },
        {
            'id': 34,
            'char': '"'
        },
        {
            'id': 35,
            'char': '#'
        },
        {
            'id': 36,
            'char': '$'
        },
        {
            'id': 37,
            'char': '%'
        },
        {
            'id': 38,
            'char': '&'
        },
        {
            "id": 39,
            "char": '\''
        },
        {
            'id': 40,
            'char': '('
        },
        {
            'id': 41,
            'char': ')'
        },
        {
            'id': 42,
            'char': '*'
        },
        {
            'id': 43,
            'char': '+'
        },
        {
            'id': 44,
            'char': ','
        },
        {
            'id': 45,
            'char': '-'
        },
        {
            'id': 46,
            'char': '.'
        },
        {
            'id': 47,
            'char': '/'
        },
        {
            'id': 48,
            'char': '0'
        },
        {
            'id': 49,
            'char': '1'
        },
        {
            'id': 50,
            'char': '2'
        },
        {
            'id': 51,
            'char': '3'
        },
        {
            'id': 52,
            'char': '4'
        },
        {
            'id': 53,
            'char': '5'
        },
        {
            'id': 54,
            'char': '6'
        },
        {
            'id': 55,
            'char': '7'
        },
        {
            'id': 56,
            'char': '8'
        },
        {
            'id': 57,
            'char': '9'
        },
        {
            'id': 58,
            'char': ':'
        },
        {
            'id': 59,
            'char': ';'
        },
        {
            'id': 60,
            'char': '<'
        },
        {
            'id': 61,
            'char': '='
        },
        {
            'id': 62,
            'char': '>'
        },
        {
            'id': 63,
            'char': '?'
        },
        {
            'id': 64,
            'char': '@'
        },
        {
            'id': 65,
            'char': 'A'
        },
        {
            'id': 66,
            'char': 'B'
        },
        {
            'id': 67,
            'char': 'C'
        },
        {
            'id': 68,
            'char': 'D'
        },
        {
            'id': 69,
            'char': 'E'
        },
        {
            'id': 70,
            'char': 'F'
        },
        {
            'id': 71,
            'char': 'G'
        },
        {
            'id': 72,
            'char': 'H'
        },
        {
            'id': 73,
            'char': 'I'
        },
        {
            'id': 74,
            'char': 'J'
        },
        {
            'id': 75,
            'char': 'K'
        },
        {
            'id': 76,
            'char': 'L'
        },
        {
            'id': 77,
            'char': 'M'
        },
        {
            'id': 78,
            'char': 'N'
        },
        {
            'id': 79,
            'char': 'O'
        },
        {
            'id': 80,
            'char': 'P'
        },
        {
            'id': 81,
            'char': 'Q'
        },
        {
            'id': 82,
            'char': 'R'
        },
        {
            'id': 83,
            'char': 'S'
        },
        {
            'id': 84,
            'char': 'T'
        },
        {
            'id': 85,
            'char': 'U'
        },
        {
            'id': 86,
            'char': 'V'
        },
        {
            'id': 87,
            'char': 'W'
        },
        {
            'id': 88,
            'char': 'X'
        },
        {
            'id': 89,
            'char': 'Y'
        },
        {
            'id': 90,
            'char': 'Z'
        },
        {
            'id': 91,
            'char': '['
        },
        {
            'id': 92,
            'char': '\\'
        },
        {
            'id': 93,
            'char': ']'
        },
        {
            'id': 94,
            'char': '^'
        },
        {
            'id': 95,
            'char': '_'
        },
        {
            'id': 96,
            'char': '`'
        },
        {
            'id': 97,
            'char': 'a'
        },
        {
            'id': 98,
            'char': 'b'
        },
        {
            'id': 99,
            'char': 'c'
        },
        {
            'id': 100,
            'char': 'd'
        },
        {
            'id': 101,
            'char': 'e'
        },
        {
            'id': 102,
            'char': 'f'
        },
        {
            'id': 103,
            'char': 'g'
        },
        {
            'id': 104,
            'char': 'h'
        },
        {
            'id': 105,
            'char': 'i'
        },
        {
            'id': 106,
            'char': 'j'
        },
        {
            'id': 107,
            'char': 'k'
        },
        {
            'id': 108,
            'char': 'l'
        },
        {
            'id': 109,
            'char': 'm'
        },
        {
            'id': 110,
            'char': 'n'
        },
        {
            'id': 111,
            'char': 'o'
        },
        {
            'id': 112,
            'char': 'p'
        },
        {
            'id': 113,
            'char': 'q'
        },
        {
            'id': 114,
            'char': 'r'
        },
        {
            'id': 115,
            'char': 's'
        },
        {
            'id': 116,
            'char': 't'
        },
        {
            'id': 117,
            'char': 'u'
        },
        {
            'id': 118,
            'char': 'v'
        },
        {
            'id': 119,
            'char': 'w'
        },
        {
            'id': 120,
            'char': 'x'
        },
        {
            'id': 121,
            'char': 'y'
        },
        {
            'id': 122,
            'char': 'z'
        },
        {
            'id': 123,
            'char': '{'
        },
        {
            'id': 124,
            'char': '|'
        },
        {
            'id': 125,
            'char': '}'
        },
        {
            'id': 126,
            'char': '~'
        },
        {
            'id': 127,
            'char': 'À'
        },
        {
            'id': 128,
            'char': 'Á'
        },
        {
            'id': 129,
            'char': 'Â'
        },
        {
            'id': 130,
            'char': 'Ä'
        },
        {
            'id': 131,
            'char': 'Æ'
        },
        {
            'id': 132,
            'char': 'Ç'
        },
        {
            'id': 133,
            'char': 'È'
        },
        {
            'id': 134,
            'char': 'É'
        },
        {
            'id': 135,
            'char': 'Ê'
        },
        {
            'id': 136,
            'char': 'Ë'
        },
        {
            'id': 137,
            'char': 'Ì'
        },
        {
            'id': 138,
            'char': 'Í'
        },
        {
            'id': 139,
            'char': 'Î'
        },
        {
            'id': 140,
            'char': 'Ï'
        },
        {
            'id': 141,
            'char': 'Ñ'
        },
        {
            'id': 142,
            'char': 'Ò'
        },
        {
            'id': 143,
            'char': 'Ó'
        },
        {
            'id': 144,
            'char': 'Ô'
        },
        {
            'id': 145,
            'char': 'Õ'
        },
        {
            'id': 146,
            'char': 'Ö'
        },
        {
            'id': 147,
            'char': 'Œ'
        },
        {
            'id': 148,
            'char': 'Ù'
        },
        {
            'id': 149,
            'char': 'Ú'
        },
        {
            'id': 150,
            'char': 'Û'
        },
        {
            'id': 151,
            'char': 'Ü'
        },
        {
            'id': 152,
            'char': 'ß'
        },
        {
            'id': 153,
            'char': 'à'
        },
        {
            'id': 154,
            'char': 'á'
        },
        {
            'id': 155,
            'char': 'â'
        },
        {
            'id': 156,
            'char': 'ä'
        },
        {
            'id': 157,
            'char': 'æ'
        },
        {
            'id': 158,
            'char': 'ç'
        },
        {
            'id': 159,
            'char': 'è'
        },
        {
            'id': 160,
            'char': 'é'
        },
        {
            'id': 161,
            'char': 'ê'
        },
        {
            'id': 162,
            'char': 'ë'
        },
        {
            'id': 163,
            'char': 'ì'
        },
        {
            'id': 164,
            'char': 'í'
        },
        {
            'id': 165,
            'char': 'î'
        },
        {
            'id': 166,
            'char': 'ï'
        },
        {
            'id': 167,
            'char': 'ñ'
        },
        {
            'id': 168,
            'char': 'ò'
        },
        {
            'id': 169,
            'char': 'ó'
        },
        {
            'id': 170,
            'char': 'ô'
        },
        {
            'id': 171,
            'char': 'õ'
        },
        {
            'id': 172,
            'char': 'ö'
        },
        {
            'id': 173,
            'char': 'œ'
        },
        {
            'id': 174,
            'char': 'ù'
        },
        {
            'id': 175,
            'char': 'ú'
        },
        {
            'id': 176,
            'char': 'û'
        },
        {
            'id': 177,
            'char': 'ü'
        },
        {
            'id': 178,
            'char': 'ß'
        },
        {
            'id': 179,
            'char': '¿'
        },
        {
            'id': 180,
            'char': '¡'
        },
        {
            'id': 181,
            'char': '‚'
        },
        {
            'id': 182,
            'char': '„'
        },
        {
            'id': 183,
            'char': '‘'
        },
        {
            'id': 184,
            'char': '’'
        },
        {
            'id': 185,
            'char': '“'
        },
        {
            'id': 186,
            'char': '”'
        },
        {
            'id': 187,
            'char': '…'
        },
        {
            'id': 188,
            'char': '—'
        },
        {
            'id': 189,
            'char': '«'
        },
        {
            'id': 190,
            'char': '»'
        },
        {
            'id': 191,
            'char': '←'
        },
        {
            'id': 192,
            'char': '↑'
        },
        {
            'id': 193,
            'char': '→'
        },
        {
            'id': 194,
            'char': '↓'
        },
        {
            'id': 195,
            'char': '✕'
        },
        {
            'id': 196,
            'char': '£'
        },
        {
            'id': 197,
            'char': '€'
        },
        {
            'id': 198,
            'char': '§'
        },
        {
            'id': 199,
            'char': '¢'
        },
        {
            'id': 200,
            'char': '¨'
        },
        {
            'id': 201,
            'char': '’'
        },
        {
            'id': 202,
            'char': '_'
        },
        {
            'id': 203,
            'char': '＿'
        },
        {
            'id': 204,
            'char': '¹'
        },
        {
            'id': 205,
            'char': '²'
        },
        {
            'id': 206,
            'char': '³'
        },
        {
            'id': 207,
            'char': '⁴'
        },
        {
            'id': 208,
            'char': '⁵'
        },
        {
            'id': 209,
            'char': '©'
        },
        {
            'id': 210,
            'char': '®'
        },
        {
            'id': 211,
            'char': '™'
        },
        {
            'id': 212,
            'char': 'ª'
        },
        {
            'id': 213,
            'char': '⁰'
        },
        {
            'id': 214,
            'char': '°'
        },
        {
            'id': 215,
            'char': '≠'
        },
        {
            'id': 216,
            'char': '≤'
        },
        {
            'id': 217,
            'char': '≥'
        },
        {
            'id': 218,
            'char': '■'
        },
        {
            'id': 219,
            'char': '□'
        },
        {
            'id': 220,
            'char': '○'
        },
        {
            'id': 221,
            'char': '●'
        },
        {
            'id': 222,
            'char': '✭'
        },
        {
            'id': 223,
            'char': '✰'
        },
        {
            'id': 224,
            'char': '❤'
        },
        {
            'id': 225,
            'char': '♪'
        },
        {
            'id': 226,
            'char': '〜'
        },
        {
            'id': 227,
            'char': '±'
        },
        {
            'id': 228,
            'char': '÷'
        },
        {
            'id': 229,
            'char': '♂'
        },
        {
            'id': 230,
            'char': '♀'
        },
        {
            'id': 231,
            'char': '∑'
        },
        {
            'id': 232,
            'char': '⊂'
        },
        {
            'id': 233,
            'char': '⊃'
        },
        {
            'id': 234,
            'char': '∀'
        },
        {
            'id': 235,
            'char': 'д'
        },
        {
            'id': 236,
            'char': 'ω'
        },
        {
            'id': 237,
            'char': '▼'
        },
        {
            'id': 238,
            'char': '△'
        }
    ];

    loadGenerators();

});