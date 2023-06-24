
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/templates.json',
        skillsJson = 'data/skills.json',
        magicJson = 'data/magic.json',
        jobsJson = 'data/jobs.json';
    let items = [],
        skills = [],
        magic = [],
        jobs = [];

    let innate;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoType = sidePanel.querySelector('.title .subtitle i'),
        infoTypeIcon = sidePanel.querySelector('.title .subtitle img'),
        infoAlignment = sidePanel.querySelector('.stats-top b.align'),
        infoClan = sidePanel.querySelector('.stats-top b.clan'),
        infoRace = sidePanel.querySelector('.stats-top b.race'),
        infoPerk = sidePanel.querySelector('.stats-top b.perk'),
        infoRtPenalty = sidePanel.querySelector('.stats-top b.rtpenalty'),
        infoRecruited = sidePanel.querySelector('.stats-top .recruited ul'),
        infoStatsBottomSpecial = sidePanel.querySelector('.stats-bottom.special'),
        infoStatsBottom = sidePanel.querySelectorAll('.stats-bottom.special ul.stats b'),
        infoDerivedBottom = sidePanel.querySelectorAll('.stats-bottom.special ul.ov-accordion b'),
        infoStatsBottomGeneric = sidePanel.querySelector('.stats-bottom.generic'),
        infoStatsBottomVariantLabels = sidePanel.querySelectorAll('.stats-bottom.generic > div > div > span'),
        infoStatsBottomGen1 = sidePanel.querySelectorAll('.stats-bottom.generic .basic ul.set1 b'),
        infoStatsBottomGen2 = sidePanel.querySelectorAll('.stats-bottom.generic .basic ul.set2 b'),
        infoStatsBottomGen3 = sidePanel.querySelectorAll('.stats-bottom.generic .basic ul.set3 b'),
        infoStatsBottomGen4 = sidePanel.querySelectorAll('.stats-bottom.generic .basic ul.set4 b'),
        infoDerivedBottom1 = sidePanel.querySelectorAll('.stats-bottom.generic .derived ul.set1 b'),
        infoDerivedBottom2 = sidePanel.querySelectorAll('.stats-bottom.generic .derived ul.set2 b'),
        infoDerivedBottom3 = sidePanel.querySelectorAll('.stats-bottom.generic .derived ul.set3 b'),
        infoDerivedBottom4 = sidePanel.querySelectorAll('.stats-bottom.generic .derived ul.set4 b'),
        infoClass = sidePanel.querySelector('.class .accordion-content ul'),
        infoRecruitment = sidePanel.querySelector('.recruitment'),
        infoNotes = sidePanel.querySelector('.notes');

    // const progress = document.getElementById('progress');
    // showProgress();

    listItems();

    loadTables();

    async function listItems() {

        items = await fetchJSON(tableItemsJson);
        let currentType = '';

        // let total = items.length;

        items.forEach( (element, index) => {

            let raceType = '';
            switch (element.typ) {
                case 'G':
                    raceType += 'Generic ';
                    if (([1,3,5,6,7,8].includes(element.race) || element.id === 210))
                        raceType += 'Humanoid';
                    else if (([2,4,9].includes(element.race)))
                        raceType += 'Monster';
                    break;
                case 'D':
                    raceType += 'Notable';
                    break;
                case 'S':
                    raceType += 'Special';
                    break;
                case 'U':
                    raceType += 'Unique';
            }
            if ( raceType !== currentType ) {
                let tr = document.createElement('tr');
                tr.className = 'separator';
                let category = document.createElement('td');
                category.textContent = raceType;
                category.colSpan = document.querySelectorAll('#itemList th').length;
                tr.appendChild(category);
                itemList.appendChild(tr);
                currentType = raceType;
            }

            let recruitChapters = String(element.chapter).split(',');
            let tr = document.createElement('tr');
                tr.id = index;
                let type = document.createElement('td');
                    let raceImg = document.createElement('img');
                        raceImg.src = races[element.race * 2].icon;
                    type.appendChild(raceImg);
                let name = document.createElement('td');
                    name.textContent = element.name;
                let chapterL = document.createElement('td');
                let chapterN = document.createElement('td');
                let chapterC = document.createElement('td');
                if (element.typ !== 'G') {
                    if (recruitChapters.length === 1) {
                        chapterL.textContent = recruitChapters[0] !== '0' ? recruitChapters[0] : '—';
                        chapterN.textContent = recruitChapters[0] !== '0' ? recruitChapters[0] : '—';
                        chapterC.textContent = recruitChapters[0] !== '0' ? recruitChapters[0] : '—';
                    } else {
                        chapterL.textContent = recruitChapters[0] !== '0' ? recruitChapters[0] : '—';
                        chapterN.textContent = recruitChapters[1] !== '0' ? recruitChapters[1] : '—';
                        chapterC.textContent = recruitChapters[2] !== '0' ? recruitChapters[2] : '—';
                    }
                }
                let movement = document.createElement('td');
                    movement.textContent = movementType[element.mvtype];
                let rt = document.createElement('td');
                    rt.textContent = element.rt;

                tr.append(type, name, chapterL, chapterN, chapterC, movement, rt);
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

        infoTitle.textContent = item.name;

        infoTypeIcon.src = races[item.race * 2].icon;
        let raceType = '';
        switch (item.typ) {
            case 'G':
                raceType += 'Generic ';
                if (([1, 3, 5, 6, 7, 8].includes(item.race) || item.id === 210))
                    raceType += 'Humanoid';
                else if (([2, 4, 9].includes(item.race)))
                    raceType += 'Monster';
                break;
            case 'D':
                raceType += 'Notable';
                break;
            case 'S':
                raceType += 'Special';
                break;
            case 'U':
                raceType += 'Unique';
        }
        infoType.textContent = raceType;

        if (item.typ !== 'G') {
            infoAlignment.innerHTML = alignments[item.align];
            infoAlignment.classList = 'align';
            if (item.align === 1)
                infoAlignment.classList.add('blue');
            else if (item.align === 2)
                infoAlignment.classList.add('green');
            else if (item.align === 3)
                infoAlignment.classList.add('red');
            infoAlignment.closest('li').classList.remove('hidden');
        } else {
            infoAlignment.closest('li').classList.add('hidden');
        }

        if (item.typ !== 'G') {
            let clanText = String(item.clan).split(',');
            infoClan.innerText = clans[clanText[0]].name;
            if (clanText.length > 1) {
                infoClan.innerText += ' (?)';
            }
            infoClan.closest('li').classList.remove('hidden');
        } else {
            infoClan.closest('li').classList.add('hidden');
        }
        infoRace.innerText = races[item.race * 2].name;
        if (item.mvtype)
            infoPerk.innerText = movementType[item.mvtype];
        else
            infoPerk.innerText = '—';
        infoRtPenalty.innerText = item.rt;

        let recruitChapters = String(item.chapter).split(',');
        if (item.typ !== 'G') {
            infoRecruited.innerHTML = '';
            if (recruitChapters.length === 1) {
                if (String(item.chapter).search('C') >= 0)
                    infoRecruited.innerHTML = '<li>CODA Chapter ' + item.chapter.replace(/[^\d]/, '') + '</li>';
                 else
                    infoRecruited.innerHTML = '<li>Chapter ' + item.chapter + '</li>';
            } else if (item.chapter !== '0') {
                if (recruitChapters[0] !== '0') infoRecruited.innerHTML += '<li>Chapter ' + recruitChapters[0] + ' Law</li>';
                if (recruitChapters[1] !== '0' && recruitChapters[1] !== '2') infoRecruited.innerHTML += '<li>Chapter ' + recruitChapters[1] + ' Neutral</li>';
                if (recruitChapters[2] !== '0') infoRecruited.innerHTML += '<li>Chapter ' + recruitChapters[2] + ' Chaos</li>';
            } else {
                infoRecruited.innerHTML = '<li>—</li>';
            }
            infoRecruited.closest('.recruited').classList.remove('hidden');
        } else infoRecruited.closest('.recruited').classList.add('hidden');

        if (item.typ !== 'G') {
            let statList = [
                item.hp,
                item.mp,
                item.str,
                item.vit,
                item.dex,
                item.agi,
                item.avd,
                item.int,
                item.mnd,
                item.res
            ];

            infoStatsBottom.forEach((stat, index) => {
                stat.textContent = statList[index] ? statList[index] : '—';
            });

            let derivedList = [
                Math.round(item.str * 0.9 + item.dex * 0.7),
                Math.round(item.str * 0.7 + item.dex * 1.1),
                Math.round(item.str * 0.7 + item.vit * 1.1),
                Math.round(item.dex * 1 + item.agi * 1.2),
                Math.round(item.dex * 1 + item.avd * 1.2),
                Math.round(item.int * 1 + item.mnd * 0.9),
                Math.round(item.mnd * 0.8 + item.res * 1),
                Math.round(item.int * 1.2 + item.mnd * 1.2),
                Math.round(item.avd * 1.2 + item.mnd * 0.8),
                Math.round(item.avd * 1.2 + item.agi * 0.8)
            ];

            infoDerivedBottom.forEach((stat, index) => {
                stat.textContent = derivedList[index];
            });

            infoStatsBottomSpecial.classList.remove('hidden');
            infoStatsBottomGeneric.classList.add('hidden');
        } else {

            let variationType = 'human';
            if ( ([2, 4, 9].includes(item.race)) && !([210, 234].includes(item.id)) )
                variationType = 'monster';

            if ( variationType === 'human') {
                infoStatsBottomVariantLabels[1].innerText = 'Warrior';
                infoStatsBottomVariantLabels[2].innerText = 'Rogue';
                infoStatsBottomVariantLabels[3].innerText = 'Mage';
            } else {
                infoStatsBottomVariantLabels[1].innerText = 'Offense';
                infoStatsBottomVariantLabels[2].innerText = 'Defense';
                infoStatsBottomVariantLabels[3].innerText = 'Speed';
            }

            let statList1 = [
                item.hp + statBonusGeneric[variationType + 1].hp,
                item.mp + statBonusGeneric[variationType + 1].mp,
                item.str + statBonusGeneric[variationType + 1].str,
                item.vit + statBonusGeneric[variationType + 1].vit,
                item.dex + statBonusGeneric[variationType + 1].dex,
                item.agi + statBonusGeneric[variationType + 1].agi,
                item.avd + statBonusGeneric[variationType + 1].avd,
                item.int + statBonusGeneric[variationType + 1].int,
                item.mnd + statBonusGeneric[variationType + 1].mnd,
                item.res + statBonusGeneric[variationType + 1].res
            ];
            let statList2 = [
                item.hp + statBonusGeneric[variationType + 2].hp,
                item.mp + statBonusGeneric[variationType + 2].mp,
                item.str + statBonusGeneric[variationType + 2].str,
                item.vit + statBonusGeneric[variationType + 2].vit,
                item.dex + statBonusGeneric[variationType + 2].dex,
                item.agi + statBonusGeneric[variationType + 2].agi,
                item.avd + statBonusGeneric[variationType + 2].avd,
                item.int + statBonusGeneric[variationType + 2].int,
                item.mnd + statBonusGeneric[variationType + 2].mnd,
                item.res + statBonusGeneric[variationType + 2].res
            ];
            let statList3 = [
                item.hp + statBonusGeneric[variationType + 3].hp,
                item.mp + statBonusGeneric[variationType + 3].mp,
                item.str + statBonusGeneric[variationType + 3].str,
                item.vit + statBonusGeneric[variationType + 3].vit,
                item.dex + statBonusGeneric[variationType + 3].dex,
                item.agi + statBonusGeneric[variationType + 3].agi,
                item.avd + statBonusGeneric[variationType + 3].avd,
                item.int + statBonusGeneric[variationType + 3].int,
                item.mnd + statBonusGeneric[variationType + 3].mnd,
                item.res + statBonusGeneric[variationType + 3].res
            ];
            let statList4 = [
                item.hp,
                item.mp,
                item.str,
                item.vit,
                item.dex,
                item.agi,
                item.avd,
                item.int,
                item.mnd,
                item.res
            ];

            infoStatsBottomGen1.forEach((stat, index) => {
                stat.textContent = statList1[index] ? statList1[index] : '—';
            });
            infoStatsBottomGen2.forEach((stat, index) => {
                stat.textContent = statList2[index] ? statList2[index] : '—';
            });
            infoStatsBottomGen3.forEach((stat, index) => {
                stat.textContent = statList3[index] ? statList3[index] : '—';
            });
            infoStatsBottomGen4.forEach((stat, index) => {
                stat.textContent = statList4[index] ? statList4[index] : '—';
            });

            let derivedList1 = [
                Math.round(statList1[2] * 0.9 + statList1[4] * 0.7),
                Math.round(statList1[2] * 0.7 + statList1[4] * 1.1),
                Math.round(statList1[2] * 0.7 + statList1[3] * 1.1),
                Math.round(statList1[4] * 1 + statList1[5] * 1.2),
                Math.round(statList1[4] * 1 + statList1[6] * 1.2),
                Math.round(statList1[7] * 1 + statList1[8] * 0.9),
                Math.round(statList1[8] * 0.8 + statList1[9] * 1),
                Math.round(statList1[7] * 1.2 + statList1[8] * 1.2),
                Math.round(statList1[6] * 1.2 + statList1[8] * 0.8),
                Math.round(statList1[6] * 1.2 + statList1[5] * 0.8)
            ];
            let derivedList2 = [
                Math.round(statList2[2] * 0.9 + statList2[4] * 0.7),
                Math.round(statList2[2] * 0.7 + statList2[4] * 1.1),
                Math.round(statList2[2] * 0.7 + statList2[3] * 1.1),
                Math.round(statList2[4] * 1 + statList2[5] * 1.2),
                Math.round(statList2[4] * 1 + statList2[6] * 1.2),
                Math.round(statList2[7] * 1 + statList2[8] * 0.9),
                Math.round(statList2[8] * 0.8 + statList2[9] * 1),
                Math.round(statList2[7] * 1.2 + statList2[8] * 1.2),
                Math.round(statList2[6] * 1.2 + statList2[8] * 0.8),
                Math.round(statList2[6] * 1.2 + statList2[5] * 0.8)
            ];
            let derivedList3 = [
                Math.round(statList3[2] * 0.9 + statList3[4] * 0.7),
                Math.round(statList3[2] * 0.7 + statList3[4] * 1.1),
                Math.round(statList3[2] * 0.7 + statList3[3] * 1.1),
                Math.round(statList3[4] * 1 + statList3[5] * 1.2),
                Math.round(statList3[4] * 1 + statList3[6] * 1.2),
                Math.round(statList3[7] * 1 + statList3[8] * 0.9),
                Math.round(statList3[8] * 0.8 + statList3[9] * 1),
                Math.round(statList3[7] * 1.2 + statList3[8] * 1.2),
                Math.round(statList3[6] * 1.2 + statList3[8] * 0.8),
                Math.round(statList3[6] * 1.2 + statList3[5] * 0.8)
            ];
            let derivedList4 = [
                Math.round(statList4[2] * 0.9 + statList4[4] * 0.7),
                Math.round(statList4[2] * 0.7 + statList4[4] * 1.1),
                Math.round(statList4[2] * 0.7 + statList4[3] * 1.1),
                Math.round(statList4[4] * 1 + statList4[5] * 1.2),
                Math.round(statList4[4] * 1 + statList4[6] * 1.2),
                Math.round(statList4[7] * 1 + statList4[8] * 0.9),
                Math.round(statList4[8] * 0.8 + statList4[9] * 1),
                Math.round(statList4[7] * 1.2 + statList4[8] * 1.2),
                Math.round(statList4[6] * 1.2 + statList4[8] * 0.8),
                Math.round(statList4[6] * 1.2 + statList4[5] * 0.8)
            ];

            infoDerivedBottom1.forEach((stat, index) => {
                stat.textContent = derivedList1[index];
            });
            infoDerivedBottom2.forEach((stat, index) => {
                stat.textContent = derivedList2[index];
            });
            infoDerivedBottom3.forEach((stat, index) => {
                stat.textContent = derivedList3[index];
            });
            infoDerivedBottom4.forEach((stat, index) => {
                stat.textContent = derivedList4[index];
            });

            infoStatsBottomSpecial.classList.add('hidden');
            infoStatsBottomGeneric.classList.remove('hidden');
        }

        let infoClassList = jobs.filter((rows) => rows['ccset' + item.ccset]);
        if ([39,40,222].includes(item.id))
            infoClassList.push(jobs.find((row) => row['id'] === 40));
        if (item.id === 218)
            infoClassList.push(jobs.find((row) => row['id'] === 35));
        if (item.id === 226)
            infoClassList.push(jobs.find((row) => row['id'] === 41));
        if (item.id === 230)
            infoClassList.push(jobs.find((row) => row['id'] === 42));
        if (item.id === 234)
            infoClassList.push(jobs.find((row) => row['id'] === 43));
        if (item.id === 238)
            infoClassList.push(jobs.find((row) => row['id'] === 36));
        infoClass.innerHTML = '';
        infoClassList.forEach( (el, i) => {
            infoClass.innerHTML += '<li>' + ((el.typ === 'U' || el.typ === 'S') ? '<b class="orange">' + el.name + '</b>' : el.name) + '</li>';
            if ( infoClassList[i + 1] && infoClassList[i + 1].typ !== infoClassList[i].typ )
                infoClass.innerHTML += '<li class="spacer"></li>';
        });

        if (item.recruit) {
            infoRecruitment.querySelector('.accordion-content').innerHTML = '';
            let recruitmentChapters = item.recruit.split(" | ");
            recruitmentChapters.forEach( (el) => {
                let chapter = el.split(' ')[0];
                let chapterText = 'Chapter ';
                if (chapter.slice(0,1) === 'C')
                    chapterText = 'CODA ' + chapterText;
                chapterText += chapter.replace(/[^0-9]/gm, '');

                let chapterPath = '';
                if (chapter.match(/\dL/gm))
                    chapterPath += '<span class="blue"> Law</span>';
                if (chapter.match(/\d.*N/gm))
                    chapterPath += (chapterPath !== '' ? '/' : ' ' ) + '<span class="green">Neutral</span>';
                if (chapter.match(/\d.*C/gm))
                    chapterPath += (chapterPath !== '' ? '/' : ' ' ) + '<span class="red">Chaos</span>';
                chapterText += chapterPath;

                    let actions = el.replace(chapter + ' ','').split(' & ');
                let chapterActions = document.createElement('ul');
                chapterActions.innerHTML += '<b>' + chapterText + '</b>';
                actions.forEach( (el) => {
                    chapterActions.innerHTML += '<li>' + el + '</li>';
                });

                infoRecruitment.querySelector('.accordion-content').append(chapterActions);
            });
            infoRecruitment.classList.remove('hidden');
        } else infoRecruitment.classList.add('hidden');


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
    }
});