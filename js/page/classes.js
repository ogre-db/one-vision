
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/jobs.json',
        skillsJson = 'data/skills.json',
        magicJson = 'data/magic.json',
        templatesJson = 'data/templates.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json',
        auctionJson = 'data/auction.json',
        obtainsJson = 'data/obtains.json';
    let items = [],
        skills = [],
        magic = [],
        templates = [],
        weapons = [],
        armor = [],
        sundries = [],
        auction = [];

    let innate;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoMove = sidePanel.querySelector('.stats-top b.move'),
        infoJump = sidePanel.querySelector('.stats-top b.jump'),
        infoPerk = sidePanel.querySelector('.stats-top b.perk'),
        infoRtPenalty = sidePanel.querySelector('.stats-top b.rtpenalty'),
        infoMoveCost = sidePanel.querySelector('.stats-top .movecost b'),
        infoSpellReq = sidePanel.querySelector('.stats-top .spellreq b'),
        infoStatsBottom = sidePanel.querySelectorAll('.stats-bottom ul.stats b'),
        infoDerivedBottom = sidePanel.querySelectorAll('.stats-bottom ul.ov-accordion b'),
        infoEquipMelee = sidePanel.querySelector('.equipment .melee ul'),
        infoEquipRanged = sidePanel.querySelector('.equipment .ranged ul'),
        infoEquipShield = sidePanel.querySelector('.equipment .shield ul'),
        infoEquipArmor = sidePanel.querySelector('.equipment .armor ul'),
        infoEquipAccessory = sidePanel.querySelector('.equipment .accessory ul'),
        infoRestriction = sidePanel.querySelector('.stats-extra .restriction'),
        infoInnMelee = sidePanel.querySelector('.stats-extra .innmelee'),
        infoInnRanged = sidePanel.querySelector('.stats-extra .innranged'),
        infoClassmark = sidePanel.querySelector('.stats-extra .classmark'),
        infoSpells = sidePanel.querySelector('.spells .accordion-content ul'),
        infoSkills = sidePanel.querySelector('.skills .accordion-content ul'),
        infoRace = sidePanel.querySelector('.race .accordion-content ul'),
        infoAuction = sidePanel.querySelector('.auction .accordion-content ul'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // showProgress();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);
        let currentType = '';

        // let total = items.length;

        items.forEach( (item, index) => {

            let classImgSrc = '';

            if ( item.typ === 'B' || item.typ === 'A' || item.typ === 'S' || item.typ === 'U' ) {
                classImgSrc = races[2]['icon'];
            } else if (item.id >= 19 && item.id <= 21) {
                classImgSrc = races[6]['icon'];
            } else if (item.id === 22) {
                classImgSrc = races[14]['icon'];
            } else if (item.id === 37) {
                classImgSrc = races[12]['icon'];
            } else if ( item.id === 36 || item.id === 38 ) {
                classImgSrc = races[18]['icon'];
            } else if (item.id >= 27 && item.id <= 35) {
                classImgSrc = races[8]['icon'];
            } else if (item.id >= 40 && item.id <= 43) {
                classImgSrc = races[4]['icon'];
            }

            if ( item.typ !== currentType ) {
                let tr = document.createElement('tr');
                tr.className = 'separator';
                let category = document.createElement('td');
                category.textContent = classTypes[item.typ].name;
                category.colSpan = document.querySelectorAll('#itemList th').length;
                tr.appendChild(category);
                itemList.appendChild(tr);
                currentType = item.typ;
            }

            let tr = document.createElement('tr');
                tr.id = item.id;
                let type = document.createElement('td');
                    let classImg = document.createElement('img');
                    classImg.src = classImgSrc;
                    if (item.typ === 'U')
                        classImg.classList.add('uni');
                    type.appendChild(classImg);
                let name = document.createElement('td');
                    name.textContent = item.name;
                let move = document.createElement('td');
                    move.textContent = Math.floor((item.moveamt - 4)/4);
                let jump = document.createElement('td');
                    jump.textContent = movementType[item.move];
                let rt = document.createElement('td');
                    rt.textContent = item.rt;
                let armor = document.createElement('td');
                    if (!item.armor && !item.accessory && !item.shield) {
                        armor.textContent = '—';
                    } else {
                        armor.textContent = (item.armor ? item.armor : '—')
                            + '/'
                            + (item.accessory ? item.accessory : '—')
                            + '/'
                            + (item.shield ? item.shield : '—');
                    }
                let magic = document.createElement('td');
                    magic.textContent = item.magic !== '-' ? item.magic : '—';
                tr.append(type, name, move, jump, rt, armor, magic);
            itemList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        document.querySelectorAll('#itemList tr:not(.separator)').forEach( (item) => {

            item.addEventListener( 'click', function (event) {

                openInfo(event);
            })
        });
    }

    function openInfo (event) {

        swapEffectStart(sidePanel, panelContent);

        let targetRow = event.target.closest('tr');
        let item = items.find((item) => item.id === parseInt(targetRow.id));

        let selectedRow = itemList.querySelector('tr.selected');
        if (selectedRow) selectedRow.classList.remove('selected');
        targetRow.classList.add('selected');

        infoType.textContent = classTypes[item.typ].name;
        infoTypeIcon.classList.value = classTypes[item.typ].class;
        if ( item.typ === 'B' || item.typ === 'A' || item.typ === 'S' || item.typ === 'U' ) {
            infoTypeIcon.src = races[2]['icon'];
        } else if (item.id >= 19 && item.id <= 21) {
            infoTypeIcon.src = races[6]['icon'];
        } else if (item.id === 22) {
            infoTypeIcon.src = races[14]['icon'];
        } else if (item.id === 37) {
            infoTypeIcon.src = races[12]['icon'];
        } else if ( item.id === 36 || item.id === 38 ) {
            infoTypeIcon.src = races[18]['icon'];
        } else if (item.id >= 27 && item.id <= 35) {
            infoTypeIcon.src = races[8]['icon'];
        } else if (item.id >= 40 && item.id <= 43) {
            infoTypeIcon.src = races[4]['icon'];
        }

        item.skillbonamt >= 8 ? sidePanel.classList.add('uni') : sidePanel.classList.remove('uni');
        infoTitle.textContent = item.name;
        infoMove.textContent = Math.floor((item.moveamt - 4) / 4);
        infoJump.innerHTML = ([4, 5].includes(item.move) ? '&#8734' : (movementType[item.move].substr(0, 1) + '<b>&#9650; </b>' + movementType[item.move].substr(2, 3) + '<b>&#9660;</b>'));
        infoPerk.textContent = ([4, 5].includes(item.move) || item.moveabl) ? ([4, 5].includes(item.move) ? movementType[item.move] : '') + (item.moveabl ? movementPerk[item.moveabl] : '') : '—';
        infoRtPenalty.textContent = item.rt;
        infoMoveCost.textContent = item.movecost > 220 ? item.movecost - 224 : item.movecost > 150 ? item.movecost - 160 : item.movecost > 120 ? item.movecost - 128 : item.movecost > 30 ? item.movecost - 32 : item.movecost;
        if (item.magic === 'Basic')
            infoSpellReq.innerHTML = '+4';
        else if (item.magic === 'Adept')
            infoSpellReq.innerHTML = '+2';
        else if (item.magic === 'Master')
            infoSpellReq.innerHTML = '<small>Default</small>';
        else
            infoSpellReq.innerHTML = '—';

        let statList = [
            item.atkgrw,
            item.defgrw,
            item.hpgrw,
            item.mpgrw,
            item.strgrw,
            item.vitgrw,
            item.dexgrw,
            item.agigrw,
            item.avdgrw,
            item.intgrw,
            item.mndgrw,
            item.resgrw
        ];
        infoStatsBottom.forEach((stat, index) => {
            stat.textContent = statList[index] ? statList[index] : '—';
        });

        statList = {
            'str': item.strgrw,
            'vit': item.vitgrw,
            'dex': item.dexgrw,
            'agi': item.agigrw,
            'avd': item.avdgrw,
            'int': item.intgrw,
            'mnd': item.mndgrw,
            'res': item.resgrw
        }
        infoDerivedBottom.forEach((stat, index) => {
            stat.textContent = getDerivedStat(statList, index + 1);
        });

        let equipMelee = weapons.filter((rows) => rows['typ'] >= 161 && rows['typ'] <= 176 && rows['eq' + item.eqset] && rows['price']);
        let equipRanged = weapons.filter((rows) => rows['typ'] >= 177 && rows['eq' + item.eqset] && rows['price']);
        let equipShield = armor.filter((rows) => rows['typ'] === 182 && rows['eq' + item.eqset] && rows['price']);
        let equipArmor = armor.filter((rows) => rows['typ'] === 24 && rows['eq' + item.eqset] && rows['price']);
        let equipAccessory = armor.filter((rows) => [23,25,27].includes(rows['typ']) && rows['eq' + item.eqset] && rows['price']);

        if (equipMelee.length > 0) {
            infoEquipMelee.innerHTML = '';
            if (item.id === 65 && equipMelee.find((row) => row['id'] === 1))
                infoEquipMelee.innerHTML += '<li><b>Fists </b><small>(basic/special only)</small></li>';
            else if (equipMelee.find((row) => row['id'] === 1))
                infoEquipMelee.innerHTML += '<li><b>Fists</b></li>';
            if (equipMelee.find((row) => row['id'] === 28))
                infoEquipMelee.innerHTML += '<li><b>Daggers</b></li>';
            if (equipMelee.find((row) => row['id'] === 53))
                infoEquipMelee.innerHTML += '<li><b>1H Swords</b></li>';
            else if (equipMelee.find((row) => row['id'] === 57))
                infoEquipMelee.innerHTML += '<li><b>1H Swords </b><small>(bastard sword only)</small></li>';
            if (equipMelee.find((row) => row['id'] === 86))
                infoEquipMelee.innerHTML += '<li><b>2H Swords</b></li>';
            if (equipMelee.find((row) => row['id'] === 113) && equipMelee.find((row) => row['id'] === 114))
                infoEquipMelee.innerHTML += '<li><b>Axes</b></li>';
            else if (equipMelee.find((row) => row['id'] === 113))
                infoEquipMelee.innerHTML += '<li><b>1H Axes</b></li>';
            else if (equipMelee.find((row) => row['id'] === 114))
                infoEquipMelee.innerHTML += '<li><b>2H Axes</b></li>';
            if (equipMelee.find((row) => row['id'] === 140) && equipMelee.find((row) => row['id'] === 141))
                infoEquipMelee.innerHTML += '<li><b>Spears</b></li>';
            else if (equipMelee.find((row) => row['id'] === 140))
                infoEquipMelee.innerHTML += '<li><b>1H Spears</b></li>';
            else if (equipMelee.find((row) => row['id'] === 141))
                infoEquipMelee.innerHTML += '<li><b>2H Spears</b></li>';
            if (equipMelee.find((row) => row['id'] === 168) && equipMelee.find((row) => row['id'] === 169))
                infoEquipMelee.innerHTML += '<li><b>Hammers</b></li>';
            else if (equipMelee.find((row) => row['id'] === 168))
                infoEquipMelee.innerHTML += '<li><b>1H Hammers</b></li>';
            else if (equipMelee.find((row) => row['id'] === 169))
                infoEquipMelee.innerHTML += '<li><b>2H Hammers</b></li>';
            if (equipMelee.find((row) => row['id'] === 194))
                infoEquipMelee.innerHTML += '<li><b>1H Katana</b></li>';
            if (equipMelee.find((row) => row['id'] === 221))
                infoEquipMelee.innerHTML += '<li><b>2H Katana</b></li>';
            if (equipMelee.find((row) => row['id'] === 248))
                infoEquipMelee.innerHTML += '<li><b>Cudgels</b></li>';
            else if (equipMelee.find((row) => row['id'] === 251))
                infoEquipMelee.innerHTML += '<li><b>Cudgels </b><small>(quarterstaff only)</small></li>';
            if (equipMelee.find((row) => row['id'] === 273))
                infoEquipMelee.innerHTML += '<li><b>Whips</b></li>';
            if (equipMelee.find((row) => row['id'] === 283))
                infoEquipMelee.innerHTML += '<li><b>Spellbooks</b></li>';
            if (equipMelee.find((row) => row['id'] === 293))
                infoEquipMelee.innerHTML += '<li><b>Instruments</b></li>';
        } else infoEquipMelee.innerHTML = '<li>—</li>';

        if (equipRanged.length > 0) {
            infoEquipRanged.innerHTML = '';
            if (equipRanged.find((row) => row['id'] === 303) && equipRanged.find((row) => row['id'] === 591))
                infoEquipRanged.innerHTML += '<li><b>Sidearms</b></li>';
            else if (equipRanged.find((row) => row['id'] === 303))
                infoEquipRanged.innerHTML += '<li><b>Sidearms </b><small>(blowguns only)</small></li>';
            else if (equipRanged.find((row) => row['id'] === 591))
                infoEquipRanged.innerHTML += '<li><b>Sidearms </b><small>(thrown only)</small></li>';
            if (equipRanged.find((row) => row['id'] === 391 || equipRanged.find((row) => row['id'] === 392))) {
                infoEquipRanged.innerHTML += '<li><b>' + equipRanged[0].name + '</b></li>';}
            if (equipRanged.find((row) => row['id'] === 314) && equipRanged.find((row) => row['id'] === 313))
                infoEquipRanged.innerHTML += '<li><b>Bows</b></li>';
            else if (equipRanged.find((row) => row['id'] === 314))
                infoEquipRanged.innerHTML += '<li><b>1H Bows</b></li>';
            else if (equipRanged.find((row) => row['id'] === 313))
                infoEquipRanged.innerHTML += '<li><b>2H Bows</b></li>';
            if (equipRanged.find((row) => row['id'] === 341) && equipRanged.find((row) => row['id'] === 340))
                infoEquipRanged.innerHTML += '<li><b>Crossbows</b></li>';
            else if (equipRanged.find((row) => row['id'] === 341))
                infoEquipRanged.innerHTML += '<li><b>1H Crossbows</b></li>';
            else if (equipRanged.find((row) => row['id'] === 340))
                infoEquipRanged.innerHTML += '<li><b>2H Crossbows</b></li>';
            if (equipRanged.find((row) => row['id'] === 367) && equipRanged.find((row) => row['id'] === 369))
                infoEquipRanged.innerHTML += '<li><b>Fusils</b></li>';
            else if (equipRanged.find((row) => row['id'] === 367))
                infoEquipRanged.innerHTML += '<li><b>1H Fusils</b></li>';
            else if (equipRanged.find((row) => row['id'] === 369))
                infoEquipRanged.innerHTML += '<li><b>2H Fusils</b></li>';
            if (equipRanged.find((row) => row['id'] === 607)) {
                infoEquipRanged.innerHTML += '<li><b>' + equipRanged.find((row) => row['id'] === 607).name + '</b></li>';}
        } else infoEquipRanged.innerHTML = '<li>—</li>';

        if (equipShield.length > 0) {
            infoEquipShield.innerHTML = '';
            if (equipShield.find((row) => row['id'] === 398))
                infoEquipShield.innerHTML += '<li><b>Heavy Shield</b></li>';
            else if (equipShield.find((row) => row['id'] === 411))
                infoEquipShield.innerHTML += '<li><b>' + equipShield.find((row) => row['id'] === 411).name + '</b></li>';
            if (equipShield.find((row) => row['id'] === 397))
                infoEquipShield.innerHTML += '<li><b>Light Shield</b></li>';
            if (equipShield.find((row) => row['id'] === 412))
                infoEquipShield.innerHTML += '<li><b>' + equipShield.find((row) => row['id'] === 412).name + '</b></li>';
            if (equipShield.find((row) => row['id'] === 416))
                infoEquipShield.innerHTML += '<li><b>Focus Item</b></li>';
        } else infoEquipShield.innerHTML = '<li>—</li>';

        if (equipArmor.length > 0) {
            infoEquipArmor.innerHTML = '';
            if (equipArmor.find((row) => row['id'] === 445))
                infoEquipArmor.innerHTML += '<li><b>Heavy Armor</b></li>';
            if (equipArmor.find((row) => row['id'] === 444))
                infoEquipArmor.innerHTML += '<li><b>Light Armor</b></li>';
            if (equipArmor.find((row) => row['id'] === 487))
                infoEquipArmor.innerHTML += '<li><b>Cloth Armor</b></li>';
            if (equipArmor.find((row) => row['id'] === 463))
                infoEquipArmor.innerHTML += '<li><b>Mage Armor</b></li>';
        } else infoEquipArmor.innerHTML = '<li>—</li>';

        if (equipAccessory.length > 0) {
            infoEquipAccessory.innerHTML = '';
            if (item.id === 43)
                infoEquipAccessory.innerHTML += '<li><b>Circlets</b></li>';
            else {
                if (equipAccessory.find((row) => row['id'] === 428))
                    infoEquipAccessory.innerHTML += '<li><b>Heavy Gear</b></li>';
                else if (equipAccessory.find((row) => row['id'] === 500))
                    infoEquipAccessory.innerHTML += '<li><b>' + equipAccessory.find((row) => row['id'] === 500).name + '</b></li>';
                if (equipAccessory.find((row) => row['id'] === 430))
                    infoEquipAccessory.innerHTML += '<li><b>Light Gear</b></li>';
                if (equipAccessory.find((row) => row['id'] === 427))
                    infoEquipAccessory.innerHTML += '<li><b>Cloth Gear</b></li>';
                if (equipAccessory.find((row) => row['id'] === 429))
                    infoEquipAccessory.innerHTML += '<li><b>Mage Gear</b></li>';
                if (equipAccessory.find((row) => row['id'] === 502))
                    infoEquipAccessory.innerHTML += '<li><b>Healer Gear</b></li>';
                if (equipAccessory.find((row) => row['id'] === 435))
                    infoEquipAccessory.innerHTML += '<li><b>Sniper Gear</b></li>';
            }
        } else infoEquipAccessory.innerHTML = '<li>—</li>';

        if (item.innml) {
            let innMelee = weapons.find((row) => row['id'] === item.innml);
            infoInnMelee.textContent = innMelee.name;
        } else infoInnMelee.textContent = '—';
        if (item.innrng) {
            let innRanged = weapons.find((row) => row['id'] === item.innrng);
            infoInnRanged.textContent = innRanged.name;
        } else infoInnRanged.textContent = '—';

        if (item.magset < 63) {
            let spellList = magic.filter((rows) => rows['sset' + item.magset] < 255);
            infoSpells.innerHTML = '';
            spellList.forEach((el, i) => {
                let spellName = el.name;
                if (el.unique)
                    spellName = '<span class="orange">' + el.name + '</span>';
                if (el.npconly)
                    spellName = '<span class="red">' + el.name + '</span>';
                let listedSpell = document.createElement('li');
                    listedSpell.innerHTML = '<img src="' + abilityType[el.typ].icon + '">';
                    listedSpell.innerHTML += spellName + '<b><small>Lv.&nbsp</small>' + el['sset' + item.magset] + '</b>';
                    infoSpells.append(listedSpell);
                if ( spellList[i + 1] && spellList[i + 1].typ !== el.typ ) {
                    let spacer = document.createElement('li');
                        spacer.classList.add('spacer');
                    infoSpells.append(spacer);
                }
            });
            infoSpells.closest('.spells').classList.remove('hidden');
        } else infoSpells.closest('.spells').classList.add('hidden');

        let skillList = skills.filter((rows) => rows['ss' + item.sklset] < 255 && rows['learnable'] && !rows['npconly']);
        infoRestriction.innerHTML = '';
        if ( equipMelee.length > 0 && !skillList.find((row) => row['id'] === 37) )
            infoRestriction.innerHTML += '<li class="red">Cannot use Light elemental equipment</li>';
        if ( equipMelee.length > 0 && !skillList.find((row) => row['id'] === 38) )
            infoRestriction.innerHTML += '<li class="red">Cannot use Dark elemental equipment</li>';

        infoSkills.innerHTML = '';
        skillList.forEach((el, i) => {
            let skillName = el.name;
            if ( (el.learnable < 5 || [222,311,313,314,376].includes(el.id)) && ![258].includes(el.id))
                skillName = '<span class="orange"><b>' + el.name + ( item.id === 40 && el['ss' + item.sklset] === 0 ? '  (Berda/Obda)' : '') + '</b></span>';
            let listedSkill = document.createElement('li');
                listedSkill.innerHTML = '<img src="' + skillType[el.typ].icon + '">';
                listedSkill.innerHTML += skillName + '<b>' + ( el['ss' + item.sklset] > 0 ? '<small>Lv.&nbsp</small>' + el['ss' + item.sklset] : '<span class="blue">&#9711;</span>' ) + '</b>';
                infoSkills.append(listedSkill);
            if ( skillList[i + 1] && skillList[i + 1].typ !== el.typ ) {
                let spacer = document.createElement('li');
                    spacer.classList.add('spacer');
                infoSkills.append(spacer);
            }
        });

        if (item.mark) {
            let classmark = sundries.find((row) => row['id'] === item.mark);
            infoClassmark.querySelector('b').textContent = classmark.name;
            infoClassmark.querySelector('b').setAttribute('data-tooltip', 'obtain-' + classmark.id);
            infoClassmark.classList.remove('hidden');

            let inJobsets = [];
            for (let i = 0; i < 48; i++) {
                if (item['ccset' + i] === 1) inJobsets.push(i);
            }
            let inTemplates = templates.filter((rows) => (inJobsets.includes(rows['ccset'])));
            infoRace.innerHTML = '';
            inTemplates.forEach((el, i) => {
                infoRace.innerHTML += '<li>' + ((el.typ === 'U' || el.typ === 'S' || el.typ === 'D') ? '<b class="orange">' + el.name + '</b>' : el.name) + '</li>';
                if ( inTemplates[i + 1] && inTemplates[i + 1].typ !== inTemplates[i].typ )
                    infoRace.innerHTML += '<li class="spacer"></li>';
            });
        } else {
            infoClassmark.classList.add('hidden');
            infoRace.innerHTML = '<li>' + item.name + '</li>';
        }

        if (item.mark >= 1437 && item.mark <= 1444 || item.mark === 0) {
            let inAuctions = auction.filter((rows) => rows['cl' + item.id]);
            infoAuction.innerHTML = '';
            inAuctions.forEach((el) => {
                infoAuction.innerHTML += '<li>' + el.name + '<b>x' + el['cl' + item.id] + '</b></li>';
            });
            infoAuction.closest('.auction').classList.remove('hidden');
        } else infoAuction.closest('.auction').classList.add('hidden');

        if (item.notes) {
            infoNotes.querySelector('b').textContent = item.notes;
            infoNotes.classList.remove('hidden');
        } else infoNotes.classList.add('hidden');

        activateTooltips();

        swapEffectRemove( sidePanel, panelContent );

        openPanel(sidePanel);
    }

    async function loadTables() {

        fetchJSON(skillsJson).then(
            data => skills = data
        );
        fetchJSON(magicJson).then(
            data => magic = data
        );
        fetchJSON(templatesJson).then(
            data => templates = data
        );
        fetchJSON(weaponsJson).then(
            data => weapons = data
        );
        fetchJSON(armorJson).then(
            data => armor = data
        );
        fetchJSON(sundriesJson).then(
            data => sundries = data
        );
        fetchJSON(auctionJson).then(
            data => auction = data
        );
        fetchJSON(obtainsJson).then(
            data => obtains = data
        );
    }
});