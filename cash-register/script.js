

function checkCashRegister(price, cash, cid) {

	// GLOBAL VARIABLES:

    // key to available denominations (in cents):
    const currencyMapInCents = [
        ["PENNY", 1],
        ["NICKEL", 5],
        ["DIME", 10],
        ["QUARTER", 25],
        ["ONE", 100],
        ["FIVE", 500],
        ["TEN", 1000],
        ["TWENTY", 2000],
        ["ONE HUNDRED", 10000]
    ];
    // object that is going to be updated and returned in the end:
    const drawerAfterPurchase = {};
    drawerAfterPurchase.status = "";
    drawerAfterPurchase.change = [];

    // change that needs to be returned (in cents):
    let changeInCents = (cash - price) * 100;

    // cidInCents: cash in drawer converted to cents (to avoid working with floats):
    const cidInCents = [];
    for (let i = 0; i < cid.length; i++) {
        const subArray = [currencyMapInCents[i][0], Math.round(cid[i][1] * 100)];
        cidInCents.push(subArray);
    }

    // total sum in drawer available:
    let cashInCid = cidInCents.reduce((acc, cur) => {
        return acc + cur[1];
    }, 0);

    // MAIN FUNCTION (called on each currency unit):

    // function that returns the change (sum) in the current unit
    function giveChangeInCurrentUnit(currentChange, curUnitValue, curUnit) {
        let availableSumInCurUnit = curUnit[1];
        let curUnitName = curUnit[0];

        // the following variable is used to check if change can be given in the current unit:
        let canGiveChange = curUnitValue <= currentChange;

        if (canGiveChange) {

	    	// if available sum in the current currency unit is smaller or equal to the change due, the entire sum is issued, and the change due is reduced by this exact sum
            if (availableSumInCurUnit <= currentChange) {

            let moneyGivenInCurrentUnit = availableSumInCurUnit;
            // change (sum) in the current unit is pushed into drawerAfterPurchase.change array
            drawerAfterPurchase.change.push([curUnitName, moneyGivenInCurrentUnit / 100]);

            // the total sum in drawer is redefined and passed into the next iteration
            cashInCid = cashInCid - moneyGivenInCurrentUnit;

            // change due is redefined and passed into the next iteration
            currentChange = currentChange - moneyGivenInCurrentUnit;

            } else { // availableSumInCurUnit > currentChange
            // current change % unit value = remainder — what can't be given in current units
            let remainder = currentChange % curUnitValue;

            // change (sum) in the current unit is pushed into drawerAfterPurchase.change array
            let moneyGivenInCurrentUnit = currentChange - remainder;
            drawerAfterPurchase.change.push([curUnitName, moneyGivenInCurrentUnit / 100]);

            // changeInCents is redefined and passed into the next iteration
            currentChange = remainder;

            // cashInCid is redefined and passed into the next iteration
            cashInCid = cashInCid - moneyGivenInCurrentUnit;

            }
        }
        return currentChange;
    }

    // ITERATOR
    // checks how much change I can give in each unit and redefines the change due with each iteration:
    for (let i = cidInCents.length - 1; i >= 0; i--) {
        changeInCents = giveChangeInCurrentUnit(changeInCents, currencyMapInCents[i][1], cidInCents[i]);
    }

    // function that SETS THE STATUS of the cash register
    function setDrawerStatus(remainingChange, remainingCash) {
        // if no change is due: either "OPEN" (there is cash in cid) or "CLOSED" (no cash in cid)
        // if change remains due after the loop, set status to "INSUFFICIENT_FUNDS"

        if (remainingChange === 0) {
            if (remainingCash === 0) {
            drawerAfterPurchase.status = "CLOSED";
            drawerAfterPurchase.change = cid;
            }
            if (remainingCash > 0) {
            drawerAfterPurchase.status = "OPEN";
            }

            return drawerAfterPurchase;

        } else {
            drawerAfterPurchase.status = "INSUFFICIENT_FUNDS";
            drawerAfterPurchase.change = [];

            return drawerAfterPurchase;
        }
    }

    return setDrawerStatus(changeInCents, cashInCid);

}



// TESTS:

// checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 0.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

// checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
