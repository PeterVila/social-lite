require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(staticMiddleware);
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.post('/api/users/', (req, res, next) => {
  const {
    username,
    password,
    avatarUrl,
    email
  } = req.body;
  if (!username || !password || !avatarUrl || !email) {
    res.status(400).json({
      error: 'username, password, avatarUrl and email are required fields'
    });
    return;
  }
  const sql = `
    insert into "users" ("username", "password", "avatarUrl", "email")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [username, password, avatarUrl, email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/posts/', uploadsMiddleware, (req, res, next) => {
  const {
    userId = 2,
    postType,
    caption,
    location,
    eventDate,
    postTitle,
    endTime
  } = req.body;
  if (!userId || !postType || !location || !postTitle) {
    throw new ClientError(400, 'userId, postType, location, postTitle are required fields');
  }
  const imageUrl = '/images/' + req.file.filename;
  if (!imageUrl) {
    throw new ClientError(400, 'imageUrl is a required field');
  }
  const sql = `
    insert into "posts" ("userId", "postType", "imageUrl", "caption", "location", "eventDate", "postTitle", "endTime")
    values ($1, $2, $3, $4, $5, $6, $7, $8)
    returning *
  `;
  const params = [userId, postType, imageUrl, caption, location, eventDate, postTitle, endTime];
  db.query(sql, params)
    .then(result => {
      const [upload] = result.rows;
      res.status(201).json(upload);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
  select *
    from "posts"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
