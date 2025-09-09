
const tooltips = {

};

function activateTooltips () {
    let tooltipButtons = document.querySelectorAll('[data-tooltip]');
    tooltipButtons.forEach( (element) => {
        let tooltipContent = '';
        let tooltipData = element.getAttribute('data-tooltip');
        if (element.querySelector('.tooltip')) element.querySelector('.tooltip').remove();

        if (tooltipData.startsWith('obtain-')) {
            tooltipContent = listObtains(parseInt(tooltipData.match(/\d+/g)[0]));
        } else if (tooltipData.startsWith('itemset-')) {
            tooltipContent = itemSets.find((row) => row['id'] === parseInt(tooltipData.match(/\d+/g)[0])).description ;
            let setPieces = JSON.parse(element.getAttribute('data-setpieces'));
            let setList = document.createElement('ul');
            setPieces.forEach((item) => {
                let piece = document.createElement('li');
                piece.innerHTML = '<img src="' + item.icon + '">';
                piece.innerHTML += '<span>' + item.name + '</span>';
                setList.appendChild(piece);
            });
            tooltipContent += setList.outerHTML;
        } else if (tooltipData.startsWith('status-')) {
            let matches = tooltipData.match(/(\d+)/g);
            if (matches.length === 2) {
                tooltipContent = statusEffects[matches[0]][matches[1]].effect;
            } else {
                tooltipContent = statusEffects[matches[0]].effect;
            }
        } else if (tooltipData.startsWith('scalingdmg-')) {
            let matches = tooltipData.match(/(\d+)/g);
            let formula = damageScaling[matches[0]];
            if (Object.values(formula.attacker).some(val => val !== 0) || Object.values(formula.defender).some(val => val !== 0)) {
                tooltipContent =
                    (formula.attacker.str !== 0 ? `<b>` + formula.attacker.str + `</b> x Strength<br>` : ``) +
                    (formula.attacker.vit !== 0 ? `<b>` + formula.attacker.vit + `</b> x Vitality<br>` : ``) +
                    (formula.attacker.dex !== 0 ? `<b>` + formula.attacker.dex + `</b> x Dexterity<br>` : ``) +
                    (formula.attacker.int !== 0 ? `<b>` + formula.attacker.int + `</b> x Intelligence<br>` : ``) +
                    (formula.attacker.mnd !== 0 ? `<b>` + formula.attacker.mnd + `</b> x Mind<br>` : ``) +
                    (formula.attacker.res !== 0 ? `<b>` + formula.attacker.res + `</b> x Resistance<br>` : ``) +
                    ((formula.attacker.wpatk !== 0 && (formula.attacker.wpatk === formula.attacker.aratk && formula.attacker.wpatk === formula.attacker.jwatk)) ?
                        `<b>` + formula.attacker.wpatk + `</b> x Equipment ATK<br>` :
                        (formula.attacker.wpatk !== 0 ? `<b>` + formula.attacker.wpatk + `</b> x Weapon ATK<br>` : ``) +
                        (formula.attacker.shatk !== 0 ? `<b>` + formula.attacker.shatk + `</b> x Shield ATK<br>` : ``) +
                        (formula.attacker.aratk !== 0 ? `<b>` + formula.attacker.aratk + `</b> x Armor ATK<br>` : ``) +
                        (formula.attacker.jwatk !== 0 ? `<b>` + formula.attacker.jwatk + `</b> x Jewelry ATK<br>` : ``)) +
                    (formula.attacker.clsatk !== 0 ? `<b>` + formula.attacker.clsatk + `</b> x Class ATK<br>` : ``) +
                    ((formula.attacker.wpdef !== 0 && (formula.attacker.wpdef === formula.attacker.ardef && formula.attacker.wpdef === formula.attacker.jwdef)) ?
                        `<b>` + formula.attacker.wpdef + `</b> x Equipment DEF<br>` :
                        (formula.attacker.wpdef !== 0 ? `<b>` + formula.attacker.wpdef + `</b> x Weapon DEF<br>` : ``) +
                        (formula.attacker.shdef !== 0 ? `<b>` + formula.attacker.shdef + `</b> x Shield DEF<br>` : ``) +
                        (formula.attacker.ardef !== 0 ? `<b>` + formula.attacker.ardef + `</b> x Armor DEF<br>` : ``) +
                        (formula.attacker.jwdef !== 0 ? `<b>` + formula.attacker.jwdef + `</b> x Jewelry DEF<br>` : ``)) +
                    (formula.attacker.clsdef !== 0 ? `<b>` + formula.attacker.clsdef + `</b> x Class DEF<br>` : ``) +
                    ((formula.attacker.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.attacker.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                    (formula.attacker.aug !== 0 ? `<b>` + formula.attacker.aug + `</b> x Augment Skill Rank<br>` : ``) +
                    (formula.attacker.rac !== 0 ? `<b>` + formula.attacker.rac + `</b> x Racial Skill Rank<br>` : ``) +
                    `<div class="text-center"><b>VS</b></div>` +
                    (formula.defender.str !== 0 ? `<b>` + formula.defender.str + `</b> x Strength<br>` : ``) +
                    (formula.defender.vit !== 0 ? `<b>` + formula.defender.vit + `</b> x Vitality<br>` : ``) +
                    (formula.defender.dex !== 0 ? `<b>` + formula.defender.dex + `</b> x Dexterity<br>` : ``) +
                    (formula.defender.int !== 0 ? `<b>` + formula.defender.int + `</b> x Intelligence<br>` : ``) +
                    (formula.defender.mnd !== 0 ? `<b>` + formula.defender.mnd + `</b> x Mind<br>` : ``) +
                    (formula.defender.res !== 0 ? `<b>` + formula.defender.res + `</b> x Resistance<br>` : ``) +
                    ((formula.defender.wpatk !== 0 && (formula.defender.wpatk === formula.defender.aratk && formula.defender.wpatk === formula.defender.jwatk)) ?
                        `<b>` + formula.attacker.wpatk + `</b> x Equipment ATK<br>` :
                        (formula.defender.wpatk !== 0 ? `<b>` + formula.defender.wpatk + `</b> x Weapon ATK<br>` : ``) +
                        (formula.defender.shatk !== 0 ? `<b>` + formula.defender.shatk + `</b> x Shield ATK<br>` : ``) +
                        (formula.defender.aratk !== 0 ? `<b>` + formula.defender.aratk + `</b> x Armor ATK<br>` : ``) +
                        (formula.defender.jwatk !== 0 ? `<b>` + formula.defender.jwatk + `</b> x Jewelry ATK<br>` : ``)) +
                    (formula.defender.clsatk !== 0 ? `<b>` + formula.defender.clsatk + `</b> x Class ATK<br>` : ``) +
                    ((formula.defender.wpdef !== 0 && (formula.defender.wpdef === formula.defender.ardef && formula.defender.wpdef === formula.defender.jwdef)) ?
                        `<b>` + formula.defender.wpdef + `</b> x Equipment DEF<br>` :
                        (formula.defender.wpdef !== 0 ? `<b>` + formula.defender.wpdef + `</b> x Weapon DEF<br>` : ``) +
                        (formula.defender.shdef !== 0 ? `<b>` + formula.defender.shdef + `</b> x Shield DEF<br>` : ``) +
                        (formula.defender.ardef !== 0 ? `<b>` + formula.defender.ardef + `</b> x Armor DEF<br>` : ``) +
                        (formula.defender.jwdef !== 0 ? `<b>` + formula.defender.jwdef + `</b> x Jewelry DEF<br>` : ``)) +
                    (formula.defender.clsdef !== 0 ? `<b>` + formula.defender.clsdef + `</b> x Class DEF<br>` : ``) +
                    ((formula.defender.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.defender.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                    (formula.defender.aug !== 0 ? `<b>` + formula.defender.aug + `</b> x Augment Skill Rank<br>` : ``) +
                    (formula.defender.rac !== 0 ? `<b>` + formula.defender.rac + `</b> x Racial Skill Rank<br>` : ``)
                ;
            }
        } else if (tooltipData.startsWith('scalingheal-')) {
            let matches = tooltipData.match(/(\d+)/g);
            let formula = healingScaling[matches[0]];
            if (Object.values(formula.attacker).some(val => val !== 0) || Object.values(formula.defender).some(val => val !== 0)) {
                console.log(formula);
                tooltipContent =
                    (formula.attacker.vit !== 0 ? `<b>` + formula.attacker.vit + `</b> x Vitality<br>` : ``) +
                    (formula.attacker.mnd !== 0 ? `<b>` + formula.attacker.mnd + `</b> x Mind<br>` : ``) +
                    (formula.attacker.res !== 0 ? `<b>` + formula.attacker.res + `</b> x Resistance<br>` : ``) +
                    (formula.attacker.aug !== 0 ? `<b>` + formula.attacker.aug + `</b> x Augment Skill Rank<br>` : ``) +
                    (formula.attacker.rac !== 0 ? `<b>` + formula.attacker.rac + `</b> x Racial Skill Rank<br>` : ``)
                ;
            }
        } else if (tooltipData.startsWith('scalingacc-')) {
            let matches = tooltipData.match(/(\d+)/g);
            let formula = accuracyScaling[matches[0]];
            if (Object.values(formula.defender).some(val => val !== 0) || Object.keys(formula.attacker).some(key => ['frnt','side','back'].includes(key) && formula.attacker[key] !== 0)) {
                if (!Object.values(formula.defender).some(val => val !== 0)) {
                    tooltipContent += '<b>100</b> % Chance';
                } else {
                    tooltipContent +=
                        (formula.attacker.dex !== 0 ? `<b>` + formula.attacker.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.attacker.agi !== 0 ? `<b>` + formula.attacker.agi + `</b> x Agility<br>` : ``) +
                        (formula.attacker.int !== 0 ? `<b>` + formula.attacker.int + `</b> x Intelligence<br>` : ``) +
                        (formula.attacker.mnd !== 0 ? `<b>` + formula.attacker.mnd + `</b> x Mind<br>` : ``) +
                        (formula.attacker.avd !== 0 ? `<b>` + formula.attacker.avd + `</b> x Avoidance<br>` : ``) +
                        ((formula.attacker.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.attacker.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        `<div class="text-center"><b>VS</b></div>` +
                        (formula.defender.dex !== 0 ? `<b>` + formula.defender.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.defender.agi !== 0 ? `<b>` + formula.defender.agi + `</b> x Agility<br>` : ``) +
                        (formula.defender.int !== 0 ? `<b>` + formula.defender.int + `</b> x Intelligence<br>` : ``) +
                        (formula.defender.mnd !== 0 ? `<b>` + formula.defender.mnd + `</b> x Mind<br>` : ``) +
                        (formula.defender.avd !== 0 ? `<b>` + formula.defender.avd + `</b> x Avoidance<br>` : ``) +
                        ((formula.defender.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.defender.wskl + `</b> x Weapon Skill Rank<br>` : ``)
                    ;
                }
                if (Object.keys(formula.attacker).some(key => ['frnt','side','back'].includes(key) && formula.attacker[key] !== 0)) {
                    tooltipContent +=
                        `<p><b>Limited</b></p>` +
                        `<span class="acc-facing">Front:</span> ` +
                        (formula.attacker.frnt !== 0 ? (formula.attacker.frnt > 0 ? `<small class="blue">min</small> <b>` + formula.attacker.frnt + `</b> %` : `<small class="red">max</small> <b>` + (100 + formula.attacker.frnt) + `</b> %`) : '-') + `<br>` +
                        `<span class="acc-facing">Side:</span> ` +
                        (formula.attacker.side !== 0 ? (formula.attacker.side > 0 ? `<small class="blue">min</small> <b>` + formula.attacker.side + `</b> %` : `<small class="red">max</small> <b>` + (100 + formula.attacker.side) + `</b> %`) : '-') + `<br>` +
                        `<span class="acc-facing">Back:</span> ` +
                        (formula.attacker.back !== 0 ? (formula.attacker.back > 0 ? `<small class="blue">min</small> <b>` + formula.attacker.back + `</b> %` : `<small class="red">max</small> <b>` + (100 + formula.attacker.back) + `</b> %`) : '-') + `<br>`
                    ;
                }
            }
        } else {
            tooltipContent = tooltips[tooltipData];
        }

        if (tooltipContent.length) {
            element.classList.remove('disabled');
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            if (element.getAttribute('data-position') === 'bottom')
                tooltip.classList.add('bottom');
            if (element.getAttribute('data-size') === 'large')
                tooltip.classList.add('large');
            tooltip.innerHTML = tooltipContent;
            element.appendChild(tooltip);

            if (!element.classList.contains('active')) {
                element.classList.add('active');
                element.addEventListener('click', function (event) {
                    event.stopPropagation();
                    let tooltip = element.querySelector('.tooltip');
                    if (!element.classList.contains('disabled') && !document.querySelector('[data-tooltip].open .tooltip')) {
                        element.classList.add('open');
                        fadeIn(tooltip);
                    }
                });
            }
        } else {
            element.classList.add('disabled');
        }
    });
}

document.addEventListener('click', function () {
    let openTooltip = document.querySelector('[data-tooltip].open .tooltip');
    if(openTooltip) {
        openTooltip.parentNode.classList.remove('open');
        fadeOut(openTooltip);
    }
});
