
document.addEventListener("DOMContentLoaded", function() {

    const equipmentjson = 'data/equipment.json';
    var weapons = [];

    const weaponList = document.getElementById('weaponList');
    // const progress = document.getElementById('progress');

    // UIkit.modal(loading).show();

    UIkit.modal(infoModal).show();

    const types = {
        '161': 'Fists',
        '162': 'Daggers',
        '163': '1H Swords',
        '164': '2H Swords',
        '165': 'Axes',
        '167': 'Spears',
        '168': 'Hammers',
        '170': '1H Katana',
        '171': '2H Katana',
        '172': 'Staves',
        '174': 'Whips',
        '175': 'Spellbooks',
        '176': 'Instruments',
        '177': 'Sidearms',
        '178': 'Bows',
        '179': 'Crossbows',
        '180': 'Fusils',
        '190': 'Innate Melee',
        '191': 'Innate Ranged',
        '245': 'Lobber'
    };

    listWeapons();

    async function getJson(url) {

        let response = await fetch(url);
        return response.json();
    }

    async function listWeapons() {

        weapons = await getJson(equipmentjson);

        // let total = weapons.length;

        weapons.forEach( (element, index) => {

            // console.log(Math.max(0, index - 1));
            // console.log(element.typ);

            if ( index === 0 || (index - 1) > 0 && element.typ !== weapons[index - 1].typ && weapons[index - 1].typ !== 190 ) {
                let tr = document.createElement('tr');
                tr.className = 'spacer';
                let category = document.createElement('td');
                category.textContent = types[element.typ];
                category.colSpan = document.querySelectorAll('#weaponList th').length;
                tr.appendChild(category);
                weaponList.appendChild(tr);
            }

            let tr = document.createElement('tr');
                tr.id = index;
                // (  ) ? tr.className = 'nt' : false;
            let type = document.createElement('td');
                type.className = 'type t' + element.typ + (element.hnd === 1 ? ' h2' : '') + (element.price === 0 ? ' inn' : '') + ((element.typ === 177 && element.wght > 2) ? ' thrw' : '');
            let name = document.createElement('td');
                name.textContent = element.nm;
            let atk = document.createElement('td');
                atk.textContent = element.atk;
            let dbon = document.createElement('td');
                dbon.textContent = element.dmgtam + '%';
            let rt = document.createElement('td');
                rt.textContent = element.rtcost;
            let wt = document.createElement('td');
                wt.textContent = element.wght;
            let ele = document.createElement('td');
                ele.className = 'element ele' + element.ele + '';
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

        document.querySelectorAll('#weaponList tr:not(.spacer)').forEach( (element) => {

            element.addEventListener( 'click', function (event) {
                console.log(event.target.parentNode.id);
            })
        });
    }

});