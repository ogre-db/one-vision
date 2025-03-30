
const tooltips = {

};

function activateTooltips () {
    let tooltipButtons = document.querySelectorAll('[data-tooltip]');
    tooltipButtons.forEach( (element) => {
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            if (!document.querySelector('.tooltip')) {
                element.classList.add('open');
                let tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                if (element.getAttribute('data-position') === 'bottom')
                    tooltip.classList.add('bottom');
                if (element.getAttribute('data-size') === 'large')
                    tooltip.classList.add('large');
                let tooltipData = element.getAttribute('data-tooltip');
                if (tooltipData.startsWith('obtain-')) {
                    tooltip.innerHTML = listObtains(parseInt(tooltipData.match(/\d+/g)[0]));
                } else if (tooltipData.startsWith('itemset-')) {
                    tooltip.innerHTML = itemSets.find((row) => row['id'] === parseInt(tooltipData.match(/\d+/g)[0])).description ;
                    let setPieces = JSON.parse(element.getAttribute('data-setpieces'));
                    let setList = document.createElement('ul');
                    setPieces.forEach((item) => {
                        let piece = document.createElement('li');
                        piece.innerHTML = '<img src="' + item.icon + '">';
                        piece.innerHTML += '<span>' + item.name + '</span>';
                        setList.appendChild(piece);
                    });
                    tooltip.appendChild(setList);
                } else if (tooltipData.startsWith('status-')) {
                    let matches = tooltipData.match(/(\d+)/g);
                    if (matches.length === 2) {
                        tooltip.innerHTML = statusEffects[matches[0]][matches[1]].effect;
                    } else {
                        tooltip.innerHTML = statusEffects[matches[0]].effect;
                    }
                } else if (tooltipData.startsWith('scalingdmg-')) {
                    let matches = tooltipData.match(/(\d+)/g);
                    let formula = damageScaling[matches[0]];
                    tooltip.innerHTML =
                        (formula.attack.str !== 0 ? `<b>` + formula.attack.str + `</b> x Strength<br>` : ``) +
                        (formula.attack.vit !== 0 ? `<b>` + formula.attack.vit + `</b> x Vitality<br>` : ``) +
                        (formula.attack.dex !== 0 ? `<b>` + formula.attack.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.attack.int !== 0 ? `<b>` + formula.attack.int + `</b> x Intelligence<br>` : ``) +
                        (formula.attack.mnd !== 0 ? `<b>` + formula.attack.mnd + `</b> x Mind<br>` : ``) +
                        (formula.attack.res !== 0 ? `<b>` + formula.attack.res + `</b> x Resistance<br>` : ``) +
                        ((formula.attack.wpatk !== 0 && (formula.attack.wpatk === formula.attack.aratk && formula.attack.wpatk === formula.attack.jwatk)) ?
                            `<b>` + formula.attack.wpatk + `</b> x Equipment ATK<br>` :
                            (formula.attack.wpatk !== 0 ? `<b>` + formula.attack.wpatk + `</b> x Weapon ATK<br>` : ``) +
                            (formula.attack.shatk !== 0 ? `<b>` + formula.attack.shatk + `</b> x Shield ATK<br>` : ``) +
                            (formula.attack.aratk !== 0 ? `<b>` + formula.attack.aratk + `</b> x Armor ATK<br>` : ``) +
                            (formula.attack.jwatk !== 0 ? `<b>` + formula.attack.jwatk + `</b> x Jewelry ATK<br>` : ``)) +
                        (formula.attack.clsatk !== 0 ? `<b>` + formula.attack.clsatk + `</b> x Class ATK<br>` : ``) +
                        ((formula.attack.wpdef !== 0 && (formula.attack.wpdef === formula.attack.ardef && formula.attack.wpdef === formula.attack.jwdef)) ?
                            `<b>` + formula.attack.wpdef + `</b> x Equipment DEF<br>` :
                            (formula.attack.wpdef !== 0 ? `<b>` + formula.attack.wpdef + `</b> x Weapon DEF<br>` : ``) +
                            (formula.attack.shdef !== 0 ? `<b>` + formula.attack.shdef + `</b> x Shield DEF<br>` : ``) +
                            (formula.attack.ardef !== 0 ? `<b>` + formula.attack.ardef + `</b> x Armor DEF<br>` : ``) +
                            (formula.attack.jwdef !== 0 ? `<b>` + formula.attack.jwdef + `</b> x Jewelry DEF<br>` : ``)) +
                        (formula.attack.clsdef !== 0 ? `<b>` + formula.attack.clsdef + `</b> x Class DEF<br>` : ``) +
                        ((formula.attack.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.attack.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        (formula.attack.aug !== 0 ? `<b>` + formula.attack.aug + `</b> x Augment Skill Rank<br>` : ``) +
                        (formula.attack.rac !== 0 ? `<b>` + formula.attack.rac + `</b> x Racial Skill Rank<br>` : ``) +
                        `<div class="text-center"><b>VS</b></div>` +
                        (formula.defend.str !== 0 ? `<b>` + formula.defend.str + `</b> x Strength<br>` : ``) +
                        (formula.defend.vit !== 0 ? `<b>` + formula.defend.vit + `</b> x Vitality<br>` : ``) +
                        (formula.defend.dex !== 0 ? `<b>` + formula.defend.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.defend.int !== 0 ? `<b>` + formula.defend.int + `</b> x Intelligence<br>` : ``) +
                        (formula.defend.mnd !== 0 ? `<b>` + formula.defend.mnd + `</b> x Mind<br>` : ``) +
                        (formula.defend.res !== 0 ? `<b>` + formula.defend.res + `</b> x Resistance<br>` : ``) +
                        ((formula.defend.wpatk !== 0 && (formula.defend.wpatk === formula.defend.aratk && formula.defend.wpatk === formula.defend.jwatk)) ?
                            `<b>` + formula.attack.wpatk + `</b> x Equipment ATK<br>` :
                            (formula.defend.wpatk !== 0 ? `<b>` + formula.defend.wpatk + `</b> x Weapon ATK<br>` : ``) +
                            (formula.defend.shatk !== 0 ? `<b>` + formula.defend.shatk + `</b> x Shield ATK<br>` : ``) +
                            (formula.defend.aratk !== 0 ? `<b>` + formula.defend.aratk + `</b> x Armor ATK<br>` : ``) +
                            (formula.defend.jwatk !== 0 ? `<b>` + formula.defend.jwatk + `</b> x Jewelry ATK<br>` : ``)) +
                        (formula.defend.clsatk !== 0 ? `<b>` + formula.defend.clsatk + `</b> x Class ATK<br>` : ``) +
                        ((formula.defend.wpdef !== 0 && (formula.defend.wpdef === formula.defend.ardef && formula.defend.wpdef === formula.defend.jwdef)) ?
                            `<b>` + formula.defend.wpdef + `</b> x Equipment DEF<br>` :
                            (formula.defend.wpdef !== 0 ? `<b>` + formula.defend.wpdef + `</b> x Weapon DEF<br>` : ``) +
                            (formula.defend.shdef !== 0 ? `<b>` + formula.defend.shdef + `</b> x Shield DEF<br>` : ``) +
                            (formula.defend.ardef !== 0 ? `<b>` + formula.defend.ardef + `</b> x Armor DEF<br>` : ``) +
                            (formula.defend.jwdef !== 0 ? `<b>` + formula.defend.jwdef + `</b> x Jewelry DEF<br>` : ``)) +
                        (formula.defend.clsdef !== 0 ? `<b>` + formula.defend.clsdef + `</b> x Class DEF<br>` : ``) +
                        ((formula.defend.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.defend.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        (formula.defend.aug !== 0 ? `<b>` + formula.defend.aug + `</b> x Augment Skill Rank<br>` : ``) +
                        (formula.defend.rac !== 0 ? `<b>` + formula.defend.rac + `</b> x Racial Skill Rank<br>` : ``)
                    ;
                } else if (tooltipData.startsWith('scalingacc-')) {
                    let matches = tooltipData.match(/(\d+)/g);
                    let formula = accuracyScaling[matches[0]];
                    tooltip.innerHTML =
                        (formula.attack.dex !== 0 ? `<b>` + formula.attack.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.attack.agi !== 0 ? `<b>` + formula.attack.agi + `</b> x Agility<br>` : ``) +
                        (formula.attack.int !== 0 ? `<b>` + formula.attack.int + `</b> x Intelligence<br>` : ``) +
                        (formula.attack.mnd !== 0 ? `<b>` + formula.attack.mnd + `</b> x Mind<br>` : ``) +
                        (formula.attack.avd !== 0 ? `<b>` + formula.attack.avd + `</b> x Avoidance<br>` : ``) +
                        ((formula.attack.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.attack.wskl + `</b> x Weapon Skill Rank<br>` : ``) +
                        `<div class="text-center"><b>VS</b></div>` +
                        (formula.defend.dex !== 0 ? `<b>` + formula.defend.dex + `</b> x Dexterity<br>` : ``) +
                        (formula.defend.agi !== 0 ? `<b>` + formula.defend.agi + `</b> x Agility<br>` : ``) +
                        (formula.defend.int !== 0 ? `<b>` + formula.defend.int + `</b> x Intelligence<br>` : ``) +
                        (formula.defend.mnd !== 0 ? `<b>` + formula.defend.mnd + `</b> x Mind<br>` : ``) +
                        (formula.defend.avd !== 0 ? `<b>` + formula.defend.avd + `</b> x Avoidance<br>` : ``) +
                        ((formula.defend.wskl !== 0 && !tooltipData.includes('-nwa-')) ? `<b>` + formula.defend.wskl + `</b> x Weapon Skill Rank<br>` : ``)
                    ;
                } else {
                    tooltip.innerHTML = tooltips[tooltipData];
                }
                element.appendChild(tooltip);
            }
        });
    });
    if(tooltipButtons.length) {
        document.addEventListener('click', function () {
            let openTooltip = document.querySelector('.tooltip');
            if(openTooltip) {
                openTooltip.parentNode.classList.remove('open');
                fadeOut(openTooltip);
            }
        });
    }
}
