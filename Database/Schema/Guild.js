const mongoose = require("mongoose"),
config = require("./../../config.json");

module.exports = mongoose.model("Guild", new mongoose.Schema({

    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    prefix: { type: String, default: config.prefix },
    language: { type: String, default: "default" },

    webhooks: { type: Object, default: {
        news: {
            enabled: false,
            channel: null
        },
        patchnotes: {
            enabled: false,
            channel: null
        },
        valtweets:{
            enabled: false,
            channel: null
        },
        status:{
            enabled: false,
            channel: null,
            messageID: null,
        },
    }},


    plugins: { type: Object, default: {
        autoTweets: {
            enabled: false,
            channel: null
        },
        autoPatch: {
            enabled: false,
            channel: null
        },
        autoValtweets:{
            enabled: false,
            channel: null
        }
    }},

}));