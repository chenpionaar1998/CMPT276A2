const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = require('socket.io').listen(server);

io.on('connection', function (socket) { });

const { Pool } = require('pg');
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index', { tab: 'default' }));

app.post('/add', async function (req, res) {
  console.log(req.body);
  try {
    const result = req.body;
    const client = await pool.connect();

    await client.query(
      "INSERT INTO students VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [result.fname, result.lname,
      result.studentID, result.DOB,
      result.gender, result.weight,
      result.height, result.shoe_size,
      result.hair_color, result.GPA],
      async function (err, res) {
        if (err) {
          if (err.code == 23505) {
            io.emit("insert", "dup_key");
          }
          else {
            io.emit("insert", "fail");
          }
        }
        else {
          io.emit("insert", 'success');
        }
      });
    client.release();
  }
  catch (err) {
    console.error(err);
  }

  res.render('pages/index', { tab: 'default' });
})

app.post('/delete', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT EXISTS(SELECT 1 FROM students WHERE studentid=$1)', [req.body.studentID]);
    if (result.rows[0].exists) {
      await client.query('DELETE FROM students WHERE fname = $1 AND lname = $2 AND studentid = $3',
        [req.body.fname, req.body.lname, req.body.studentID],
        function (err, res) {
          if (err) {
            io.emit('student_deletion', "fail");
          }
          else {
            io.emit('student_deletion', 'success');
          }
        });
    }
    else {
      io.emit('student_not_found', req.body.studentID);
    }


    client.release();
  }
  catch (err) {
    console.error(err);
    res.send("Error " + err);
  }

  res.render('pages/index', { tab: 'delete' });
})

app.post('/update', async (req, res) => {
  try {
    const client = await pool.connect();
    const data = req.body;
    console.log(data);
    await client.query('UPDATE students SET fname=$1, lname=$2, dob=$3, gender=$4, weight=$5, height=$6, shoe_size=$7, hair_color=$8, gpa=$9 WHERE studentid = $10',
      [data.fname, data.lname, data.DOB, data.gender, data.weight, data.height, data.shoe_size, data.hair_color, data.GPA, data.studentID],
      function (err, res) {
        if (err) {
          io.emit('student_update', 'fail');
        }
        else {
          io.emit('student_update', 'success');
        }
      });
    client.release();
  }
  catch (err) {
    res.send(err);
  }

  res.render('pages/index', { tab: 'update' });
});

app.get('/find/:studentID', async (req, res) => {
  try {
    const client = await pool.connect();
    const id = req.query.studentID;
    const result = await client.query('SELECT EXISTS(SELECT 1 FROM students WHERE studentid=$1)', [id]);
    if (result.rows[0].exists) {
      const student_data = await client.query('SELECT * FROM students WHERE studentid=$1', [id]);
      io.emit('student_found', student_data);
    }
    else {
      io.emit('student_not_found', id);
    }

    client.release();
  }
  catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM students');
    const avgWeight = await client.query('SELECT AVG(weight) FROM students');
    const avgHeight = await client.query('SELECT AVG(height) FROM students');
    const results = { 'results': (result) ? result.rows : null,
                     'avgWeight': (avgWeight) ? avgWeight.rows[0].avg : null,
                     'avgHeight': (avgHeight) ? avgHeight.rows[0].avg : null};
    res.render('pages/db', results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
