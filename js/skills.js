
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/skills.json',
        jobsJson = 'data/jobs.json',
        abilitiesJson = 'data/abilities.json',
        magicJson = 'data/magic.json',
        obtainsJson = 'data/obtains.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json';
    let items = [],
        jobs = [],
        abilities = [],
        magic = [],
        obtains = [],
        weapons = [],
        armor = [],
        sundries = [];

    let categoryName;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoSpCost = sidePanel.querySelector('.stats-top li.spcost b'),
        infoRank = sidePanel.querySelector('.stats-top li.rank b'),
        infoGroup = sidePanel.querySelector('.stats-top .group li b'),
        infoPrereq = sidePanel.querySelector('.stats-top .prereq li b'),
        infoEffect = sidePanel.querySelector('.stats-effect'),
        infoPassive = sidePanel.querySelector('.stats-passive'),
        infoSpells = sidePanel.querySelector('.spells .accordion-content ul'),
        infoItems = sidePanel.querySelector('.items .accordion-content ul'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoUsable = sidePanel.querySelector('.usable'),
        infoGear = sidePanel.querySelector('.usable .gear'),
        infoSet = sidePanel.querySelector('.usable .set'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // showProgress();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);
        abilities = await fetchJSON(abilitiesJson);

        // let total = items.length;
        items.forEach( (item, index) => {
            if ( index === 0 || ( item.typvar && skillType[item.typ + item.typvar]['name'] !== categoryName)
                    || ( !item.typvar && skillType[item.typ]['name'] !== categoryName) ) {
                if ( item.typvar )
                    categoryName = skillType[item.typ + item.typvar]['name'];
                else
                    categoryName = skillType[item.typ]['name'];
                let tr = document.createElement('tr');
                tr.className = 'separator';
                let category = document.createElement('td');
                category.textContent = categoryName;
                category.colSpan = document.querySelectorAll('#itemList th').length;
                tr.appendChild(category);
                itemList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                    let classImg = document.createElement('img');
                    if ( item.typ === 3 )
                        classImg.src = abilityType[item.abilitygrp]['icon'];
                    else if ( [5,7,8,12,18,19,20].includes(item.id) )
                        classImg.src = itemTypes[item.id + 160]['icon2'];
                    else if ( item.id <= 20 )
                        classImg.src = itemTypes[item.id + 160]['icon1'];
                    else
                        classImg.src = skillType[item.typ]['icon'];
                    if ( item.npconly )
                        classImg.classList.add('ban');
                    type.appendChild(classImg);
                let name = document.createElement('td');
                    name.textContent = item.name;
                let active = document.createElement('td');
                    if ( item.ability )
                        active.innerHTML = '<span class="red">&#9654;</span>';
                let passive = document.createElement('td');
                    if ( (item.id < 42 || item.id > 70 && item.id < 220) && ![121,126,129,151,161].includes(item.id) )
                        passive.innerHTML = '<span class="blue">&#10010;</span>';
                let rank = document.createElement('td');
                    if ( item.rankrate )
                        rank.innerHTML = '<span class="green"><b>&#9650;' + (item.id <= 20 ? item.rankrate * 2 : item.rankrate) / 100 + '</b></span>';
                let group = document.createElement('td');
                    if ( item.group )
                        group.innerHTML = '<b><small>' + skillGroup[item.group].symbol + '</small></b>';
                let cost = document.createElement('td');
                    cost.textContent = item.cost;
            tr.append(type, name, active, passive, rank, group, cost);
            itemList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        document.querySelectorAll('#itemList tr:not(.separator)').forEach( (element) => {

            element.addEventListener( 'click', function (event) {

                openInfo(event);
            })
        });
    }

    function openInfo (event) {

        swapEffectStart(sidePanel, panelContent);

        let targetRow = event.target.closest('tr');
        let item = items[targetRow.id];

        let selectedRow = itemList.querySelector('tr.selected');
        if (selectedRow) selectedRow.classList.remove('selected');
        targetRow.classList.add('selected');

        if (item.npconly)
            sidePanel.classList.add('ban');
        else
            sidePanel.classList.remove('ban');
        infoTitle.textContent = item.name;
        let typeIcon;
        let abilityGroup = skillType[item.typ].name;
        if (item.typ === 3)
            typeIcon = abilityType[item.abilitygrp]['icon'];
        else if ([5, 7, 8, 12].includes(item.id))
            typeIcon = itemTypes[item.id + 160]['icon2'];
        else if (item.id <= 20)
            typeIcon = itemTypes[item.id + 160]['icon1'];
        else
            typeIcon = skillType[item.typ]['icon'];
        if (item.npconly)
            infoTypeIcon.classList.add('ban');
        else
            infoTypeIcon.classList.remove('ban');
        if (item.typvar)
            abilityGroup = skillType[item.typ + item.typvar].name;
        infoType.textContent = abilityGroup;
        infoTypeIcon.src = typeIcon;

        infoSpCost.innerText = item.cost;
        if (item.rankrate)
            infoRank.innerHTML = '<span class="green">&#9650;' + (item.id <= 20 ? item.rankrate * 2 : item.rankrate) / 100 + '</span>';
        else
            infoRank.innerText = '—';
        if (item.group) {
            infoGroup.innerHTML = '<small>' + skillGroup[item.group].name + '</small>';
        }
        else
            infoGroup.innerText = '—';
        if (item.prereq)
            infoPrereq.innerHTML = '<small>' + items.find((row) => row['id'] === item.prereq).name + '</small>';
        else
            infoPrereq.innerText = '—';

        let ability;
        if (item.ability) {
            ability = abilities.find((row) => row['id'] === item.ability);
            infoEffect.querySelector('.name b').innerText = ability.name;
            let typeIcon = abilityType[ability.typ].icon;
            let abilityGroup = abilityType[ability.typ].name;
            if (ability.typvar) {
                typeIcon = abilityType[ability.typ + ability.typvar].icon;
                abilityGroup = abilityType[ability.typ + ability.typvar].name;
            }
            infoEffect.querySelector('.type img').src = typeIcon;
            infoEffect.querySelector('.type b').innerText = abilityGroup;
            let cost = '—';
            if (ability.rescost > 0 && item.typ !== 32) {
                cost = ability.rescost;
                if (ability.res === 1)
                    cost += '<b class="blue">HP</b>';
                else if (ability.res === 2)
                    cost += '<b class="pink">MP</b>';
                else if (ability.res === 3)
                    cost += '<b class="orange">TP</b>';
                else if (ability.res === 4)
                    cost += '+<b class="orange">TP</b>';
            }
            infoEffect.querySelector('.cost b').innerHTML = cost;
            infoEffect.querySelector('.rtcost b').innerText = ability.rtcost;
            if (ability.reag)
                infoEffect.querySelector('.reagent b').innerText = obtains.find((row) => row['id'] === ability.reag).name + ' x' + ability.reagamt;
            else
                infoEffect.querySelector('.reagent b').innerText = '—';
            infoEffect.querySelector('.target b').innerText = abilityRangeType[ability.rntyp].name;
            if (ability.maxr) {
                if (ability.minr === ability.maxr)
                    infoEffect.querySelector('.range b').innerText = ability.maxr;
                else
                    infoEffect.querySelector('.range b').innerText = ability.minr + ' - ' + ability.maxr;
            } else
                infoEffect.querySelector('.range b').innerText = '—';
            if (ability.aoe)
                infoEffect.querySelector('.area b').innerText = ability.aoe;
            else
                infoEffect.querySelector('.area b').innerText = '—';
            if (ability.hits)
                infoEffect.querySelector('.hits b').innerText = '1 - ' + parseInt(ability.hits + 1);
            else
                infoEffect.querySelector('.hits b').innerText = '—';

            if (ability.eff11) {
                let effect1 = getEffectText(ability, 1);
                if (item.name.indexOf('Palace Guide') >= 0)
                    infoEffect.querySelector('.effect-1 .effect b').innerHTML = 'Teleports the party to a different section of the Palace of the Dead';
                else
                    infoEffect.querySelector('.effect-1 .effect b').innerHTML = effect1.effect;
                infoEffect.querySelector('.effect-1 .restrict b').innerHTML = effect1.restrict;
                infoEffect.querySelector('.effect-1 .acc b').innerHTML = effect1.accuracy;
                let damageProfile = '';
                if (effect1.damage.length > 0) {
                    effect1.damage.forEach((dmg, i) => {
                        if (i > 0) damageProfile += ' &#8226 ';
                        damageProfile += '<img src="' + dmg.icon + '">' + dmg.name;
                    });
                } else damageProfile = '—';
                infoEffect.querySelector('.effect-1 .profile b').innerHTML = damageProfile;
                infoEffect.querySelector('.effect-1').classList.remove('hidden');
                infoEffect.querySelector('.divider-1').classList.remove('hidden');
            } else {
                infoEffect.querySelector('.effect-1').classList.add('hidden');
                infoEffect.querySelector('.divider-1').classList.add('hidden');
            }
            if (ability.eff21) {
                let effect2 = getEffectText(ability, 2);
                infoEffect.querySelector('.effect-2 .effect b').innerHTML = effect2.effect;
                infoEffect.querySelector('.effect-2 .restrict b').innerHTML = effect2.restrict;
                infoEffect.querySelector('.effect-2 .acc b').innerHTML = effect2.accuracy;
                let damageProfile = '';
                if (effect2.damage.length > 0) {
                    effect2.damage.forEach((dmg, i) => {
                        if (i > 0) damageProfile += ' &#8226 ';
                        damageProfile += '<img src="' + dmg.icon + '">' + dmg.name;
                    });
                } else damageProfile = '—';
                infoEffect.querySelector('.effect-2 .profile b').innerHTML = damageProfile;
                infoEffect.querySelector('.effect-2').classList.remove('hidden');
                infoEffect.querySelector('.divider-2').classList.remove('hidden');
            } else {
                infoEffect.querySelector('.effect-2').classList.add('hidden');
                infoEffect.querySelector('.divider-2').classList.add('hidden');
            }
            if (ability.eff31) {
                let effect3 = getEffectText(ability, 3);
                infoEffect.querySelector('.effect-3 .effect b').innerHTML = effect3.effect;
                infoEffect.querySelector('.effect-3 .restrict b').innerHTML = effect3.restrict;
                infoEffect.querySelector('.effect-3 .acc b').innerHTML = effect3.accuracy;
                let damageProfile = '';
                if (effect3.damage.length > 0) {
                    effect3.damage.forEach((dmg, i) => {
                        if (i > 0) damageProfile += ' &#8226 ';
                        damageProfile += '<img src="' + dmg.icon + '">' + dmg.name;
                    });
                } else damageProfile = '—';
                infoEffect.querySelector('.effect-3 .profile b').innerHTML = damageProfile;
                infoEffect.querySelector('.effect-3').classList.remove('hidden');
                infoEffect.querySelector('.divider-3').classList.remove('hidden');
            } else {
                infoEffect.querySelector('.effect-3').classList.add('hidden');
                infoEffect.querySelector('.divider-3').classList.add('hidden');
            }
            if (ability.obsdmg > 0) {
                infoEffect.querySelector('.effect-obstacle b').innerHTML = ability.obsdmg;
                infoEffect.querySelector('.effect-obstacle').classList.remove('hidden');
            } else infoEffect.querySelector('.effect-obstacle').classList.add('hidden');
            infoEffect.classList.remove('hidden');
        } else {
            infoEffect.classList.add('hidden');
        }

        if ( (item.id < 42 || item.id > 70 && item.id < 220) && ![121,126,129,151,161].includes(item.id) ) {
            infoPassive.querySelector('ul').innerHTML = '';
            let passiveText;
            let varText = skillPassives['var-' + item.typvar];
            let groupText = skillPassives['group-' + item.group];
            if ( varText ) {
                passiveText = varText.text;
                for (let i = 1; i <= 10; i++) {
                    let regex = new RegExp('\\[insert' + i, 'gm');
                    if ( (varText.text.match(regex) || []).length === 0 )
                        break;
                    passiveText = passiveText.replaceAll('[insert' + i + ']', skillPassives[item.id]['insert' + i]);
                }
            } else if ( groupText ) {
                passiveText = groupText.text;
                for (let i = 1; i <= 10; i++) {
                    let regex = new RegExp('\\[insert' + i, 'gm');
                    if ( (groupText.text.match(regex) || []).length === 0 )
                        break;
                    passiveText = passiveText.replaceAll('[insert' + i + ']', skillPassives[item.id]['insert' + i]);
                }
            } else {
                passiveText = skillPassives[item.id].text;
            }
            if ( passiveText ) {
                let passives = passiveText.split(' | ');
                passives.forEach((pass) => {
                    infoPassive.querySelector('ul').innerHTML += '<li>' + pass + '</li>';
                });
                infoPassive.classList.remove('hidden');
            }
        } else infoPassive.classList.add('hidden');

        if ( [196,197].includes(item.id) ) {
            let itemList = sundries.filter((rows) => rows['alch'] === ( item.id === 196 ? 1 : 2 ));
            infoItems.innerHTML = '';
            itemList.forEach((el) => {
                infoItems.innerHTML += '<li>' + el.name + '<b>' + el.price + ' <small>G</small></b></li>';
            });
            infoItems.closest('.items').classList.remove('hidden');
        } else infoItems.closest('.items').classList.add('hidden');

        if (item.typ === 3) {
            let spellList = abilities.filter((rows) => rows['typ'] === item.abilitygrp);
            if (spellList.length > 0) {
                infoSpells.innerHTML = '';
                spellList.forEach((el) => {
                    let spellEntry = magic.find((row) => row['id'] === el.id);
                    let spellLevel = spellEntry.sset0;
                    if (spellLevel === 255) {
                        for (let i = 1; i < 64; i++) {
                            if (spellEntry['sset' + i] !== 255) {
                                spellLevel = spellEntry['sset' + i];
                                break;
                            }
                        }
                    }
                    let spellName = el.name;
                    if (el.unique)
                        spellName = '<span class="bold orange">' + el.name + '</span>';
                    if (el.npconly)
                        spellName = '<span class="bold red">' + el.name + '</span>';
                    infoSpells.innerHTML += '<li>' + spellName + '<b><small>Def. Lv.&nbsp</small>' + spellLevel + '</b></li>';
                });
                infoSpells.closest('.spells').classList.remove('hidden');
            }
        } else infoSpells.closest('.spells').classList.add('hidden');

        let inSkillsets = [];
        for (let i = 1; i < 64; i++) {
            if (item['ss' + i] !== 255) {
                inSkillsets.push(i);
            }
        }
        let infoClasses = jobs.filter((rows) => inSkillsets.includes(rows['sklset']));
        let classCount = infoClasses.length;
        if ( classCount > 0 && item.learnable ) {
            infoClass.innerHTML = '';
            infoClasses.forEach((el) => {
                let skillLevel = item['ss' + el.sklset];
                infoClass.innerHTML += '<li><span' + ((el.typ === 'U' || el.typ === 'S') ? ' class="bold orange"' : '') + '>' + el.name + ( el.id === 40 && item['ss' + el.sklset] === 0 ? '  (Berda/Obda)' : '') +
                    '</span><b>' + ( skillLevel > 0 ? '<small>Lv.&nbsp</small>' + skillLevel : '<span class="blue">&#9711;</span>' ) + '</b></li>';
            });
            infoClass.closest('.class').classList.remove('hidden');
        } else {
            infoClass.innerHTML = '<li>Special</li>';
            infoClass.closest('.class').classList.remove('hidden');
        }

        let infoUsablesWeapon = weapons.filter((rows) => rows['passeff'] === item.id);
        let infoUsablesArmor = armor.filter((rows) => rows['passeff'] === item.id);
        let infoUsablesSet = [];
        let set = itemSets.find((row) => row['passive'] === item.id || row['active'] === item.id);
        if (set)
            infoUsablesSet.push(set);
        if (infoUsablesWeapon.length || infoUsablesArmor.length || infoUsablesSet.length) {
            infoGear.classList.add('hidden');
            infoSet.classList.add('hidden');
            sidePanel.querySelectorAll('.usable .ov-accordion ul').forEach(e => e.innerHTML = '');
            if (infoUsablesWeapon.length > 0) {
                infoGear.innerHTML = '<b>Equipment</b>';
                infoUsablesWeapon.forEach((wpn) => {
                    let gear = document.createElement('li');
                    gear.innerHTML = '<img src="' + (wpn.hnd === 1 ? itemTypes[wpn.typ].icon2 : itemTypes[wpn.typ].icon1) + '">';
                    gear.innerHTML += '<span>' + wpn.name + '</span>';
                    infoGear.appendChild(gear);
                });
                infoGear.classList.remove('hidden');
            }
            if (infoUsablesArmor.length > 0) {
                if (infoGear.innerText.indexOf('Equipment') < 0)
                    infoGear.innerHTML = '<b>Equipment</b>';
                infoUsablesArmor.forEach((arm) => {
                    let gear = document.createElement('li');
                    gear.innerHTML = '<img src="' + (arm.var ? itemTypes[arm.typ]['icon' + arm.var] : itemTypes[arm.typ]['icon']) + '">';
                    gear.innerHTML += '<span>' + arm.name + '</span>';
                    infoGear.appendChild(gear);
                });
                infoGear.classList.remove('hidden');
            }
            if (infoUsablesSet.length) {
                infoSet.innerHTML = '<b>Equipment Sets</b>';
                infoUsablesSet.forEach((set) => {
                    let setEl = document.createElement('li');
                    setEl.innerHTML = '<span class="green"><b>' + set.name + '</b></span>';
                    infoSet.appendChild(setEl);
                });
                infoSet.classList.remove('hidden');
            }
            infoUsable.classList.remove('hidden');
        } else infoUsable.classList.add('hidden');

        let noteText;
        if ( item.group || item.typvar ) {
            if ( item.typvar )
                noteText = items.find((row) => row['typvar'] === item.typvar).notes;
            else
                noteText = items.find((row) => row['group'] === item.group).notes;
        }
        if ( !noteText && item.notes )
            noteText = item.notes;
        if ( noteText ) {
            infoNotes.querySelector('b').textContent = noteText;
            infoNotes.classList.remove('hidden');
        } else infoNotes.classList.add('hidden');

        activateTooltips();

        swapEffectRemove( sidePanel, panelContent );

        openPanel(sidePanel);
    }

    async function loadTables() {

        fetchJSON(jobsJson).then(
            data => jobs = data
        );
        fetchJSON(magicJson).then(
            data => magic = data
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
        fetchJSON(obtainsJson).then(
            data => obtains = data
        );
    }
});