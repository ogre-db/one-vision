
document.addEventListener('DOMContentLoaded', function() {

    const obtainsJson = 'data/obtains.json';

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

        console.log(items);

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

                            if (area.includes(' #'))
                                location.battle = (/#(\d+)/).exec(area)[1];

                            if (area.includes('heavenly general')) location.hg = 1;

                            if ((/#\d/).test(area))
                                location.area = (/#\d+ - (.+)/).exec(area)[1];
                            else location.area = 'a';

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

                            if (area.includes(' #')) {
                                location.battle = (/#(\d+)/).exec(area)[1];
                                location.area = 'Floor ' + location.battle + (/#\d+(.*)/).exec(area)[1];
                            } else location.area = '';

                            if (location.area.includes('(rank')) {
                                location.rank = (/\(rank(\d)/).exec(location.area)[1];
                                location.area = (/(.+?) ?\(rank/).exec(location.area)[1];
                            }
                            if (location.area.includes(' (level')) {
                                location.level = (/\(level (<\d+|\d+\+)/).exec(location.area)[1];
                                location.area = location.area.split(' (level', 2)[0];
                            }

                            if (area.startsWith('San Bronsa ')) {
                                if (area.includes('Tower of Law Eternal')) {
                                    sanbronsa.tower.push(location);
                                } else if (area.includes('Floating Ruins')) {
                                    sanbronsa.ruins.push(location);
                                }
                            }
                            palace.push(location);
                        } else if (area && area.includes(' random battle')) {
                            if (area.includes('(rank')) {
                                location.rank = (/\(rank(\d)/).exec(area)[1];
                            }
                            if (area.includes(' (level'))
                                location.level = (/\(level (<\d+|\d+\+)/).exec(area)[1];

                            location.area = area.split(' random battle', 2)[0];
                            randoms.push(location);
                        }
                    });
                }
            });
        });

        console.log(campaign);
        console.log(phorampa);
        console.log(pirates);
        console.log(temples);
        console.log(palace);
        console.log(sanbronsa);
        console.log(randoms);

        for (const key in campaign) {
            if (campaign[key].length) {
                let tableContainer = document.getElementById(key);
                let drops = campaign[key].sort((a, b) => a.battle - b.battle || a.area.localeCompare(b.area) || a.target.localeCompare(b.target));
                tableContainer.classList.remove('hidden');
                let table = tableContainer.querySelector('table tbody');

                drops.forEach( (drop) => {
                    let tr = document.createElement('tr');
                    let battle = document.createElement('td');
                    if (drop.battle === 's')
                        battle.innerText = 'any'
                    else if (drop.battle === 'e')
                        battle.innerText = 'end';
                    else if (drop.battle === 'o')
                        battle.innerText = 'opt';
                    else
                        battle.innerText = drop.battle;
                    let area = document.createElement('td');
                    area.innerText = drop.area === 'a' ? '—' : drop.area;
                    let target = document.createElement('td');
                    target.innerText = drop.target;
                    let item = document.createElement('td');
                    item.innerText = drop.item;
                    let source = document.createElement('td');
                    source.innerHTML = '<img src="img/icons/' + ( drop.source === 'd' ? 'item-treasure' : 'icon-hands1') +  '.png" />';

                    tr.append(battle, area, target, item, source);
                    table.append(tr);
                });
            }
        }
    });
});