import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, userName, password } = req.body;

  const user = {
    name,
    userName,
    password,
  };

  const fileName = path.join(__dirname, '../data/user-data.json');
  const userDataString = fs.readFileSync(fileName, 'utf-8');
  const userData = JSON.parse(userDataString);

  const validate = userData.find(u => user.userName === u.userName);

  if (validate) {
    res.send(null);
  } else {
    userData.push(user);
    fs.writeFileSync(fileName, JSON.stringify(userData), { encoding: 'utf-8' });
    res.send(req.body);
  }

});

router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  const user = {
    userName,
    password,
  };

  const fileName = path.join(__dirname, '../data/user-data.json');
  const userDataString = fs.readFileSync(fileName, 'utf-8');
  const userData = JSON.parse(userDataString);

  const validateUser = userData.find(u => user.userName === u.userName && user.password === u.password);
  if (validateUser) {
    res.send(validateUser);
  } else {
    res.send(null)
  }
});

export default router;
