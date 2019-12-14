import express from 'express';
import bodyParser from 'body-parser';

import users from './api/users';
import posts from './api/posts';
import auth from './api/auth';


const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h1>THIS IS HOME PAGE</h1>');
});

app.get('/api', (req, res) => {
  res.send({
    error: 'NOT_FOUND',
    message: 'API not found.'
  });
});

app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/auth', auth);

app.listen(8080, () => {
  console.log('Server is listening to port 8080');
});
