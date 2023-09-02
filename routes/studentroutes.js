const express = require('express');
const Student  = require('../model/studentmodel.js');
const router = express.Router();

router.post('/post', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/get', async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    res.json(student);
    console.log("deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.delete('/deleteAll', async (req, res) => {
  Student.deleteMany({})
    .then(() => res.send("All data are deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
  });
});



module.exports = router