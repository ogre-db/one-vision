
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/armor.json',
        skillsJson = 'data/skills.json',
        abilitiesJson = 'data/abilities.json',
        classesJson = 'data/classes.json',
        shopJson = 'data/shop.json',
        weaponsJson = 'data/weapons.json',
        sundriesJson = 'data/sundries.json';
    let items = [],
        skills = [],
        abilities = [],
        classes = [],
        shop = [],
        weapons = [],
        sundries = [];

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoLevel = sidePanel.querySelector('.title .level'),
        infoType = sidePanel.querySelector('.title h5 i'),
        infoTypeIcon = sidePanel.querySelector('.title h5 img'),
        infoGroup = sidePanel.querySelector('.stats-top li.group'),
        infoScaling = sidePanel.querySelector('.stats-top li.scaling'),
        infoAttack = sidePanel.querySelector('.stats-top li.attack'),
        infoAccuracy = sidePanel.querySelector('.stats-top li.accuracy'),
        infoWeight = sidePanel.querySelector('.stats-top li.weight b'),
        infoRtCost = sidePanel.querySelector('.stats-top li.rtcost'),
        infoRange = sidePanel.querySelector('.stats-top li.range'),
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
            classImg.setAttribute('src', element.var ? types[element.typ]['icon' + element.var] : types[element.typ]['icon']);
            classImg.classList.add('type-icon');
            if (element.skillbonamt >= 8) classImg.classList.add('uni');
            type.appendChild(classImg);
            let name = document.createElement('td');
            name.textContent = element.name;
            let atk = document.createElement('td');
            element.atk > 0 ? atk.textContent = element.atk : atk.textContent = '—';
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
                eleImg.setAttribute('src', elements[element.ele]['icon1']);
                ele.appendChild(eleImg);
            }
            let level = document.createElement('td');
            level.textContent = element.lvlreq;
            tr.append(type, name, atk, def, wt, resph, resel, resrc, ele, level);
            itemList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        document.querySelectorAll('#itemList tr:not(.spacer)').forEach( (element) => {

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
        infoTypeIcon.setAttribute('data-src', item.var ? types[item.typ]['icon' + item.var] : types[item.typ]['icon']);
        item.var ? infoGroup.querySelector('b').textContent = armorTypes[item.var]['name'] : infoGroup.querySelector('b').textContent = '—';
        if ( item.frm ) {
            infoScaling.querySelector('b').innerHTML = scalingFormula[item.frm]['name'];
            infoScaling.classList.remove('uk-hidden');
        } else infoScaling.classList.add('uk-hidden');
        if ( item.rntyp ) {
            infoAttack.querySelector('b').textContent = attackType[ item.rntyp + (item.proj === 1 ? 10 : 0) + item.arc ]['name'];
            infoAttack.classList.remove('uk-hidden');
        } else infoAttack.classList.add('uk-hidden');
        if ( item.acc ) {
            infoAccuracy.querySelector('b').textContent = accuracyFormula[item.acc]['name'];
            infoAccuracy.classList.remove('uk-hidden');
        } else infoAccuracy.classList.add('uk-hidden');
        infoWeight.textContent = item.wght > 120 ? item.wght - 256 : ( item.wght > 0 ? item.wght : '—' );
        item.wght > 120 ? infoWeight.classList.add('neg') : infoWeight.classList.remove('neg');
        if ( item.acc ) {
            infoRtCost.querySelector('b').textContent = item.rtcost;
            infoRtCost.classList.remove('uk-hidden');
        } else infoRtCost.classList.add('uk-hidden');
        if ( item.mnr ) {
            infoRange.querySelector('b').textContent = item.mnr === item.mxr ? item.mnr : (item.mnr + ' - ' + item.mxr);
            infoRange.classList.remove('uk-hidden');
        } else infoRange.classList.add('uk-hidden');

        infoDamageRace.classList.remove('undead');
        if ( item.frm && (item.dmgt || item.ele || item.rcbon) ) {

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
            infoOnhitPanel.classList.remove('uk-hidden');
        } else infoOnhitPanel.classList.add('uk-hidden');

        infoStatsBottom.forEach( (stat, index) => {
            stat.textContent = (statList[index] > 120 && index > 2) ? (statList[index] - 256) : (statList[index] === 0 ? '—' : statList[index]);
            (statList[index] > 120 && index > 1) ? stat.classList.add('neg') : stat.classList.remove('neg');
        });
        item.obstdmg ? infoObstaclePanel.classList.remove('uk-hidden') : infoObstaclePanel.classList.add('uk-hidden');

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
            infoSet.querySelector('b').textContent = itemSets[item.set]['name'];
            infoSet.classList.remove('uk-hidden');
        } else infoSet.classList.add('uk-hidden');

        let inSets = [];
        let infoClasses = [];
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
                    if ( ! ingredient ) ingredient = weapons.find((row) => row['id'] === ing.id);
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

        if ( sidePanel.classList.contains('open') ) {
            setTimeout( function () {
                panelContent.classList.remove('blur-cycle');
            }, 200)
        }

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
        fetchJSON(weaponsJson).then(
            data => weapons = data
        );
        fetchJSON(sundriesJson).then(
            data => sundries = data
        );
    }
});