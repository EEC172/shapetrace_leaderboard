const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shadowSchema = new Schema(
    {
        board: { type: String, required: true },
        score: { type: String, required: true }, 
        shape: { type: String, required: true }, 
    },
    {
        timestamps: true,
    }
);

const Shadow = mongoose.model("Shadow", shadowSchema);

module.exports = Shadow;


// Example post: 

// {
//     "board": "000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000000000FCFFFFFFFFFFFFFFFF00000000",
//     "score": "77.77",
//     "shape": "square",
// }