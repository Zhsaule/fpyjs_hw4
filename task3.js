const rl = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('fs');

const secretNumber = Math.floor(Math.random() * 999);
let i = 0;

async function playGame() {
    return new Promise((resolve, reject) => {
        rl.question('Угадайте число от 0 до 999: ', (numberFromUser) => {
            i++;

            if (isNaN(numberFromUser) || numberFromUser.trim() === "" ) {
                console.log('Пожалуйста, введите число.');
                resolve(playGame());
            } else {
                numberFromUser = parseInt(numberFromUser);

                if (numberFromUser === secretNumber) {
                    console.log(`Поздравляю! Вы угадали число за ${i} попыток.`);
                    rl.close();
                    resolve(writeProtocol());
                } else if (numberFromUser < secretNumber) {
                    console.log('Загаданное число больше.');
                    resolve(playGame());
                } else {
                    console.log('Загаданное число меньше.');
                    resolve(playGame());
                }
            }
        });
    });
}

async function writeProtocol() {
    const protocol = `Число: ${secretNumber}, Попыток: ${i}\n`;

    try {
        await fs.promises.access('protocol_async.txt', fs.constants.F_OK);
        await fs.promises.appendFile('protocol_async.txt', protocol);
        console.log('Протокол игры сохранен в файле protocol_async.txt.');
    } catch (err) {
        await fs.promises.writeFile('protocol_async.txt', protocol);
        console.log('Файл протокола создан. Протокол игры сохранен.');
    }
}

playGame()