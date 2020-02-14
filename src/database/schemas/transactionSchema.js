// import { model, Schema } from 'mongoose'
import mongoose from 'mongoose'

// const TransactionSchema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: 'User' },
//     descriptons: { type: String, default: '' },
//     value: { type: Number, default: 0 },
//     destinationCpf: { type: String, required: true },
//     destinationAgency: { type: Number },
//     destinationAccount: { type: Number },
//     originBalance: { type: Number },
//     origin: { type: Schema.Types.ObjectId, ref: 'User' },
//     destination: { type: Schema.Types.ObjectId, ref: 'User' },
//     expireAt: { type: Date, default: Date.now, expires: '1y' },
//     transationDate: { type: Date, default: new Date() },
//   },
//   { timestamps: true }
// )

// export default model('Transaction', TransactionSchema)

const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  // type: {
  //   type: String,
  //   enum: ['DEPOSIT', 'DRAFT', 'TRANSFER'],
  //   required: true,
  // },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  transferAccount: { type: Schema.Types.ObjectId, ref: 'Account' },
  destinatinAccount: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const AccountSchema = new Schema(
  {
    number: { type: String, required: true },
    agency: { type: String, required: true },
    balance: { type: Number, required: true, default: 2000 },
    client: { type: Schema.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
    ],
  },
  { strict: false }
)

const Account = mongoose.model('Account', AccountSchema)
const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = { Account, Transaction }
