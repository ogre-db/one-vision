
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/abilities.json',
        jobsJson = 'data/jobs.json',
        skillsJson = 'data/skills.json',
        magicJson = 'data/magic.json',
        obtainsJson = 'data/obtains.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json';
    let items = [],
        jobs = [],
        skills = [],
        magic = [],
        obtains = [],
        weapons = [],
        armor = [],
        sundries = [];

    let categoryName,
        trap;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoCost = sidePanel.querySelector('.stats-top li.cost b'),
        infoRtCost = sidePanel.querySelector('.stats-top li.rtcost b'),
        infoReagent = sidePanel.querySelector('.stats-top li.reagent b'),
        infoTrajectory = sidePanel.querySelector('.stats-top li.trajectory b'),
        infoRange = sidePanel.querySelector('.stats-top li.range b'),
        infoArea = sidePanel.querySelector('.stats-top li.area b'),
        infoHits = sidePanel.querySelector('.stats-top li.hits b'),
        infoEffect = sidePanel.querySelector('.stats-effect'),
        infoArcana = sidePanel.querySelector('.arcana'),
        infoConsumable = sidePanel.querySelector('.consumable'),
        infoSkills = sidePanel.querySelector('.skills'),
        infoObtain = sidePanel.querySelector('.obtain'),
        infoGet = sidePanel.querySelector('.obtain .get'),
        infoBuy = sidePanel.querySelector('.obtain .buy'),
        infoDrop = sidePanel.querySelector('.obtain .drop'),
        infoSteal = sidePanel.querySelector('.obtain .steal'),
        infoCraft = sidePanel.querySelector('.obtain .craft'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoUsable = sidePanel.querySelector('.usable'),
        infoGear = sidePanel.querySelector('.usable .gear'),
        infoItem = sidePanel.querySelector('.usable .item'),
        infoSkill = sidePanel.querySelector('.usable .skill'),
        infoSet = sidePanel.querySelector('.usable .set'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // UIkit.modal(loading).show();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);
        trap = items[480];

        // let total = items.length;
        items.forEach( (element, index) => {
            if ( index === 0 || abilityType[element.typ]['name'] !== categoryName ) {
                categoryName = abilityType[element.typ]['name'];
                let tr = document.createElement('tr');
                    tr.className = 'separator';
                    let category = document.createElement('td');
                        category.textContent = abilityType[element.typ]['name'];
                        category.colSpan = document.querySelectorAll('#itemList th').length;
                    tr.appendChild(category);
                itemList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                let classImg = document.createElement('img');
                classImg.src = abilityType[element.typ]['icon'];
                if ( element.unique === 1 ) classImg.classList.add('uni');
                if ( element.npconly ) {
                    classImg.classList.remove('uni');
                    classImg.classList.add('ban');
                }
                if ( element.typvar )
                    classImg.src = abilityType[element.typ + element.typvar].icon;
                type.appendChild(classImg);
                let name = document.createElement('td');
                name.textContent = element.name;
                let cost = document.createElement('td');
                let costText = '';
                if ( element.rescost > 0 || element.typ === 17 )  {
                    let rescost = element.rescost;
                    let res = element.res;
                    if ( element.typ === 17 ) {
                        rescost = trap.rescost;
                        res = trap.res;
                    }
                    switch (res) {
                        case 1:
                            costText = rescost + ' <b class="blue">HP</b>';
                            break;
                        case 2:
                            costText = rescost + ' <b class="pink">MP</b>';
                            break;
                        case 3:
                            costText = rescost + ' <b class="orange">TP</b>';
                            break;
                        case 4:
                            costText = rescost + '+ <b class="orange">TP</b>';
                    }
                }
                cost.innerHTML = costText;
                let rtcost = document.createElement('td');
                if ( element.typ !== 17 )
                    rtcost.textContent = element.rtcost;
                else
                    rtcost.textContent = trap.rtcost;
                let profile = document.createElement('td');
                let damageProfile = getEffectText(element, 1).damage;
                if ((damageProfile.length === 0 || element.eff1self) && element.eff21)
                    damageProfile = getEffectText(element, 2).damage;
                if ((damageProfile.length === 0 || element.eff2self) && element.eff31)
                    damageProfile = getEffectText(element, 3).damage;
                if (damageProfile.length > 0) {
                    damageProfile.forEach( (dmg) => {
                        profile.innerHTML += '<img src="' + dmg.icon + '">';
                    });
                }
                let range = document.createElement('td');
                if (element.maxr) {
                    if (element.minr === element.maxr)
                        range.innerText = element.maxr;
                    else
                        range.innerText = element.minr + ' - ' + element.maxr;
                } else
                    range.innerText = '—';
                let area = document.createElement('td');
                if (element.aoe)
                    area.innerText = element.aoe;
                else
                    area.innerText = '—';

            tr.append(type, name, cost, rtcost, profile, range, area);
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

        swapEffectStart( sidePanel, panelContent );

        let targetRow = event.target.closest('tr');
        let item = items[targetRow.id];

        let selectedRow = itemList.querySelector('tr.selected');
        if (selectedRow) selectedRow.classList.remove('selected');
        targetRow.classList.add('selected');
        if ( item.npconly ) {
            sidePanel.classList.remove('uni');
            sidePanel.classList.add('ban');
        } else {
            sidePanel.classList.remove('ban');
        }
        infoTitle.textContent = item.name;
        let typeIcon = abilityType[item.typ].icon;
        let abilityGroup = abilityType[item.typ].name;
        if ( item.typvar ) {
            typeIcon = abilityType[item.typ + item.typvar].icon;
            abilityGroup = abilityType[item.typ + item.typvar].name;
        }
        infoType.textContent = abilityGroup;
        infoTypeIcon.src = typeIcon;
        if ( item.unique ) {
            sidePanel.classList.add('uni');
            infoTypeIcon.classList.add('uni');
        } else {
            sidePanel.classList.remove('uni');
            infoTypeIcon.classList.remove('uni');
        }
        if ( item.npconly ) {
            sidePanel.classList.remove('uni');
            sidePanel.classList.add('ban');
            infoTypeIcon.classList.remove('uni');
            infoTypeIcon.classList.add('ban');
        } else {
            sidePanel.classList.remove('ban');
            infoTypeIcon.classList.remove('ban');
        }
        let cost = '—';
        if ( item.rescost > 0 || item.typ === 17 )  {
            let rescost = item.rescost;
            let res = item.res;
            if ( item.typ === 17 ) {
                rescost = trap.rescost;
                res = trap.res;
            }
            cost = rescost;
            switch (res) {
                case 1:
                    cost += '<b class="blue">HP</b>';
                    break;
                case 2:
                    cost += '<b class="pink">MP</b>';
                    break;
                case 3:
                    cost += '<b class="orange">TP</b>';
                    break;
                case 4:
                    cost += '+<b class="orange">TP</b>';
            }
        }
        infoCost.innerHTML = cost;
        if ( item.typ === 17 )
            infoRtCost.innerHTML = trap.rtcost;
        else
            infoRtCost.innerHTML = item.rtcost;
        if ( item.reag )
            infoReagent.innerText = obtains.find((row) => row['id'] === item.reag).name + ' x' + item.reagamt;
        else if ( item.typ === 17 )
            infoReagent.innerText = obtains.find((row) => row['id'] === item.id + 741).name;
        else
            infoReagent.innerText = '—';
        infoTrajectory.innerText = abilityRangeType[item.rntyp].name;
        let range = '';
        if (item.maxr)
            range = item.minr + ' - ' + item.maxr;
        else
            range = '—';
        infoRange.innerText = range;
        if (item.aoe)
            infoArea.innerText = item.aoe;
        else
            infoArea.innerText = '—';

        let hitCount = 0;
        let hitTarget = 0;
        if ( item.eff11 === 1 && !item.eff1self ) {
            hitCount++;
            hitTarget = item.eff1trg;
        }
        if ( item.eff21 === 1 && !item.eff2self && ( !hitCount || hitCount && item.eff2trg === hitTarget ) ) {
            hitCount++;
            hitTarget = item.eff2trg;
        }
        if ( item.eff31 === 1 && !item.eff3self && ( !hitCount || hitCount && item.eff3trg === hitTarget ) ) {
            hitCount++;
        }
        if (item.hits)
            infoHits.innerText = '1 - ' + parseInt(item.hits + 1);
        else if (hitCount > 0)
            infoHits.innerText = hitCount;
        else
            infoHits.innerText = '—';

        if (item.eff11) {
            let effect1 = getEffectText(item, 1);
            if (item.name.indexOf('Palace Guide') >= 0)
                infoEffect.querySelector('.effect-1 .effect b').innerText = 'Teleports the party to a different section of the Palace of the Dead';
            else
                infoEffect.querySelector('.effect-1 .effect b').innerText = effect1.effect;
            infoEffect.querySelector('.effect-1 .restrict b').innerText = effect1.restrict;
            infoEffect.querySelector('.effect-1 .acc b').innerText = effect1.accuracy;
            let damageProfile = '';
            if (effect1.damage.length > 0) {
                effect1.damage.forEach( (dmg, i) => {
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
        if (item.eff21) {
            let effect2 = getEffectText(item, 2);
            infoEffect.querySelector('.effect-2 .effect b').innerText = effect2.effect;
            infoEffect.querySelector('.effect-2 .restrict b').innerText = effect2.restrict;
            infoEffect.querySelector('.effect-2 .acc b').innerText = effect2.accuracy;
            let damageProfile = '';
            if (effect2.damage.length > 0) {
                effect2.damage.forEach( (dmg, i) => {
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
        if (item.eff31) {
            let effect3 = getEffectText(item, 3);
            infoEffect.querySelector('.effect-3 .effect b').innerText = effect3.effect;
            infoEffect.querySelector('.effect-3 .restrict b').innerText = effect3.restrict;
            infoEffect.querySelector('.effect-3 .acc b').innerText = effect3.accuracy;
            let damageProfile = '';
            if (effect3.damage.length > 0) {
                effect3.damage.forEach( (dmg, i) => {
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

        let obtain;
        let arcana;
        if (item.typ <= 12) {
            arcana = sundries.find((row) => row['effect'] === item.id && row['typ'] === 34);
            let arcanaEl = document.createElement('li');
            if (arcana) {
                arcanaEl.innerHTML = '<b>' + arcana.name + '</b>';
                obtain = obtains.find((row) => row['id'] === arcana.id).obtained;
            } else {
                arcanaEl.innerHTML = '<b><span class="red">NPC Only</span></b>';
            }
            infoArcana.querySelector('ul').innerHTML = '';
            infoArcana.querySelector('ul').appendChild(arcanaEl);
            infoArcana.classList.remove('hidden');
        } else infoArcana.classList.add('hidden');

        let consumable;
        infoConsumable.classList.add('hidden');
        if (item.typ === 16) {
            consumable = sundries.find((row) => row['effect'] === item.id);
            if (consumable) {
                let consumabEl = document.createElement('li');
                consumabEl.innerHTML = '<b>' + consumable.name + '</b>';
                obtain = obtains.find((row) => row['id'] === consumable.id).obtained;
                infoConsumable.querySelector('ul').innerHTML = '';
                infoConsumable.querySelector('ul').appendChild(consumabEl);
                infoConsumable.classList.remove('hidden');
            }
        }

        let infoUsablesSkill = [];
        if (item.typ === 17)
            infoUsablesSkill.push(skills.find((row) => row['id'] === 327));
        else if ( item.typ >= 22 && item.typ <= 43 )
            infoUsablesSkill.push(skills.find((row) => row['id'] === (item['typ'] < 40 ? item['typ'] - 21 : item['typ'] - 23)));
        else
            infoUsablesSkill = skills.filter((row) => row['ability'] === item.id );
        if ( ([17,18,19].includes(item.typ) || item.typ >= 22 && item.typ <= 43) && infoUsablesSkill.length > 0 ) {
            infoSkills.querySelector('ul').innerHTML = '';
            infoUsablesSkill.forEach( (skl) => {
                let skill = document.createElement('li');
                skill.innerHTML = '<b class="blue">' + skl.name + '</b>';
                if ( item.typ >= 22 && item.typ <= 43 && item.skillrnk <= 8 )
                    skill.innerHTML += '<b> &#8226 <small>rank </small>' + item.skillrnk + '</b>';
                infoSkills.querySelector('ul').appendChild(skill);
            });
            if ( item.npconly ) {
                let skill = document.createElement('li');
                skill.innerHTML = '<b class="red"><small>NPC Only</small></b>';
                infoSkills.querySelector('ul').appendChild(skill);
            }
            infoSkills.classList.remove('hidden');
        } else infoSkills.classList.add('hidden');

        if (obtain) {
            infoGet.classList.add('hidden');
            infoBuy.classList.add('hidden');
            infoDrop.classList.add('hidden');
            infoSteal.classList.add('hidden');
            infoCraft.classList.add('hidden');
            sidePanel.querySelectorAll('.obtain ul:not(.ov-accordion)').forEach(e => e.innerHTML = '');
            let obtainWays = obtain.split(' | ');
            obtainWays.forEach((obt) => {
                if ( obt.indexOf('Obtained ') >= 0 ) {
                    obt = obt.replace('Obtained ','');
                    let locations = obt.split(', ');
                    infoGet.innerHTML = '<b>Received</b>';
                    locations.forEach( (obt) => {
                        let get = document.createElement('li');
                        get.innerText = obt;
                        infoGet.appendChild(get);
                    });
                    infoGet.classList.remove('hidden');
                }
                if (obt.indexOf('Buy in ') >= 0) {
                    obt = obt.replace('Buy in ','');
                    let locations = obt.split(', ');
                    infoBuy.innerHTML = '<b>Buy in</b>';
                    locations.forEach( (obt) => {
                        let buy = document.createElement('li');
                        buy.innerText = obt;
                        infoBuy.appendChild(buy);
                    });
                    infoBuy.classList.remove('hidden');
                }
                if (obt.indexOf('Dropped by ') >= 0) {
                    obt = obt.replace('Dropped by ','');
                    let locations = obt.split(', ');
                    infoDrop.innerHTML = '<b>Dropped by</b>';
                    locations.forEach( (obt) => {
                        let drop = document.createElement('li');
                        drop.innerText = obt;
                        infoDrop.appendChild(drop);
                    });
                    infoDrop.classList.remove('hidden');
                }
                if (obt.indexOf('Stolen from ') >= 0) {
                    obt = obt.replace('Stolen from ','');
                    let locations = obt.split(', ');
                    infoSteal.innerHTML = '<b>Stolen from</b>';
                    locations.forEach( (obt) => {
                        let steal = document.createElement('li');
                        steal.innerText = obt;
                        infoSteal.appendChild(steal);
                    });
                    infoSteal.classList.remove('hidden');
                }
                if (obt.indexOf('Craft with ') >= 0) {
                    obt = obt.replace('Craft with ','');
                    infoCraft.innerHTML = '<b>Craft with <span class="green">' + obt + '</span></b>';
                    let craftable;
                    if (arcana)
                        craftable = arcana;
                    else if (consumable)
                        craftable = consumable;
                    let ingredients = [];
                    let ingNum = 0;
                    for (let i = 1; i <= 4; i++) {
                        if ( craftable['ing' + i] ) {
                            if ( i > 1 && craftable['ing' + (i - 1)] === craftable['ing' + i] ) {
                                ingredients[ingNum - 1]['amt']++;
                            } else {
                                ingredients.push({
                                    'id': craftable['ing' + i],
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
                    infoCraft.classList.remove('hidden');
                }
            });
            infoObtain.classList.remove('hidden');
        } else infoObtain.classList.add('hidden');

        let infoClasses = [];
        let spell;
        if ( item.typ <= 12 ) {
            let inSpellsets = [];
            spell = magic.find((row) => row['id'] === item.id);
            for (let i = 0; i < 64; i++) {
                if (spell['sset' + i] !== 255) inSpellsets.push(i);
            }
            infoClasses = jobs.filter((rows) => (inSpellsets.includes(rows['magset'])));
        } else if (item.typ === 16) {
            let inSkillsets = [];
            if (consumable) {
                let alchSkill = skills.find((row) => row['id'] === (consumable.alch === 1 ? 196 : 197));
                for (let i = 0; i < 64; i++) {
                    if ( consumable.alch === 0 )
                        inSkillsets.push(i);
                    else if ( consumable.alch <= 2 )
                        if (alchSkill['ss' + i] !== 255) inSkillsets.push(i);
                }
                infoClasses = jobs.filter((rows) => (inSkillsets.includes(rows['sklset']) && (rows['id'] < 27 || rows['id'] > 42 || [37,38,39].includes(rows['id']))));
            }
        } else if ( [17,18,19].includes(item.typ) || (item.typ >= 22 && item.typ <= 43) ) {
            if ( !item.class ) {
                let inSkillsets = [];
                if ( infoUsablesSkill.length > 0 ) {
                    infoUsablesSkill.forEach((skl) => {
                        for (let i = 0; i < 64; i++) {
                            if (skl['ss' + i] !== 255) inSkillsets.push(i);
                        }
                    });
                    infoClasses = jobs.filter((rows) => (inSkillsets.includes(rows['sklset'])));
                }
            } else {
                infoClasses = jobs.filter((rows) => (rows['id'] === item.class ));
                if ( infoClasses.length === 0 )
                    infoClasses.push(npcClasses[item.class]);
            }
        }
        let classCount = infoClasses.length;
        if ( classCount > 0 && classCount < jobs.length) {
            infoClass.innerHTML = '';
            infoClasses.forEach( (el, i) => {
                if (item.typ <= 12) {
                    infoClass.closest('.class').classList.add('magic');
                    let spellLevel = spell['sset' + el.magset];
                    infoClass.innerHTML += '<li><span' + ((el.typ === 'U' || el.typ === 'S') ? ' class="bold orange"' : '') + '>' + el.name + '</span><b><small>Lv.&nbsp</small>' + spellLevel + '</b></li>';
                } else {
                    infoClass.closest('.class').classList.remove('magic');
                    if ( el.id === 40 && infoUsablesSkill[0]['ss' + el.sklset] === 0 )
                        infoClass.innerHTML += '<li>' + ((el.typ === 'U' || el.typ === 'S') ? '<b class="orange">' + el.name + '</b>' : el.name) + '  (Berda/Obda)</li>';
                    else
                        infoClass.innerHTML += '<li>' + ((el.typ === 'U' || el.typ === 'S') ? '<b class="orange">' + el.name + '</b>' : el.name) + '</li>';
                    if ( infoClasses[i + 1] && infoClasses[i + 1].typ !== infoClasses[i].typ )
                        infoClass.innerHTML += '<li class="spacer"></li>';
                }
            });
            infoClass.closest('.class').classList.remove('hidden');
        } else if ( [17,18,19].includes(item.typ) && item.npconly ) {
            infoClass.innerHTML = '<li>Special</li>';
            infoClass.closest('.class').classList.remove('hidden');
        } else infoClass.closest('.class').classList.add('hidden');

        let infoUsablesWeapon = weapons.filter((rows) => (rows['ablty'] === item.id ));
        let infoUsablesArmor = armor.filter((rows) => (rows['ablty'] === item.id ));
        let infoUsablesItem = [];
        if ( item.typ !== 16 )
            infoUsablesItem = sundries.filter((rows) => (rows['effect'] === item.id && rows['typ'] !== 34 ));
        let infoUsablesSet = [];
        infoUsablesSkill.forEach((skl) => {
            let set = itemSets.find((row) => row['active'] === skl.id);
            if (set)
                infoUsablesSet.push(set);
        });

        if ( infoUsablesWeapon.length || infoUsablesArmor.length || infoUsablesItem.length || infoUsablesSet.length
                || (![17,18,19].includes(item.typ) && (item.typ < 22 && item.typ > 43) && infoUsablesSkill.length ) ) {
            infoGear.classList.add('hidden');
            infoItem.classList.add('hidden');
            infoSkill.classList.add('hidden');
            infoSet.classList.add('hidden');
            sidePanel.querySelectorAll('.usable .ov-accordion ul').forEach(e => e.innerHTML = '');
            if ( infoUsablesWeapon.length > 0 ) {
                infoGear.innerHTML = '<b>Equipment</b>';
                infoUsablesWeapon.forEach((wpn) => {
                    let gear = document.createElement('li');
                    gear.innerHTML = '<img src="' + (wpn.hnd === 1 ? types[wpn.typ].icon2 : types[wpn.typ].icon1) + '">';
                    gear.innerHTML += '<span>' + wpn.name + '</span><b>' + wpn.abltyuse + ' <small>use' + (wpn.abltyuse > 1 ? 's' : '') + '</small></b>';
                    infoGear.appendChild(gear);
                });
                infoGear.classList.remove('hidden');
            }
            if ( infoUsablesArmor.length > 0 ) {
                if (infoGear.innerText.indexOf('Equipment') < 0)
                    infoGear.innerHTML = '<b>Equipment</b>';
                infoUsablesArmor.forEach((arm) => {
                    let gear = document.createElement('li');
                    gear.innerHTML = '<img src="' + (arm.var ? types[arm.typ]['icon' + arm.var] : types[arm.typ]['icon']) + '">';
                    gear.innerHTML += '<span>' + arm.name + '</span><b>' + arm.abltyuse + ' <small>use' + (arm.abltyuse > 1 ? 's' : '') + '</small></b>';
                    infoGear.appendChild(gear);
                });
                infoGear.classList.remove('hidden');
            }
            if ( infoUsablesItem.length > 0 ) {
                infoItem.innerHTML = '<b>Consumables</b>';
                infoUsablesItem.forEach((sund) => {
                    let sundry = document.createElement('li');
                    sundry.innerHTML = '<span>' + sund.name + '</span><b>' + sund.price + ' <small>G</small></b>';
                    infoItem.appendChild(sundry);
                });
                infoItem.classList.remove('hidden');
            }
            if ( ![17,18,19].includes(item.typ) && (item.typ < 22 && item.typ > 43) && infoUsablesSkill.length ) {
                infoSkill.innerHTML = '<b>Skills</b>';
                infoUsablesSkill.forEach((skl) => {
                    let skill = document.createElement('li');
                    skill.innerText = skl.name;
                    infoSkill.appendChild(skill);
                });
                infoSkill.classList.remove('hidden');
            }
            if ( infoUsablesSet.length ) {
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

        if (item.notes) {
            infoNotes.querySelector('b').textContent = item.notes;
            infoNotes.classList.remove('hidden');
        } else infoNotes.classList.add('hidden');

        swapEffectRemove( sidePanel, panelContent );

        openPanel(sidePanel);
    }

    async function loadTables() {

        fetchJSON(jobsJson).then(
            data => jobs = data
        );
        fetchJSON(skillsJson).then(
            data => skills = data
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