const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        // author: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
        author: { type: String, required: true },
        // timestamp: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
