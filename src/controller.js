const pool = require('./db');
const queries = require('./queries');

const getStudent = (req, res) => {
  pool.query(queries.getStudent, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    queries.getStudentById,
    [id],

    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    },
  );
};
const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  //check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send('Email already exists.');
    }
    //add student to db
    pool.query(queries.addStudent, [name, email, age, dob], (error) => {
      if (error) throw error;
      res.status(202).send('Student Created sucessfully!');
    });
  });
};
const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send('Student does not exists in the database');
    }
    pool.query(queries.removeStudent, [id], (error) => {
      if (error) throw error;
      res.status(200).send('Student removed sucessfully.');
    });
  });
};
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send('Student does not exists in the database');
    }
    pool.query(queries.updateStudent, [name, id], (error) => {
      if (error) throw error;
      res.status(200).send('Student updated sucessfully.');
    });
  });
};

module.exports = {
  getStudent,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
