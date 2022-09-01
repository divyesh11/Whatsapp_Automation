const fs = require("fs");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
console.log("Connection to Whatsapp Web Client");
// import qrcode from 'qrcode-terminal';

const client = new Client({
  puppeteer: {
    executablePath: "/usr/bin/brave-browser-stable",
  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: false,
  },
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

client.on("ready", () => {
  console.log("Client is ready!");

  // Number where you want to send the message.
  const number = "+916351869907";
  const number1 = "+916351869907";

  // Your message.
  const text = "Hello this is a automation message";

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";
  const chatId1 = number1.substring(1) + "@c.us";

  // Sending message.
  client.sendMessage(chatId, text);

  //   function sleep(ms) {
  //     return new Promise((resolve) => setTimeout(resolve, 10000));
  //   }

  client.sendMessage(chatId1, text);
  console.log("Send a message!");
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("WHATSAPP WEB => Authenticated");
});

client.on("ready", async () => {
  console.log("WHATSAPP WEB => Ready");
  resolve(client);
});
