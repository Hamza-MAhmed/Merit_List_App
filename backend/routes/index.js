var express = require('express');
var router = express.Router();
const uniModel = require('../DB/uni')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add-departments', async function(req, res) {
  try {
    const departments = ["CS" , "SE" , "AI"]
    const { universityId } = req.body; // Extract university ID and departments array from the request body
    
    if (!universityId || !departments || !Array.isArray(departments)) {
      return res.status(400).send("Invalid input");
    }

    // Add departments to the university document
    const result = await uniModel.findByIdAndUpdate(
      universityId,
      { $push: { departments: { $each: departments } } },
      { new: true, useFindAndModify: false }
    );

    if (!result) {
      return res.status(404).send("University not found");
    }

    res.send({ success: true, message: 'Departments added successfully', data: result });
  } catch (error) {
    console.error('Error adding departments:', error);
    res.status(500).send("Error processing request");
  }
});
router.get('/uni', async function(req , res) {
  const uni = await uniModel.find().select('name')
  // const uni = await uniModel.find()

  res.send(uni)
  //console.log(uni)
})


router.get('/uni/dep', async function(req, res, next) {
  try {
    
    // const { selectedValue } = req.body;  // Get the selected value from the request body
    const { selectedValue } = req.query;  // Get the selected value from the request body
    req.session.universityId = selectedValue
    console.log(req.session.universityId,"dff")
    console.log('Received selected value:', selectedValue);
    const university = await uniModel.findById(selectedValue).select('departments');
    console.log(university)
    if (university) {
      res.send(university.departments);
    } else {
      res.status(404).send('University not found000');
    }
  } catch (error) {
    console.error('Error receiving data:', error);
    res.status(500).send("Error processing request");
  }
});
router.get('/uni/dep/merit', async function(req, res, next){
  try{
    const {selectedValue , selectedYear} = req.query
    console.log(selectedValue,"val")
    console.log(selectedYear,"val")

    // const {selectedYear} = req.query
    console.log(req.session.universityId,"dffjj")

    let uni = await uniModel.findById(req.session.universityId)
    // console.log(uni)
    if(!uni){
      return res.status(404).send('University not found');
    }
    const dep = uni.departments.id(selectedValue)
    console.log(dep)
    if(!dep){
      return res.status(404).send('Department not found');
    }
    console.log(dep.years)
    console.log("selectedYear")
    console.log(selectedYear)
    const meritData = dep.years.find(m => m.year.toString() === selectedYear);
    console.log(meritData,"vfd")
    if(!meritData){
      return res.status(404).send('merit not found');
    }
    const merit = meritData.merit
    console.log(merit)
    res.json(merit)

  }
  catch (error){
    console.error('Error fetching merit data:', error);
    res.status(500).send('Internal Server Error');

  }
})

module.exports = router;
