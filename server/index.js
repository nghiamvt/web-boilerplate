const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const randomId = () => Math.floor(new Date().valueOf() * Math.random());

app.get('/', (req, res) => {
  res.json({
    success: true,
    data: 'Hello!',
  });
});

app.post('/loan', (req, res) => {
  setTimeout(() => {
    console.log('res', res);
    res.json({
      success: true,
      data: {
        id: randomId(),
      },
    });
  }, 1000);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
