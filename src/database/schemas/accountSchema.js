import { model, Schema } from 'mongoose'

const AccountSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
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

export default model("Account", AccountSchema);
