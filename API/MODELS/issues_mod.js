const mongoose = require("mongoose");

const issueSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,

    org : {
        type: String,
        required: [true, "Required"],
        unique: true,
    },

    repo : {
        type: String,
        required: [true, "Required"],
        unique: true,
    },

    issues: {
        type: Array,
        required: [true, "Required"],
        unique: true,
    }
})

module.exports = mongoose.model("Issue", issueSchema);