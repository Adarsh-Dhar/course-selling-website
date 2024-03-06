const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db/index")

// Admin Routes
router.post('/signup', async (req, res) => {
   const {email,password} = req.body
  
try{
  
        const createAdmin =  await Admin.create({email,password })
        console.log("admin created successfully")
        res.status(201).json(createAdmin)
   
      
}catch(error){
    console.error(error)
    res.status(500).json({msg : "internal server error"})
}});

router.post('/courses',adminMiddleware,  async (req, res) => {
    const {courseName , coursePrice} = req.body
    try {
        const createCourse = await Course.create({courseName, coursePrice})
        console.log("course created successfully")
        res.status(201).json(createCourse)
        }catch(error){
            res.status(500).console.error(error)
        }
});

router.get('/courses',adminMiddleware, async (req, res) => {

    const {courseName} = req.body
    
    const course = await Course.find()
    res.status(201).json(course)

});

module.exports = router;