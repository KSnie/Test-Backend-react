const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "actinghub"
});

client.connect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received credentials:', username, password);

    const result = await client.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
    );
    
    if (result.rows.length > 0) {
        const userData = result.rows[0];
        return res.json(userData)
    } else {
        return res.json('faile')
    }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received sign-up request:', username, password);

    const checkUsernameResult = await client.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    );

    if (checkUsernameResult.rows.length > 0) {
        return res.json('already');
    }

    const insertUserResult = await client.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, password]
    );
});