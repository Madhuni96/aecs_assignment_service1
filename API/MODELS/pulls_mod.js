const mongoose = require("mongoose");

const pullSchema = mongoose.Schema({
    
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

    pulls: {
        type: Array,
        required: [true, "Required"],
        unique: true,
    }
})

module.exports = mongoose.model("Pull", pullSchema);