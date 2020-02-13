"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const TokenSchema = new (0, _mongoose.Schema)(
  {
    userId: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: "1h"
    }
  },
  { timestamps: true }
);

exports. default = _mongoose.model.call(void 0, "Token", TokenSchema);
