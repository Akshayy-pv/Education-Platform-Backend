
import { Course } from "../Model/course.model.js"

export const createCourse = async (req, res) => {


    const { title, description, price, prerequisites, section,   } = req.body

    console.log(req.body)
    const parsedSections = JSON.parse(section); 

    const formattedSection = parsedSections.map((sec, i) => ({

        sectionTitle: sec.sectionTitle || "",
        sectionDescription:sec.sectionDescription || "",
        typeNotes:sec.typeNotes || "",
        notes: req.files["notes"] ? req.files["notes"][i] ?.path || "" : "",  
        video: req.files["video"] ? req.files["video"][i] ?.path || "" : "",
        mockTest: Array.isArray(sec.mockTest)
        ? sec.mockTest.map((test) => ({
            question: test.question || "",
            options: Array.isArray(test.options) ? test.options : ["", "", "", ""],
            answer: test.answer || "",
        }))
        : [],
        
    }))

   try{
   

    const newCourse = new Course({
        title,
        description,
        price,
        prerequisites,
        section: formattedSection,
        price
    })

    await newCourse.save()
    res.status(201).json({message: "Successfully created courses"})
    console.log(newCourse);



   }catch(err){

    res.status(401).json({message:"Error in course creation"})

   }

    

}


export const getCourses = async (req, res ) => {


        try {
            const courses = await Course.find({}, "title description");
            res.status(200).json({ success: true, courses });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching courses", error: error.message });
        }
}


export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching course details", error: error.message });
    }
};