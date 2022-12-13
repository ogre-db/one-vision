
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/abilities.json',
        jobsJson = 'data/jobs.json',
        skillsJson = 'data/skills.json',
        obtainsJson = 'data/obtains.json',
        sundriesJson = 'data/sundries.json';
    let items = [],
        jobs = [],
        skills = [],
        obtains = [],
        sundries = [];

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
        infoEffect = sidePanel.querySelector('.stats-effect'),
        infoGet = sidePanel.querySelector('.obtain .get'),
        infoBuy = sidePanel.querySelector('.obtain .buy'),
        infoDrop = sidePanel.querySelector('.obtain .drop'),
        infoSteal = sidePanel.querySelector('.obtain .steal'),
        infoCraft = sidePanel.querySelector('.obtain .craft'),
        infoIngredients = sidePanel.querySelector('.ingredients .accordion-content ul'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // UIkit.modal(loading).show();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);

        // let total = items.length;
        items.forEach( (ability, index) => {
            // if ( index === 0 || types[element.typ]['name'] !== categoryName ) {
            //     categoryName = types[element.typ]['name'];
            //     let tr = document.createElement('tr');
            //         tr.className = 'separator';
            //         let category = document.createElement('td');
            //             category.textContent = types[element.typ]['name'];
            //             category.colSpan = document.querySelectorAll('#itemList th').length;
            //         tr.appendChild(category);
            //     itemList.appendChild(tr);
            // }

            let tr = document.createElement('tr');
            tr.id = index;
            let type = document.createElement('td');

            let name = document.createElement('td');
                name.textContent = ability.name;

            let ef1 = document.createElement('td');
            if (ability.eff11)
                ef1.innerText = getEffectText(ability, 1);
            let ef2 = document.createElement('td');
            if (ability.eff21)
                ef2.innerText = getEffectText(ability, 2);
            let ef3 = document.createElement('td');
            if (ability.eff31)
                ef3.innerText = getEffectText(ability, 3);

            tr.append(type, name, ef1, ef2, ef3);
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

        item.unique === 1 ? sidePanel.classList.add('uni') : sidePanel.classList.remove('uni');
        infoTitle.textContent = item.name;
        infoType.textContent = types[item.typ]['name'];
        infoTypeIcon.src = item.var ? types[item.typ]['icon' + item.var] : types[item.typ]['icon'];
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

        if ( item.effect ) {
            let ability = abilities.find((row) => row['id'] === item.effect);
            infoEffect.querySelector('.name b').innerText = ability.name;
            let typeIcon = abilityType[ability.typ].icon;
            let abilityGroup = abilityType[ability.typ].name;
            if (ability.typ === 12) {
                if ( item.name.indexOf(' Scroll') >= 0 ) {
                    typeIcon = abilityType[ability.typ].iconn;
                    abilityGroup += " - Ninjutsu";
                }
                else if ( item.name.indexOf('Treatise on ') >= 0 ) {
                    typeIcon = abilityType[ability.typ].icond;
                    abilityGroup += " - Dances";
                }
                else if ( item.name.indexOf(' Score') >= 0 ) {
                    typeIcon = abilityType[ability.typ].icons;
                    abilityGroup += " - Songs";
                }
                else if ( item.name.indexOf(' Manual') >= 0 ) {
                    typeIcon = abilityType[ability.typ].iconb;
                    abilityGroup += " - Grenades";
                }
                else if ( item.name.indexOf(' Primer') >= 0 ) {
                    typeIcon = abilityType[ability.typ].icong;
                    abilityGroup += " - Geomancy";
                }
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
            let range = '';
            if (ability.maxr)
                range = ability.minr + ' - ' + ability.maxr;
            else
                range = '—';
            infoEffect.querySelector('.range b').innerText = range;
            if (ability.aoe)
                infoEffect.querySelector('.area b').innerText = ability.aoe;
            else
                infoEffect.querySelector('.area b').innerText = '—';
            if (ability.hits)
                infoEffect.querySelector('.hits b').innerText = '1 - ' + parseInt(ability.hits + 1);
            else
                infoEffect.querySelector('.hits b').innerText = '—';

            if (ability.eff11) {
                let effect = '';
                if (ability.eff11 === 1) {
                    if ( ability.eff1scale >= 21 && ability.eff1scale <= 27 ) {
                        effect += 'Spell ';
                    } else if (ability.eff1scale === 20) {
                        effect += 'Raw ';
                    } else if ( ability.eff1scale >= 31 && ability.eff1scale <= 37 ) {
                        effect += 'Attack';
                    }
                    effect += 'Damage ';
                    if ( ability.eff1scale === 31 || ability.eff1scale === 33 ) {
                        effect += ' STR/DEX';
                    } else if ( ability.eff1scale === 35 || ability.eff1scale === 37 ) {
                        effect += ' DEX/STR';
                    }
                    if ( ability.typ >= 22 && ability.typ <= 43 && ability.eff1form > 1 ) {
                        effect += ' +W.Skill';
                    }
                    if ( ability.eff1scale === 33 || ability.eff1scale === 37 ) {
                        effect += ' +TP';
                    }
                    if ( ability.eff1scale === 20 ) {
                        effect += ' ' + 100 / ability.eff1pow + 'X';
                    }


                }
                infoEffect.querySelector('.effect-1 b').innerText = effect;
                infoEffect.querySelector('.effect-1').classList.remove('hidden');
                infoEffect.querySelector('.divider-1').classList.remove('hidden');
            } else {
                infoEffect.querySelector('.effect-1').classList.add('hidden');
                infoEffect.querySelector('.divider-1').classList.add('hidden');
            }



            // IF(AND(Ability!$C3>=22,Ability!$C3<=43,Ability!AH3>1)," +W.Skill","")&IF(Ability!AI3=37," +TP","")&IF(Ability!AI3=20," "&100/Ability!AJ3&"X",IF(Ability!AH3=0," for the Amount of Main",IF(Ability!AH3=1," for the Amount of Previous",IF(Ability!AH3=10," "&Ability!AJ3&"% Current HP",IF(Ability!AH3=16," MaxHP - CurrentHP",IF(Ability!AJ3>0," +"&IF(Ability!AI3=27,Ability!AJ3+40,Ability!AJ3),"")))))),IF(Ability!AB3=2,IF(Ability!AI3=1,"Spell Heal "&IF(Ability!AJ3>0," +"&Ability!AJ3,""),"Heal"&IF(OR(Ability!AH3=9,Ability!AH3=14)," "&Ability!AJ3&"% Max HP",IF(Ability!AJ3>0," "&Ability!AJ3,IF(OR(Ability!$AB3=1,Ability!$AB3=4,Ability!$AB3=8)," for Damage Inflicted","")))),IF(Ability!AB3=4,IF(Ability!AI3=23,"Spell ","")&"MP Damage"&IF(OR(Ability!AH3=17,Ability!AH3=18)," "&Ability!AJ3&"% Current",IF(Ability!AH3=16," 100% Max",IF(Ability!AI3=23," +"&Ability!AJ3," "&Ability!AJ3))),IF(Ability!AB3=5,"Charge MP"&IF(Ability!AH3=21," "&Ability!AJ3&"% Max",IF(Ability!AH3=1," for the Amount of Previous",IF(OR(Ability!$AB3=1,Ability!$AB3=4,Ability!$AB3=8)," for Damage Inflicted"," "&Ability!AJ3))),IF(Ability!AB3=8,IF(Ability!AI3=23,"Spell ","")&"TP Damage"&IF(Ability!AH3=23," "&Ability!AJ3&"% Current",IF(Ability!AH3=16," 100% Max",IF(Ability!AI3=23," +"&Ability!AJ3,IF(Ability!AH3=5," "&Ability!AJ3&" - "&Ability!AJ3*1.5," "&Ability!AJ3)))),IF(Ability!AB3=9,"Charge TP"&IF(Ability!AH3=10," by "&Ability!AJ3&"% of Current HP",IF(Ability!AH3=23," by "&Ability!AJ3&"% of Current TP",IF(OR(Ability!$AB3=1,Ability!$AB3=4,Ability!$AB3=8)," for Damage Inflicted"," "&Ability!AJ3))),IF(Ability!AB3=12,"Delay RT by "&Ability!AJ3,IF(Ability!AB3=18,INDEX($EH$4:$EH$89,MATCH(Ability!AC3,$EG$4:$EG$89,0))&IF(Ability!AH3=6," for "&Ability!AJ3&" Turns",IF(Ability!AH3=8," for "&Ability!AJ3*10&" RT","")),IF(Ability!AB3=19,"Remove "&INDEX($EH$4:$EH$89,MATCH(Ability!AC3,$EG$4:$EG$89,0)),IF(Ability!AB3=20,INDEX($EJ$112:$EJ$160,MATCH(Ability!AC3,$EI$112:$EI$160,0)),IF(Ability!AB3=65,"Raise "&INDEX($EJ$163:$EJ$170,MATCH(Ability!AC3,$EI$163:$EI$170,0))&" Permanently by "&Ability!AJ3/10&" points",INDEX($EJ$5:$EJ$78,MATCH(Ability!AB3,$EI$5:$EI$78,0))))))))))))),"")

            infoEffect.classList.remove('hidden');
        } else {
            infoEffect.classList.add('hidden');
        }

        infoGet.classList.add('hidden');
        infoBuy.classList.add('hidden');
        infoDrop.classList.add('hidden');
        infoSteal.classList.add('hidden');
        infoCraft.classList.add('hidden');
        infoIngredients.closest('.ingredients').classList.add('hidden');
        sidePanel.querySelectorAll('.obtain ul:not(.ov-accordion) li').forEach(e => e.remove());
        let obtain = obtains.find((row) => row['id'] === item.id).obtained;
        if (obtain !== 0) {
            let obtainWays = obtain.split(' | ');
            obtainWays.forEach((obt) => {
                if ( obt.indexOf('Obtained in ') >= 0 ) {
                    console.log(obt);
                    obt = obt.replace('Obtained in ','');
                    let locations = obt.split(', ');
                    locations.forEach( (obt) => {
                        let get = document.createElement('li');
                            get.innerText = obt;
                        infoGet.querySelector('ul').appendChild(get);
                        infoGet.classList.remove('hidden');
                    });
                } else if (obt.indexOf('Buy in ') >= 0) {
                    obt = obt.replace('Buy in ','');
                    let locations = obt.split(', ');
                    locations.forEach( (obt) => {
                        let buy = document.createElement('li');
                            buy.innerText = obt;
                        infoBuy.querySelector('ul').appendChild(buy);
                        infoBuy.classList.remove('hidden');
                    });
                } else if (obt.indexOf('Dropped by ') >= 0) {
                    obt = obt.replace('Dropped by ','');
                    let locations = obt.split(', ');
                    locations.forEach( (obt) => {
                        let drop = document.createElement('li');
                        drop.innerText = obt;
                        infoDrop.querySelector('ul').appendChild(drop);
                        infoDrop.classList.remove('hidden');
                    });
                } else if (obt.indexOf('Stolen from ') >= 0) {
                    obt = obt.replace('Stolen from ','');
                    let locations = obt.split(', ');
                    locations.forEach( (obt) => {
                        let steal = document.createElement('li');
                        steal.innerText = obt;
                        infoSteal.querySelector('ul').appendChild(steal);
                        infoSteal.classList.remove('hidden');
                    });
                } else if (obt.indexOf('Craft with ') >= 0) {
                    obt = obt.replace('Craft with ','');
                    let locations = obt.split(', ');
                    locations.forEach( (obt) => {
                        let craft = document.createElement('li');
                        craft.innerText = obt;
                        infoCraft.querySelector('ul').appendChild(craft);
                        infoCraft.classList.remove('hidden');
                    });
                }
            });

            if ( item.craftbk ) {
                let ingredients = [];
                let ingNum = 0;
                for (let i = 1; i < 4; i++) {
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
                if ( ingredients ) {
                    infoIngredients.innerHTML = '';
                    ingredients.forEach( (ing) => {
                        let ingredient = obtains.find((row) => row['id'] === ing.id);
                        infoIngredients.innerHTML += '<li><span>' + ingredient.name + '</span><b>x' + ing.amt + '</b></li>';
                    })
                }
                infoIngredients.closest('.ingredients').classList.remove('hidden');
            }
        } else {
            let get = document.createElement('li');
                get.innerText = '???';
            infoGet.querySelector('ul').appendChild(get);
            infoGet.classList.remove('hidden');
        }

        if (item.effect) {
            let inSkillsets = [];
            let alchSkill = skills.find((row) => row['id'] === (item.alch === 1 ? 196 : 197));
            for (let i = 0; i < 64; i++) {
                if ( item.alch === 0 )
                    inSkillsets.push(i);
                else if ( item.alch <= 2 )
                    if (alchSkill['ss' + i] !== 255) inSkillsets.push(i);
            }
            let infoClasses = jobs.filter((rows) => (inSkillsets.includes(rows['sklset']) && (rows['id'] < 27 || rows['id'] > 42 || [37,38,39].includes(rows['id']))));

            let classCount = infoClasses.length;
            if ( classCount === 0 )
                infoClass.innerHTML = '<li>None</li>';
            else if ( classCount < jobs.length ) {
                infoClass.innerHTML = '';
                infoClasses.forEach( (el) => {
                    infoClass.innerHTML += '<li>' + el.name + '</li>';
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

        fetchJSON(jobsJson).then(
            data => jobs = data
        );
        fetchJSON(obtainsJson).then(
            data => obtains = data
        );
        fetchJSON(skillsJson).then(
            data => skills = data
        );
        fetchJSON(sundriesJson).then(
            data => sundries = data
        );
    }
});