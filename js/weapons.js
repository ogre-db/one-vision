
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/weapons.json',
        skillsJson = 'data/skills.json',
        abilitiesJson = 'data/abilities.json',
        jobsJson = 'data/jobs.json',
        obtainsJson = 'data/obtains.json',
        armorJson = 'data/armor.json';
    let items = [],
        skills = [],
        abilities = [],
        jobs = [],
        armor = [];

    let innate,
        categoryName;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoLevel = sidePanel.querySelector('.title .level'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoScaling = sidePanel.querySelector('.stats-top li.scaling b'),
        infoAttack = sidePanel.querySelector('.stats-top li.attack b'),
        infoAccuracy = sidePanel.querySelector('.stats-top li.accuracy b'),
        infoWeight = sidePanel.querySelector('.stats-top li.weight b'),
        infoRtCost = sidePanel.querySelector('.stats-top li.rtcost b'),
        infoRange = sidePanel.querySelector('.stats-top li.range b'),
        infoDamagePanel = sidePanel.querySelector('.damage'),
        infoDamageType = sidePanel.querySelector('.damage .damage-type'),
        infoDamageElement = sidePanel.querySelector('.damage .damage-element'),
        infoDamageRace = sidePanel.querySelector('.damage .damage-race'),
        infoOnhit = sidePanel.querySelector('.on-hit .on-hit-eff'),
        statsDefPanel = sidePanel.querySelector('.stats-bottom .defense'),
        infoStatsBottom = sidePanel.querySelectorAll('.stats-bottom b'),
        infoSkillBon = sidePanel.querySelector('.stats-extra .skillbon b'),
        infoPassive = sidePanel.querySelector('.stats-extra .passive b'),
        infoAbility = sidePanel.querySelector('.stats-extra .ability b'),
        infoSet = sidePanel.querySelector('.stats-extra .itemset'),
        infoRestriction = sidePanel.querySelector('.stats-extra .restriction'),
        infoObtain = sidePanel.querySelector('.obtain'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // showProgress();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);

        // let total = items.length;

        items.forEach( (item, index) => {

            innate = item.price === 0 ? 100 : 0;

            if ( index === 0 || (itemTypes[item.typ + innate]['name']) !== categoryName ) {
                categoryName = itemTypes[item.typ + innate]['name'];
                let tr = document.createElement('tr');
                    tr.className = 'separator';
                    let category = document.createElement('td');
                        category.textContent = itemTypes[item.typ + innate]['name'];
                        category.colSpan = document.querySelectorAll('#itemList th').length;
                    tr.appendChild(category);
                itemList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                    let classImg = document.createElement('img');
                        classImg.src = (item.hnd === 1 || (item.typ === 177 && item.wght > 2)) ? itemTypes[item.typ + innate]['icon2'] : itemTypes[item.typ + innate]['icon1'];
                        if (item.skillbonamt >= 8) classImg.classList.add('uni');
                    type.appendChild(classImg);
                let name = document.createElement('td');
                    name.textContent = item.name;
                let atk = document.createElement('td');
                    atk.textContent = item.atk;
                let dbon = document.createElement('td');
                    item.dmgtamt > 0 ? dbon.textContent = item.dmgtamt + '%' : dbon.textContent = '—';
                let rt = document.createElement('td');
                    rt.textContent = item.rtcost;
                let wt = document.createElement('td');
                    wt.textContent = item.wght;
                let ele = document.createElement('td');
                if (item.ele > 0) {
                    let eleImg = document.createElement('img');
                    eleImg.src = elements[item.ele]['icon'];
                    ele.appendChild(eleImg);
                }
                let range = document.createElement('td');
                    range.textContent = item.mnr === item.mxr ? item.mnr : (item.mnr + '-' + item.mxr);
                let hands = document.createElement('td');
                    hands.textContent = item.hnd + 1;
                let level = document.createElement('td');
                    level.textContent = item.lvlreq;
                tr.append(type, name, atk, dbon, rt, wt, range, ele, hands, level);
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
        infoType.textContent = itemTypes[item.typ + innate]['name'];
        infoTypeIcon.src = (item.hnd === 1 || (item.typ === 177 && item.wght > 2)) ? itemTypes[item.typ + innate]['icon2'] : itemTypes[item.typ + innate]['icon1'];
        infoTypeIcon.parentNode.classList.remove('oneh', 'twoh');
        infoTypeIcon.parentNode.classList.add(item.hnd === 0 ? 'oneh' : 'twoh');
        if (item.skillbonamt >= 8) infoTypeIcon.classList.add('uni'); else infoTypeIcon.classList.remove('uni');
        infoScaling.innerHTML = damageScaling[item.frm]['desc'];
        infoAttack.textContent = attackType[ item.rntyp + (item.proj === 1 ? 10 : 0) + item.arc ]['name'];
        infoAccuracy.textContent = accuracyScaling[ item.acc ]['desc'];
        infoWeight.textContent = item.wght > 120 ? item.wght - 256 : ( item.wght > 0 ? item.wght : '—' );
        item.wght > 120 ? infoWeight.classList.add('neg') : infoWeight.classList.remove('neg');
        infoRtCost.textContent = item.rtcost;
        infoRange.textContent = item.mnr === item.mxr ? item.mnr : (item.mnr + ' - ' + item.mxr);

        infoDamageRace.classList.remove('undead');
        if ( item.dmgt || item.ele || item.rcbon ) {

            if ( item.dmgt > 0 ) {
                infoDamageType.innerHTML = '<img src="' + damageTypes[item.dmgt]['icon'] + '">';
                if (item.dmgtamt > 0) infoDamageType.innerHTML += '<br><b>' + item.dmgtamt + '%</b>';
            } else infoDamageType.innerHTML = '';
            if ( item.ele > 0 ) {
                infoDamageElement.innerHTML = '<img src="' + elements[item.ele]['icon'] + '"  width="40" height="40">';
                if (item.eleamt > 0) infoDamageElement.innerHTML += '<br><b>' + item.eleamt + '%</b>';
            } else infoDamageElement.innerHTML = '';

            if ( item.rcbon > 0 ) {
                infoDamageRace.innerHTML = '<img src="' + races[isOdd(item.rcbon) ? (item.rcbon - 1) : item.rcbon]['icon'] + '"  width="40" height="40">';
                if (item.rcamt > 0) infoDamageRace.innerHTML += '<br><b>' + item.rcamt + '%</b>';
                if (isOdd(item.rcbon)) infoDamageRace.classList.add('undead');
            } else infoDamageRace.innerHTML = '';

            infoDamagePanel.classList.remove('hidden');
        } else infoDamagePanel.classList.add('hidden');

        if ( item.onhit ) {
            infoOnhit.innerHTML = '';
            if (item.onhitch !== 100)
                infoOnhit.innerHTML += item.onhitch + '% to ';
            if (item.onhit === 1 && item.onhitform === 0) {
                infoOnhit.innerHTML += 'Doublehit';
            } else {
                infoOnhit.innerHTML += item.onhitch === 100 ? capitalize(statusEffects[item.onhit]['name']) : statusEffects[item.onhit]['name'];
            }
            if ([18,19,20].includes(item.onhit)) {
                infoOnhit.innerHTML += ' <span data-tooltip="status-' + item.onhit+ '-' + item.onhiteff + '">'
                    + statusEffects[item.onhit === 20 ? 20 : 18][item.onhiteff]['name'] + '</span>';
            }
            switch(item.onhitform) {
                case 0:
                    break;
                case 3:
                    infoOnhit.innerHTML += ' for ' + item.onhitamt + ' points';break;
                case 4:
                    infoOnhit.innerHTML += ' for ' + item.onhitamt + (item.onhit === 12 ? ' ticks' : ' points');break;
                case 6:
                    infoOnhit.innerHTML += ' for ' + item.onhitamt + ' Turns';break;
                case 8:
                    infoOnhit.innerHTML += ' for ' + item.onhitamt * 10 + ' RT ticks';break;
                case 9:
                case 14:
                    infoOnhit.innerHTML += ' for ' + item.onhitamt + '% of Max';
            }
        } else infoOnhit.innerHTML = '—';

        infoStatsBottom.forEach( (stat, index) => {
            stat.textContent = (statList[index] > 120 && index > 2) ? (statList[index] - 256) : (statList[index] === 0 ? '—' : statList[index]);
            (statList[index] > 120 && index > 1) ? stat.classList.add('neg') : stat.classList.remove('neg');
        });
        item.def ? statsDefPanel.classList.remove('hidden') : statsDefPanel.classList.add('hidden');

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
            let itemSet = itemSets.find((row) => row['id'] === item.set);
            infoSet.querySelector('b').innerHTML = itemSet.name;
            infoSet.querySelector('b').setAttribute('data-tooltip', 'itemset-' + item.set );
            let setPieces = items.filter((rows) => (rows['set'] === item.set )).map(item => {
                return {name: item.name, icon: item.hnd === 1 ? itemTypes[item.typ].icon2 : itemTypes[item.typ].icon1};
            });
            setPieces = setPieces.concat(armor.filter((rows) => (rows['set'] === item.set )).map(item => {
                return {name: item.name, icon: item.var ? itemTypes[item.typ]['icon' + item.var] : itemTypes[item.typ]['icon']};
            }));
            infoSet.querySelector('b').setAttribute('data-setpieces', JSON.stringify(setPieces) );
            infoSet.classList.remove('hidden');
        } else infoSet.classList.add('hidden');
        infoRestriction.innerHTML = '';
        if ( item.mlnly > 0 )
            infoRestriction.innerHTML += '<li class="red">Only usable by male units</li>';
        if ( item.fmlnly > 0 )
            infoRestriction.innerHTML += '<li class="red">Only usable by female units</li>';

        if (obtains.find((row) => row['id'] === item.id).obtained !== 0) {
            infoObtain.querySelector('.accordion-content').innerHTML = listObtains(item.id);
            infoObtain.classList.remove('hidden');
        } else infoObtain.classList.add('hidden');

        let infoClassList = [];
        if (innate) {
            jobs.forEach( (job) => {
                if ( job.innml === item.id || job.innrng === item.id )
                    infoClassList.push(job);
            });
        } else {
            let inSets = [];
            for (let i = 0; i < 56; i++) {
                if (item['eq' + i] === 1) inSets.push(i);
            }
            infoClassList = jobs.filter((rows) => inSets.includes(rows['eqset']));
        }
        if ( infoClassList.length === 0 )
            infoClass.innerHTML = '<li>None</li>';
        else if ( infoClassList.length < jobs.length ) {
            infoClass.innerHTML = '';
            infoClassList.forEach( (el, i) => {
                infoClass.innerHTML += '<li>' + ((el.typ === 'U' || el.typ === 'S') ? '<b class="orange">' + el.name + '</b>' : el.name) + '</li>';
                if ( infoClassList[i + 1] && infoClassList[i + 1].typ !== infoClassList[i].typ )
                    infoClass.innerHTML += '<li class="spacer"></li>';
            });
        } else infoClass.innerHTML = '<li>All</li>';

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
        fetchJSON(abilitiesJson).then(
            data => abilities = data
        );
        fetchJSON(jobsJson).then(
            data => jobs = data
        );
        fetchJSON(obtainsJson).then(
            data => obtains = data
        );
        fetchJSON(armorJson).then(
            data => armor = data
        );
    }
});