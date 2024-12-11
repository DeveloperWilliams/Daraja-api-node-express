// Importing the Express library to create and manage routes
import express from "express";

// Importing controller functions to handle STK Push and Callback functionality
import { handleCallback, stkPush } from "../controllers/darajaController.js";

// Initializing the Express Router to define application routes
const route = express.Router();

// POST Route: Initiates an STK Push request
// The "/stkpush" route is used to trigger the STK Push functionality defined in the controller
route.post("/stkpush", stkPush);

// POST Route: Handles callback responses from the Daraja API
// The "/callback" route receives asynchronous responses or results of the STK Push transactions
route.post("/callback", handleCallback);

// Exporting the router to be used in other parts of the application
export default route;
