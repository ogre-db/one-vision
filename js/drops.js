
document.addEventListener('DOMContentLoaded', function() {

    const obtainsJson = 'data/obtains.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json';

    fetchJSON(obtainsJson).then(items => {
        items = items.filter((rows) => (rows['obtained'] && (/Dropped by|Stolen from/).test(rows['obtained'])));

        let campaign = {
            act1: [],
            act2: [],
            act3: [],
            act4: [],
            act4hg: [],
            act4c: []
        }
        let phorampa = [];
        let pirates = [];
        let palace = [];
        let temples = {
            air: [],
            earth: [],
            lightning: [],
            water: [],
            fire: [],
            ice: []
        };
        let sanbronsa = {
            tower: [],
            ruins: []
        };
        let randoms = [];
        let itemList = [];

        items.forEach( (item) => {
            let obtainWays = item.obtained.split(' | ');
            obtainWays.forEach( (obt) => {

                let source = '';
                if ((/Dropped by .* in /).test(obt) || obt.includes('Stolen from ')) {
                    if ((/Dropped by .* in /).test(obt))
                        source = 'd';
                    else if (obt.includes('Stolen from '))
                        source = 's';
                    obt = obt.replace('Dropped by ','');
                    obt = obt.replace('Stolen from ','');

                    let locations = obt.split(', ');
                    locations.forEach( (loc) => {
                        let location = {};

                        location.id = item.id;
                        location.item = item.name;
                        location.target = loc.split(' in ', 2)[0];
                        location.source = source;

                        let area = loc.split(' in ', 2)[1];
                        if (area && ((area.startsWith('Chapter') && !area.includes('Phorampa'))
                            || (area.startsWith('CODA') && !area.includes('Palace of the Dead'))
                            || area.includes('main campaign'))) {
                            let act = '';
                            if (area.startsWith('CODA'))
                                act = '4c';
                            else if (area.includes('main campaign'))
                                act = 'a';
                            else act = (/Chapter (\d+)/).exec(area)[1];

                            if (area.includes('Hanging Gardens') || area.includes('Heart of the Gardens')) {
                                act += 'hg';
                                location.area = (/#\d+ - (.+)/).exec(area)[1];
                            } else if (area.startsWith('CODA')) {
                                location.area = (/ - (.+)/).exec(area)[1];
                            } else if (area.includes('main campaign')) {
                                location.area = 'a';
                            } else location.area = (/ - (.+)/).exec(area)[1];

                            if (location.area.includes('(rank')) {
                                location.rank = (/\(rank(\d)/).exec(location.area)[1];
                                location.area = (/(.+?) ?\(rank/).exec(location.area)[1];
                            }
                            if (location.area.includes(' (level')) {
                                location.level = (/\(level (<\d+|\d+\+)/).exec(location.area)[1];
                                location.area = location.area.split(' (level', 2)[0];
                            }

                            if (area.includes(' Chaos'))
                                location.path = 'c';
                            else if (area.includes(' Neutral'))
                                location.path = 'n';
                            else if (area.includes(' Law'))
                                location.path = 'l';

                            if (area.includes('optional battle'))
                                location.battle = 400;
                            else if (area.includes('end battle'))
                                location.battle = 200;
                            else if (area.includes('Heart of the Gardens'))
                                location.battle = 300 + parseInt((/#(\d+)/).exec(area)[1]);
                            else if (area.startsWith('CODA'))
                                location.battle = (/Episode (\d)/).exec(area)[1];
                            else if (area.includes('main campaign'))
                                location.battle = 500;
                            else location.battle = (/#(\d+)/).exec(area)[1];

                            if (act === 'a') {
                                [1,2,3,4].forEach(act => {
                                    campaign['act' + act].push(location);
                                });
                            } else {
                                campaign['act' + act].push(location);
                            }
                        } else if (area && (area.includes('Phorampa')
                            || area.includes('Pirate\'s Graveyard')
                            || area.startsWith('Temple'))) {
                            if (area.includes('Chapter'))
                                location.act = (/Chapter (\d+)/).exec(area)[1];

                            if (area.includes('heavenly general')) location.hg = 1;
                            else location.hg = 0;

                            if ((/#\d/).test(area))
                                location.area = (/#\d+ - (.+)/).exec(area)[1];
                            else location.area = 'a';

                            if (area.includes(' #'))
                                location.battle = (/#(\d+)/).exec(area)[1];
                            else if (location.area === 'a') {
                                location.battle = 500;
                            }

                            if (location.area.includes('(rank')) {
                                location.rank = (/\(rank(\d)/).exec(location.area)[1];
                                location.area = (/(.+?) ?\(rank/).exec(location.area)[1];
                            }
                            if (location.area.includes(' (level')) {
                                location.level = (/\(level (<\d+|\d+\+)/).exec(location.area)[1];
                                location.area = location.area.split(' (level', 2)[0];
                            }
                            if (location.area.includes(' heavenly general'))
                                location.area = location.area.split(' heavenly general', 2)[0];

                            if (area.includes('Phorampa')) {
                                phorampa.push(location);
                                if (area.includes('Phorampa or Pirate\'s Graveyard'))
                                    pirates.push(location);
                            } else if (area.startsWith('Temple')) {
                                if (area.includes('Hahnela')) {
                                    temples.air.push(location);
                                } else if (area.includes('Vaasa')) {
                                    temples.earth.push(location);
                                } else if (area.includes('Nestharot')) {
                                    temples.lightning.push(location);
                                } else if (area.includes('Greuza')) {
                                    temples.water.push(location);
                                } else if (area.includes('Xoshonell')) {
                                    temples.fire.push(location);
                                } else if (area.includes('Lyuneram')) {
                                    temples.ice.push(location);
                                } else {
                                    for (const key in temples) {
                                        temples[key].push(location);
                                    }
                                }
                            } else pirates.push(location);
                        } else if (area && (area.includes('Palace of the Dead') || area.startsWith('San Bronsa '))) {
                            if (area.includes('heavenly general')) location.hg = 1;
                            else location.hg = 0;

                            if (area.includes(' #')) {
                                location.battle = (/#(\d+)/).exec(area)[1];
                                location.area = 'Floor ' + location.battle + (/#\d+(.*)/).exec(area)[1];
                            } else {
                                location.area = 'a';
                                location.battle = 500;
                            }

                            if (location.area.includes('(rank')) {
                                location.rank = (/\(rank(\d)/).exec(location.area)[1];
                                location.area = (/(.+?) ?\(rank/).exec(location.area)[1];
                            }
                            if (location.area.includes(' (level')) {
                                location.level = (/\(level (<\d+|\d+\+)/).exec(location.area)[1];
                                location.area = location.area.split(' (level', 2)[0];
                            }
                            if (location.area.includes(' heavenly general'))
                                location.area = location.area.split(' heavenly general', 2)[0];

                            if (area.startsWith('San Bronsa ')) {
                                if (area.includes('Tower of Law Eternal')) {
                                    sanbronsa.tower.push(location);
                                } else if (area.includes('Floating Ruins')) {
                                    sanbronsa.ruins.push(location);
                                }
                            } else palace.push(location);
                        } else if (area && area.includes(' random battle')) {
                            if (area.includes('(rank')) {
                                location.rank = (/\(rank(\d)/).exec(area)[1];
                            }
                            if (area.includes(' (level'))
                                location.level = (/\(level (<\d+|\d+\+)/).exec(area)[1];

                            location.area = area.split(' random battle', 2)[0];
                            location.battle = 500;
                            randoms.push(location);
                        }
                    });
                }
            });
        });

        listDrops();

        async function listDrops() {
            itemList = await fetchJSON(weaponsJson);
            itemList = itemList.concat(await fetchJSON(armorJson));
            itemList = itemList.concat(await fetchJSON(sundriesJson));

            for (const key in campaign) {
                if (campaign[key].length) {
                    fillTable (campaign[key], key);
                }
            }
            if (randoms.length) {
                fillTable (randoms, 'randoms');
            }
            if (phorampa.length) {
                fillTable (phorampa, 'phorampa');
            }
            if (pirates.length) {
                fillTable (pirates, 'pirates');
            }
            for (const key in temples) {
                if (temples[key].length) {
                    fillTable (temples[key], key);
                }
            }
            if (palace.length) {
                fillTable (palace, 'palace');
            }
            for (const key in sanbronsa) {
                if (sanbronsa[key].length) {
                    fillTable (sanbronsa[key], key);
                }
            }
        }

        function fillTable (drops, section) {
            let tableContainer = document.getElementById(section);
            tableContainer.classList.remove('hidden');
            let table = tableContainer.querySelector('table tbody');
            drops = drops.sort((a, b) => a.battle - b.battle || a.area.localeCompare(b.area) || a.hg - b.hg || a.target.localeCompare(b.target));
            drops.forEach( (drop) => {
                let tr = document.createElement('tr');
                if (drop.path === 'l')
                    tr.classList.add('law');
                else if (drop.path === 'n')
                    tr.classList.add('neutral');
                else if (drop.path === 'c')
                    tr.classList.add('chaos');
                if (section === 'phorampa') {
                    let act = document.createElement('td');
                    act.classList.add('act');
                    console.log(drop.act);
                    if (drop.act === '2') act.innerText = 'II';
                    else if (drop.act === '3') act.innerText = 'III';
                    else if (drop.act === '4') act.innerText = 'IV';
                    tr.append(act);
                }
                if (!['randoms', 'palace', 'tower', 'ruins'].includes(section)) {
                    let battle = document.createElement('td');
                    battle.classList.add('battle');
                    if (drop.battle / 100 >= 2 && drop.battle / 100 < 3) {
                        battle.innerText = 'end';
                        if (drop.battle > 200) battle.innerText += drop.battle - 200;
                    } else if (drop.battle / 100 >= 3 && drop.battle / 100 < 4) {
                        battle.innerText = 'end';
                        if (drop.battle > 300) battle.innerText += drop.battle - 300;
                    } else if (drop.battle / 100 >= 4 && drop.battle / 100 < 5) {
                        battle.innerText = 'opt';
                    } else if (drop.battle / 100 >= 5 && drop.battle / 100 < 6) {
                        battle.innerText = '';
                    } else {
                        battle.innerText = (section === 'act4c' ? 'ep' : '') + drop.battle;
                    }
                    tr.append(battle);
                }
                let area = document.createElement('td');
                area.classList.add('area');
                if (drop.hg) {
                    area.innerHTML += '<i class="hg">&nbsp;</i>';
                }
                area.innerHTML += drop.area === 'a' ? '—' : drop.area;
                let target = document.createElement('td');
                target.classList.add('target');
                target.innerHTML += '<i class="' + (drop.source === 'd' ? 'drop' : 'steal') + '">' + (drop.rank ? drop.rank : '&nbsp;') + '</i>';
                target.innerHTML += drop.target;
                let loot = document.createElement('td');
                loot.classList.add('loot');
                let item = itemList.find((row) => row.id === drop.id);
                let classImg = document.createElement('img');
                if (item.typ > 160 && item.typ !== 182) {
                    classImg.src = item.hnd === 1 ? itemTypes[item.typ].icon2 : itemTypes[item.typ].icon1;
                    if (item.skillbonamt >= 8) classImg.classList.add('uni');
                } else if (item.typ < 30 || item.typ === 182) {
                    classImg.src = item.var ? itemTypes[item.typ]['icon' + item.var] : itemTypes[item.typ]['icon'];
                    if (item.skillbonamt >= 8) classImg.classList.add('uni');
                } else {
                    classImg.src = itemTypes[item.typ]['icon'];
                    if ( item.unique === 1 ) classImg.classList.add('uni');
                }
                loot.append(classImg);
                loot.innerHTML += drop.item;

                tr.append(area, target, loot);
                table.append(tr);
            });
        }
    });

    let lawButtons = document.querySelectorAll('button.law');
    let neutralButtons = document.querySelectorAll('button.neutral');
    let chaosButtons = document.querySelectorAll('button.chaos');
    document.querySelectorAll('button.law, button.neutral, button.chaos').forEach( (element) => {
        element.addEventListener('click', function (event) {
            if (event.target.classList.contains('law')) {
                neutralButtons.forEach( (element) => {element.classList.remove('active');});
                chaosButtons.forEach( (element) => {element.classList.remove('active');});
                lawButtons.forEach( (element) => {element.classList.add('active');});
            } else if (event.target.classList.contains('neutral')) {
                lawButtons.forEach( (element) => {element.classList.remove('active');});
                chaosButtons.forEach( (element) => {element.classList.remove('active');});
                neutralButtons.forEach( (element) => {element.classList.add('active');});
                document.querySelector('#act2 button.chaos').classList.add('active');
            } else if (event.target.classList.contains('chaos')) {
                lawButtons.forEach( (element) => {element.classList.remove('active');});
                neutralButtons.forEach( (element) => {element.classList.remove('active');});
                chaosButtons.forEach( (element) => {element.classList.add('active');});
            }
        });
    });
});