
function listObtains (itemId) {
    let obtainElement = document.createElement('div');
    let obtain = obtains.find((row) => row['id'] === itemId);
    let obtainWays = obtain.obtained.split(' | ');
    obtainWays.forEach((obt) => {
        if ( obt.indexOf('Obtained ') >= 0 ) {
            obt = obt.replace('Obtained ','');
            let locations = obt.split(', ');
            let infoGet = document.createElement('ul');
            infoGet.classList.add('get');
            infoGet.innerHTML = '<b>Received</b>';
            locations.forEach( (obt) => {
                let get = document.createElement('li');
                get.innerText = obt;
                infoGet.appendChild(get);
            });
            obtainElement.appendChild(infoGet);
        }
        if (obt.indexOf('Buy in ') >= 0) {
            obt = obt.replace('Buy in ','');
            let locations = obt.split(', ');
            let infoBuy = document.createElement('ul');
            infoBuy.classList.add('buy');
            infoBuy.innerHTML = '<b>Buy in</b>';
            locations.forEach( (obt) => {
                let buy = document.createElement('li');
                buy.innerText = obt;
                infoBuy.appendChild(buy);
            });
            obtainElement.appendChild(infoBuy);
        }
        if (obt.indexOf('Dropped by ') >= 0) {
            obt = obt.replace('Dropped by ','');
            let locations = obt.split(', ');
            let infoDrop = document.createElement('ul');
            infoDrop.classList.add('drop');
            infoDrop.innerHTML = '<b>Dropped by</b>';
            locations.forEach( (obt) => {
                let drop = document.createElement('li');
                drop.innerText = obt;
                infoDrop.appendChild(drop);
            });
            obtainElement.appendChild(infoDrop);
        }
        if (obt.indexOf('Stolen from ') >= 0) {
            obt = obt.replace('Stolen from ','');
            let locations = obt.split(', ');
            let infoSteal = document.createElement('ul');
            infoSteal.classList.add('steal');
            infoSteal.innerHTML = '<b>Stolen from</b>';
            locations.forEach( (obt) => {
                let steal = document.createElement('li');
                steal.innerText = obt;
                infoSteal.appendChild(steal);
            });
            obtainElement.appendChild(infoSteal);
        }
        if (obt.indexOf('Craft with ') >= 0) {
            obt = obt.replace('Craft with ','');
            let infoCraft = document.createElement('ul');
            infoCraft.classList.add('craft');
            infoCraft.innerHTML = '<b>Craft with <span class="green">' + obt + '</span></b>';
            let ingredients = [];
            let ingNum = 0;
            for (let i = 1; i <= 4; i++) {
                if ( obtain['ing' + i] ) {
                    if ( i > 1 && obtain['ing' + (i - 1)] === obtain['ing' + i] ) {
                        ingredients[ingNum - 1]['amt']++;
                    } else {
                        ingredients.push({
                            'id': obtain['ing' + i],
                            'amt': 1
                        });
                        ingNum++;
                    }
                }
            }
            ingredients.forEach( (ing) => {
                let ingredient = obtains.find((row) => row['id'] === ing.id);
                let craft = document.createElement('li');
                craft.innerHTML = '<span>' + ingredient.name + '</span><b>x' + ing.amt + '</b>';
                infoCraft.appendChild(craft);
            });
            obtainElement.appendChild(infoCraft);
        }
        if (obt.indexOf('Auctioned from ') >= 0) {
            obt = obt.replace('Auctioned from ','');
            let locations = obt.split(', ');
            let infoAuction = document.createElement('ul');
            infoAuction.classList.add('auction');
            infoAuction.innerHTML = '<b>Auctioned from</b>';
            locations.forEach( (obt) => {
                let auction = document.createElement('li');
                auction.innerText = obt;
                infoAuction.appendChild(auction);
            });
            obtainElement.appendChild(infoAuction);
        }
    });
    return obtainElement.innerHTML;
}

function unmaskBits (integer) {

    let unmaskedBits = [0,0,0,0,0,0,0,0];
    if (integer >= 128) {
        unmaskedBits[7] = 1;
        integer = integer - 128;
    }
    if (integer >= 64) {
        unmaskedBits[6] = 1;
        integer = integer - 64;
    }
    if (integer >= 32) {
        unmaskedBits[5] = 1;
        integer = integer - 32;
    }
    if (integer >= 16) {
        unmaskedBits[4] = 1;
        integer = integer - 16;
    }
    if (integer >= 8) {
        unmaskedBits[3] = 1;
        integer = integer - 8;
    }
    if (integer >= 4) {
        unmaskedBits[2] = 1;
        integer = integer - 4;
    }
    if (integer >= 2) {
        unmaskedBits[1] = 1;
        integer = integer - 2;
    }
    if (integer >= 1) {
        unmaskedBits[0] = 1;
    }
    return unmaskedBits;
}

function getOpposingElement (element) {
    switch (element) {
        case 1:
            return 2;
        case 2:
            return 1;
        case 3:
            return 4;
        case 4:
            return 3;
        case 5:
            return 6;
        case 6:
            return 5;
        case 7:
            return 8;
        case 8:
            return 7;
    }
}

function getEffectText (ability, effectSet) {
    let effectProperties = {};
    let effect1 = 'eff' + effectSet + '1';
    let effect2 = 'eff' + effectSet + '2';
    let scaling = 'eff' + effectSet + 'scale';
    let formula = 'eff' + effectSet + 'form';
    let power = 'eff' + effectSet + 'pow';
    let self = 'eff' + effectSet + 'self';
    let target = 'eff' + effectSet + 'trg';
    let hit1 = 'eff' + effectSet + 'hitch1';
    let hit2 = 'eff' + effectSet + 'hitch2';
    let accuracy = 'eff' + effectSet + 'acc';
    let damage = 'eff' + effectSet + 'dmgt';
    let element = 'eff' + effectSet + 'ele';

    let effectText = '';
    if (ability[effect1] === 1) {
        if ( ability[scaling] > 0 ) {
            effectText += `<span data-tooltip="scalingdmg-` +
                (ability.typ < 22 || ability.typ > 43 ? 'nwa-' : '') +
                ability[scaling] +
                `" data-position="bottom" data-size="large">` +
                damageScaling[ability[scaling]].name +
                `</span>`;
            if ( ability.typ >= 22 && ability.typ <= 43 ) effectText += ' +W.Skill';
        } else {
            effectText += 'Damage ';
        }
        if ( ability[formula] === 0 && ability.eff1form === 16 )
            effectText += 'for User\'s MaxHP - CurrentHP if Above 50%, or CurrentHP if Below';
        else if (ability[formula] === 0)
            effectText += 'for the Amount of Main';
        else if (ability[formula] === 1)
            effectText += 'for the Amount of Previous';
        else if (ability[formula] === 10)
            effectText += 'for ' + ability[power] + '% of Current HP';
        else if (ability[formula] === 16)
            effectText += 'for MaxHP - CurrentHP';
        else if (ability[power] > 0)
            effectText += ' +' + ability[power];
    } else if (ability[effect1] === 2) {
        if (ability[scaling] === 1)
            effectText += 'Spell Heal' + (ability[power] > 0 ? ' +' + ability[power] : '');
        else {
            effectText += 'Heal ';
            if ( ability[formula] === 9 || ability[formula] === 14 )
                effectText += 'for ' + ability[power] + '% of Max';
            else if (ability[formula] === 10)
                effectText += 'for ' + ability[power] + '% of Current';
            else if (ability[formula] === 0)
                effectText += 'for the Amount of Main';
            else if (ability[formula] === 1)
                effectText += 'for the Amount of Previous';
            else
                effectText += ability[power];
        }
    } else if (ability[effect1] === 4) {
        if ( ability[scaling] > 0 ) {
            effectText += `<span data-tooltip="scalingdmg-` +
                (ability.typ < 22 || ability.typ > 43 ? 'nwa-' : '') +
                ability[scaling] +
                `" data-position="bottom" data-size="large">` +
                damageScaling[ability[scaling]].name +
                `</span>`;
            if ( ability.typ >= 22 && ability.typ <= 43 ) effectText += ' +W.Skill';
        } else {
            effectText += 'Damage';
        }
        effectText += ' to MP ';
        if (ability[formula] === 5)
            effectText += 'for ' + ability[power] + ' - ' + ability[power] * 1.5;
        else if ( ability[formula] === 17 || ability[formula] === 18 )
            effectText += 'for ' + ability[power] + '% of Current';
        else if (ability[formula] === 16)
            effectText += 'for 100% of Max';
        else if (ability[power] > 0)
            effectText += 'for ' + ability[power];
    } else if (ability[effect1] === 5) {
        effectText += 'Charge MP ';
        if (ability[formula] === 21 )
            effectText += 'for ' + ability[power] + '% of Max';
        else if (ability[formula] === 0)
            effectText += 'for the Amount of Main';
        else if (ability[formula] === 1)
            effectText += 'for the Amount of Previous';
        else
            effectText += ability[power];
    } else if (ability[effect1] === 8) {
        if ( ability[scaling] > 0 ) {
            effectText += `<span data-tooltip="scalingdmg-` +
                (ability.typ < 22 || ability.typ > 43 ? 'nwa-' : '') +
                ability[scaling] +
                `" data-position="bottom" data-size="large">` +
                damageScaling[ability[scaling]].name +
                `</span>`;
            if ( ability.typ >= 22 && ability.typ <= 43 ) effectText += ' +W.Skill';
        } else {
            effectText += 'Damage';
        }
        effectText += ' to TP ';
        if (ability[formula] === 23)
            effectText += 'for ' + ability[power] + '% of Current';
        else if (ability[formula] === 16)
            effectText += 'for 100% of Max';
        else if (ability[formula] === 5)
            effectText += ability[power] + ' - ' + ability[power] * 1.5;
        else
            effectText += ability[power];
    } else if (ability[effect1] === 9) {
        effectText += 'Charge TP ';
        if (ability[formula] === 10)
            effectText += 'for ' + ability[power] + '% of Current HP';
        if (ability[formula] === 23)
            effectText += 'for ' + ability[power] + '% of Current TP';
        else if (ability[formula] === 0)
            effectText += 'for the Amount of Main';
        else if (ability[formula] === 1)
            effectText += 'for the Amount of Previous';
        else
            effectText += ability[power];
    } else if (ability[effect1] === 12) {
        effectText += 'Delay RT by ';
        if (ability[formula] === 5)
            effectText += ability[power] + ' - ' + ability[power] * 1.5;
        else effectText += ability[power];
    } else if (ability[effect1] === 18) {
        let duration = '';
        if (ability[formula] === 6)
            duration = ' for ' + ability[power] + ' Turns';
        else if (ability[formula] === 8)
            duration = ' for ' + ability[power] * 10 + ' RT';
        effectText += '<span data-tooltip="status-18-' + ability[effect2] + '">'
            + statusEffects[18][ability[effect2]].name + '</span>' + duration;
    } else if (ability[effect1] === 19) {
        effectText += 'Remove ' +  '<span data-tooltip="status-18-' + ability[effect2] + '">'
            + statusEffects[18][ability[effect2]].name + '</span>';
    } else if (ability[effect1] === 20) {
        effectText += 'Ready ' +  '<span data-tooltip="status-20-' + ability[effect2] + '">'
            + statusEffects[20][ability[effect2]].name + '</span>';
    } else if (ability[effect1] === 65) {
        effectText += 'Raise ' + baseStats[ability[effect2]].name + ' Permanently by ' + ability[power] / 10 + ' points';
    } else {
        effectText += statusEffects[ability[effect1]].name;
    }

    let restrictText = '';
    if ( ability[self] || ability[target] ) {
        if (ability[self])
            restrictText = 'Self';
        else if (ability[target] === 22 && ability[effect1] === 35)
            restrictText = 'Clones';
        else
            restrictText = abilityTargeting[ability[target]];
    } else
        restrictText = '—';

    let accuracyText = '';
    if ([2,3].includes(ability[hit1]) || ability[hit1] === 5 && ability[hit2] > 0) {
        accuracyText = ability[hit2] + '%';
    } else if (ability[hit1] === 4) {
        accuracyText = '100%';
    } else if ([7,8].includes(ability[hit1])) {
        accuracyText = ability[hit2] + '% + 10%/Skill Rank';
    } else if (ability[accuracy] > 0) {
        accuracyText = `<span data-tooltip="scalingacc-` +
            (ability.typ < 22 || ability.typ > 43 ? 'nwa-' : '') +
            ability[accuracy] +
            `" data-position="bottom" data-size="large">` +
            accuracyScaling[ability[accuracy]].name +
            `</span>`;
    } else {
        accuracyText = '—';
    }
    if ([1,3,4].includes(ability[hit1])) {
        accuracyText += ' if Main Hits';
    } else if (ability[hit1] === 5) {
        accuracyText += ' if Previous Hits';
    }

    let damageProps = [];
    if ([1,4,8].includes(ability[effect1])) {
        if ([10, 16, 17, 18, 23].includes(ability[formula])) {
            let damageProp = {};
            damageProp['name'] = damageTypes[4].name;
            damageProp['icon'] = damageTypes[4].icon;
            damageProps.push(damageProp);
        } else {
            let damageProp = {};
            if ( ability[scaling] === 20 || ability[formula] === 5 ) {
                damageProp['name'] = damageTypes[5].name;
                damageProp['icon'] = damageTypes[5].icon;
            } else if ( [0,1].includes(ability[formula]) ) {
                damageProp['name'] = damageTypes[4].name;
                damageProp['icon'] = damageTypes[4].icon;
            } else if ( !ability[damage] && !ability[element] && ability[formula] !== 4 ) {
                damageProp['name'] = damageTypes[6].name;
                damageProp['icon'] = damageTypes[6].icon;
            } else if (ability[damage]) {
                damageProp['name'] = damageTypes[ability[damage]].name;
                damageProp['icon'] = damageTypes[ability[damage]].icon;
            }
            if (damageProp.name) {
                damageProps.push(damageProp);
                damageProp = {};
            }
            if (ability[element]) {
                damageProp['name'] = elements[ability[element]].name;
                damageProp['icon'] = elements[ability[element]].icon;
                damageProps.push(damageProp);
            }
        }
    }

    effectProperties['effect'] = effectText;
    effectProperties['restrict'] = restrictText;
    effectProperties['accuracy'] = accuracyText;
    effectProperties['damage'] = damageProps;
    return effectProperties;
}

function getDerivedStat(stats, index) {

    let total = 0;
    let formulaBase = null;
    let derivedStat = derivedStatList[index];

    if (derivedStat.formula === 'damage') {
        formulaBase = damageScaling;
    } else if (derivedStat.formula === 'accuracy') {
        formulaBase = accuracyScaling;
    }
    for (const [key, value] of Object.entries(stats)) {
        if (formulaBase[derivedStat.formulaId][derivedStat.side][key])
            total += value * formulaBase[derivedStat.formulaId][derivedStat.side][key];
    }
    return Math.round(total);
}