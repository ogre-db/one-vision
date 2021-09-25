
document.addEventListener("DOMContentLoaded", function() {

    const weaponsJson = 'data/weapons.json',
        skillsJson = 'data/skills.json',
        abilitiesJson = 'data/abilities.json',
        classesJson = 'data/classes.json',
        shopJson = 'data/shop.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json';
    let weapons = [],
        skills = [],
        abilities = [],
        classes = [],
        shop = [],
        armor = [],
        sundries = [];

    const weaponList = document.getElementById('weaponList'),
        infoModal = document.getElementById('infoModal'),
        infoTitle = infoModal.querySelector('.title h2'),
        infoLevel = infoModal.querySelector('.title .level'),
        infoType = infoModal.querySelector('.title h5 i'),
        infoHands = infoModal.querySelector('.title h5 img'),
        infoScaling = infoModal.querySelector('.stats-top b.scaling'),
        infoAttack = infoModal.querySelector('.stats-top b.attack'),
        infoAccuracy = infoModal.querySelector('.stats-top b.accuracy'),
        infoWeight = infoModal.querySelector('.stats-top b.weight'),
        infoRtCost = infoModal.querySelector('.stats-top b.rtcost'),
        infoRange = infoModal.querySelector('.stats-top b.range'),
        infoDamagePanel = infoModal.querySelector('.damage'),
        infoDamageType = infoModal.querySelector('.damage .damage-type'),
        infoDamageElement = infoModal.querySelector('.damage .damage-element'),
        infoDamageRace = infoModal.querySelector('.damage .damage-race'),
        infoOnhit = infoModal.querySelector('.on-hit .on-hit-eff'),
        statsDefPanel = infoModal.querySelector('.stats-bottom .defense'),
        statsBottom = infoModal.querySelectorAll('.stats-bottom b'),
        infoSkillBon = infoModal.querySelector('.stats-extra .skillbon'),
        infoPassive = infoModal.querySelector('.stats-extra .passive'),
        infoAbility = infoModal.querySelector('.stats-extra .ability'),
        infoSet = infoModal.querySelector('.stats-extra .itemset'),
        infoLocation = infoModal.querySelector('.notes .location'),
        infoNotes = infoModal.querySelector('.notes .note'),
        infoIngredientPanel = infoModal.querySelector('.notes .ingredients'),
        infoIngredients = infoModal.querySelector('.notes .uk-accordion-content ul'),
        infoClass = infoModal.querySelector('.class .uk-accordion-content ul');

    // const progress = document.getElementById('progress');
    // UIkit.modal(loading).show();

    listWeapons();

    loadTables();

    async function listWeapons() {

        weapons = await fetchJSON(weaponsJson);

        // let total = weapons.length;
        let innate;

        weapons.forEach( (element, index) => {

            innate = element.price === 0 ? 100 : 0;

            if ( index === 0 || (element.typ) !== weapons[index - 1].typ ) {
                let tr = document.createElement('tr');
                    tr.className = 'separator';
                    let category = document.createElement('td');
                        category.textContent = types[element.typ + innate]['name'];
                        category.colSpan = document.querySelectorAll('#weaponList th').length;
                    tr.appendChild(category);
                weaponList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                    let classImg = document.createElement('img');
                        classImg.setAttribute('src', ( element.hnd === 1 || (element.typ === 177 && element.wght > 2)) ? types[element.typ + innate]['icon2'] : types[element.typ + innate]['icon1']);
                        if (element.skillbonamt >= 8) classImg.classList.add('uni');
                    type.appendChild(classImg);
                let name = document.createElement('td');
                    name.textContent = element.name;
                let atk = document.createElement('td');
                    atk.textContent = element.atk;
                let dbon = document.createElement('td');
                    element.dmgtamt > 0 ? dbon.textContent = element.dmgtamt + '%' : dbon.textContent = '—';
                let rt = document.createElement('td');
                    rt.textContent = element.rtcost;
                let wt = document.createElement('td');
                    wt.textContent = element.wght;
                let ele = document.createElement('td');
                if (element.ele > 0) {
                    let eleImg = document.createElement('img');
                    eleImg.setAttribute('src', elements[element.ele]['icon1']);
                    ele.appendChild(eleImg);
                }
                let range = document.createElement('td');
                    range.textContent = element.mnr === element.mxr ? element.mnr : (element.mnr + '-' + element.mxr);
                let hands = document.createElement('td');
                    hands.textContent = element.hnd + 1;
                let level = document.createElement('td');
                    level.textContent = element.lvlreq;
                tr.append(type, name, atk, dbon, rt, wt, range, ele, hands, level);
            weaponList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        document.querySelectorAll('#weaponList tr:not(.spacer)').forEach( (element) => {

            element.addEventListener( 'click', function (event) {

                let weapon = weapons[event.target.parentNode.id];
                innate = weapon.price === 0 ? 100 : 0;

                let statList = [
                    weapon.atk,
                    weapon.def,
                    weapon.obstdmg,
                    weapon.hp,
                    weapon.mp,
                    weapon.lck,
                    weapon.str,
                    weapon.vit,
                    weapon.dex,
                    weapon.agi,
                    weapon.avd,
                    weapon.int,
                    weapon.mnd,
                    weapon.res
                ];

                weapon.skillbonamt >= 8 ? infoModal.classList.add('uni') : infoModal.classList.remove('uni');
                infoTitle.textContent = weapon.name;
                infoLevel.textContent = 'Lv ' + weapon.lvlreq;
                infoType.textContent = types[weapon.typ + innate]['name'];
                infoHands.setAttribute('data-src', weapon.hnd === 1 ? 'img/icons/icon-hands2.png' : 'img/icons/icon-hands1.png');
                infoScaling.innerHTML = scalingFormula[weapon.frm]['name'];
                infoAttack.textContent = attackType[ weapon.rntyp + (weapon.proj === 1 ? 10 : 0) + weapon.arc ]['name'];
                infoAccuracy.textContent = accuracyFormula[ weapon.acc ]['name'];
                infoWeight.textContent = weapon.wght > 120 ? weapon.wght - 256 : ( weapon.wght > 0 ? weapon.wght : '—' );
                weapon.wght > 120 ? infoWeight.classList.add('neg') : infoWeight.classList.remove('neg');
                infoRtCost.textContent = weapon.rtcost;
                infoRange.textContent = weapon.mnr === weapon.mxr ? weapon.mnr : (weapon.mnr + ' - ' + weapon.mxr);

                infoDamageRace.classList.remove('undead');
                if ( weapon.dmgt || weapon.ele || weapon.rcbon ) {

                    if ( weapon.dmgt > 0 ) {
                        infoDamageType.innerHTML = '<img data-src="' + damageTypes[weapon.dmgt]['icon'] + '" uk-img>';
                        if (weapon.dmgtamt > 0) infoDamageType.innerHTML += '<br><b>' + weapon.dmgtamt + '%</b>';
                    } else infoDamageType.innerHTML = '';

                    if ( weapon.ele > 0 ) {
                        infoDamageElement.innerHTML = '<img data-src="' + elements[weapon.ele]['icon2'] + '" uk-img>';
                        if (weapon.eleamt > 0) infoDamageElement.innerHTML += '<br><b>' + weapon.eleamt + '%</b>';
                    } else infoDamageElement.innerHTML = '';

                    if ( weapon.rcbon > 0 ) {
                        infoDamageRace.innerHTML = '<img data-src="' + races[isOdd(weapon.rcbon) ? (weapon.rcbon - 1) : weapon.rcbon]['icon'] + '" uk-img>';
                        if (weapon.rcamt > 0) infoDamageRace.innerHTML += '<br><b>' + weapon.rcamt + '%</b>';
                        if (isOdd(weapon.rcbon)) infoDamageRace.classList.add('undead');
                    } else infoDamageRace.innerHTML = '';

                    infoDamagePanel.classList.remove('uk-hidden');
                } else infoDamagePanel.classList.add('uk-hidden');

                if ( weapon.onhit ) {
                    infoOnhit.textContent = weapon.onhitch === 100 ? '' : (weapon.onhitch + '% to ');
                    switch(weapon.onhit) {
                        case 1:
                            infoOnhit.textContent += (weapon.onhitform === 0 ? 'Doublehit' : statusEffects[weapon.onhit]['name']);
                            break;
                        case 18:
                            infoOnhit.textContent += (weapon.onhitch === 100 ? capitalize(statusEffects[weapon.onhit]['name']) : statusEffects[weapon.onhit]['name']) + ' ' + statusEffects[weapon.onhit][weapon.onhiteff]['name'];
                            break;
                        case 19:
                            infoOnhit.textContent += (weapon.onhitch === 100 ? capitalize(statusEffects[weapon.onhit]['name']) : statusEffects[weapon.onhit]['name']) + ' ' + statusEffects[weapon.onhit][weapon.onhiteff]['name'];
                            break;
                        case 20:
                            infoOnhit.textContent += (weapon.onhitch === 100 ? capitalize(statusEffects[weapon.onhit]['name']) : statusEffects[weapon.onhit]['name']) + ' ' + statusEffects[weapon.onhit][weapon.onhiteff]['name'];
                            break;
                        default :
                            infoOnhit.textContent += statusEffects[weapon.onhit]['name'];
                    }
                    switch(weapon.onhitform) {
                        case 0:
                            break;
                        case 3:
                            infoOnhit.textContent += ' for ' + weapon.onhitamt + ' points';
                            break;
                        case 4:
                            infoOnhit.textContent += ' for ' + weapon.onhitamt + (weapon.onhit === 12 ? ' ticks' : ' points');
                            break;
                        case 6:
                            infoOnhit.textContent += ' for ' + weapon.onhitamt + ' Turns';
                            break;
                        case 8:
                            infoOnhit.textContent += ' for ' + weapon.onhitamt * 10 + ' RT ticks';
                            break;
                        case 9:
                            infoOnhit.textContent += ' for ' + weapon.onhitamt + '% of Max';
                            break;
                        case 14:
                            infoOnhit.textContent += ' for ' + weapon.onhitamt + '% of Max';
                    }
                } else infoOnhit.textContent = '—';

                statsBottom.forEach( (stat, index) => {
                    stat.textContent = (statList[index] > 120 && index > 1) ? (statList[index] - 256) : (statList[index] === 0 ? '—' : statList[index]);
                    (statList[index] > 120 && index > 1) ? stat.classList.add('neg') : stat.classList.remove('neg');
                });
                weapon.def ? statsDefPanel.classList.remove('uk-hidden') : statsDefPanel.classList.add('uk-hidden');

                if ( weapon.skillbon ) {
                    let skill = skills.find((row) => row['id'] === weapon.skillbon);
                    infoSkillBon.textContent = skill.name + ' +' + (weapon.skillbonamt > 24 ? (weapon.skillbonamt - 24) : ((weapon.skillbonamt > 8 ? (weapon.skillbonamt - 8) : weapon.skillbonamt)));
                } else infoSkillBon.textContent = '—';
                if ( weapon.passeff ) {
                    let passive = skills.find((row) => row['id'] === weapon.passeff);
                    infoPassive.textContent = passive.name;
                } else infoPassive.textContent = '—';
                if ( weapon.ablty ) {
                    let ability = abilities.find((row) => row['id'] === weapon.ablty);
                    infoAbility.textContent = weapon.abltyuse + 'x ' + ability.name;
                } else infoAbility.textContent = '—';
                if ( weapon.set ) {
                    infoSet.querySelector('b').textContent = itemSets[weapon.set]['name'];
                    infoSet.classList.remove('uk-hidden');
                } else infoSet.classList.add('uk-hidden');

                let inSets = [];
                let infoClasses = [];
                if ( innate === 0 ) {
                    infoLocation.innerHTML = '';
                    let shopArticle = shop.find((row) => row['id'] === weapon.id);
                    if (shopArticle) {
                        infoLocation.innerHTML += 'Buy in ' +
                            ( shopArticle.common ? 'Common' : '' ) +
                            ( shopArticle.deneb ? (( shopArticle.common ? '|' : '' ) + "Deneb's") : '' ) +
                            ( shopArticle.potd ? (( shopArticle.common || shopArticle.deneb ? '|' : '' ) + 'PotD') : '' ) + ' shop ' +
                            storyPoints[Math.max(shopArticle.common, shopArticle.deneb, shopArticle.potd)];
                    }
                    if ( weapon.craftbk ) {
                        infoLocation.innerHTML += shopArticle ? '<br>' : '';
                        let craftBook = sundries.find((row) => row['id'] === weapon.craftbk);
                        infoLocation.innerHTML += 'Craft with ' + craftBook.name;

                        let ingredients = [];
                        let ingNum = 0;
                        for (let i = 1; i < 4; i++) {
                            if ( weapon['ing' + i] ) {
                                if ( i > 1 && weapon['ing' + (i - 1)] === weapon['ing' + i] ) {
                                    ingredients[ingNum - 1]['amt']++;
                                } else {
                                    ingredients.push({
                                        'id': weapon['ing' + i],
                                        'amt': 1
                                    });
                                    ingNum++;
                                }
                            }
                        }
                        if ( ingredients ) {
                            infoIngredients.innerHTML = '';
                            ingredients.forEach( function( ing ) {
                                let ingredient = weapons.find((row) => row['id'] === ing.id);
                                if ( ! ingredient ) ingredient = armor.find((row) => row['id'] === ing.id);
                                if ( ! ingredient ) ingredient = sundries.find((row) => row['id'] === ing.id);
                                infoIngredients.innerHTML += '<li><span>' + ingredient.name + '</span><b>x' + ing.amt + '</b></li>';
                            })
                        }
                        infoIngredientPanel.classList.remove('uk-hidden');
                    } else infoIngredientPanel.classList.add('uk-hidden');
                    if ( weapon.loc && weapon.loc !== '???' ) {
                        infoLocation.innerHTML += ( shopArticle || weapon.craftbk ) ? '<br>' : '';
                        infoLocation.innerHTML += weapon.loc;
                    } else if ( !shopArticle && !weapon.craftbk ) {
                        infoLocation.innerHTML += '???';
                    }

                    for (let i = 0; i < 56; i++) {
                        if (weapon['eq' + i] === 1) inSets.push(i);
                    }
                    infoClasses = classes.filter((rows) => inSets.includes(rows['eqset']));

                } else {
                    infoClasses = classes.filter((rows) => (weapon.id === rows['innml'] || weapon.id === rows['innrng']));
                    inSets = [1];
                    infoLocation.textContent = '—';
                }

                if (weapon.notes) {
                    infoNotes.querySelector('b').textContent = weapon.notes;
                    infoNotes.classList.remove('uk-hidden');
                } else infoNotes.classList.add('uk-hidden');

                let setCount = inSets.length;
                if ( setCount === 0 )
                    infoClass.innerHTML = '<li>None</li>';
                else if ( setCount < 56 ) {
                    infoClass.innerHTML = '';
                    infoClasses.forEach( function(el) {
                        infoClass.innerHTML += '<li>' + el.name + '</li>';
                    });
                } else infoClass.innerHTML = '<li>All</li>';

                UIkit.modal(infoModal).show();
            })
        });
    }

    async function loadTables() {

        fetchJSON(skillsJson).then(
            data => skills = data
        );
        fetchJSON(abilitiesJson).then(
            data => abilities = data
        );
        fetchJSON(classesJson).then(
            data => classes = data
        );
        fetchJSON(shopJson).then(
            data => shop = data
        );
        fetchJSON(armorJson).then(
            data => armor = data
        );
        fetchJSON(sundriesJson).then(
            data => sundries = data
        );
    }
});