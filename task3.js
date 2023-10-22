const rl = require('readline').createInterface(process.stdin, process.stdout);
const fs = require('fs');

const secretNumber = Math.floor(Math.random() * 999);
let i = 0;

// Промисная обертка для rl.question
function questionAsync(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
}

async function playGame() {
    while (true) {
        i++;
        const numberFromUser = await questionAsync('Угадайте число от 0 до 999: ');

        if (isNaN(numberFromUser) || numberFromUser.trim() === "" ) {
            console.log('Пожалуйста, введите корректное число.');
            continue;
        }
        
        if (numberFromUser < secretNumber) {
            console.log('Загаданное число больше.');
        } else if (numberFromUser > secretNumber) {
            console.log('Загаданное число меньше.');
        } else { console.log(`Поздравляю! Вы угадали число за ${i} попыток.`);
            writeProtocol();
            break;
        } 
    }
    rl.close();
};

playGame();

// Вариант без async:
// function writeProtocol() {
//     const protocol = `Число: ${secretNumber}, Попыток: ${i}\n`;
//     try {
//         fs.promises.access('protocol_async.txt', fs.constants.F_OK);
//         fs.promises.appendFile('protocol_async.txt', protocol);
//         console.log('Протокол игры сохранен в файле protocol_async.txt.');
//     } catch (err) {
//         fs.promises.writeFile('protocol_async.txt', protocol);
//         console.log('Файл протокола создан. Протокол игры сохранен.');
//     }
// }
// Результат:
// Поздравляю! Вы угадали число за 12 попыток.
// Протокол игры сохранен в файле protocol_async.txt.
// node:internal/process/promises:289
//             triggerUncaughtException(err, true /* fromPromise */);
//             ^

// [Error: ENOENT: no such file or directory, access 'protocol_async.txt'] {
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'access',
//   path: 'protocol_async.txt'
// }

async function writeProtocol() {
    const protocol = `Число: ${secretNumber}, Попыток: ${i-1}\n`;

    try {
        await fs.promises.access('protocol_async.txt', fs.constants.F_OK);
        await fs.promises.appendFile('protocol_async.txt', protocol);
        console.log('Протокол игры сохранен в файле protocol_async.txt.');
    } catch (err) {
        await fs.promises.writeFile('protocol_async.txt', protocol);
        console.log('Файл протокола создан. Протокол игры сохранен.');
    }
}
