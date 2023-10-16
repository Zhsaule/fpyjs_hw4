const rl = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('fs');

const secretNumber = Math.floor(Math.random() * 999);
let i = 0;
// let arr_num = 'Попытки: ';

function playGame() {
    rl.question('Угадайте число от 0 до 999: ', (numberFromUser) => {
        i++;

        if (isNaN(numberFromUser) || numberFromUser.trim() === "" ) {
            console.log('Пожалуйста, введите число.');
            playGame();
        } else {
            numberFromUser = parseInt(numberFromUser);
            // arr_num = arr_num + numberFromUser + ' '; 

            if (numberFromUser === secretNumber) {
                console.log(`Поздравляю! Вы угадали число за ${i} попыток.`);
                rl.close();
                writeProtocol();
            } else if (numberFromUser < secretNumber) {
                console.log('Загаданное число больше.');
                playGame();
            } else {
                console.log('Загаданное число меньше.');
                playGame();
            }
        }
    });
}

function writeProtocol() {
    const protocol = `Число: ${secretNumber}, Попыток: ${i}\n`;
    // , ${arr_num}
    fs.access('protocol.txt', fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile('protocol.txt', protocol, (err) => {
                if (err) throw err;
                console.log('Файл протокола создан. Протокол игры сохранен.');
            });
        } else {
            fs.appendFile('protocol.txt', protocol, (err) => {
                if (err) throw err;
                console.log('Протокол игры сохранен в файле protocol.txt.');
            });
        }
    });
}

playGame();