const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index")

// User Routes
router.post('/signup', async (req, res) => {
    const {email, password} = req.body 
   
 try{
           
         const createUser = await User.create({email , password})
         console.log("user created successfully")
         res.status(201).json(createUser)
 
 
 
}catch(error){
    res.status(500).json({error : "Internal server error"})
}
});



router.get('/courses',async (req, res) => {
    const allCourses = await Course.find({})
    res.status(201).json(allCourses)
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    const courseId = req.params.courseId
    console.log(courseId)
   
    try {
        const course = await Course.findById(courseId)
        if(!course) {
            res.status(404).json({error : "course not found"})
        } else{
        const updateCourse = await Course.findByIdAndUpdate(courseId,{Purchased : true},{new : true})
        res.status(201).json(updateCourse)
    }} catch (error) {
        res.status(500).json({error : "Internal server error"})
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const purchasedCourses = await Course.find({Purchased : true})
        res.status(201).json(purchasedCourses)

    } catch(error) {
        res.status(500).json({error : "internal server error"})
    }
});

module.exports = router