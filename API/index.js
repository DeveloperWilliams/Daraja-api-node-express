{/*  
 Simple DARAJA API integration for Mpesa(Mobile Money)
 https://github.com/DeveloperWilliams/Daraja-api-node-express
 Developed by William Achuchi.
 +254708966189
 archywilliams2@gmail.com
*/}

///Import Project Dedepndencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//Import Project Routes
import darajaRoutes from "./routes/darajaRoute.js"

//Initialize Dotenv
dotenv.config();

//Initialize Express App
const app = express();

//Declare Middleware
app.use(express.json()); //For using Json body
app.use(cors()); ///For Cross-Origin Errors(Declare specific URL in Production)

//Declare Project Routes
app.use("/api/daraja", darajaRoutes)

const PORT = process.env.PORT || 8080; //Declaring PORT to run on PORT 58080


//Listening to Requests
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`); 
});
