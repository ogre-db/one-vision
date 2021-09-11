
document.addEventListener("DOMContentLoaded", function(){

    const equipmentjson = 'data/equipment.json';
    let equipment = [];

    const weaponList = document.getElementById('weaponList');

    listWeapons(equipmentjson);



    function listWeapons(path) {

        fetchJSON(path)
            .then(data => {
                equipment = data;

                equipment.forEach(function (weapon, index) {
                    // console.log(sandwich['name']);
                    weaponList.innerHTML +=
                        '<tr>' +
                            '<td>' + weapon['name'] + '</td>' +
                            '<td>' + weapon['none__8'] + '</td>' +
                            '<td>' + (weapon['minrange'] === weapon['maxrange'] ? weapon['minrange'] : (weapon['minrange'] + ' - ' + weapon['maxrange'])) + '</td>' +
                            '<td>' + (weapon['hands'] === 0 ? 1 : 2) + '</td>' +
                            '<td>' + weapon['none__39'] + '</td>' +
                        '</tr>';
                });
            });
    }
});