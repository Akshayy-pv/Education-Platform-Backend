import { About } from "../Model/about.model.js";

export const createAdvisor = async (req, res) => {
  try {
      const { name, role, description } = req.body;
      
      // Store the full Cloudinary URL
      const imageUrl = req.file ? req.file.path : "";
      
      const newAdvisor = new About({ name, role, description, imageUrl });
      await newAdvisor.save();

      console.log("Advisor created:", newAdvisor);
  
      res.status(201).json(newAdvisor);
  } catch (error) {
      console.error("Error creating advisor:", error);
      res.status(500).json({ error: "Error adding advisor" });
  }
};

export const getAdvisor = async (req, res ) => {

    try {
        const advisors = await About.find();
        res.json(advisors);
      } catch (error) {
        res.status(500).json({ error: "Error fetching advisors" });
      }


}