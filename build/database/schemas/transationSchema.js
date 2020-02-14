"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const TransationSchema = new (0, _mongoose.Schema)(
  {
    userId: { type: _mongoose.Schema.Types.ObjectId, ref: "User" },
    descriptons: { type: String, default: "" },
    value: { type: Number, default: 0 },
    destinationCpf: { type: String, required: true },
    destinationAgency: { type: Number },
    destinationAccount: { type: Number },
    originBalance: { type: Number },
    origin: { type: _mongoose.Schema.Types.ObjectId, ref: "User" },
    destination: { type: _mongoose.Schema.Types.ObjectId, ref: "User" },
    expireAt: { type: Date, default: Date.now, expires: "1y" },
    transationDate: { type: Date, default: new Date() }
  },
  { timestamps: true }
);

exports. default = _mongoose.model.call(void 0, "Transation", TransationSchema);
