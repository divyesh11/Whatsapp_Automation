const reader = require("xlsx");
const qrcode = require("qrcode-terminal");
const xlsxFile = require("read-excel-file/node");

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");

  let number = "6351869907";
  let text = "Hello this is a automation message";

  let cnt = 1;
  let index = 0;
  xlsxFile("./temp2.xlsx").then((rows) => {
    rows.forEach((col) => {
      if (cnt == 1) {
        // skip first row
        cnt = 0;
      } else {
        var c = 1;
        col.forEach((data) => {
          if (c == 1) {
            // first column
            c = 0;
            number = data;
            // console.log("number");
            // console.log(data);
          } else {
            c = 1;
            text = data; // second column
            // console.log("message");
            // console.log(data);
          }
        });
      }

      const chatId = "91" + number + "@c.us"; // 919016599297@c.us
      // console.log(chatId + " " + text);

      // console.log("\n");

      // console.log("number : " + number + " message : " + text);
      // setTimeout(async function () {
      //   console.log(chatId + " " + text);
      client.sendMessage(chatId, text);
      //   // console.log("10 secondes");
      //   console.log(chatId);
      // }, index++ * 10000);



      // console.log("\n");
    });
  });
});

client.initialize();
// console.log(data);
