const blue = document.getElementById("blue");
const violet = document.getElementById("violet");
const orange = document.getElementById("orange");
const green = document.getElementById("green");
const btnStart = document.getElementById("btnStart");
const LAST_LEVEL = 5;

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel, 500);
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.toggleBtnStart();
    this.level = 1;
    this.colors = {
      blue,
      violet,
      orange,
      green,
    };
  }

  toggleBtnStart() {
    if (btnStart.classList.contains("hide")) {
      btnStart.classList.remove("hide");
    } else {
      btnStart.classList.add("hide");
    }
  }

  generateSequence() {
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.sublevel = 0;
    this.illuminateSequence();
    this.addEventsClick();
  }

  transformNumberToColor(number) {
    switch (number) {
      case 0:
        return "blue";
      case 1:
        return "violet";
      case 2:
        return "orange";
      case 3:
        return "green";
    }
  }

  transformColorToNumber(color) {
    switch (color) {
      case "blue":
        return 0;
      case "violet":
        return 1;
      case "orange":
        return 2;
      case "green":
        return 3;
    }
  }

  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      let color = this.transformNumberToColor(this.sequence[i]);

      setTimeout(() => this.illuminateColor(color), 750 * i);
    }
  }

  illuminateColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnColorOff(color), 350);
  }

  turnColorOff(color) {
    this.colors[color].classList.remove("light");
  }

  addEventsClick() {
    this.colors.blue.addEventListener("click", this.chooseColor);
    this.colors.green.addEventListener("click", this.chooseColor);
    this.colors.violet.addEventListener("click", this.chooseColor);
    this.colors.orange.addEventListener("click", this.chooseColor);
  }

  deleteEventsClick() {
    this.colors.blue.removeEventListener("click", this.chooseColor);
    this.colors.green.removeEventListener("click", this.chooseColor);
    this.colors.violet.removeEventListener("click", this.chooseColor);
    this.colors.orange.removeEventListener("click", this.chooseColor);
  }

  chooseColor(ev) {
    const colorName = ev.target.dataset.color;
    const colorNumber = this.transformColorToNumber(colorName);
    this.illuminateColor(colorName);

    if (colorNumber === this.sequence[this.sublevel]) {
      this.sublevel++;

      if (this.sublevel === this.level) {
        this.level++;
        this.deleteEventsClick();

        if (this.level === LAST_LEVEL + 1) {
          this.wonGame();
        } else {
          setTimeout(this.nextLevel, 1000);
        }
      }
    } else {
      this.lostGame();
    }
  }

  wonGame() {
    document.getElementById("play-again").style.display = "block";

    this.block("win");
    this.deleteEventsClick();
    // then(this.initialize);
  }

  lostGame() {
    document.getElementById("play-again").style.display = "block";
    this.block("lost");
    /*.then(() => {
      this.deleteEventsClick();
      this.initialize();
    });*/

    this.deleteEventsClick();
    // this.initialize();

    // document.getElementById("lost").style.display = "block";
  }

  block(info) {
    document.getElementById(info).style.display = "block";
  }
}

function startGame() {
  document.getElementById("description").style.display = "none";
  document.getElementById("instruction").style.display = "block";
  // document.getElementById("instruction").style.fontSize = "1.8rem";

  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  if (width < 400) {
    document.getElementById("instruction").style.fontSize = "2rem";
  } else if (400 < width && width < 600) {
    document.getElementById("instruction").style.fontSize = "2.5rem";
  } else if (width > 600) {
    document.getElementById("instruction").style.fontSize = "3.2rem";
  }

  window.game = new Game();
}

/* Style changes */

const body = document.getElementById("body");
const btnDarkMode = document.getElementById("btn-darkMode");
const btnPlayAgain = document.getElementById("play-again");
const text = document.getElementsByClassName("text");

function handleDarkMode() {
  if (btnDarkMode.innerHTML === "Light Mode") {
    body.style.backgroundColor = "#ffffff";
    btnDarkMode.innerHTML = "Dark Mode";
    btnDarkMode.style.backgroundColor = "transparent";
    btnDarkMode.style.color = "#000";
    btnDarkMode.style.border = "1px solid #000";
    btnStart.style.backgroundColor = "#ffffff";
    btnStart.style.color = "#000000";
    btnStart.style.border = "2px solid #7f8283";
    btnPlayAgain.style.backgroundColor = "transparent";
    btnPlayAgain.style.color = "#000";
    btnPlayAgain.style.border = "1px solid #000";

    for (let i = 0; i < text.length; i++) {
      text[i].style.color = "#000";
    }
  } else if (btnDarkMode.innerHTML === "Dark Mode") {
    body.style.backgroundColor = "#121f3d";
    btnDarkMode.innerHTML = "Light Mode";
    btnDarkMode.style.backgroundColor = "transparent";
    btnDarkMode.style.color = "#fff";
    btnDarkMode.style.border = "1px solid #fff";
    btnStart.style.backgroundColor = "#24385b";
    btnStart.style.color = "#ffffff";
    btnStart.style.border = "2px solid #121f3d";
    btnPlayAgain.style.backgroundColor = "transparent";
    btnPlayAgain.style.color = "#fff";
    btnPlayAgain.style.border = "1px solid #fff";

    for (let i = 0; i < text.length; i++) {
      text[i].style.color = "#fff";
    }
  }
}
