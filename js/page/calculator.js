
document.addEventListener('DOMContentLoaded', function() {

    const skillsJson = 'data/skills.json',
        jobsJson = 'data/jobs.json',
        abilitiesJson = 'data/abilities.json',
        magicJson = 'data/magic.json',
        obtainsJson = 'data/obtains.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json',
        templatesJson = 'data/templates.json';
    let skills = [],
        jobs = [],
        abilities = [],
        magic = [],
        obtains = [],
        weapons = [],
        armor = [],
        sundries = [],
        templates = [];

    initCalculators();

    async function initCalculators() {

        templates = await fetchJSON(templatesJson);
        jobs = await fetchJSON(jobsJson);
        weapons = await fetchJSON(weaponsJson);
        armor = await fetchJSON(armorJson);
        skills = await fetchJSON(skillsJson);

        adjustStats(templates);

        listOptions('.select-template', templates, [
                {'calculator': 'attackDamage', 'attacker': 162, 'defender': 186}
            ]
        );

        listOptions('.select-template-var',
            [
                {'id': 0, 'name': 'Default'},
                {'id': 1, 'name': 'Warrior'},
                {'id': 2, 'name': 'Rogue'},
                {'id': 3, 'name': 'Mage'},
            ],
            [
                {'calculator': 'attackDamage', 'attacker': 1, 'defender': 2}
        ]);

        listOptions('.select-class', jobs, [
            {'calculator': 'attackDamage', 'attacker': 1, 'defender': 2}
        ]);

        let levels = [];
        for(let i = 1; i <= 50; i++) {levels.push({'id': i, 'name': i});}
        listOptions('.select-class-level', levels, [
            {'calculator': 'attackDamage', 'attacker': 26, 'defender': 26}
        ]);

        listOptions('.select-main-hand', weapons, [
                {'calculator': 'attackDamage', 'attacker': 66, 'defender': 322}
            ]
        );

        listOptions('.select-off-hand', [{'id': 0, 'name': ''}].concat(armor.filter((rows) => rows['typ'] === 182)), [
                {'calculator': 'attackDamage', 'attacker': 411, 'defender': 408}
            ]
        );

        let armorSlots = [{'id': 0, 'name': ''}].concat(armor.filter((rows) => ![182,29].includes(rows['typ'])));
        listOptions('.select-armor-1', armorSlots, [
                {'calculator': 'attackDamage', 'attacker': 498, 'defender': 433}
            ], true
        );

        listOptions('.select-armor-2', armorSlots, [
                {'calculator': 'attackDamage', 'attacker': 456, 'defender': 453}
            ], true
        );

        listOptions('.select-jewelry', [{'id': 0, 'name': ''}].concat(armor.filter((rows) => rows['typ'] === 29)), [
                {'calculator': 'attackDamage', 'attacker': 542, 'defender': 548}
            ]
        );

        let skillRanks = [];
        for(let i = 0; i <= 8; i++) {skillRanks.push({'id': i, 'name': i});}
        listOptions('.select-wp-rank', skillRanks, [
                {'calculator': 'attackDamage', 'attacker': 4, 'defender': null}
            ]
        );

        listOptions('.select-aug-rank', skillRanks, [
                {'calculator': 'attackDamage', 'attacker': 3, 'defender': 1}
            ]
        );

        listOptions('.select-rac-rank', skillRanks, [
                {'calculator': 'attackDamage', 'attacker': 2, 'defender': null}
            ]
        );

        listOptions('#attackDamage .attacker .select-ready', getOptionList([0,15,17,20,21,22,26]));
        listOptions('#attackDamage .defender .select-ready', getOptionList([0,25,39,45]));

        listStatuses([22,39,40,45,46,11,70,78,34]);

        runFormula(null, document.getElementById('attackDamage'));

        document.querySelectorAll('select').forEach( (element) => {
            element.onchange = function(){
                runFormula(this, element.closest('.calculator'));
            };
        });
        document.querySelectorAll('input').forEach( (element) => {
            element.oninput = function(){
                runFormula(this, element.closest('.calculator'));
            };
        });
    }

    function runFormula(input, calculator) {
        let attacker = {
            role: 'attacker',
            equipment: {},
            status: [],
            statTotal: {},
            skills: {}
        };
        let defender = {
            role: 'defender',
            equipment: {},
            status: [],
            statTotal: {},
            skills: {}
        };

        attacker.template = Object.assign({}, templates.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-template').value)));
        if (attacker.template.typ === 'G') {
            applyStatVariant(attacker.template, calculator.querySelector('.attacker .select-template-var').value)
            calculator.querySelector('.attacker .select-template-var').removeAttribute('disabled');
        } else {
            calculator.querySelector('.attacker .select-template-var').setAttribute('disabled', 'disabled');
        }
        defender.template = Object.assign({}, templates.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-template').value)));
        if (defender.template.typ === 'G') {
            applyStatVariant(defender.template, calculator.querySelector('.defender .select-template-var').value)
            calculator.querySelector('.defender .select-template-var').removeAttribute('disabled');
        } else {
            calculator.querySelector('.defender .select-template-var').setAttribute('disabled', 'disabled');
        }

        attacker.class = jobs.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-class').value));
        attacker.level = parseInt(calculator.querySelector('.attacker .select-class-level').value);
        defender.class = jobs.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-class').value));
        defender.level = parseInt(calculator.querySelector('.defender .select-class-level').value);

        attacker.equipment.mainHand = weapons.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-main-hand').value));
        attacker.equipment.offHand = armor.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-off-hand').value)) ?? null;
        attacker.equipment.armor1 = armor.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-armor-1').value)) ?? null;
        attacker.equipment.armor2 = armor.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-armor-2').value)) ?? null;
        attacker.equipment.jewelry = armor.find((item) => item.id === parseInt(calculator.querySelector('.attacker .select-jewelry').value)) ?? null;

        defender.equipment.mainHand = weapons.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-main-hand').value)) ?? null;
        defender.equipment.offHand = armor.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-off-hand').value)) ?? null;
        defender.equipment.armor1 = armor.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-armor-1').value)) ?? null;
        defender.equipment.armor2 = armor.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-armor-2').value)) ?? null;
        defender.equipment.jewelry = armor.find((item) => item.id === parseInt(calculator.querySelector('.defender .select-jewelry').value)) ?? null;

        attacker.skills.wskl = parseInt(calculator.querySelector('.attacker .select-wp-rank') ? calculator.querySelector('.attacker .select-wp-rank').value : 0);
        attacker.skills.aug = parseInt(calculator.querySelector('.attacker .select-aug-rank') ? calculator.querySelector('.attacker .select-aug-rank').value : 0);
        attacker.skills.rac = parseInt(calculator.querySelector('.attacker .select-rac-rank') ? calculator.querySelector('.attacker .select-rac-rank').value : 0);
        defender.skills.wskl = parseInt(calculator.querySelector('.defender .select-wp-rank') ? calculator.querySelector('.defender .select-wp-rank').value : 0);
        defender.skills.aug = parseInt(calculator.querySelector('.defender .select-aug-rank') ? calculator.querySelector('.defender .select-aug-rank').value : 0);
        defender.skills.rac = parseInt(calculator.querySelector('.defender .select-rac-rank') ? calculator.querySelector('.defender .select-rac-rank').value : 0);

        attacker.readied = parseInt(calculator.querySelector('.attacker .select-ready').value);
        defender.readied = parseInt(calculator.querySelector('.defender .select-ready').value);

        calculator.querySelectorAll('.attacker input:checked').forEach( (element) => {
            attacker.status.push({id: element.getAttribute('data-id') ? parseInt(element.getAttribute('data-id')) : null, effect: element.getAttribute('data-effect')});
        });
        calculator.querySelectorAll('.defender input:checked').forEach( (element) => {
            defender.status.push({id: element.getAttribute('data-id') ? parseInt(element.getAttribute('data-id')) : null, effect: element.getAttribute('data-effect')});
        });

        checkSelections(attacker, defender, calculator, input);

        if (calculator.id === 'attackDamage') {

            // STEP 1
            let formula = damageScaling[attacker.equipment.mainHand.frm];

            if (attacker.equipment.mainHand.dmgt) {
                calculator.querySelector('.attacker .scaling .damage-type').src = damageTypes[attacker.equipment.mainHand.dmgt].icon;
                calculator.querySelector('.attacker .scaling .damage-type').classList.remove('hidden');
            } else
                calculator.querySelector('.attacker .scaling .damage-type').classList.add('hidden');
            if (attacker.equipment.mainHand.ele) {
                calculator.querySelector('.attacker .scaling .damage-element').src = elements[attacker.equipment.mainHand.ele].icon;
                calculator.querySelector('.attacker .scaling .damage-element').classList.remove('hidden');
            } else
                calculator.querySelector('.attacker .scaling .damage-element').classList.add('hidden');
            if (!attacker.equipment.mainHand.ele && !attacker.equipment.mainHand.dmgt) {
                calculator.querySelector('.attacker .scaling .damage-type').src = damageTypes[6].icon;
                calculator.querySelector('.attacker .scaling .damage-type').classList.remove('hidden');
            }
            calculator.querySelector('.attacker .scaling b').innerHTML = damageScaling[attacker.equipment.mainHand.frm].desc;

            calculateTableData('attackDamage-1', attacker, defender, formula);

            [attacker, defender].forEach( (entity) => {
                let tableBody = calculator.querySelector('.' + [entity.role] + ' table.basic tbody');
                let row = null;
                let cell = null;
                tableBody.innerHTML = '';
                entity.tableData.forEach( (set, index) => {
                    row = document.createElement('tr');
                    cell = document.createElement('td');cell.innerHTML = set.label;
                    if (index === entity.tableData.length - 1) cell.setAttribute('colspan', 5);
                    row.append(cell);
                    if (set.base || set.skill) {
                        if(!entity.tableData[index+1].base && !entity.tableData[index+1].skill && entity.tableData[index+1].multi) row.classList.add('divider');
                        cell = document.createElement('td');cell.innerHTML = set.base || set.skill;
                        row.append(cell);
                        cell = document.createElement('td');cell.innerHTML = set.class > 0 ? Number(set.class.toFixed(1)) : '';
                        row.append(cell);
                        cell = document.createElement('td');cell.innerHTML = Number.isNaN(set.gear) ? '' : (set.gear < 0 ? '<span class="red">' + set.gear + '</span>' : (set.gear > 0 ? '+' : '') + set.gear);
                        row.append(cell);
                        cell = document.createElement('td');
                            cell.innerHTML = 'x' + (set.label === 'STR' && attacker.readied === 15 ? Number((set.multi * 2/3).toFixed(2)) + ' <b>x1.5</b><img src="img/icons/ability-special.png">' : set.multi);
                        row.append(cell);
                    } else if (set.multi) {
                        cell = document.createElement('td');
                        cell.setAttribute('colspan', 4);
                        row.append(cell);
                    }
                    cell = document.createElement('td');cell.innerHTML = set.total ? Number(set.total.toFixed(2)).toString() : ('<span class="' + (set.multi < 1 ? 'red' : '') + '">x' + set.multi + '</span>');
                    row.append(cell);
                    tableBody.append(row);
                });
            });

            calculator.querySelectorAll('.calc-step.one .sum .value')[0].innerText = Number(attacker.tableData[attacker.tableData.length - 1].total.toFixed(2)).toString();
            calculator.querySelectorAll('.calc-step.one .sum .value')[2].innerText = Number(defender.tableData[defender.tableData.length - 1].total.toFixed(2)).toString();
            let overhead = Math.floor(Math.max(attacker.tableData[attacker.tableData.length - 1].total - defender.tableData[defender.tableData.length - 1].total, 0));
            calculator.querySelectorAll('.calc-step.one .sum .value')[1].innerText = overhead;

            // STEP 2
            calculateTableData('attackDamage-2', attacker, defender, formula);

            [attacker, defender].forEach( (entity) => {
                let tableBody = calculator.querySelector('.' + [entity.role] + ' table.bonuses tbody');
                let row = null;
                let cell = null;
                tableBody.innerHTML = '';
                entity.tableData.forEach( (set, index) => {
                    row = document.createElement('tr');
                    cell = document.createElement('td');cell.innerHTML = set.label;
                    if (index === entity.tableData.length - 1) cell.setAttribute('colspan', 4);
                    row.append(cell);
                    if (set.physical || set.elemental || set.racial) {
                        if(!entity.tableData[index+1].physical && !entity.tableData[index+1].elemental && !entity.tableData[index+1].racial) row.classList.add('divider');

                        cell = document.createElement('td');cell.innerHTML = set.physical > 0 ? ((set.physical > 0 ? '+' : '') + set.physical + '% <img src="' + damageTypes[attacker.equipment.mainHand.dmgt].icon + '">') : '';
                        row.append(cell);
                        cell = document.createElement('td');cell.innerHTML = set.elemental > 0 ? ((set.elemental > 0 ? '+' : '') + set.elemental + '% <img src="' + elements[attacker.equipment.mainHand.ele].icon + '">') : '';
                        row.append(cell);
                        cell = document.createElement('td');
                            cell.innerHTML = set.racial > 0 ? ((set.racial > 0 ? '+' : '') + set.racial + '% <img src="' + races[(entity.role === 'attacker' ? defender.template.race : attacker.template.race) * 2].icon + '">') : '';
                        row.append(cell);
                    } else if (index < entity.tableData.length - 1) {
                        cell = document.createElement('td');
                        cell.setAttribute('colspan', 3);
                        row.append(cell);
                    }
                    cell = document.createElement('td');cell.innerHTML = '<span class="' + (set.total < 0 ? 'red' : '') + '">' + Number(set.total.toFixed(2)).toString() + '%</span>';
                    row.append(cell);
                    tableBody.append(row);
                });
            });

            calculator.querySelectorAll('.calc-step.two .sum .value')[0].innerText = Number(attacker.tableData[attacker.tableData.length - 1].total.toFixed(2)).toString() + '%';
            calculator.querySelectorAll('.calc-step.two .sum .value')[2].innerText = Number(defender.tableData[defender.tableData.length - 1].total.toFixed(2)).toString() + '%';
            overhead = Math.floor(Math.max(overhead * (100 + attacker.tableData[attacker.tableData.length - 1].total - defender.tableData[defender.tableData.length - 1].total) / 100, 0));
            calculator.querySelectorAll('.calc-step.two .sum .value')[1].innerText = overhead;

            // STEP 3
            calculateTableData('attackDamage-3', attacker, defender, formula);

            [attacker, defender].forEach( (entity) => {
                let tableBody = calculator.querySelector('.' + [entity.role] + ' table.extra tbody');
                let row = null;
                let cell = null;
                tableBody.innerHTML = '';
                entity.tableData.forEach( (set, index) => {
                    row = document.createElement('tr');
                    cell = document.createElement('td');cell.innerHTML = set.label;
                    if (index === entity.tableData.length - 1) cell.setAttribute('colspan', 3);
                    row.append(cell);
                    if (set.amount) {
                        if(!entity.tableData[index+1].amount) row.classList.add('divider');
                        cell = document.createElement('td');cell.innerHTML = set.amount;
                        row.append(cell);
                        cell = document.createElement('td');
                            cell.innerHTML = 'x' + (set.slot === 'mainHand' && [170,171].includes(attacker.equipment.mainHand.typ) && attacker.readied === 17 ? Number((set.multi * 4/5).toFixed(2)) + ' <b>x1.25</b><img src="img/icons/ability-special.png">' : set.multi);
                        row.append(cell);
                    } else if (set.multi) {
                        cell = document.createElement('td');
                        cell.setAttribute('colspan', 2);
                        row.append(cell);
                    }
                    cell = document.createElement('td');cell.innerHTML = set.total ? Number(set.total.toFixed(2)).toString() : ('<span class="' + (set.multi < 1 ? 'red' : '') + '">x' + set.multi + '</span>');
                    row.append(cell);
                    tableBody.append(row);
                });
            });

            calculator.querySelectorAll('.calc-step.three .sum .value')[0].innerText = Number(attacker.tableData[attacker.tableData.length - 1].total.toFixed(2)).toString();
            calculator.querySelectorAll('.calc-step.three .sum .value')[2].innerText = Number(defender.tableData[defender.tableData.length - 1].total.toFixed(2)).toString();
            let totalDamage = Math.floor(Math.max(overhead + attacker.tableData[attacker.tableData.length - 1].total - defender.tableData[defender.tableData.length - 1].total, 1));
            calculator.querySelectorAll('.calc-step.three .sum .value')[1].innerText = totalDamage;

            // STEP 4
            calculateTableData('attackDamage-4', attacker, defender, formula);


            let tableBody = calculator.querySelector('table.multis tbody');
            let row = null;
            let cell = null;
            tableBody.innerHTML = '';
            attacker.tableData.forEach( (set, index) => {
                row = document.createElement('tr');
                cell = document.createElement('td');cell.innerHTML = set.label;
                row.append(cell);
                cell = document.createElement('td');cell.innerHTML = '<span class="' + (set.multi < 1 ? 'red' : '') + '">x' + Number(set.multi.toFixed(2)).toString() + '</span>';
                row.append(cell);
                tableBody.append(row);
            });
            calculator.querySelectorAll('.calc-step.four .sum .value')[0].innerText = totalDamage === 1 ? 1 : Math.floor(totalDamage * (attacker.tableData[attacker.tableData.length - 1].multi));
        }
    }

    function calculateTableData(step, attacker, defender, formula) {
        attacker.tableData = [];
        defender.tableData = [];
        [attacker, defender].forEach( (entity) => {
            if (step === 'attackDamage-1') {
                ['str','vit','dex','int','mnd','res','wskl','aug','rac'].forEach( (stat) => {
                    if (formula[entity.role][stat] > 0) {
                        let classStat = (entity.class[stat] ?? 0) + (entity.class[stat+'grw'] ?? 0)/10 * (entity.level - 1);
                        let skillId = null;
                        let label = stat.toUpperCase();
                        if (stat === 'wskl') {
                            skillId = attacker.equipment.mainHand.typ - 160;
                            label = skills.find((item) => item.id === skillId).name;
                        } else if (stat === 'aug') {
                            skillId = attacker.equipment.mainHand.ele ? attacker.equipment.mainHand.ele + 30 : null;
                            label = skillId ? skills.find((item) => item.id === skillId).name : null;
                        } else if (stat === 'rac') {
                            skillId = defender.template.race < 10 ? defender.template.race + 21 : null;
                            label = skillId ? skills.find((item) => item.id === skillId).name : null;
                        }
                        if (entity.template[stat] || entity.skills[stat] && skillId) {
                            let gearBonus;
                            if (skillId) {
                                gearBonus = Object.values(entity.equipment).reduce((accumulator, item) => {
                                    return accumulator + (item && item.skillbon && skillId === item.skillbon ?
                                        (item.skillbonamt> 24 ? item.skillbonamt - 24 : (item.skillbonamt > 8 ? item.skillbonamt - 8 : item.skillbonamt)):
                                        0);
                                }, 0)
                            } else {
                                gearBonus = Object.values(entity.equipment).reduce((accumulator, item) => {
                                    return accumulator + (item ? (item[stat] > 128 ? item[stat] - 256 : item[stat]) : 0);
                                }, 0)
                            }
                            let multi = Number((formula[entity.role][stat] * (stat === 'str' && attacker.readied === 15 ? 1.5 : 1)).toFixed(2));
                            let dataRow = {
                                'label': label,
                                'base': entity.template[stat] ?? 0,
                                'class': classStat,
                                'skill': entity.skills[stat] ?? 0,
                                'gear': gearBonus,
                                'multi': multi,
                                'total': ((entity.template[stat] ?? 0) + classStat + (entity.skills[stat] ?? 0) + gearBonus) * multi
                            };
                            entity.tableData.push(dataRow);
                        }
                    }
                });

                if (entity.status.find((item) => item.id === 22)) {
                    entity.tableData.push({
                        'label': statusEffects[18][22].name,
                        'multi': 0.85
                    });
                }
                if (entity.readied === 20 && [2,4].includes(defender.template.race)) {
                    entity.tableData.push({
                        'label': races[defender.template.race * 2].name + ' Slayer',
                        'multi': 1.5
                    });
                }
                if (entity.readied === 21 && [2,4,6,8,9].includes(defender.template.race)) {
                    entity.tableData.push({
                        'label': defender.template.race === 2 ? 'Beastbane' : defender.template.race === 4 ? 'Dragonsbane' : [6,8].includes(defender.template.race) ? 'Evilsbane' : defender.template.race === 9 ? 'Golemsbane' : '',
                        'multi': 1.25
                    });
                }
                if (entity.readied === 26) {
                    entity.tableData.push({
                        'label': statusEffects[20][26].name,
                        'multi': 1.3
                    });
                }

                if (entity.readied === 25) {
                    entity.tableData.push({
                        'label': statusEffects[20][25].name,
                        'multi': 1.5
                    });
                }

                entity.tableData.push({
                    'label': [entity.role].toString() === 'attacker' ? 'Total Offense:' : 'Total Toughness:',
                    'total': entity.tableData.reduce((accumulator, item) => {return (item.total ? (accumulator + item.total) : (accumulator * item.multi));}, 0)
                });
            }
            if (step === 'attackDamage-2') {
                Object.keys(entity.equipment).forEach( (slot) => {
                    if (entity.equipment[slot]) {
                        let physical = null;
                        let elemental = null;
                        let racial = null;
                        if (entity.role === 'attacker') {
                            if (['mainHand','jewelry'].includes(slot)) {
                                if (slot === 'mainHand') {
                                    physical = entity.equipment[slot].dmgtamt;
                                    elemental = entity.equipment[slot].eleamt;
                                    racial =  defender.template.race < 10 && Math.floor(entity.equipment[slot].rcbon / 2) === defender.template.race ? racial = entity.equipment[slot].rcamt : 0;
                                }
                                if (slot === 'jewelry') {
                                    physical = entity.equipment[slot][damageTypes[attacker.equipment.mainHand.dmgt].res] ?? 0;
                                    elemental = entity.equipment[slot][elements[attacker.equipment.mainHand.ele].res] ?? 0;
                                    racial = defender.template.race < 10 ? entity.equipment[slot][races[defender.template.race * 2].res] : 0;
                                }
                            }
                        }
                        if (entity.role === 'defender') {
                            physical = entity.equipment[slot][damageTypes[attacker.equipment.mainHand.dmgt].res] ?? 0;
                            elemental = entity.equipment[slot][elements[attacker.equipment.mainHand.ele].res] ?? 0;
                            racial = defender.template.race < 10 ? entity.equipment[slot][races[attacker.template.race * 2].res] : 0;
                        }
                        if (physical || elemental || racial) {
                            let dataRow = {
                                'label': entity.equipment[slot].name,
                                'physical': physical,
                                'elemental': elemental,
                                'racial': racial,
                                'total': physical + elemental + racial
                            };
                            entity.tableData.push(dataRow);
                        }
                    }
                });

                let statusChecks = entity.role === 'attacker' ? [39,40] : [45,46,11,70,78,34];
                statusChecks.forEach( (statusId) => {
                    if (entity.status.find((item) => item.id === statusId)) {
                        let label;
                        if ([70,78].includes(statusId)) {
                            if (attacker.equipment.mainHand.ele) {
                                label = statusId === 70 ? statusEffects[18][69 + attacker.equipment.mainHand.ele].name : statusEffects[18][77 + attacker.equipment.mainHand.ele].name;
                            }
                        } else {
                            label = statusEffects[18][statusId].name;
                        }
                        if (label) {
                            entity.tableData.push({
                                'label': label,
                                'total': formula[entity.role][statusEffects[18][statusId].bonus]
                            });
                        }
                    }
                });

                entity.tableData.push({
                    'label': [entity.role].toString() === 'attacker' ? 'Total Bonus:' : 'Total Resistance:',
                    'total': entity.tableData.reduce((accumulator, item) => {return (item.total ? (accumulator + item.total) : (accumulator * item.multi));}, 0)
                });
            }
            if (step === 'attackDamage-3') {
                let amount = entity.role === 'attacker' ? (entity.class.atk + entity.class.atkgrw) * (entity.level - 1) / 10 : (entity.class.def + entity.class.defgrw) * (entity.level - 1) / 10;
                let multi = entity.role === 'attacker' ? formula[entity.role].clsatk : formula[entity.role].clsdef
                let dataRow = {
                    'label': 'Class',
                    'amount': amount,
                    'multi': multi,
                    'total': amount * multi,
                };
                entity.tableData.push(dataRow);

                Object.keys(entity.equipment).forEach( (slot) => {
                    if (entity.equipment[slot]) {
                        amount = null;
                        multi = null;
                        if (slot === 'mainHand') {
                            amount = entity.role === 'attacker' ? entity.equipment[slot].atk : 0;
                            multi = entity.role === 'attacker' ? formula[entity.role].wpatk : 1;
                            if ([170,171].includes(entity.equipment[slot].typ) && attacker.readied === 17) multi = Number((multi * 1.25).toFixed(2));
                        } else if (slot === 'offHand') {
                            amount = entity.role === 'attacker' ? 0 : entity.equipment[slot].def;
                            multi = entity.role === 'attacker' ? 1 : formula[entity.role].shdef;
                        } else if (['armor1','armor2'].includes(slot)) {
                            amount = entity.role === 'attacker' ? entity.equipment[slot].atk : entity.equipment[slot].def;
                            multi = entity.role === 'attacker' ? formula[entity.role].aratk : formula[entity.role].ardef;
                        } else if (slot === 'jewelry') {
                            amount = entity.role === 'attacker' ? entity.equipment[slot].atk : entity.equipment[slot].def;
                            multi = entity.role === 'attacker' ? formula[entity.role].jwatk : formula[entity.role].jwdef;
                        }
                        if (amount) {
                            let dataRow = {
                                'label': entity.equipment[slot].name,
                                'slot': slot,
                                'amount': amount,
                                'multi': multi,
                                'total': amount * multi,
                            };
                            entity.tableData.push(dataRow);
                        }
                    }
                });

                if (entity.status.find((item) => item.id === 22)) {
                    entity.tableData.push({
                        'label': statusEffects[18][22].name,
                        'multi': 0.85
                    });
                }
                if (entity.readied === 20 && [2,4].includes(defender.template.race)) {
                    entity.tableData.push({
                        'label': races[defender.template.race * 2].name + ' Slayer',
                        'multi': 1.5
                    });
                }
                if (entity.readied === 21 && [2,4,6,8,9].includes(defender.template.race)) {
                    entity.tableData.push({
                        'label': defender.template.race === 2 ? 'Beastbane' : defender.template.race === 4 ? 'Dragonsbane' : [6,8].includes(defender.template.race) ? 'Evilsbane' : defender.template.race === 9 ? 'Golemsbane' : '',
                        'multi': 1.25
                    });
                }
                if (entity.readied === 26) {
                    entity.tableData.push({
                        'label': statusEffects[20][26].name,
                        'multi': 1.3
                    });
                }

                if (entity.readied === 25) {
                    entity.tableData.push({
                        'label': statusEffects[20][25].name,
                        'multi': 1.5
                    });
                }

                entity.tableData.push({
                    'label': [entity.role].toString() === 'attacker' ? 'Total Attack:' : 'Total Defense:',
                    'total': entity.tableData.reduce((accumulator, item) => {return (item.total ? (accumulator + item.total) : (accumulator * item.multi));}, 0)
                });
            }
            if (step === 'attackDamage-4') {
                if (entity.status.find((item) => item.id === 101)) {
                    attacker.tableData.push({
                        'label': 'Critical Hit',
                        'multi': 1.5
                    });
                }
                if (entity.status.find((item) => item.id === 102) && attacker.equipment.mainHand.ele && defender.skills.aug) {
                    attacker.tableData.push({
                        'label': 'Instill ' + elements[attacker.equipment.mainHand.ele].name,
                        'multi': (100 - 4 * defender.skills.aug) / 100
                    });
                }

                if (entity.readied === 22 && [2,4,9].includes(attacker.template.race)) {
                    entity.tableData.push({
                        'label': 'Empower ' + races[attacker.template.race * 2].name,
                        'multi': 2
                    });
                }

                if (entity.readied === 39) {
                    attacker.tableData.push({
                        'label': statusEffects[20][39].name,
                        'multi': 0.1
                    });
                }
                if (entity.readied === 45) {
                    attacker.tableData.push({
                        'label': statusEffects[20][39].name,
                        'multi': 0.2
                    });
                }

                if (entity.role === 'defender') {
                    attacker.tableData.push({
                        'label': 'Total Multiplier:',
                        'multi': attacker.tableData.reduce((accumulator, item) => {return (accumulator * item.multi);}, 1)
                    });
                }
            }
        });
    }

    function checkSelections(attacker, defender, calculator, input) {
        [attacker, defender].forEach( (entity) => {
            if (entity.equipment.mainHand.hnd) {
                entity.equipment.offHand = null;
                calculator.querySelector('.' + entity.role + ' .select-off-hand').setAttribute('disabled', 'disabled');
            } else {
                calculator.querySelector('.' + entity.role + ' .select-off-hand').removeAttribute('disabled');
            }

            calculator.querySelectorAll('.' + entity.role + ' .select-armor-1 option').forEach( (element) => {
                if (entity.equipment.armor2 && parseInt(element.getAttribute('data-type')) === entity.equipment.armor2.typ)
                    element.classList.add('hidden');
                else
                    element.classList.remove('hidden');
            });
            calculator.querySelectorAll('.' + entity.role + ' .select-armor-2 option').forEach( (element) => {
                if (entity.equipment.armor1 && parseInt(element.getAttribute('data-type')) === entity.equipment.armor1.typ)
                    element.classList.add('hidden');
                else
                    element.classList.remove('hidden');
            });

            if (input && input.classList.contains('select-ready')) {
                input.closest('.row').querySelector('p.info').innerHTML = input.querySelectorAll('option')[input.selectedIndex].getAttribute('data-desc');
            }

            if (input && input.checked && input.getAttribute('data-group') && input.closest('.' + entity.role)) {
                calculator.querySelectorAll('.' + entity.role + ' input[data-group="' + input.getAttribute('data-group') + '"]:not([data-id="' + input.getAttribute('data-id') + '"]):checked').forEach( (element) => {
                    entity.status.splice(entity.status.findIndex((item) => item.id === parseInt(element.getAttribute('data-id'))), 1);
                    element.checked = false;
                });
            }
        });

    }

    function listOptions(selector, items, selectedOptions = [], type = null) {
        document.querySelectorAll(selector).forEach( (element) => {
            items.forEach( (item) => {
                let option = document.createElement('option');
                option.setAttribute('value', item.id);
                if (item.desc) option.setAttribute('data-desc', item.desc);
                if (type) option.setAttribute('data-type', item.typ);
                option.textContent = item.name;
                element.append(option);
            });
            let selectedOption = selectedOptions.find((item) => item.calculator === element.closest('.calculator').id);
            if (selectedOption) {
                if (element.closest('.attacker')) element.value = selectedOption.attacker;
                if (element.closest('.defender')) element.value = selectedOption.defender;
            }
        });
    }

    function getOptionList(options) {
        let optionList = [];
        options.forEach( (optionId) => {
            if (optionId === 0) {
                optionList.push({'id': 0, 'name': '', 'desc': ''});
            } else {
                optionList.push({'id': optionId,
                    'name': statusEffects[20][optionId].sharedName ?? statusEffects[20][optionId].name,
                    'desc': statusEffects[20][optionId].sharedEffect ?? statusEffects[20][optionId].effect
                });
            }
        });
        return optionList;
    }

    function listStatuses(statuses) {
        statuses.forEach( (statusId) => {
            document.querySelectorAll('.check-status[data-id="' + statusId + '"]').forEach((element) => {
                element.after(statusEffects[18][statusId].sharedName ?? statusEffects[18][statusId].name);
                element.closest('.row').querySelector('.info').innerHTML = statusEffects[18][statusId].sharedEffect ?? statusEffects[18][statusId].effect;
            });
        });
    }

    function adjustStats(templates) {
        templates.forEach( (template) => {
            if (template.id === 1) {
                template.str += 3;
                template.vit += 2;
                template.dex += 3;
                template.agi += 4;
                template.avd += 4;
                template.int += 2;
                template.mnd += 2;
                template.res += 1;
            } else {
                template.str += 2;
                template.vit += 2;
                template.dex += 2;
                template.agi += 2;
                template.avd += 2;
                template.int += 2;
                template.mnd += 2;
                template.res += 2;
            }
        });
    }
    function applyStatVariant(template, variant) {
        if (variant > 0) {
            let variationType = 'human';
            if ( ([2, 4, 9].includes(template.race)) && !([210, 234].includes(template.id)) )
                variationType = 'monster';

            template.hp += statBonusGeneric[variationType + variant].hp;
            template.mp += statBonusGeneric[variationType + variant].mp;
            template.str += statBonusGeneric[variationType + variant].str;
            template.vit += statBonusGeneric[variationType + variant].vit;
            template.dex += statBonusGeneric[variationType + variant].dex;
            template.agi += statBonusGeneric[variationType + variant].agi;
            template.avd += statBonusGeneric[variationType + variant].avd;
            template.int += statBonusGeneric[variationType + variant].int;
            template.mnd += statBonusGeneric[variationType + variant].mnd;
            template.res += statBonusGeneric[variationType + variant].res
        }
    }

});