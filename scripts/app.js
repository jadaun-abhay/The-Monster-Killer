const attackValue = 10;
const strongAttackValue = 17;
const monsterAttackValue = 14;
const healValue = 20;

let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(damage) {
    const damageValue = dealMonsterDamage(damage);
    currentMonsterHealth -= damageValue;
}

function attackPlayer(damage) {
    const damageValue = dealPlayerDamage(damage);
    currentPlayerHealth -= damageValue;
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
        alert("You lose !");
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
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
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
