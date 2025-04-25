import express from  "express"
import { upload } from "../meddileWare/uploadAbout.js"
import { createAdvisor, getAdvisor } from "../Controller/advisor.control.js";

const aboutRoutes = express.Router()



aboutRoutes.post("/createAdvisor",upload.single("image"), createAdvisor)
aboutRoutes.get("/getAdvisor",getAdvisor)
        

export default aboutRoutes;