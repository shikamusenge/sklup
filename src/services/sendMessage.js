const SMS = (phone, Mess) => {
  const twilio = require("twilio");

  // Initialize Twilio client with your account SID and authentication token
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  // Function to send an SMS
  const sendSMS = async (to, message) => {
    try {
      const response = await client.messages.create({
        body: Mess,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: phone, // The recipient's phone number
      });

      console.log(response.sid); // Log the SMS message SID
    } catch (err) {
      console.error(err); // Handle any errors that occur during sending
    }
  };
  const recipientNumber = "+1234567890"; // The recipient's phone number
  const messageText = "Hello, this is your SMS message!"; // The message content
  sendSMS(recipientNumber, messageText);
};
module.exports = SMS;
