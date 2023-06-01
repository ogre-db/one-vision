
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/sundries.json',
        abilitiesJson = 'data/abilities.json',
        jobsJson = 'data/jobs.json',
        templatesJson = 'data/templates.json',
        skillsJson = 'data/skills.json',
        magicJson = 'data/magic.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        obtainsJson = 'data/obtains.json';
    let items = [],
        abilities = [],
        jobs = [],
        templates = [],
        skills = [],
        magic = [],
        weapons = [],
        armor = [],
        obtains = [];

    let categoryName;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoPrice = sidePanel.querySelector('.stats-top li.price b'),
        infoFalch = sidePanel.querySelector('.stats-top li.falch b'),
        infoReagent = sidePanel.querySelector('.stats-reagent'),
        infoClassmark = sidePanel.querySelector('.stats-classmark'),
        infoYield = sidePanel.querySelector('.stats-crafting'),
        infoIngredient = sidePanel.querySelector('.stats-ingredient'),
        infoEffect = sidePanel.querySelector('.stats-effect'),
        infoObtain = sidePanel.querySelector('.obtain'),
        infoGet = sidePanel.querySelector('.obtain .get'),
        infoBuy = sidePanel.querySelector('.obtain .buy'),
        infoDrop = sidePanel.querySelector('.obtain .drop'),
        infoSteal = sidePanel.querySelector('.obtain .steal'),
        infoCraft = sidePanel.querySelector('.obtain .craft'),
        infoAuction = sidePanel.querySelector('.obtain .auction'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // showProgress();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);
        abilities = await fetchJSON(abilitiesJson);
        jobs = await fetchJSON(jobsJson);
        let job;

        // let total = items.length;

        items.forEach( (element, index) => {
            if ( index === 0 || types[element.typ]['name'] !== categoryName ) {
                categoryName = types[element.typ]['name'];
                let tr = document.createElement('tr');
                    tr.className = 'separator';
                    let category = document.createElement('td');
                        category.textContent = types[element.typ]['name'];
                        category.colSpan = document.querySelectorAll('#itemList th').length;
                    tr.appendChild(category);
                itemList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                    let classImg = document.createElement('img');
                        classImg.src = types[element.typ]['icon'];
                        if ( element.unique === 1 ) classImg.classList.add('uni');
                        if ( element.typ === 35 ) {
                            job = jobs.find((row) => row['mark'] === element.id);
                            if ( element.price === 50 )
                                classImg.classList.add('mark-basic');
                            else if ( element.price === 100 ) {
                                if (job.mark >= 1424 && job.mark <= 1431)
                                    classImg.classList.add('mark-advanced');
                                else if (job.mark >= 1437 && job.mark <= 1444)
                                    classImg.classList.add('mark-monster');
                                else
                                    classImg.classList.add('mark-demi');
                            }
                            else
                                classImg.classList.add('mark-special');
                        }
                    type.appendChild(classImg);
                let name = document.createElement('td');
                    name.textContent = element.name;
                let effect = document.createElement('td');
                    if ( element.effect ) {
                        let ability = abilities.find((row) => row['id'] === element.effect);
                        if ( element.typ === 34 ) {
                            let schoolImg = document.createElement('img');
                                schoolImg.src = abilityType[ability.typ]['icon'];
                            let bold = document.createElement('b');
                                bold.textContent = ability.name;
                            let span = document.createElement('span');
                                span.textContent = 'Teaches ';
                                span.appendChild(bold);
                            effect.appendChild(schoolImg);
                            effect.appendChild(span);
                        } else {
                            effect.textContent = ability.name;
                        }
                    } else {
                        if ( element.typ === 35 ) {
                            effect.textContent = 'Mark of ';
                            let bold = document.createElement('b');
                                bold.textContent = job.name;
                            effect.appendChild(bold);
                        } else {
                            effect.textContent = '';
                        }
                    }
                let falch = document.createElement('td');
                    if (element.alch > 0 && element.alch < 3) {
                        if (element.alch === 1)
                            falch.textContent = 'I';
                        else
                            falch.textContent = 'II';
                        falch.classList.add('bold');
                    } else if ( element.typ === 32 && element.effect ) {
                        falch.textContent = '—';
                    } else {
                        falch.textContent = '';
                    }
                let price = document.createElement('td');
                    price.textContent = element.price;
                tr.append(type, name, effect, falch, price);
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
        let job;

        let selectedRow = itemList.querySelector('tr.selected');
        if (selectedRow) selectedRow.classList.remove('selected');
        targetRow.classList.add('selected');

        item.unique === 1 ? sidePanel.classList.add('uni') : sidePanel.classList.remove('uni');
        infoTitle.textContent = item.name;
        infoType.textContent = types[item.typ]['name'];
        infoTypeIcon.src = item.var ? types[item.typ]['icon' + item.var] : types[item.typ]['icon'];
        if ( item.typ === 35 ) {
            infoTypeIcon.classList.value = '';
            let job = jobs.find((row) => row['mark'] === item.id);
            if ( item.price === 50 ) {
                infoTypeIcon.classList.add('mark-basic');
                infoType.textContent = 'Basic Classmarks';
            }
            else if ( item.price === 100 ) {
                if (job.mark >= 1424 && job.mark <= 1431) {
                    infoTypeIcon.classList.add('mark-advanced');
                    infoType.textContent = 'Advanced Classmarks';
                }
                else if (job.mark >= 1437 && job.mark <= 1444) {
                    infoTypeIcon.classList.add('mark-monster');
                    infoType.textContent = 'Monster Classmarks';
                }
                else {
                    infoTypeIcon.classList.add('mark-demi');
                    infoType.textContent = 'Demihuman Classmarks';
                }
            }
            else {
                infoTypeIcon.classList.add('mark-special');
                infoType.textContent = 'Special Classmarks';
            }
        } else {
            infoTypeIcon.classList.value = '';
        }
        if (item.unique === 1) infoTypeIcon.classList.add('uni'); else infoTypeIcon.classList.remove('uni');
        infoPrice.innerHTML = item.price + ' <small>Goth</small>';
        if (item.typ === 32 && item.effect) {
            infoFalch.parentNode.classList.remove('hidden');
            if (item.alch === 2)
                infoFalch.innerHTML = 'Field Alchemy II';
            else if (item.alch === 1)
                infoFalch.innerHTML = 'Field Alchemy I';
            else
                infoFalch.innerHTML = '—';
        } else
            infoFalch.parentNode.classList.add('hidden');

        let reagentFor = abilities.filter((rows) => (rows['reag'] === item.id));
        if (reagentFor.length > 0) {
            let reagentAbilities = infoReagent.querySelector('.usedfor b');
            reagentAbilities.innerHTML = '';
            reagentFor.forEach( (el, index) => {
                if (index > 0)
                    reagentAbilities.innerHTML = '<br>';
                reagentAbilities.innerHTML += el.name + '<br>' + '<b>Needs: <b>' + el.reagamt + '</b></b>';
            });
            infoReagent.classList.remove('hidden');
        } else
            infoReagent.classList.add('hidden');

        if (item.typ === 35) {
            job = jobs.find((row) => row['mark'] === item.id);
            infoClassmark.querySelector('.classchange b').innerHTML = job.name;
            infoClassmark.classList.remove('hidden');
        } else
            infoClassmark.classList.add('hidden');

        if (item.typ === 37) {
            let yieldList = infoYield.querySelector('.craftyield ul');
            yieldList.innerHTML = '';
            let craftedItems = [];
            craftedItems = craftedItems.concat(weapons.filter((rows) => rows['craftbk'] === item.id));
            craftedItems = craftedItems.concat(armor.filter((rows) => rows['craftbk'] === item.id));
            craftedItems = craftedItems.concat(items.filter((rows) => rows['craftbk'] === item.id));
            craftedItems.forEach( (el) => {
                yieldList.innerHTML += '<li>' + el.name + '</li>';
            });
            infoYield.classList.remove('hidden');
        } else
            infoYield.classList.add('hidden');

        if (item.typ === 36) {
            let yieldList = infoIngredient.querySelector('.ingredientyield ul');
            yieldList.innerHTML = '';
            let craftedItems = [];
            craftedItems = craftedItems.concat(weapons.filter((rows) => [rows['ing1'],rows['ing2'],rows['ing3'],rows['ing4']].includes(item.id)));
            craftedItems = craftedItems.concat(armor.filter((rows) => [rows['ing1'],rows['ing2'],rows['ing3'],rows['ing4']].includes(item.id)));
            craftedItems = craftedItems.concat(items.filter((rows) => [rows['ing1'],rows['ing2'],rows['ing3'],rows['ing4']].includes(item.id)));
            craftedItems.forEach( (el) => {
                let ingNum = 0;
                for (let i = 1; i <= 4; i++) {
                    if ( el['ing' + i] === item.id ) {
                        ingNum++;
                    }
                }
                yieldList.innerHTML += '<li><span>' + el.name + '</span><b>x' + ingNum + '</b></li>';
            });
            infoIngredient.classList.remove('hidden');
        } else
            infoIngredient.classList.add('hidden');

        let ability;
        if ( item.effect ) {
            ability = abilities.find((row) => row['id'] === item.effect);
            infoEffect.querySelector('.name b').innerText = ability.name;
            let typeIcon = abilityType[ability.typ].icon;
            let abilityGroup = abilityType[ability.typ].name;
            if ( ability.typvar ) {
                typeIcon = abilityType[ability.typ + ability.typvar].icon;
                abilityGroup = abilityType[ability.typ + ability.typvar].name;
            }
            infoEffect.querySelector('.type img').src = typeIcon;
            infoEffect.querySelector('.type b').innerText = abilityGroup;
            let cost = '—';
            if ( ability.rescost > 0 && item.typ !== 32 ) {
                cost = ability.rescost;
                if ( ability.res === 1 )
                    cost += '<b class="blue">HP</b>';
                else if ( ability.res === 2 )
                    cost += '<b class="pink">MP</b>';
                else if ( ability.res === 3 )
                    cost += '<b class="orange">TP</b>';
                else if ( ability.res === 4 )
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

            let hitCount = 0;
            let hitTarget = 0;
            if ( ability.eff11 === 1 && !ability.eff1self ) {
                hitCount++;
                hitTarget = ability.eff1trg;
            }
            if ( ability.eff21 === 1 && !ability.eff2self && ( !hitCount || hitCount && ability.eff2trg === hitTarget ) ) {
                hitCount++;
                hitTarget = ability.eff2trg;
            }
            if ( ability.eff31 === 1 && !ability.eff3self && ( !hitCount || hitCount && ability.eff3trg === hitTarget ) ) {
                hitCount++;
            }
            if (ability.hits)
                infoEffect.querySelector('.hits b').innerText = '1 - ' + parseInt(ability.hits + 1);
            else if (hitCount > 0)
                infoEffect.querySelector('.hits b').innerText = hitCount;
            else
                infoEffect.querySelector('.hits b').innerText = '—';

            if (ability.eff11) {
                let effect1 = getEffectText(ability, 1);
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
            if (ability.eff21) {
                let effect2 = getEffectText(ability, 2);
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
            if (ability.eff31) {
                let effect3 = getEffectText(ability, 3);
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
            if (ability.obsdmg > 0) {
                infoEffect.querySelector('.effect-obstacle b').innerHTML = ability.obsdmg;
                infoEffect.querySelector('.effect-obstacle').classList.remove('hidden');
            } else infoEffect.querySelector('.effect-obstacle').classList.add('hidden');

            infoEffect.classList.remove('hidden');
        } else {
            infoEffect.classList.add('hidden');
        }

        let obtain = obtains.find((row) => row['id'] === item.id).obtained;
        if (obtain) {
            infoGet.classList.add('hidden');
            infoBuy.classList.add('hidden');
            infoDrop.classList.add('hidden');
            infoSteal.classList.add('hidden');
            infoCraft.classList.add('hidden');
            infoAuction.classList.add('hidden');
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
                    let ingredients = [];
                    let ingNum = 0;
                    for (let i = 1; i <= 4; i++) {
                        if ( item['ing' + i] ) {
                            if ( i > 1 && item['ing' + (i - 1)] === item['ing' + i] ) {
                                ingredients[ingNum - 1]['amt']++;
                            } else {
                                ingredients.push({
                                    'id': item['ing' + i],
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
                if (obt.indexOf('Auctioned from ') >= 0) {
                    obt = obt.replace('Auctioned from ','');
                    let locations = obt.split(', ');
                    infoAuction.innerHTML = '<b>Auctioned from</b>';
                    locations.forEach( (obt) => {
                        let auction = document.createElement('li');
                        auction.innerText = obt;
                        infoAuction.appendChild(auction);
                    });
                    infoAuction.classList.remove('hidden');
                }
            });
            infoObtain.classList.remove('hidden');
        } else infoObtain.classList.add('hidden');

        if (item.effect || item.typ === 35) {
            let infoClassList = [];
            if (item.typ === 34) {
                let inSpellsets = [];
                let spell = magic.find((row) => row['id'] === ability.id);
                for (let i = 0; i < 64; i++) {
                    if (spell['sset' + i] !== 255) inSpellsets.push(i);
                }
                infoClassList = jobs.filter((rows) => (inSpellsets.includes(rows['magset'])));
            } else if (item.typ === 35) {
                let inJobsets = [];
                for (let i = 0; i < 48; i++) {
                    if (job['ccset' + i] === 1) inJobsets.push(i);
                }
                infoClassList = templates.filter((rows) => (inJobsets.includes(rows['ccset'])));
            } else {
                let inSkillsets = [];
                let alchSkill = skills.find((row) => row['id'] === (item.alch === 1 ? 196 : 197));
                for (let i = 0; i < 64; i++) {
                    if ( item.alch === 0 )
                        inSkillsets.push(i);
                    else if ( item.alch <= 2 )
                        if (alchSkill['ss' + i] !== 255) inSkillsets.push(i);
                }
                infoClassList = jobs.filter((rows) => (inSkillsets.includes(rows['sklset']) && (rows['id'] < 27 || rows['id'] > 42 || [37,38,39].includes(rows['id']))));
            }
            if ( infoClassList.length === 0 )
                infoClass.innerHTML = '<li>None</li>';
            else if ( infoClassList.length < jobs.length ) {
                infoClass.innerHTML = '';
                infoClassList.forEach( (el, i) => {
                    infoClass.innerHTML += '<li>' + ((el.typ === 'U' || el.typ === 'S' || (item.typ === 35 && el.typ === 'D')) ? '<b class="orange">' + el.name + '</b>' : el.name) + '</li>';
                    if ( infoClassList[i + 1] && infoClassList[i + 1].typ !== infoClassList[i].typ )
                        infoClass.innerHTML += '<li class="spacer"></li>';
                });
            } else infoClass.innerHTML = '<li>All</li>';
            infoClass.closest('.class').classList.remove('hidden');
        } else infoClass.closest('.class').classList.add('hidden');

        if (item.notes) {
            infoNotes.querySelector('b').textContent = item.notes;
            infoNotes.classList.remove('hidden');
        } else infoNotes.classList.add('hidden');

        swapEffectRemove( sidePanel, panelContent );

        openPanel(sidePanel);
    }

    async function loadTables() {

        fetchJSON(skillsJson).then(
            data => skills = data
        );
        fetchJSON(templatesJson).then(
            data => templates = data
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
        fetchJSON(obtainsJson).then(
            data => obtains = data
        );
    }
});