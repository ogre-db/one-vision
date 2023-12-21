
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/armor.json',
        skillsJson = 'data/skills.json',
        abilitiesJson = 'data/abilities.json',
        jobsJson = 'data/jobs.json',
        obtainsJson = 'data/obtains.json';
    let items = [],
        skills = [],
        abilities = [],
        jobs = [],
        obtains = [];

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoLevel = sidePanel.querySelector('.title .level'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoGroup = sidePanel.querySelector('.stats-top li.group b'),
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
        infoOnhitPanel = sidePanel.querySelector('.on-hit'),
        infoOnhit = sidePanel.querySelector('.on-hit .on-hit-eff'),
        infoObstaclePanel = sidePanel.querySelector('.stats-bottom .obsatk'),
        infoStatsBottom = sidePanel.querySelectorAll('.stats-bottom b'),
        infoResCrush = sidePanel.querySelector('.stats-resists .resist-crush b'),
        infoResSlash = sidePanel.querySelector('.stats-resists .resist-slash b'),
        infoResPierce = sidePanel.querySelector('.stats-resists .resist-pierce b'),
        infoResAir = sidePanel.querySelector('.stats-resists .resist-air b'),
        infoResEarth = sidePanel.querySelector('.stats-resists .resist-earth b'),
        infoResLightning = sidePanel.querySelector('.stats-resists .resist-lightning b'),
        infoResWater = sidePanel.querySelector('.stats-resists .resist-water b'),
        infoResFire = sidePanel.querySelector('.stats-resists .resist-fire b'),
        infoResIce = sidePanel.querySelector('.stats-resists .resist-ice b'),
        infoResLight = sidePanel.querySelector('.stats-resists .resist-light b'),
        infoResDark = sidePanel.querySelector('.stats-resists .resist-dark b'),
        infoResHuman = sidePanel.querySelector('.stats-resists .resist-human b'),
        infoResBeast = sidePanel.querySelector('.stats-resists .resist-beast b'),
        infoResReptile = sidePanel.querySelector('.stats-resists .resist-reptile b'),
        infoResDragon = sidePanel.querySelector('.stats-resists .resist-dragon b'),
        infoResDivine = sidePanel.querySelector('.stats-resists .resist-divine b'),
        infoResUmbra = sidePanel.querySelector('.stats-resists .resist-umbra b'),
        infoResFaerie = sidePanel.querySelector('.stats-resists .resist-faerie b'),
        infoResPhantom = sidePanel.querySelector('.stats-resists .resist-phantom b'),
        infoResGolem = sidePanel.querySelector('.stats-resists .resist-golem b'),
        infoSkillBon = sidePanel.querySelector('.stats-extra .skillbon b'),
        infoPassive = sidePanel.querySelector('.stats-extra .passive b'),
        infoAbility = sidePanel.querySelector('.stats-extra .ability b'),
        infoSet = sidePanel.querySelector('.stats-extra .itemset'),
        infoRestriction = sidePanel.querySelector('.stats-extra .restriction'),
        infoObtain = sidePanel.querySelector('.obtain'),
        infoGet = sidePanel.querySelector('.obtain .get'),
        infoBuy = sidePanel.querySelector('.obtain .buy'),
        infoDrop = sidePanel.querySelector('.obtain .drop'),
        infoSteal = sidePanel.querySelector('.obtain .steal'),
        infoCraft = sidePanel.querySelector('.obtain .craft'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // showProgress();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);

        // let total = items.length;

        items.forEach( (element, index) => {

            if ( index === 0 || (element.typ) !== items[index - 1].typ ) {
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
                    classImg.src = element.var ? types[element.typ]['icon' + element.var] : types[element.typ]['icon'];
                    console.log();
            if (element.skillbonamt >= 8) classImg.classList.add('uni');
            type.appendChild(classImg);
            let name = document.createElement('td');
            name.textContent = element.name;
            let atk = document.createElement('td');
            element.atk > 0 ? atk.textContent = element.atk : atk.textContent = '';
            let def = document.createElement('td');
            element.def > 0 ? def.textContent = element.def : def.textContent = '—';
            let wt = document.createElement('td');
            wt.textContent = element.wght > 120 ? element.wght - 256 : ( element.wght > 0 ? element.wght : '—' );
            element.wght > 120 ? wt.classList.add('neg') : wt.classList.remove('neg');
            let resph = document.createElement('td');
            element.resphys > 0 ? (resph.textContent = element.resphys + '%') : resph.textContent = '—';
            let resel = document.createElement('td');
            element.resele > 0 ? (resel.textContent = element.resele + '%') : resel.textContent = '—';
            let resrc = document.createElement('td');
            element.resrace > 0 ? (resrc.textContent = element.resrace + '%') : resrc.textContent = '—';
            let ele = document.createElement('td');
            if (element.ele > 0) {
                let eleImg = document.createElement('img');
                eleImg.setAttribute('src', elements[element.ele]['icon']);
                ele.appendChild(eleImg);
            }
            let level = document.createElement('td');
            level.textContent = element.lvlreq;
            // noinspection JSCheckFunctionSignatures
            tr.append(type, name, atk, def, wt, resph, resel, resrc, ele, level);
            itemList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        document.querySelectorAll('#itemList tr:not(.separator)').forEach( (element) => {

            element.addEventListener( 'click', function(event) {

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
        infoType.textContent = types[item.typ]['name'];
        infoTypeIcon.src = item.var ? types[item.typ]['icon' + item.var] : types[item.typ]['icon'];
        if (item.skillbonamt >= 8) infoTypeIcon.classList.add('uni'); else infoTypeIcon.classList.remove('uni');
        item.var ? infoGroup.textContent = armorTypes[item.var]['name'] : infoGroup.textContent = '—';
        if ( item.frm ) {
            infoScaling.innerHTML = scalingFormula[item.frm]['name'];
            infoScaling.parentNode.classList.remove('hidden');
        } else infoScaling.parentNode.classList.add('hidden');
        if ( item.rntyp ) {
            infoAttack.textContent = attackType[ item.rntyp + (item.proj === 1 ? 10 : 0) + item.arc ]['name'];
            infoAttack.parentNode.classList.remove('hidden');
        } else infoAttack.parentNode.classList.add('hidden');
        if ( item.acc ) {
            infoAccuracy.textContent = accuracyFormula[item.acc]['name'];
            infoAccuracy.parentNode.classList.remove('hidden');
        } else infoAccuracy.parentNode.classList.add('hidden');
        infoWeight.textContent = item.wght > 120 ? item.wght - 256 : ( item.wght > 0 ? item.wght : '—' );
        item.wght > 120 ? infoWeight.classList.add('neg') : infoWeight.classList.remove('neg');
        if ( item.rtcost ) {
            infoRtCost.textContent = item.rtcost;
            infoRtCost.parentNode.classList.remove('hidden');
        } else infoRtCost.parentNode.classList.add('hidden');
        if ( item.mnr ) {
            infoRange.textContent = item.mnr === item.mxr ? item.mnr : (item.mnr + ' - ' + item.mxr);
            infoRange.parentNode.classList.remove('hidden');
        } else infoRange.parentNode.classList.add('hidden');

        infoDamageRace.classList.remove('undead');
        if ( item.frm && (item.dmgt || item.ele || item.rcbon) ) {

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
            infoOnhitPanel.classList.remove('hidden');
        } else infoOnhitPanel.classList.add('hidden');

        infoStatsBottom.forEach( (stat, index) => {
            stat.textContent = (statList[index] > 120 && index > 2) ? (statList[index] - 256) : (statList[index] === 0 ? '—' : statList[index]);
            (statList[index] > 120 && index > 1) ? stat.classList.add('neg') : stat.classList.remove('neg');
        });
        item.obstdmg ? infoObstaclePanel.classList.remove('hidden') : infoObstaclePanel.classList.add('hidden');

        item.rescr ? infoResCrush.textContent = (item.rescr + '%') : infoResCrush.textContent = '—';
        item.ressl ? infoResSlash.textContent = (item.ressl + '%') : infoResSlash.textContent = '—';
        item.resprc ? infoResPierce.textContent = (item.resprc + '%') : infoResPierce.textContent = '—';
        item.resair ? infoResAir.textContent = (item.resair + '%') : infoResAir.textContent = '—';
        item.resea ? infoResEarth.textContent = (item.resea + '%') : infoResEarth.textContent = '—';
        item.reslghtn ? infoResLightning.textContent = (item.reslghtn + '%') : infoResLightning.textContent = '—';
        item.reswtr ? infoResWater.textContent = (item.reswtr + '%') : infoResWater.textContent = '—';
        item.resfire ? infoResFire.textContent = (item.resfire + '%') : infoResFire.textContent = '—';
        item.resice ? infoResIce.textContent = (item.resice + '%') : infoResIce.textContent = '—';
        item.reslght ? infoResLight.textContent = (item.reslght + '%') : infoResLight.textContent = '—';
        item.resdark ? infoResDark.textContent = (item.resdark + '%') : infoResDark.textContent = '—';
        item.reshum ? infoResHuman.textContent = (item.reshum + '%') : infoResHuman.textContent = '—';
        item.resbst ? infoResBeast.textContent = (item.resbst + '%') : infoResBeast.textContent = '—';
        item.resrep ? infoResReptile.textContent = (item.resrep + '%') : infoResReptile.textContent = '—';
        item.resdrg ? infoResDragon.textContent = (item.resdrg + '%') : infoResDragon.textContent = '—';
        item.resdiv ? infoResDivine.textContent = (item.resdiv + '%') : infoResDivine.textContent = '—';
        item.resum ? infoResUmbra.textContent = (item.resum + '%') : infoResUmbra.textContent = '—';
        item.resfae ? infoResFaerie.textContent = (item.resfae + '%') : infoResFaerie.textContent = '—';
        item.resph ? infoResPhantom.textContent = (item.resph + '%') : infoResPhantom.textContent = '—';
        item.resgol ? infoResGolem.textContent = (item.resgol + '%') : infoResGolem.textContent = '—';

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
            infoSet.querySelector('b').textContent = itemSets.find((row) => row['id'] === item.set).name;
            infoSet.classList.remove('hidden');
        } else infoSet.classList.add('hidden');
        infoRestriction.innerHTML = '';
        if ( item.mlnly > 0 )
            infoRestriction.innerHTML += '<li class="red">Only usable by male units</li>';
        if ( item.fmlnly > 0 )
            infoRestriction.innerHTML += '<li class="red">Only usable by female units</li>';
        if ( item.id === 535 )
            infoRestriction.innerHTML += '<li class="red">Only usable by Catiua</li>';

        let obtain = obtains.find((row) => row['id'] === item.id).obtained;
        if (obtain !== 0) {
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
            });
            infoObtain.classList.remove('hidden');
        } else infoObtain.classList.add('hidden');

        let inSets = [];
        for (let i = 0; i < 56; i++) {
            if (item['eq' + i] === 1) inSets.push(i);
        }
        let infoClassList = jobs.filter((rows) => inSets.includes(rows['eqset']));
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
    }
});