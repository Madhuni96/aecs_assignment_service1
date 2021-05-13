const mongoose = require("mongoose");

const commitSchema = mongoose.Schema({
    
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

    commits: {
        type: Array,
        required: [true, "Required"],
        unique: true,
    }
})

module.exports = mongoose.model("Commit", commitSchema);