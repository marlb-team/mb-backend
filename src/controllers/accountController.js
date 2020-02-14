const express = require('express')
const { Task } = require('fawn')
const {
  Account,
  Transaction,
} = require('../database/schemas/transactionSchema')
const User = require('../database/schemas/clientSchema')
const verifyToken = require('../middlewares/authMiddleware')

let apiRoutes = express.Router()

apiRoutes.get('/account', verifyToken, async function(req, res) {
  const { number, agency, id } = req.body
  let account
  try {
    account = await Account.findOne({ number, agency })
  } catch (err) {
    return res
      .status(400)
      .send({
        success: false,
        message: "Error while trying to get Account's data - Code: 0001",
        error: JSON.stringify(err),
      })
  }

  if (!account)
    return res
      .status(400)
      .send({
        success: false,
        message: 'Account not founded - Code: 0002',
        error: err,
      })

  let userAccounts
  try {
    userAccounts = await User.findById(id, 'accounts').lean()
  } catch (err) {
    return res
      .status(400)
      .send({
        success: false,
        message: "Error while trying to get Account's data - Code: 0003",
        error: JSON.stringify(err),
      })
  }

  if (!userAccounts)
    return res
      .status(400)
      .send({
        success: false,
        message: "User's accounts not founded - Code: 0004",
      })

  let userAccountsString = userAccounts.accounts[0]

  if (userAccountsString != account.id)
    return res
      .status(400)
      .send({
        success: false,
        message: "User's accounts not founded - Code: 0005",
      })

  let acc = 0
  account.transactions.forEach(trans => {
    acc += trans.value
  })

  account = account.toObject()
  account.balance = acc
  res.send({ success: true, account, message: 'Account founded' })
})

apiRoutes.get('/account/favored', verifyToken, async (req, res) => {
  const { document, number, agency } = req.body
  let userFavored
  try {
    userFavored = await User.findOne({ document })
  } catch (err) {
    return res
      .status(400)
      .send({ sucess: false, message: 'User not founded 0012', error: err })
  }
  if (!userFavored)
    return res.status(400).send({ sucess: false, message: 'Error 0001' })

  let account
  try {
    account = await Account.findOne({ number, agency })
  } catch (err) {
    return res
      .status(400)
      .send({ sucess: false, message: 'Error 00023', error: err })
  }
  if (!account)
    return res
      .status(400)
      .send({ sucess: false, message: 'Account not founded 0013' })

  if (!userFavored.accounts[0] == account.id)
    return res
      .status(400)
      .send({ sucess: false, message: 'Usuario não Possui a conta 0014' })

  res.send({ sucess: true, message: 'Account founded', account })
})

apiRoutes.post('/account/transfer', verifyToken, async function(req, res) {
  const {
    accNumOrig,
    accAgeOrig,
    accNumDes,
    accAgeDes,
    transfMsg,
    value,
  } = req.body

  let accounts
  accounts = Account.find(
    {
      $or: [
        {
          number: accNumOrig,
          agency: accAgeOrig,
        },
        {
          number: accNumDes,
          agency: accAgeDes,
        },
      ],
    },
    function(err, docs) {
      if (err)
        return res
          .status(400)
          .send({
            success: false,
            message: "Error while trying to get Account's data - Code: 0006",
            error: JSON.stringify(err),
          })

      if (!docs || docs.length != 2)
        return res
          .status(400)
          .send({ success: false, message: 'Accounts not found - Code: 0007' })

      let transactionOrigin = new Transaction({
        type: 'TRANSFER',
        value: -value,
        transferAccount: docs[1].id,
        created_at: `TRANSF ENTRE CONTAS: ${transfMsg}`,
      })

      let transactionDestiny = new Transaction({
        type: 'TRANSFER',
        value: value,
        transferAccount: docs[0].id,
        created_at: `TRANSF ENTRE CONTAS: ${transfMsg}`,
      })

      // const task = fawn.Task();
      Task.update(
        'accounts',
        { number: accNumOrig, agency: accAgeOrig },
        { $push: { transactions: transactionOrigin } }
      )
        .update(
          'accounts',
          { number: accNumDes, agency: accAgeDes },
          { $push: { transactions: transactionDestiny } }
        )
        .run()
        .then(function(result) {
          res.send({
            success: true,
            message: 'Transfer successed - Code: 0008',
          })
        })
        .catch(function(err) {
          res.send({
            success: false,
            message: 'There was an error during the transfer - Code: 0009',
            error: err,
          })
        })
    }
  )
})

module.exports = apiRoutes
