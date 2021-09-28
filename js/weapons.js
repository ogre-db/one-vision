
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/weapons.json',
        skillsJson = 'data/skills.json',
        abilitiesJson = 'data/abilities.json',
        classesJson = 'data/classes.json',
        shopJson = 'data/shop.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json';
    let items = [],
        skills = [],
        abilities = [],
        classes = [],
        shop = [],
        armor = [],
        sundries = [];

    let innate;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoLevel = sidePanel.querySelector('.title .level'),
        infoType = sidePanel.querySelector('.title h5 i'),
        infoHands = sidePanel.querySelector('.title h5 img'),
        infoScaling = sidePanel.querySelector('.stats-top b.scaling'),
        infoAttack = sidePanel.querySelector('.stats-top b.attack'),
        infoAccuracy = sidePanel.querySelector('.stats-top b.accuracy'),
        infoWeight = sidePanel.querySelector('.stats-top b.weight'),
        infoRtCost = sidePanel.querySelector('.stats-top b.rtcost'),
        infoRange = sidePanel.querySelector('.stats-top b.range'),
        infoDamagePanel = sidePanel.querySelector('.damage'),
        infoDamageType = sidePanel.querySelector('.damage .damage-type'),
        infoDamageElement = sidePanel.querySelector('.damage .damage-element'),
        infoDamageRace = sidePanel.querySelector('.damage .damage-race'),
        infoOnhit = sidePanel.querySelector('.on-hit .on-hit-eff'),
        statsDefPanel = sidePanel.querySelector('.stats-bottom .defense'),
        infoStatsBottom = sidePanel.querySelectorAll('.stats-bottom b'),
        infoSkillBon = sidePanel.querySelector('.stats-extra .skillbon'),
        infoPassive = sidePanel.querySelector('.stats-extra .passive'),
        infoAbility = sidePanel.querySelector('.stats-extra .ability'),
        infoSet = sidePanel.querySelector('.stats-extra .itemset'),
        infoLocation = sidePanel.querySelector('.notes .location'),
        infoNotes = sidePanel.querySelector('.notes .note'),
        infoIngredientPanel = sidePanel.querySelector('.notes .ingredients'),
        infoIngredients = sidePanel.querySelector('.notes .uk-accordion-content ul'),
        infoClass = sidePanel.querySelector('.class .uk-accordion-content ul');

    // const progress = document.getElementById('progress');
    // UIkit.modal(loading).show();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);

        // let total = items.length;

        items.forEach( (element, index) => {

            innate = element.price === 0 ? 100 : 0;

            if ( index === 0 || (element.typ) !== items[index - 1].typ ) {
                let tr = document.createElement('tr');
                    tr.className = 'separator';
                    let category = document.createElement('td');
                        category.textContent = types[element.typ + innate]['name'];
                        category.colSpan = document.querySelectorAll('#itemList th').length;
                    tr.appendChild(category);
                itemList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                    let classImg = document.createElement('img');
                        classImg.setAttribute('src', ( element.hnd === 1 || (element.typ === 177 && element.wght > 2)) ? types[element.typ + innate]['icon2'] : types[element.typ + innate]['icon1']);
                        classImg.classList.add('type-icon');
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
            itemList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        document.querySelectorAll('#itemList tr:not(.spacer)').forEach( (element) => {

            element.addEventListener( 'click', function (event) {

                openInfo(event);
            })
        });
    }

    function openInfo (event) {

        swapEffectStart( sidePanel, panelContent );

        let targetRow = event.target.closest('tr');
        let item = items[targetRow.id];
        innate = item.price === 0 ? 100 : 0;

        let selectedRow = itemList.querySelector('tr.selected');
        if (selectedRow) selectedRow.classList.remove('selected');
        targetRow.classList.add('selected');

        let statList = [
            item.atk,
            item.def,
            item.obstdmg,
            item.hp,
            item.mp,
            item.lck,
            item.str,
            item.vit,
            item.dex,
            item.agi,
            item.avd,
            item.int,
            item.mnd,
            item.res
        ];

        item.skillbonamt >= 8 ? sidePanel.classList.add('uni') : sidePanel.classList.remove('uni');
        infoTitle.textContent = item.name;
        infoLevel.textContent = 'Lv ' + item.lvlreq;
        infoType.textContent = types[item.typ + innate]['name'];
        infoHands.setAttribute('data-src', item.hnd === 1 ? 'img/icons/icon-hands2.png' : 'img/icons/icon-hands1.png');
        infoScaling.innerHTML = scalingFormula[item.frm]['name'];
        infoAttack.textContent = attackType[ item.rntyp + (item.proj === 1 ? 10 : 0) + item.arc ]['name'];
        infoAccuracy.textContent = accuracyFormula[ item.acc ]['name'];
        infoWeight.textContent = item.wght > 120 ? item.wght - 256 : ( item.wght > 0 ? item.wght : '—' );
        item.wght > 120 ? infoWeight.classList.add('neg') : infoWeight.classList.remove('neg');
        infoRtCost.textContent = item.rtcost;
        infoRange.textContent = item.mnr === item.mxr ? item.mnr : (item.mnr + ' - ' + item.mxr);

        infoDamageRace.classList.remove('undead');
        if ( item.dmgt || item.ele || item.rcbon ) {

            if ( item.dmgt > 0 ) {
                infoDamageType.innerHTML = '<img data-src="' + damageTypes[item.dmgt]['icon'] + '"  uk-img>';
                if (item.dmgtamt > 0) infoDamageType.innerHTML += '<br><b>' + item.dmgtamt + '%</b>';
            } else infoDamageType.innerHTML = '';

            if ( item.ele > 0 ) {
                infoDamageElement.innerHTML = '<img data-src="' + elements[item.ele]['icon2'] + '"  width="40" height="40" uk-img>';
                if (item.eleamt > 0) infoDamageElement.innerHTML += '<br><b>' + item.eleamt + '%</b>';
            } else infoDamageElement.innerHTML = '';

            if ( item.rcbon > 0 ) {
                infoDamageRace.innerHTML = '<img data-src="' + races[isOdd(item.rcbon) ? (item.rcbon - 1) : item.rcbon]['icon'] + '"  width="40" height="40" uk-img>';
                if (item.rcamt > 0) infoDamageRace.innerHTML += '<br><b>' + item.rcamt + '%</b>';
                if (isOdd(item.rcbon)) infoDamageRace.classList.add('undead');
            } else infoDamageRace.innerHTML = '';

            infoDamagePanel.classList.remove('uk-hidden');
        } else infoDamagePanel.classList.add('uk-hidden');

        if ( item.onhit ) {
            infoOnhit.textContent = item.onhitch === 100 ? '' : (item.onhitch + '% to ');
            switch(item.onhit) {
                case 1:
                    infoOnhit.textContent += (item.onhitform === 0 ? 'Doublehit' : statusEffects[item.onhit]['name']);
                    break;
                case 18:
                    infoOnhit.textContent += (item.onhitch === 100 ? capitalize(statusEffects[item.onhit]['name']) : statusEffects[item.onhit]['name']) + ' ' + statusEffects[item.onhit][item.onhiteff]['name'];
                    break;
                case 19:
                    infoOnhit.textContent += (item.onhitch === 100 ? capitalize(statusEffects[item.onhit]['name']) : statusEffects[item.onhit]['name']) + ' ' + statusEffects[item.onhit][item.onhiteff]['name'];
                    break;
                case 20:
                    infoOnhit.textContent += (item.onhitch === 100 ? capitalize(statusEffects[item.onhit]['name']) : statusEffects[item.onhit]['name']) + ' ' + statusEffects[item.onhit][item.onhiteff]['name'];
                    break;
                default :
                    infoOnhit.textContent += statusEffects[item.onhit]['name'];
            }
            switch(item.onhitform) {
                case 0:
                    break;
                case 3:
                    infoOnhit.textContent += ' for ' + item.onhitamt + ' points';
                    break;
                case 4:
                    infoOnhit.textContent += ' for ' + item.onhitamt + (item.onhit === 12 ? ' ticks' : ' points');
                    break;
                case 6:
                    infoOnhit.textContent += ' for ' + item.onhitamt + ' Turns';
                    break;
                case 8:
                    infoOnhit.textContent += ' for ' + item.onhitamt * 10 + ' RT ticks';
                    break;
                case 9:
                    infoOnhit.textContent += ' for ' + item.onhitamt + '% of Max';
                    break;
                case 14:
                    infoOnhit.textContent += ' for ' + item.onhitamt + '% of Max';
            }
        } else infoOnhit.textContent = '—';

        infoStatsBottom.forEach( (stat, index) => {
            stat.textContent = (statList[index] > 120 && index > 2) ? (statList[index] - 256) : (statList[index] === 0 ? '—' : statList[index]);
            (statList[index] > 120 && index > 1) ? stat.classList.add('neg') : stat.classList.remove('neg');
        });
        item.def ? statsDefPanel.classList.remove('uk-hidden') : statsDefPanel.classList.add('uk-hidden');

        if ( item.skillbon ) {
            let skill = skills.find((row) => row['id'] === item.skillbon);
            infoSkillBon.textContent = skill.name + ' +' + (item.skillbonamt > 24 ? (item.skillbonamt - 24) : ((item.skillbonamt > 8 ? (item.skillbonamt - 8) : item.skillbonamt)));
        } else infoSkillBon.textContent = '—';
        if ( item.passeff ) {
            let passive = skills.find((row) => row['id'] === item.passeff);
            infoPassive.textContent = passive.name;
        } else infoPassive.textContent = '—';
        if ( item.ablty ) {
            let ability = abilities.find((row) => row['id'] === item.ablty);
            infoAbility.textContent = item.abltyuse + 'x ' + ability.name;
        } else infoAbility.textContent = '—';
        if ( item.set ) {
            infoSet.querySelector('b').textContent = itemSets[item.set]['name'];
            infoSet.classList.remove('uk-hidden');
        } else infoSet.classList.add('uk-hidden');

        let inSets = [];
        let infoClasses = [];
        if ( innate === 0 ) {
            infoLocation.innerHTML = '';
            let shopArticle = shop.find((row) => row['id'] === item.id);
            if (shopArticle) {
                infoLocation.innerHTML += 'Buy in ' +
                    ( shopArticle.common ? 'Common' : '' ) +
                    ( shopArticle.deneb ? (( shopArticle.common ? '|' : '' ) + "Deneb's") : '' ) +
                    ( shopArticle.potd ? (( shopArticle.common || shopArticle.deneb ? '|' : '' ) + 'PotD') : '' ) + ' shop ' +
                    storyPoints[Math.max(shopArticle.common, shopArticle.deneb, shopArticle.potd)];
            }
            if ( item.craftbk ) {
                infoLocation.innerHTML += shopArticle ? '<br>' : '';
                let craftBook = sundries.find((row) => row['id'] === item.craftbk);
                infoLocation.innerHTML += 'Craft with ' + craftBook.name;

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
                    ingredients.forEach( function( ing ) {
                        let ingredient = items.find((row) => row['id'] === ing.id);
                        if ( ! ingredient ) ingredient = armor.find((row) => row['id'] === ing.id);
                        if ( ! ingredient ) ingredient = sundries.find((row) => row['id'] === ing.id);
                        infoIngredients.innerHTML += '<li><span>' + ingredient.name + '</span><b>x' + ing.amt + '</b></li>';
                    })
                }
                infoIngredientPanel.classList.remove('uk-hidden');
            } else infoIngredientPanel.classList.add('uk-hidden');
            if ( item.loc && item.loc !== '???' ) {
                infoLocation.innerHTML += ( shopArticle || item.craftbk ) ? '<br>' : '';
                infoLocation.innerHTML += item.loc;
            } else if ( !shopArticle && !item.craftbk ) {
                infoLocation.innerHTML += '???';
            }

            for (let i = 0; i < 56; i++) {
                if (item['eq' + i] === 1) inSets.push(i);
            }
            infoClasses = classes.filter((rows) => inSets.includes(rows['eqset']));

        } else {
            infoClasses = classes.filter((rows) => (item.id === rows['innml'] || item.id === rows['innrng']));
            inSets = [1];
            infoLocation.textContent = '—';
        }

        if (item.notes) {
            infoNotes.querySelector('b').textContent = item.notes;
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

        swapEffectRemove( sidePanel, panelContent );

        openPanel(sidePanel);
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