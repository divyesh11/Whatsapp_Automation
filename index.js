const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, NoAuth } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


// If you want a send msg to a saved number
// client.on('ready', () => {
//     console.log('Client is ready!');
//     client.getChats().then(chats => {
//         const user1 = chats.find(
//             (chat) => chat.name === "Mammi"
//         );
//         client.sendMessage(
//             user1.id._serialized,
//             "Hello this is a automation message"
//         );
//     });
// });

client.on('ready', () => {
    console.log('Client is ready!');
   
     // Number where you want to send the message.
    const number = "+916351869907";
   
     // Your message.
    const text = "Hello this is a automation message";
   
     // Getting chatId from the number.
     // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";
   
    // Sending message.
    client.sendMessage(chatId, text);
   });


client.initialize();