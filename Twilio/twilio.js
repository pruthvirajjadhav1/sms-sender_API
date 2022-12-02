const { response } = require("express");

const axios = require("axios").default;
require("dotenv").config();

const accountId = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_NUMBER;
const twilioClient = require("twilio")(accountId, authToken);

class TwilioRes {
  message;
  sendSms(phone, message, res) {
    twilioClient.messages
      .create({
        body: message,
        from: fromNumber,
        to: phone,
      })
      .then((message) => {
        console.log(`${message.sid}`);
        res
          .status(200)
          .send(`Message sent to ${phone}, with message SID ${message.sid}.`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  sendQuote(phone, res) {
    axios
      .get(`https://api.quotable.io/random`)
      .then((response) => {
        const quote = response.data.content;
        twilioClient.messages
          .create({
            body: quote,
            from: fromNumber,
            to: phone,
          })
          .then((message) => {
            console.log(`${message.sid}`);
            res
              .status(200)
              .send(`Quote send to ${phone},with message SID ${message.sid}.`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = TwilioRes;
