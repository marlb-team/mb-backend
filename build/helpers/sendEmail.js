"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mail = require('@sendgrid/mail'); var _mail2 = _interopRequireDefault(_mail);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);

var _tokenSchema = require('../database/schemas/tokenSchema'); var _tokenSchema2 = _interopRequireDefault(_tokenSchema);

// const user_ = User.findById(id);

_mail2.default.setApiKey(process.env.APP_SENDGRID_API_KEY);

// export function sendEmail(user, req, res) {
//   const token = generateVerificationToken(req);

//   // Save the verification token
//   token.save(function(err) {
//     if (err) return res.status(500).json({ message: err.message });

//     let link = "http://" + req.headers.host + "/api/auth/verify/" + token.token;

//     const mailOptions = {
//       to: user.email,
//       from: process.env.FROM_EMAIL,
//       subject: "Account Verification Token",
//       text: `Hi ${user.preferedName} \n
//                   Please click on the following link ${link} to verify your account. \n\n
//                   If you did not request this, please ignore this email.\n`
//     };

//     sendGrid.send(mailOptions, (error, result) => {
//       if (error) return res.status(500).json({ message: error.message });

//       res.status(200).json({
//         message: "A verification email has been sent to " + user.email + "."
//       });
//     });
//   });
// }

 function generateVerificationToken(req) {
  const { id } = req.params;
  let payload = {
    userId: id,
    token: _crypto2.default.randomBytes(20).toString("hex")
  };

  return new (0, _tokenSchema2.default)(payload);
} exports.generateVerificationToken = generateVerificationToken;

 function evioDeEmail(user, req, res) {
  const token = generateVerificationToken(req);
  // const token = User.generateVerificationToken(id);
  let link = "http://" + req.headers.host + "/api/auth/verify/" + token.token;

  
  _mail2.default.setApiKey(process.env.APP_SENDGRID_API_KEY);
  console.log(`Email do usuario: ${user.email}`);
  const msg = {
    to: user.email,
    from: "lopesboa@hotmail.com",
    subject: "Email de Verificação",
    text: `easy to do anywhere, even with Node.js ${link}`,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>" + link
  };
  _mail2.default.send(msg, error => {
    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json({
      message: "A verification email has been sent to " + user.email + "."
    });
  });
} exports.evioDeEmail = evioDeEmail;
