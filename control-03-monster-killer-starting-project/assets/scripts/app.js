const MAX_MONSTER_ATTACK_VALUE = 15;
const MAX_PLAYER_ATTACK_VALUE = 10;
const MAX_PLAYER_STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRING_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
const logEntries = [];

let lastLoggedEntry;

function getMaxLifeFromPlayer() {
  const enteredMaxLife = prompt("Enter yours and monsters max health...", 100);
  const parsedMaxLife = parseInt(enteredMaxLife);

  if (isNaN(parsedMaxLife) || parsedMaxLife <= 0) {
    throw { message: "You entered a non-integer value !" };
  }
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeFromPlayer();
} catch (error) {
  console.log(error.message);
  chosenMaxLife = 100;
  alert("You entered invalid number. Max life value defaulted to 100");
}

let currentPlayerHealth = chosenMaxLife;
let currentMonsterHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(logEvent, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: logEvent,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (logEvent) {
    case LOG_EVENT_PLAYER_ATTACK:
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "MOSTER";
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_GAME_OVER:
      break;
    default:
      logEntry = {};
  }

  logEntries.push(logEntry);
}

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMonsterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const previousPlayerHealth = currentPlayerHealth;
  const dealtPlayerDamage = dealPlayerDamage(MAX_MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= dealtPlayerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    dealtPlayerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = previousPlayerHealth;
    setPlayerHealth(previousPlayerHealth);
    alert("You would've died but got saved !");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth < 0 && currentPlayerHealth < 0) {
    alert("You draw !");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const attackValue =
    mode === MODE_ATTACK
      ? MAX_MONSTER_ATTACK_VALUE
      : MAX_PLAYER_STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const dealtMonsterDamage = dealMonsterDamage(attackValue);
  currentMonsterHealth -= dealtMonsterDamage;

  writeToLog(
    logEvent,
    dealtMonsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function attachHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth > chosenMaxLife - HEAL_VALUE) {
    alert("Cannot heal more than max life !");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHandler() {
  let i = 0;
  for (const logEntry of logEntries) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || i > lastLoggedEntry) {
      lastLoggedEntry = i;
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} : ${logEntry[key]}`);
      }
      break;
    }
    i++;
  }
}

attackBtn.addEventListener("click", attachHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
