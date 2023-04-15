"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kart = void 0;
var mongoose_1 = require("mongoose");
var kartSchema = new mongoose_1.default.Schema({
    number: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    updatedBy: {
        type: String,
    },
    duration: {
        type: String
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String
    },
    client: {
        type: {
            firstName: String,
            lastName: String,
            phoneNumber: String
        }
    }
}, { timestamps: true });
exports.Kart = mongoose_1.default.model("Kart", kartSchema);
