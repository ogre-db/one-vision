
document.addEventListener('DOMContentLoaded', function() {

    const tableItemsJson = 'data/classes.json',
        skillsJson = 'data/skills.json',
        abilitiesJson = 'data/abilities.json',
        classesJson = 'data/classes.json',
        shopJson = 'data/shop.json',
        weaponsJson = 'data/weapons.json',
        armorJson = 'data/armor.json',
        sundriesJson = 'data/sundries.json';
    let items = [],
        skills = [],
        abilities = [],
        classes = [],
        shop = [],
        weapons = [],
        armor = [],
        sundries = [];

    let innate;

    const itemList = document.getElementById('itemList'),
        sidePanel = document.getElementById('sidePanel'),
        panelContent = sidePanel.querySelector('.content'),
        infoTitle = sidePanel.querySelector('.title h2'),
        infoMove = sidePanel.querySelector('.stats-top b.move'),
        infoJump = sidePanel.querySelector('.stats-top b.jump'),
        infoPerk = sidePanel.querySelector('.stats-top b.perk'),
        infoRtPenalty = sidePanel.querySelector('.stats-top b.rtpenalty'),
        infoMoveCost = sidePanel.querySelector('.stats-top .movecost b'),
        infoStatsBottom = sidePanel.querySelectorAll('.stats-bottom b'),
        infoInnMelee = sidePanel.querySelector('.stats-extra .innmelee'),
        infoInnRanged = sidePanel.querySelector('.stats-extra .innranged'),
        infoRace = sidePanel.querySelector('.races .uk-accordion-content ul'),
        infoMark = sidePanel.querySelector('.notes .mark'),
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

            let tr = document.createElement('tr');
                tr.id = index;
                let name = document.createElement('td');
                    name.textContent = element.name;
                let move = document.createElement('td');
                    move.textContent = Math.floor((element.moveamt - 4)/4);
                let jump = document.createElement('td');
                    jump.textContent = movementType[element.move];
                let perk = document.createElement('td');
                    perk.textContent = movementPerk[element.moveabl];
                let rt = document.createElement('td');
                    rt.textContent = element.rt;
                let armor = document.createElement('td');
                    armor.textContent = element.bestarmr;
                let magic = document.createElement('td');
                    magic.textContent = element.magic;
                tr.append(name, move, jump, perk, rt, armor, magic);
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

        let selectedRow = itemList.querySelector('tr.selected');
        if (selectedRow) selectedRow.classList.remove('selected');
        targetRow.classList.add('selected');

        let statList = [
            item.atkgrw,
            item.defgrw,
            item.hpgrw,
            item.mpgrw,
            item.strgrw,
            item.vitgrw,
            item.dexgrw,
            item.agigrw,
            item.avdgrw,
            item.intgrw,
            item.mndgrw,
            item.resgrw
        ];

        item.skillbonamt >= 8 ? sidePanel.classList.add('uni') : sidePanel.classList.remove('uni');
        infoTitle.textContent = item.name;
        infoMove.textContent = Math.floor((item.moveamt - 4)/4);
        infoJump.innerHTML = ([4,5].includes(item.move) ? '&#8734' : (movementType[item.move].substr(0,1) + '<i uk-icon="arrow-up"></i>' + movementType[item.move].substr(2,3) + '<i uk-icon="arrow-down"></i>'));
        infoPerk.textContent = ([4,5].includes(item.move) || item.moveabl) ? ([4,5].includes(item.move) ? movementType[item.move] : '') + (item.moveabl ? movementPerk[item.moveabl] : '') : '—';
        infoRtPenalty.textContent = item.rt;
        infoMoveCost.textContent = item.movecost > 220 ? item.movecost - 224 : item.movecost > 150 ? item.movecost - 160 : item.movecost > 120 ? item.movecost - 128 : item.movecost > 30 ? item.movecost - 32 : item.movecost;

        infoStatsBottom.forEach( (stat, index) => {
            stat.textContent = statList[index] ? statList[index] : '—';
        });

        if ( item.innml ) {
            let innMelee = weapons.find((row) => row['id'] === item.innml);
            infoInnMelee.textContent = innMelee.name;
        } else infoInnMelee.textContent = '—';
        if ( item.innrng ) {
            let innRanged = weapons.find((row) => row['id'] === item.innrng);
            infoInnRanged.textContent = innRanged.name;
        } else infoInnRanged.textContent = '—';

        let inSets = [];
        for (let i = 0; i < 48; i++) {
            if (item['ccset' + i] === 1) inSets.push(i);
        }

        let setCount = inSets.length;
        let hasGenerics = false;
        if ( setCount === 0 )
            infoRace.innerHTML = '<li>' + item.name + '</li>';
        else if ( setCount < 48 ) {
            infoRace.innerHTML = '';
            classChangeSets.forEach((cls) => {
                if ( cls.ccset === '-' && infoRace.textContent.length > 0 ) hasGenerics = true;
                if ( inSets.includes(parseInt(cls.ccset)) ) {
                    if (hasGenerics) {
                        infoRace.innerHTML += '<li class="spacer"></li>';
                        hasGenerics = false;
                    }
                    infoRace.innerHTML += '<li>' + cls.name + '</li>';
                }
            })
        } else infoRace.innerHTML = '<li>All</li>';

        if (item.notes) {
            infoNotes.querySelector('b').textContent = item.notes;
            infoNotes.classList.remove('uk-hidden');
        } else infoNotes.classList.add('uk-hidden');

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
        fetchJSON(armorJson).then(
            data => armor = data
        );
        fetchJSON(sundriesJson).then(
            data => sundries = data
        );
    }
});