import User from '../database/schemas/clientSchema'
import Transaction from '../database/schemas/transactionSchema'

class TransationController {
  async storeTransation(req, res) {
    // userId: { type: Schema.Types.ObjectId, ref: "User" },
    // descriptons: { type: String, default: "" },
    // value: { type: Number, default: 0 },
    // destinationCpf: { type: String, required: true },
    // destinationAgency: { type: Number },
    // destinationAccount: { type: Number },
    // originBalance: { type: Number },
    // origin: { type: Schema.Types.ObjectId, ref: "User" },
    // destination: { type: Schema.Types.ObjectId, ref: "User" },
    // expireAt: { type: Date, default: Date.now, expires: "1y" },
    // transationDate: { type: Date, default: new Date() }

    const origenAccount = User.findById(id)
    const transfAccount = Transaction.findById(id)

    const {
      // description,
      value,
      // dataTransfer
      // destinationCpf,
      destinationAgency,
      destinationAccount,
      // destination
    } = req.body

    const transactionOrigin = new Transaction({
      // type: 'TRANSFER',
      value: -value,
      transferAccount: origenAccount.id,
    })

    const transactionDestiny = new Transaction({
      // type: 'TRANSFER',
      value: value,
      transferAccount: transfAccount.id,
    })

    try {
      if (origenAccount.balance < value) {
        res.status(400).json({ success: false, messege: 'Saldo insuficiente.' })
      }

      task
        .update(
          'Transation',
          { accountNumber: origin, agencyNumber: origenAccount.agencyNumber },
          {},
          { $inc: { balance: -value } }
        )
        .update(
          'Transation',
          {
            accountNumber: destinationAccount,
            agencyNumber: destinationAgency,
          },
          { $inc: { balance: value } }
        )
        .run()
        .then(function(results) {
          // task is complete

          // result from first operation
          var firstUpdateResult = results[0]

          // result from second operation
          var secondUpdateResult = results[1]
        })
        .catch(function(err) {
          // Everything has been rolled back.

          // log the error which caused the failure
          console.log(err)
        })

      const amount = origenAccount.balance - value
      const newTrans = new Transation(req.body)
    } catch (error) {
      return res.status(500).json({ success: false, messege: error.messege })
    }

    let transf = req.body
    let ultimaTransf = transf.transferencia[transf.transferencia.length - 1]
    // Aumenta o saldo de quem recebeu e cria uma nova transferencia
    Cliente.update(
      { cpf: transf.cpf },
      { $set: { saldo: transf.saldo } },
      function(err, cliente) {
        if (err) return res.status(500).send('Problema status 500.')
        res.status(200).send()
      }
    )
    Cliente.update(
      { cpf: transf.cpf },
      { $push: { transferencia: ultimaTransf } },
      function(err, cliente) {
        if (err) return res.status(500).send('Problema status 500.')
        res.status(200).send()
      }
    )
    // Cria a transferência reversa para quem fez a transferência
    ultimaTransf.tipo = false

    Cliente.update(
      { cpf: req.params.cpf },
      { $push: { transferencia: ultimaTransf } },
      function(err, cliente) {
        if (err) return res.status(500).send('Problema status 500.')
        res.status(200).send()
      }
    )
  }

  async findByDate(req, res) {}

  async findByClientName() {}

  async transactionStore() {
    const trans = await Transaction.create({
      ...req.body,
      origin: req.useserId,
      destination: req.userId,
    })

    origen = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    return res.json(trans)
  }
}

export default new TransationController()
