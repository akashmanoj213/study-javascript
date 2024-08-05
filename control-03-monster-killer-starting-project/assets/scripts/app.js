const MAX_MONSTER_ATTACK_VALUE = 15;
const MAX_PLAYER_ATTACK_VALUE = 10;
const MAX_PLAYER_STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRING_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const logEntries = [];

const enteredMaxLife = prompt('Enter yours and monsters max health...', 100);
let chosenMaxLife = parseInt(enteredMaxLife);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
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

  if (logEvent === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MOSTER';
  } else if (logEvent === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (logEvent === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = 'PLAYER';
  } else if (logEvent === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = 'PLAYER';
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
    alert('You won !');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost !');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth < 0 && currentPlayerHealth < 0) {
    alert('You draw !');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let attackValue;
  let logEvent;

  if (mode === MODE_ATTACK) {
    attackValue = MAX_PLAYER_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    attackValue = MAX_PLAYER_STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }

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
    alert('Cannot heal more than max life !');
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
  console.log(logEntries);
}

attackBtn.addEventListener('click', attachHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
