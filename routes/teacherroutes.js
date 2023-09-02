const express = require('express');
const Teacher = require('../model/teachermodel.js');
const router = express.Router();

router.post('/post', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/get', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/update/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(teacher);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.delete('/delete/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndRemove(req.params.id);
    res.json(teacher);
    console.log("deleted successfully");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
router.delete('/deleteAll', async (req, res) => {
  Teacher.deleteMany({})
    .then(() => res.send("All data are deleted successfully"))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: err, msg: "Something went wrong!" });
  });
});



module.exports = router