const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 14;
const healValue = 20;
const log = [];

let chosenMaxLife = parseInt(prompt("Enter the maxiumum life.", "100"));

if (chosenMaxLife === NaN || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function resetGame() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    adjustHealthBars(chosenMaxLife);
}

function useBonusLifeOrResetGame() {
    if (currentPlayerHealth <= 0 && +bonusLifeEl.textContent) {
        alert("Bonus Life !!");
        currentPlayerHealth = chosenMaxLife;
        setPlayerHealth(chosenMaxLife);
        removeBonusLife();
    } else {
        resetGame();
    }
}

function logRecord(logObject) {
    logObject = { ...logObject, currentPlayerHealth, currentMonsterHealth };
    log.push(logObject);
}

function attackMonster(damage) {
    const damageValue = dealMonsterDamage(damage);
    currentMonsterHealth -= damageValue;
    logRecord({ logType: "attack", attacker: "player", receiver: "monster" });
}

function attackPlayer(damage) {
    const damageValue = dealPlayerDamage(damage);
    currentPlayerHealth -= damageValue;
    logRecord({ logType: "attack", attacker: "monster", receiver: "player" });
}

function attack(receiver, damage) {
    if (receiver === "monster") {
        attackMonster(damage);
    } else if (receiver === "player") {
        attackPlayer(damage);
    }
}

function checkWin() {
    if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        useBonusLifeOrResetGame();
        alert("You lose !");
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        resetGame();
        alert("You win !");
    }
}

function attackHandler() {
    attack("monster", attackValue);
    attack("player", monsterAttackValue);
    checkWin();
}

function strongAttackHandler() {
    attack("monster", strongAttackValue);
    attack("player", monsterAttackValue);
    checkWin();
}

function healPlayerHandler() {
    if (currentPlayerHealth > chosenMaxLife - healValue) {
        currentPlayerHealth = increasePlayerHealth(
            healValue - (currentPlayerHealth - (chosenMaxLife - healValue)),
        );
    } else {
        currentPlayerHealth = increasePlayerHealth(healValue);
    }
    logRecord({ logType: "heal", performedBy: "player" });
}

function logPlayer() {
    console.log(log);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", logPlayer);
