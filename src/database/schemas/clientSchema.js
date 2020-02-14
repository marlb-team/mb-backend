import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import JWT from 'jsonwebtoken'
import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

import Token from './tokenSchema'

const HASH_SALT = 8

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    celPhone: {
      type: Number,
    },
    preferedName: {
      type: String,
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      lowercase: true,
    },
    cpf: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      max: 100,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
    // address: {

    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    agencyNumber: { type: Number, required: true, default: 101 },
    accountNumber: { type: Number, required: true, default: 9999 },
    balance: { type: Number, required: true, default: 2000 },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    bcrypt.genSalt(HASH_SALT, function(err, salt) {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err)

        user.password = hash
        next()
      })
    })
  } catch (error) {
    return console.log(error)
  }
})

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compare(password, this.password)
  },

  generateToken() {
    let payload = {
      id: this._id,
      cpf: this.cpf,
    }
    return JWT.sign({ payload }, process.env.APP_JWT_SECRET, {
      expiresIn: process.env.APP_TTL,
    })
  },

  generatePasswordReset() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordExpires = Date.now() + 3600000 //expire in 1h
  },

  generateVerificationToken() {
    let payload = {
      userId: this._id,
      token: crypto.randomBytes(2).toString('hex'),
    }

    return new Token(payload)
  },
}

UserSchema.plugin(mongoosePaginate)

export default mongoose.model('User', UserSchema)
