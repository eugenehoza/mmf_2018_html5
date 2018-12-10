const coversCount = 3;
const difficulties = [{name: 'Low(5x2)', count: 10}, {name: 'Medium(6x3)', count: 18}, {name: 'Hard(8x3)', count: 24}];
const difficultiesCount = difficulties.length;
let token;
let user_id;

Vue.component('login', {
    data: function () {
        return {
        
        }
    },
    methods: {
        getRegistrationForm() {
            vm.registration = true;
        },
        getMenuForm() {
            applicationStart();
        }
    },
    template: `<div id='registration' class='registration'>
                <section class="registration-greeting">
                    <h1>Match-match game</h1>
                    <span class="greeting-hello">Hello everybody! The game for us</span>
                    <span class="greeting-suggestion">Fill out this login form to continue</span>
                    <br><br>
                    <button @click='getRegistrationForm'>Registration</button>
                    <span class="greeting-hello">Login</span>
                </section>
                <form class="registration-form" name="registrationForm" id="registration-form" action="">
                    <label for="first-name">First_name:</label>
                    <input type="text" name="first-name" id="first-name" required placeholder="First name">
                    <label for="email">Your_email:</label>
                    <input id="email" name="email" type="email" required placeholder="Email">
                    <input type="submit" value="Log in" id="form-btn" @click='getMenuForm'>
                </form></div>`
})

Vue.component('registration', {
    data() {
        return {
        
        }
    },
    methods: {
        getMenu() {
            fetch('http://localhost:3000/registration', {
                method: 'POST',  
                headers: {  
                    "Content-type": "application/json; charset=UTF-8"  
                },  
                body: JSON.stringify({
                    login: document.getElementById('registration-form').elements['first-name'].value,
                    password:  document.getElementById('registration-form').elements['email'].value
                })
            })
            .then(res => {
                if(res.statusText === 'OK') vm.registration = false;
                else throw('error on page');
            })
            .catch(error => alert(error))
        },
        swapMode() {
            vm.registration = false;
        }
    },
    template: `<div id='registration' class='registration'>
                <section class="registration-greeting">
                    <h1>Match-match game</h1>
                    <span class="greeting-hello">Hello everybody! The game for us</span>
                    <span class="greeting-suggestion">Fill out this login form to continue</span>
                    <br><br>
                    <button @click='swapMode'>Login</button>
                    <span class="greeting-hello">Registration</span>
                </section>
                <form class="registration-form" name="registrationForm" id="registration-form" action="">
                    <label for="first-name">First_name:</label>
                    <input type="text" name="first-name" id="first-name" required placeholder="First name">
                    <label for="email">Your_email:</label>
                    <input id="email" name="email" type="email" required placeholder="Email">
                    <input type="submit" value="Sign up" id="form-btn" @click.prevent='getMenu'>
                </form></div>`
})

let vm = new Vue({
    el: '#wrapper',
    data: {
        registration: true
    }
})


function applicationStart() {
    let registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', e => {
        e.preventDefault();
        let firstName = registrationForm.elements['first-name'].value;
        let email = registrationForm.elements['email'].value;

        let user = User.isExist(email);
        if (!user) {
            user = new User(firstName, email);
        }
        if (user._firstName === firstName) {
            fetch('http://localhost:3000/login', {
                method: 'POST',  
                headers: {  
                    "Content-type": "application/json; charset=UTF-8"  
                },  
                body: JSON.stringify({
                    login: firstName,
                    password: email
                })
            })
            .then(result => result.json())
            .then(res => {
                user_id = res.id;
                
                let menu = new Menu(user);
                menu.addCovers();
                menu.addDifficulties();
                menu.showMenu();
                
            })
            .catch(error => alert('warning'))
        }
        return false;
    });
}

class Menu {
    constructor(user) {
        this.user = user;
        this.menu = document.getElementById('menu');
        this.cover = 0;
        this.difficulty = difficulties[0];
        this.coversList = document.getElementById('menu-bar-images');
        this.difficultiesList = document.getElementById('menu-bar-difficulty');
        this.results = document.getElementById('result-box');
    }

    // showResults() {
    //     this.results.addEventListener('click', e => {
    //         fetch('http://localhost:3000/records')
    //         .then(res => res.json())
    //         .then(records => {
               
    //         })
    //         .catch(error => console.log(error))
    //     });
    // }

    showMenu() {
        let registration = document.getElementById('registration');
        registration.style.display = 'none';
        this.menu.style.display = "flex";
        this.addHighScoreTable();//
        let logout = document.getElementById('logout-btn');
        let newGame = document.getElementById('new-game-btn');
        newGame.addEventListener('click', e => {
            let rulesElement = document.getElementById('menu-rules');
            let highScoresElement = document.getElementById('menu-highscore');
            let dropdown = document.getElementById('dropdown');
            let menuBar = document.getElementById('menu-bar');
            rulesElement.style.display = 'none';
            menuBar.className += ' flex-end';
            highScoresElement.style.display = 'none';
            dropdown.style.display  = 'none';
            let oldGame = document.getElementById('game');
            if (oldGame) this.menu.removeChild(oldGame);
            let game = new Game(this.user, this.difficulty, this.cover);
            game.addGameTable();
        });

        logout.addEventListener('click', e => {
            location.reload();
        });
    }
    
    addHighScoreTable() {
        let highScoreTableBody = document.getElementById('highscore-table-body');
        // let results;
        
        // fetch('http://localhost:3000/records')
        // .then(res => res.json())
        // .then(records => {
        //     results = records;
        //     console.log(results);
        // })
        // .catch(error => console.log(error))
    

        let highScoreTable = new Highscore(this.difficulty);
        let tableSize = highScoreTable.tableSize;
        let table = highScoreTable.highScoreTable;
        let timer = new Timer();
        for (let row = 0; row < tableSize; row++) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerText = (row + 1) + '';
            tr.appendChild(td);
            let userFromTable = table[row];
            Object.keys(userFromTable).forEach((value => {
                    td = document.createElement('td');
                    if (value === '_highscore') 
                        userFromTable[value] = timer.convertToString(userFromTable[value]);
                    td.innerText = userFromTable[value] + '';
                    tr.appendChild(td);
            }));
            highScoreTableBody.appendChild(tr);
        }
    }

    addCovers() {
        for (let i = 0; i < coversCount; i++) {
            let newImage = document.createElement('img');
            newImage.style.background = `url('./images/covers/${i+1}.jpg') center center / 100% 100% no-repeat`;
            let imageContainer = document.createElement('div');
            imageContainer.appendChild(newImage);
            this.coversList.appendChild(imageContainer);
            newImage.addEventListener('click', (e) => {
               this.cover = i;
            });
        }
    }

    addDifficulties() {
        for (let i = 0; i < difficultiesCount; i++) {
            let newDifficulty = document.createElement('div');
            newDifficulty.className += "menu-bar-difficulty-item";
            newDifficulty.innerHTML = `${difficulties[i].name}`;
            this.difficultiesList.appendChild(newDifficulty);
            newDifficulty.addEventListener('click', (e) => {
                let highScoreTableBody = document.getElementById('highscore-table-body');
                highScoreTableBody.innerHTML = '';
                this.difficulty = difficulties[i];
                this.addHighScoreTable();
            });
        }
    }
}

class User {
    constructor(firstName, email) {
        this._firstName = firstName;
        this._email = email;
        this._highscore = '';
        this.remember();
    }

    get fullName() {
        return `${this._firstName}`;
    }

    get getMail() {
        return `${this._email}`;
    }

    get highscore() {
        return this._highscore;
    }

    set highscore(value) {
        this._highscore = value;
    }

    serialize() {
        return JSON.stringify(this);
    }

    static deserialize(string) {
        return JSON.parse(string);
    }

    remember() {
        let userAsString = this.serialize();
        window.localStorage.setItem(this.getMail, userAsString);
    }

    static isExist(email) {
        let user = window.localStorage.getItem(email);
        if (user)
            return this.deserialize(user);
        else
            return false;
    }
}

class Game {
    constructor(user, difficulty, cover) {
        this.user = user;
        this.difficulty = difficulty;
        this.cover = cover;
        this.menu = document.getElementById('menu');
        this.randomArray = [];
        Game.checkVictory = this.checkVictory.bind(this);
        Game.countOfCards = this.difficulty.count;
    }

    addGameTable() {
        let desk = document.createElement('section');
        desk.id = "game";
        desk.className += "game";
        let cardsPart = document.createElement('div');
        cardsPart.className += "game-desk";
        cardsPart.id = 'game-cardPart';
        let timerPart = document.createElement('div');
        timerPart.classList.toggle('timer');
        timerPart.id = 'timer';
        let tableOfCards = document.createElement('table');
        tableOfCards.className += "game-desk-table";
        let cardsCount = this.difficulty.count;
        let linesCount = 2;
        if (cardsCount >= 18) linesCount = 3;
        this.generateRandomArray();
        let indexForRandomArray = 0;
        let cardsPerLine = Math.floor(cardsCount / linesCount);
        for (let row = 0; row < linesCount; row++) {
            let tableRow = document.createElement('tr');
            for (let column = 0; column < cardsPerLine; column++) {
                let newCard = new Card(this.cover, this.randomArray[indexForRandomArray]);
                indexForRandomArray++;
                if (indexForRandomArray >= this.randomArray.length) {
                    indexForRandomArray = 0;
                    this.generateRandomArray();
                }
                tableRow.appendChild(newCard.element);
            }
            tableOfCards.appendChild(tableRow);
        }
        cardsPart.appendChild(tableOfCards);
        desk.appendChild(cardsPart);
        desk.appendChild(timerPart);
        this.menu.appendChild(desk);
        this.timer = new Timer();
        this.timer.start();
        fetch('http://localhost:3000/start')
        .then(res => res.json())
        .then (setting => {
            console.log(setting);
            token = setting.token;
            user_id = setting._id;
        })
        .catch(error => console.log(error))
    }

    generateRandomArray() {
        let countOfPairs = Math.floor(this.difficulty.count / 2);
        this.randomArray = new Array(countOfPairs).fill(-1);
        this.randomArray.map((value, index) => {
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * countOfPairs + 1);
            } while (this.randomArray.indexOf(randomNumber) !== -1);
            this.randomArray[index] = randomNumber;
        });
    }

    checkVictory() {
        let countOfHidedCards = document.getElementsByClassName('hide').length;
        if (Game.countOfCards === countOfHidedCards) this.victory();
    }

    victory() {
        this.timer.stop();
        let time = this.timer.timeAsNum.toFixed(2);

        fetch('http://localhost:3000/finish', {
            method: 'POST',  
            headers: {  
                "Content-type": "application/json; charset=UTF-8"  
            },  
            body: JSON.stringify({
                time: time,
                token: token,
                user_id: user_id
            })
        })
        .then(res => {
            if(res.statusText === 'OK') {
                
            }
            else throw('error on page');
        })
        .catch(error => console.log(error))

        this.user._highscore = time;
        let highScoreTable = new Highscore(this.difficulty);
        highScoreTable.addUser(this.user);
        highScoreTable.save();
        let desk = document.getElementById('game-cardPart');
        desk.innerHTML = '';
        let victoryLog = document.createElement('h1');
        victoryLog.innerText = "Congratulations! Was it easy? Try others difficulties!";
        victoryLog.classList.toggle('victory');
        desk.appendChild(victoryLog);
        let dropdown = document.getElementById('dropdown');
        dropdown.style.display = 'flex';
        let menuBar = document.getElementById('menu-bar');
        menuBar.classList.remove('flex-end');
    }
}

class Card {
    constructor(coverNum,randomImage) {
        this.identificator = randomImage;
        this.coverBackGround = `url('./images/covers/${coverNum + 1}.jpg') center center / 100% 100% no-repeat`;
        this.imageBackGround = `url('./images/cards/${randomImage}.jpg') center center / 100% 100% no-repeat`;
        this.element = document.createElement('td');
        this.defaultSetup();
    }

    defaultSetup() {
        this.element.style.background = this.coverBackGround;
        this.element.className += 'closed';
        this.element.addEventListener('click', (e) => {
            if (Card.openedCards[0] === this) {
                this.closeCard();
                Card.openedCards.splice(0,1);
            }
            else
                this.openCard();
            let countOfOpenedCards = Card.openedCards.length;
            while (countOfOpenedCards > 1) {
                let firstOpenedCard = Card.openedCards[0];
                let secondOpenedCard = Card.openedCards[1];
                if (firstOpenedCard.identificator === secondOpenedCard.identificator && firstOpenedCard !== secondOpenedCard) {
                    firstOpenedCard.hideCard();
                    secondOpenedCard.hideCard();
                } else {
                    setTimeout(()=>{
                        firstOpenedCard.closeCard();
                        secondOpenedCard.closeCard();
                    },1000);
                }
                Card.openedCards.splice(0, 2);
                countOfOpenedCards = Card.openedCards.length;
            }
        });
    }

    openCard() {
        this.element.classList.remove('closed');
        this.element.classList.toggle('opened');
        this.element.style.background = this.imageBackGround;
        Card.openedCards.push(this);
    }

    closeCard() {
        this.element.classList.remove('opened');
        this.element.classList.toggle('closed');
        this.element.style.background = this.coverBackGround;
    }

    hideCard() {
        this.element.classList.add('hide');
        Game.checkVictory();
    }
}
Card.openedCards = [];

class Timer {
    constructor(){
        this.interval = 0;
        this.timerElement = document.getElementById('timer');
        this._time = 0;
    }
    start() {
        let num = 0;
        this.interval = setInterval(() => {
            num += 0.05;
            this._time = num;
            this.timerElement.innerText = this.convertToString(this._time);
        },50);
    }

    stop() {
        clearInterval(this.interval);
    }

    get timeAsNum() {
        return this._time;
    }

    convertToString(time) {
        let stringFormatTime = "";
        stringFormatTime += (Math.floor(time/60) % 60).length < 1 ?  (Math.floor(time/60) % 60) : "0" +(Math.floor(time/60) % 60);
        stringFormatTime += ":";
        stringFormatTime += ((time % 60).toFixed(2)).length < 5 ? "0" + (time % 60).toFixed(2) : ((time % 60).toFixed(2));
        return stringFormatTime;
    }
}

class Highscore {
    constructor(difficulty) {
        this._difficulty = difficulties.indexOf(difficulty);
        this._highScoreTables = this._getFromStorage();
        this._currentTable = this._getCurrentTable();
    }

    _getFromStorage() {
        let stringFormatTable = window.localStorage.getItem('highScoreTables');
        return JSON.parse(stringFormatTable);
    }

    _getCurrentTable() {
        let highScoreTables = this._highScoreTables;
        if (!highScoreTables) {
            let newTable = new Array(difficultiesCount).fill(0);
            newTable = newTable.map((value) => { return [];});
            this._highScoreTables = newTable;
        }
        let highScoreTable = this._highScoreTables[this._difficulty];
        highScoreTable.sort((a,b) => +a._highscore - +b._highscore);
        return highScoreTable;
    }

    save() {
        this._highScoreTables[this._difficulty] = this._currentTable;
        let serializedTable = JSON.stringify(this._highScoreTables);
        window.localStorage.setItem('highScoreTables', serializedTable);
    }

    addUser(user) {
        this._currentTable.push(user);
        this._currentTable = this._currentTable.sort((a,b) => +a._highscore - +b._highscore);
        this._currentTable = this._currentTable.slice(0, this.tableSize > 10 ? 10 : this.tableSize);
    }

    get tableSize() {
        return this._currentTable.length;
    }

    get highScoreTable() {
        return this._currentTable;
    }
}