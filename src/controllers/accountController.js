import DB from '../database/schemas'

class AccountController {
  async create(req, res) {
    const user = req.params;
    const id = user.id;
    const { account } = req.body;
    const newAccount = await DB.accountSchema.create({ account });

    await newAccount.save();

    const userById = await DB.userSchema.findById(id);

    userById?.BankAccount?.push(newAccount);

    return res.json(userById);
  }

  async userByAccount(req, res) {
    const { id } = req.params;
    const userByAccount = await DB.accountSchema
      .findById(id)
      .populate("client");

    res.json(userByAccount);
  }
}

export default new AccountController();
