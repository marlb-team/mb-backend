"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _mongoosepaginate = require('mongoose-paginate'); var _mongoosepaginate2 = _interopRequireDefault(_mongoosepaginate);

var _tokenSchema = require('./tokenSchema'); var _tokenSchema2 = _interopRequireDefault(_tokenSchema);

const HASH_SALT = 8;

const UserSchema = new _mongoose2.default.Schema(
  {
    name: {
      type: String,
      required: true
    },

    celPhone: {
      type: Number
    },
    preferedName: {
      type: String
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      lowercase: true
    },
    cpf: {
      type: Number,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      max: 100
    },

    isVerified: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: {
      type: String,
      required: false
    },
    resetPasswordExpires: {
      type: Date,
      required: false
    },
    // address: {

    // },
    createdAt: {
      type: Date,
      default: Date.now
    },

    agencyNumber: { type: Number, required: true, default: 101 },
    accountNumber: { type: Number, required: true, default: 9999 },
    balance: { type: Number, required: true, default: 2000 }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    _bcryptjs2.default.genSalt(HASH_SALT, function(err, salt) {
      if (err) return next(err);

      _bcryptjs2.default.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } catch (error) {
    return console.log(error);
  }
});

UserSchema.methods = {
  comparePassword(password) {
    return _bcryptjs2.default.compare(password, this.password);
  },

  generateToken() {
    let payload = {
      id: this._id,
      cpf: this.cpf
    };
    return _jsonwebtoken2.default.sign({ payload }, process.env.APP_JWT_SECRET, {
      expiresIn: process.env.APP_TTL
    });
  },

  generatePasswordReset() {
    this.resetPasswordToken = _crypto2.default.randomBytes(20).toString("hex");
    this.resetPasswordExpires = Date.now() + 3600000; //expire in 1h
  },

  generateVerificationToken() {
    let payload = {
      userId: this._id,
      token: _crypto2.default.randomBytes(2).toString("hex")
    };

    return new (0, _tokenSchema2.default)(payload);
  }
};

UserSchema.statics = {};

UserSchema.plugin(_mongoosepaginate2.default);

exports. default = _mongoose2.default.model("User", UserSchema);
