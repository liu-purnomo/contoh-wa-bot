const express = require('express');
const app = express();

app.use(express.json());

// const listResponse = {
//   hi: {
//     msg: 'hi',
//     response: 'Hi Juga, Oke Juga',
//   },
//   price: {
//     msg: 'price',
//     response: 'Harga tiket adalah 10000',
//   },
// };

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
  authStrategy: new LocalAuth(),
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Scan qr code with your phone');
});

client.on('message', (message) => {
  if (message.body === 'ping') {
    message.reply('pong');
  }

  //oke, hi

  //   const [keyword, valueMessage] = message.body.split(',').toLowerCase();

  //   if (keyword === 'oke') {
  //     message.reply(listResponse[`${valueMessage}`].response);
  //   }

  if (message.body === 'Berapa Harga Baju') {
    message.reply('Harganya 20000');
  }

  //   if (message.body === listResponse.hi.msg) {
  //     message.reply(listResponse.hi.response);
  //   } else if (message.body === listResponse.price.msg) {
  //     message.reply(listResponse.price.response);
  //   }
});

app.post('/send-message', (req, res) => {
  const { message, number } = req.body;
  const formattedNumber = `${number}@c.us`;

  client.sendMessage(formattedNumber, message);

  console.log(req.body, '<<<<<< INI REQUEST BODY');

  res.status(200).json({ status: 'success' });
});

app.get('/', (req, res) => {
  res.status(200).send('WhatsApp Bot running...');
});

// Start your client
client.initialize();

app.listen(8000, () => {
  console.log('Server running');
});
