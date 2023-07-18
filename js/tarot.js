
document.addEventListener('DOMContentLoaded', function() {

    const tarotJson = 'data/tarot.json';

    const itemList = document.getElementById('itemList'),
        tarotSelectors = document.querySelectorAll('#tarotSimulator select[id^=tarotList]'),
        answerSelectors = document.querySelectorAll('#tarotSimulator .answers input'),
        tarotTotals = document.querySelectorAll('#tarotTotal td');

    let items = [];

    async function listItems() {

        items = await fetchJSON(tarotJson);

        // let total = items.length;

        items.forEach( (element) => {

            let tr = document.createElement('tr');
            let image = document.createElement('td');
                let tarotImg = document.createElement('img');
                    tarotImg.src = 'img/icons/tarot/' + element.img + '.png';
                image.appendChild(tarotImg);
            let name = document.createElement('td');
                name.textContent = element.name;
            let hp = document.createElement('td');
                hp.textContent = element.hp;
                if (element.hp) hp.classList.add('bold');
            let mp = document.createElement('td');
                mp.textContent = element.mp;
                if (element.mp) mp.classList.add('bold');
            let str = document.createElement('td');
                str.textContent = element.str;
                if (element.str) str.classList.add('bold');
            let vit = document.createElement('td');
                vit.textContent = element.vit;
                if (element.vit) vit.classList.add('bold');
            let dex = document.createElement('td');
                dex.textContent = element.dex;
                if (element.dex) dex.classList.add('bold');
            let agi = document.createElement('td');
                agi.textContent = element.agi;
                if (element.agi) agi.classList.add('bold');
            let avd = document.createElement('td');
                avd.textContent = element.avd;
                if (element.avd) avd.classList.add('bold');
            let int = document.createElement('td');
                int.textContent = element.int;
                if (element.int) int.classList.add('bold');
            let mnd = document.createElement('td');
                mnd.textContent = element.mnd;
                if (element.mnd) mnd.classList.add('bold');
            let res = document.createElement('td');
                res.textContent = element.res;
                if (element.res) res.classList.add('bold');
            tr.append(image, name, hp, mp, str, vit, dex, agi, avd, int, mnd, res);
            itemList.appendChild(tr);

            // progress.style.width = (index + 1) * 100 / total + '%';
        });

        loadTarotSelectors();
    }

    listItems();

    answerSelectors.forEach( (element) => {

        element.addEventListener('change', function (event) {
            let id = parseInt(event.target.closest('.tarot-info').querySelector('select').value);
            let tarot = items.find((item) => item['id'] === id);
            let tarotElement = event.target.closest('.ov-tarot-container');
            let statFields = tarotElement.querySelectorAll('td');
            statFields[0].innerText = 0 + tarot.hp + answerStats.hp[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[0].innerText !== '0' ? statFields[0].classList.add('bold') : statFields[0].classList.remove('bold');
            statFields[1].innerText = 0 + tarot.mp + answerStats.mp[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[1].innerText !== '0' ? statFields[1].classList.add('bold') : statFields[1].classList.remove('bold');
            statFields[2].innerText = 0 + tarot.str + answerStats.str[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[2].innerText !== '0' ? statFields[2].classList.add('bold') : statFields[2].classList.remove('bold');
            statFields[3].innerText = 0 + tarot.vit + answerStats.vit[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[3].innerText !== '0' ? statFields[3].classList.add('bold') : statFields[3].classList.remove('bold');
            statFields[4].innerText = 0 + tarot.dex + answerStats.dex[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[4].innerText !== '0' ? statFields[4].classList.add('bold') : statFields[4].classList.remove('bold');
            statFields[5].innerText = 0 + tarot.agi + answerStats.agi[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[5].innerText !== '0' ? statFields[5].classList.add('bold') : statFields[5].classList.remove('bold');
            statFields[6].innerText = 0 + tarot.avd + answerStats.avd[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[6].innerText !== '0' ? statFields[6].classList.add('bold') : statFields[6].classList.remove('bold');
            statFields[7].innerText = 0 + tarot.int + answerStats.int[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[7].innerText !== '0' ? statFields[7].classList.add('bold') : statFields[7].classList.remove('bold');
            statFields[8].innerText = 0 + tarot.mnd + answerStats.mnd[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[8].innerText !== '0' ? statFields[8].classList.add('bold') : statFields[8].classList.remove('bold');
            statFields[9].innerText = 0 + tarot.res + answerStats.res[tarotElement.querySelector('input[type="radio"]:checked').value];
            statFields[9].innerText !== '0' ? statFields[9].classList.add('bold') : statFields[9].classList.remove('bold');
            calculateTotal();
        })
    });

    function loadTarotSelectors() {

        tarotSelectors.forEach( (element, index) => {
            items.forEach( (item) => {
                let option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.name;
                element.append(option);
            });

            element.addEventListener('change', function (event) {
                loadTarot(index + 1, parseInt(event.target.value));
            })
        });
    }

    function loadTarot(index, id) {
        let tarot = items.find((item) => item['id'] === id);
        let tarotElement = document.getElementById('tarot' + index);
        tarotElement.querySelector('.tarot-image img').src = 'img/icons/tarot/' + tarot.img + '.png';
        tarotElement.querySelector('.question').innerText = tarot.question;
        tarotElement.querySelector('label[for="tarot' + index + 'Answer1"] p').innerText = tarot.al;
        tarotElement.querySelector('label[for="tarot' + index + 'Answer2"] p').innerText = tarot.ac;
        tarotElement.querySelector('label[for="tarot' + index + 'Answer3"] p').innerText = tarot.ar;

        let statFields = tarotElement.querySelectorAll('td');
        statFields[0].innerText = 0 + tarot.hp + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.hp[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[0].innerText !== '0' ? statFields[0].classList.add('bold') : statFields[0].classList.remove('bold');
        statFields[1].innerText = 0 + tarot.mp + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.mp[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[1].innerText !== '0' ? statFields[1].classList.add('bold') : statFields[1].classList.remove('bold');
        statFields[2].innerText = 0 + tarot.str + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.str[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[2].innerText !== '0' ? statFields[2].classList.add('bold') : statFields[2].classList.remove('bold');
        statFields[3].innerText = 0 + tarot.vit + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.vit[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[3].innerText !== '0' ? statFields[3].classList.add('bold') : statFields[3].classList.remove('bold');
        statFields[4].innerText = 0 + tarot.dex + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.dex[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[4].innerText !== '0' ? statFields[4].classList.add('bold') : statFields[4].classList.remove('bold');
        statFields[5].innerText = 0 + tarot.agi + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.agi[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[5].innerText !== '0' ? statFields[5].classList.add('bold') : statFields[5].classList.remove('bold');
        statFields[6].innerText = 0 + tarot.avd + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.avd[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[6].innerText !== '0' ? statFields[6].classList.add('bold') : statFields[6].classList.remove('bold');
        statFields[7].innerText = 0 + tarot.int + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.int[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[7].innerText !== '0' ? statFields[7].classList.add('bold') : statFields[7].classList.remove('bold');
        statFields[8].innerText = 0 + tarot.mnd + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.mnd[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[8].innerText !== '0' ? statFields[8].classList.add('bold') : statFields[8].classList.remove('bold');
        statFields[9].innerText = 0 + tarot.res + (tarotElement.querySelector('input[type="radio"]:checked') ? answerStats.res[tarotElement.querySelector('input[type="radio"]:checked').value] : 0);
        statFields[9].innerText !== '0' ? statFields[9].classList.add('bold') : statFields[9].classList.remove('bold');
        calculateTotal();

        let selectedTarotIds = [id.toString()];
        let selectedTarot = document.querySelectorAll('select:not([id=tarotList' + index + ']) option:checked:not([value=""])');
        selectedTarot.forEach( (item) => {
            selectedTarotIds.push(item.value);
        });
        let otherOptions = document.querySelectorAll('select:not([id=tarotList' + index + ']) option:not(:checked):not([value=""])');
        otherOptions.forEach( (item) => {
            selectedTarotIds.includes(item.value) ? item.classList.add('hidden') : item.classList.remove('hidden');
        });

        let placeholder = tarotElement.querySelector('option[value=""]');
        if (placeholder)
            placeholder.remove();
    }

    function calculateTotal() {

        tarotTotals.forEach( (element, index) => {
            let statFields = document.querySelectorAll('.tarot-stats td');
            element.innerText = parseInt(statFields[index].innerText) +
                parseInt(statFields[index + 10].innerText) +
                parseInt(statFields[index + 20].innerText) +
                parseInt(statFields[index + 30].innerText) +
                parseInt(statFields[index + 40].innerText);
            element.innerText !== '0' ? element.classList.add('bold') : element.classList.remove('bold');
        });
    }

    const answerStats = {
        'hp': {
            'l': 4,
            'c': 0,
            'r': 0
        },
        'mp': {
            'l': 0,
            'c': 0,
            'r': 4
        },
        'str': {
            'l': 1,
            'c': 0,
            'r': 0
        },
        'vit': {
            'l': 1,
            'c': 0,
            'r': 0
        },
        'dex': {
            'l': 0,
            'c': 1,
            'r': 0
        },
        'agi': {
            'l': 0,
            'c': 1,
            'r': 0
        },
        'avd': {
            'l': 0,
            'c': 1,
            'r': 0
        },
        'int': {
            'l': 0,
            'c': 0,
            'r': 1
        },
        'mnd': {
            'l': 0,
            'c': 0,
            'r': 1
        },
        'res': {
            'l': 0,
            'c': 0,
            'r': 1
        }
    };

});