(function () {
    'use strict';

    let arrayOfUnicode = [
            ['', '', '', '', '', '',
                '\ud83c\udca6',
                '\ud83c\udca7',
                '\ud83c\udca8',
                '\ud83c\udca9',
                '\ud83c\udcaa',
                '\ud83c\udcab',
                '\ud83c\udcad',
                '\ud83c\udcae',
                '\ud83c\udca1'],
            ['', '', '', '', '', '',
                '\ud83c\udcb6',
                '\ud83c\udcb7',
                '\ud83c\udcb8',
                '\ud83c\udcb9',
                '\ud83c\udcba',
                '\ud83c\udcbb',
                '\ud83c\udcbd',
                '\ud83c\udcbe',
                '\ud83c\udcb1'],
            ['', '', '', '', '', '',
                '\ud83c\udcc6',
                '\ud83c\udcc7',
                '\ud83c\udcc8',
                '\ud83c\udcc9',
                '\ud83c\udcca',
                '\ud83c\udccb',
                '\ud83c\udccd',
                '\ud83c\udcce',
                '\ud83c\udcc1'],
            ['', '', '', '', '', '',
                '\ud83c\udcd6',
                '\ud83c\udcd7',
                '\ud83c\udcd8',
                '\ud83c\udcd9',
                '\ud83c\udcda',
                '\ud83c\udcdb',
                '\ud83c\udcdd',
                '\ud83c\udcde',
                '\ud83c\udcd1']],
        nameOfSuit = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    console.log(arrayOfUnicode);
    let Card = function (number, suit) {
        this.number = number;
        this.suit = suit;
    };

    function defineTrump() {
        return Math.floor(Math.random() * 4);
    };

    let cardsArray = [],
        playersPacksOfCards = [];

    function createPackOfCardsArray() {
        for (let suit = 0; suit <= 3; suit++) {
            for (let number = 6; number <= 14; number++) {
                let card = new Card(number, suit);
                cardsArray.push(card);
            }
        }
        return cardsArray;
    };

    function mixDeck(cardsArray) {
        return cardsArray.sort(function () {
            return (Math.random() < 0.5 ? 1 : -1)
        });
    };

    function distributePackOfCards(cardArray) {
        let firstPlayerCardArrays = [];
        let secondPlayerCardArrays = [];
        for (let i = 0; i < cardArray.length / 2; i++) {
            firstPlayerCardArrays[i] = cardArray[i];
            secondPlayerCardArrays[i] = cardArray[i + 18];
        }
        ;
        playersPacksOfCards = [firstPlayerCardArrays, secondPlayerCardArrays];
        return playersPacksOfCards;
    };

    createPackOfCardsArray();
    mixDeck(cardsArray);
    distributePackOfCards(cardsArray);
    let firstPlayerCardArrays = playersPacksOfCards[0],
        secondPlayerCardArrays = playersPacksOfCards[1],
        trump = defineTrump(),
        insertTrump = document.getElementById('trump');
    insertTrump.innerHTML = nameOfSuit[trump];
    let firstPlayerScore = document.getElementById('firstScore'),
        secondPlayerScore = document.getElementById('secondScore'),
        tableOfResults = document.getElementById('tableResult'),
        nameWinner = document.getElementById('nameOfWinner');


    function* gameStart() {
        for (let i = 0; i < 18; i++) {
            let firstPlayerCard = firstPlayerCardArrays.pop(),
                secondPlayerCard = secondPlayerCardArrays.pop(),
                newRow = document.createElement('tr'),
                newCellFirst = document.createElement('td'),
                newCellSecond = document.createElement('td');
            tableOfResults.appendChild(newRow);
            newCellFirst.innerHTML = arrayOfUnicode[firstPlayerCard.suit][firstPlayerCard.number];
            newCellSecond.innerHTML = arrayOfUnicode[secondPlayerCard.suit][secondPlayerCard.number];
            if (firstPlayerCard.suit === 1 || firstPlayerCard.suit === 2) {
                newCellFirst.classList.add('red');
            }
            if (secondPlayerCard.suit === 1 || secondPlayerCard.suit === 2) {
                newCellSecond.classList.add('red');
            }
            newRow.appendChild(newCellFirst);
            newRow.appendChild(newCellSecond);
            if (firstPlayerCard.suit === trump && secondPlayerCard.suit === trump) {
                if (firstPlayerCard.number > secondPlayerCard.number) {
                    firstPlayerScore.innerHTML++;
                } else {
                    secondPlayerScore.innerHTML++;
                }
            }
            if (firstPlayerCard.suit === trump && secondPlayerCard.suit !== trump) {
                firstPlayerScore.innerHTML++;
            }
            if (secondPlayerCard.suit === trump && firstPlayerCard.suit !== trump) {
                secondPlayerScore.innerHTML++;
            }
            if (firstPlayerCard.suit !== trump && secondPlayerCard.suit !== trump) {
                if (firstPlayerCard.number > secondPlayerCard.number) {
                    firstPlayerScore.innerHTML++;
                } else {
                    secondPlayerScore.innerHTML++;
                }
            }

            yield;
        }
        ;
        if (+firstPlayerScore.innerHTML > +secondPlayerScore.innerHTML) {
            nameWinner.innerHTML = 'Петя';
        }
        if (+firstPlayerScore.innerHTML < +secondPlayerScore.innerHTML) {
            nameWinner.innerHTML = 'Вася';
        }
        if (+firstPlayerScore.innerHTML === +secondPlayerScore.innerHTML) {
            nameWinner.innerHTML = 'Ничья';
        }
    };

    let generator = gameStart();
    document.addEventListener('click', () => {
        generator.next();
    });
}());
