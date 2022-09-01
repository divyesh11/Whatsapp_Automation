const { Client, LocalAuth } = require("whatsapp-web.js");
console.log("Connection to Whatsapp Web Client");

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


