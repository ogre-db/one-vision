
document.addEventListener("DOMContentLoaded", function() {

    const weaponsJson = 'data/weapons.json';
    const skillsJson = 'data/skills.json';
    var weapons = [];
    var skills = [];

    const weaponList = document.getElementById('weaponList');
    const infoModal = document.getElementById('infoModal');
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
                        classImg.setAttribute('src', element.hnd === 1 ? types[element.typ + innate]['icon2'] : types[element.typ + innate]['icon1']);
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

        const infoTitle = infoModal.querySelector('.title h2');
        const infoClass = infoModal.querySelector('.title .level');
        const infoType = infoModal.querySelector('.title h5 i');
        const infoHands = infoModal.querySelector('.title h5 img');
        const infoScaling = infoModal.querySelector('.stats-top b.scaling');
        const infoAttack = infoModal.querySelector('.stats-top b.attack');
        const infoAccuracy = infoModal.querySelector('.stats-top b.accuracy');
        const infoWeight = infoModal.querySelector('.stats-top b.weight');
        const infoRtCost = infoModal.querySelector('.stats-top b.rtcost');
        const infoRange = infoModal.querySelector('.stats-top b.range');
        const infoDamagePanel = infoModal.querySelector('.damage');
        const infoDamageType = infoModal.querySelector('.damage .damage-type');
        const infoDamageElement = infoModal.querySelector('.damage .damage-element');
        const infoDamageRace = infoModal.querySelector('.damage .damage-race');
        const infoOnhit = infoModal.querySelector('.on-hit .on-hit-eff');
        const statsDefPanel = infoModal.querySelector('.stats-bottom .defense');
        const statsBottom = infoModal.querySelectorAll('.stats-bottom b');
        const infoSkillBon = infoModal.querySelector('.stats-extra .skillbon');
        const infoPassive = infoModal.querySelector('.stats-extra .passive');
        const infoSet = infoModal.querySelector('.stats-extra .itemset');

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
                infoClass.textContent = 'Lv ' + weapon.lvlreq;
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

                if ( weapon.skillbon1 || weapon.skillbon2 ) {
                    let skill = skills[matchByColumn(skills, 'id', weapon.skillbon1 + weapon.skillbon2 * 256 )];
                    infoSkillBon.textContent = skill.name + ' +' + (weapon.skillbonamt > 24 ? (weapon.skillbonamt - 24) : ((weapon.skillbonamt > 8 ? (weapon.skillbonamt - 8) : weapon.skillbonamt)));
                } else infoSkillBon.textContent = '—';
                if ( weapon.passeff ) {
                    let skill = skills[matchByColumn(skills, 'id', weapon.passeff )];
                    infoPassive.textContent = skill.name;
                } else infoPassive.textContent = '—';
                if ( weapon.set ) {
                    infoSet.textContent = itemSets[weapon.set]['name'];
                } else infoSet.textContent = '—';

                UIkit.modal(infoModal).show();
            })
        });
    }

    async function loadTables() {

        fetchJSON(skillsJson).then(
            data => skills = data
        );
    }
});