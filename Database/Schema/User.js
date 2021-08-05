const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({

    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    language: { type: String, default: "default" },

    //Stores all information about user's command settings
    profile: { type: Object, default: {
        trivia: {
            wins: 0,
            loss: 0,
            afk: 0 ,
            streak: 0,
            highest: 0,
        },
        mapSettings: {
            labels: true,
            walls: true
        },
    }}



}));