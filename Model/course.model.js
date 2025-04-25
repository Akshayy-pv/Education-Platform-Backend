import mongoose from "mongoose"


const scetionSchema = new mongoose.Schema({
    sectionTitle: {
        type: String,
        require: true
    },
    sectionDescription: {
        type: String,
    },
    typeNotes: {
        type: String
    },
    notes: {
        type: String
    },
    video: {
        type: String
    },

    mockTest:[{
        question: { type: String, require: true},
        options:[{type: String}],
        answer:{type: String, require: true}
    }],

})


const couresSchema = new mongoose.Schema({
    title:{ type: String, require: true},
    description: { type: String},
    price: { type: Number},
    prerequisites: { type: [String]},
    section:[scetionSchema],

},{timestamps: true});


export const Course = mongoose.model("Course", couresSchema)




