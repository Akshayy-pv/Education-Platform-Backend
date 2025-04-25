import { About } from "../Model/about.model.js";

export const createAdvisor = async (req, res) => {

    try {
        const { name, role, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    
        const newAdvisor = new About({ name, role, description, imageUrl });
        await newAdvisor.save();

        console.log(newAdvisor)
    
        res.status(201).json(newAdvisor);
      } catch (error) {
        res.status(500).json({ error: "Error adding advisor" });
      }

}

export const getAdvisor = async (req, res ) => {

    try {
        const advisors = await About.find();
        res.json(advisors);
      } catch (error) {
        res.status(500).json({ error: "Error fetching advisors" });
      }


}