// Pristup HTML elementima za vrata i start gumb
let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

// Postavljanje početnih vrijednosti za broj zatvorenih vrata i status igre
let numClosedDoors = 3;
let openDoor1, openDoor2, openDoor3;
let currentlyPlaying = true;

// Pristup HTML elementima za vrata putem njihovih ID-jeva
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

// Pristup HTML elementu za start gumb
let startButton = document.getElementById('start');

// Funkcija za provjeru je li vrata već kliknuta
function isClicked(door) {
  return door.src !== closedDoorPath;
}

// Funkcija za provjeru sadrži li vrata ChoreBot (robota)
function isBot(door) {
  return door.src === botDoorPath;
}

// Funkcija za prikazivanje poruke o kraju igre, ovisno o statusu (pobjeda ili poraz)
function gameOver(status) {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
  } else {
    startButton.innerHTML = 'Game over! Play again?';
  }
  currentlyPlaying = false;
}

// Funkcija koja obrađuje interakcije s vratima i ažurira stanje igre
function playDoor(door) {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver();
  }
}

// Funkcija za nasumično dodjeljivanje ChoreBot-a na jedno od vrata i postavljanje slika
function randomChoreDoorGenerator() {
  const choreDoor = Math.floor(Math.random() * 3);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
}

// Funkcija za inicijalizaciju nove runde igre, resetiranje vrata i statusa igre
function startRound() {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  
  numClosedDoors = 3;
  currentlyPlaying = true;
  
  randomChoreDoorGenerator();
}

// Event listeneri za klik na vrata, provodi igru kad se vrata kliknu
doorImage1.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1; 
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

// Event listener za klik na start gumb, koji resetira igru
startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
  }
}

// Pokretanje prve runde kada se stranica učita
startRound();

// Rad uredio: Augustin Matošić