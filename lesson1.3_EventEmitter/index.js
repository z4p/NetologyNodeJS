"use strict";

const ChatApp = require('./ChatApp');


let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

vkChat.setMaxListeners(2);

let chatOnMessage = (message) => {
  console.log(message);
};

let gettingReady = () => {
  console.log('Готовлюсь к ответу');
};

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', gettingReady);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
vkChat.on('message', gettingReady);

                                            
vkChat.on('close', () => {
    console.log('Чат вконтакте закрылся :(');
});


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.close();
  vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

setTimeout( ()=> {
  webinarChat.removeListener('message', chatOnMessage);
}, 30000 );


/*
* Задания:
*
* 1)
*  1.1 Добавить обработчик события `message` для Чата Вебинара (`webinarChat`),
*      который выводит в консоль сообщение 'Готовлюсь к ответу'.
*      Обработчик создать в отдельной функции.
*
*  1.2 Для вконтакте (`vkChat`) установить максимальное количество обработчиков событий, равное 2.
*
*  1.3 Добавить обработчик 'Готовлюсь к ответу' из пп. 1.1 к чату вконтакте.
*
*
* 2)
*
*  2.1 В классе чата `ChatApp` добавить метод `close`, который будет вызывать событие `close`
*      (событие вызывается один раз, `setInterval` как в констукторе, не нужен).
*
*  2.2 Для чата вконтакте (`vkChat`) добавить обработчик `close`,
*      выводящий в консоль текст  "Чат вконтакте закрылся :(".
*
*  2.3 Вызывать у чата вконтакте метод `close()`.
*
* 3)
*   Добавить код, который через 30 секунд отписывает `chatOnMessage` от вебинара `webinarChat`.
*
*   Задание со звездочкой (дополнительное) —
*   разбить существующий код на модули, запускаемый файл должен быть `index.js`
*
*
*
* Спасибо!
*
* */