import mongoose from "mongoose";

// Tasks schema

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    createdAt: {type: Date, default: Date.now()}
});

// tasks model
export const Task = mongoose.model('Task',schema);