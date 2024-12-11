// Importing Dependencies
// Importing the 'dotenv' module to manage environment variables securely.
// Importing 'axios' for making HTTP requests.
// Importing 'response' from 'express' (though not needed here; express provides response in handlers).
import dotenv from "dotenv";
import axios from "axios";
import { response } from "express";

// Configuring dotenv to load environment variables from a .env file into process.env
dotenv.config();

// Destructuring necessary credentials and configuration values from process.env
// These include keys, secrets, shortcode, passkey, and callback URL specific to Safaricom's Daraja API.
const {
  DARAJA_CONSUMER_KEY, // Safaricom API Consumer Key
  DARAJA_CONSUMER_SECRET, // Safaricom API Consumer Secret
  DARAJA_SHORTCODE, // The business shortcode for initiating STK Push
  DARAJA_PASSKEY, // Passkey for generating the STK Push password
  CALLBACK_URL, // URL Safaricom will send callback responses to
} = process.env;


// Utility Function: Generate OAuth Token
// This function generates an OAuth token needed to authenticate requests to Safaricom's Daraja API.
const generateAuthToken = async () => {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"; // Endpoint for generating the token

  // Encoding the Consumer Key and Secret in Base64 format as required by the API
  const auth = Buffer.from(
    `${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    // Making a GET request to obtain the token
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`, // Including the encoded credentials in the request header
      },
    });

    // Returning the access token from the response
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error generating token:",
      error.response?.data || error.message // Logging error details if the request fails
    );

    // Throwing a new error to ensure the caller knows the token generation failed
    throw new Error("Failed to generate OAuth token");
  }
};

// Utility Function: Generate STK Push Password
// This function generates a password required for authenticating STK Push requests.
const generatePassword = () => {
  // Generating a timestamp in the required format (YYYYMMDDHHMMSS)
  const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

  // Creating a Base64-encoded password using the Business Shortcode, Passkey, and Timestamp
  const password = Buffer.from(
    `${DARAJA_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`
  ).toString("base64");

  // Returning both the timestamp and the generated password
  return { timestamp, password };
};

// Controller Function: STK Push
// This function handles initiating an STK Push request to Safaricom's Daraja API.
export const stkPush = async (req, res) => {
  // Destructuring 'phone' and 'amount' from the incoming request body
  const { phone, amount } = req.body;

  // Validating the inputs: Both phone number and amount are required for the STK Push
  if (!phone || !amount) {
    return res
      .status(400) // Sending a 400 Bad Request status code for missing parameters
      .json({ error: "Phone number and amount are required" });
  }

  try {
    // Step 1: Generate Access Token
    const accessToken = await generateAuthToken();

    // Step 2: Generate Timestamp and Password for the STK Push request
    const { timestamp, password } = generatePassword();

    // Step 3: Construct the STK Push API request payload
    const url =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"; // Safaricom's STK Push endpoint

    const payload = {
      BusinessShortCode: DARAJA_SHORTCODE, // Business shortcode initiating the transaction
      Password: password, // Generated password for authentication
      Timestamp: timestamp, // Timestamp matching the password
      TransactionType: "CustomerPayBillOnline", // Type of transaction (e.g., Paybill)
      Amount: amount, // Transaction amount
      PartyA: phone, // Customer's phone number (initiator of the payment)
      PartyB: DARAJA_SHORTCODE, // Shortcode receiving the payment
      PhoneNumber: phone, // Customer's phone number for STK push
      CallBackURL: CALLBACK_URL, // Callback URL to receive transaction responses
      AccountReference: "Test", // Optional account reference identifier
      TransactionDesc: "Payment", // Description of the transaction
    };

    // Sending the STK Push request to Safaricom's API
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Including the Bearer token in the request header
      },
    });

    console.log("STK Push Response:", response.data); // Logging the response for debugging purposes

    // Sending a success response to the client with details of the STK Push request
    res.status(200).json({
      message: "STK Push initiated successfully",
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Error initiating STK Push:",
      error.response?.data || error.message // Logging error details if the request fails
    );

    // Sending an error response to the client
    res.status(500).json({
      error: "Failed to initiate STK Push",
      details: error.response?.data || error.message,
    });
  }
};

// Controller Function: Handle Callback
// This function handles the callback from Safaricom's API for the STK Push.
export const handleCallback = async (req, res) => {
  try {
    // Logging the callback data received from Safaricom for debugging purposes
    console.log("STK Push Callback Data:", req.body);

    // Sending a success response to acknowledge receipt of the callback
    res.status(200).send("Callback received");
  } catch (error) {
    console.error("Error handling callback:", error.message); // Logging error details if the process fails

    // Sending an error response to indicate failure in handling the callback
    res.status(500).json({ error: "Failed to handle callback" });
  }
};
