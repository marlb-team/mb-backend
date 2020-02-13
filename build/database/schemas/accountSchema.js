"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const AccountSchema = new (0, _mongoose.Schema)(
  {
    client: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    agency: {
      type: Number,
      required: true,
      default: 101
    },
    accountNumber: {
      type: Number,
      default: true
    },
    balance: {
      type: Number,
      required: true,
      default: 2000
    }
  },
  { timestamps: true }
);

exports. default = _mongoose.model.call(void 0, "Account", AccountSchema);
