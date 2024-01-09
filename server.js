const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 1212;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
  const format = req.body.format;

  if (req.body && format) {
    const fields = Object.keys(req.body);

    if (format === 'json') {
      console.log("Searching...");
      const jsonData = require('C:/Users/KOHLI TECNOLOGY/Downloads/assignment.json');
      console.log("Gotted", jsonData);
      fields.push(...Object.keys(jsonData[0]));
    } else if (format === 'csv') {
      const csvFilePath = 'C:/Users/KOHLI TECNOLOGY/Downloads/assignment.csv';
    }

    res.json({ fields });
  } else {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.get('/display', (req, res) => {
  const selectedFields = req.body.selectedFields;
  res.send('Displayed data goes here.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
