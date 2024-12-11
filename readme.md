# DARAJA API INTEGRATION

A simple repository demonstrating how to integrate Safaricom's Daraja API with an Express.js application. It includes examples for MPesa services such as STK push, access token generation, and handling API responses. Perfect for developers looking to implement mobile money solutions in their Node.js projects.

## Features

- **OAuth Token Generation:** Securely generate access tokens for API authentication.
- **STK Push Functionality:** Initiates STK Push requests for payments.
- **Callback Handling:** Handles Safaricom's callback for transaction statuses.
- **Environment Configuration:** Securely manage sensitive credentials using `.env`.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/DeveloperWilliams/Daraja-api-node-express.git
    ```
2. Navigate to the project directory:
    ```sh
    cd API
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

Ensure to create .env file

DARAJA_CONSUMER_KEY=your_consumer_key
DARAJA_CONSUMER_SECRET=your_consumer_secret
DARAJA_SHORTCODE=your_shortcode
DARAJA_PASSKEY=your_passkey
CALLBACK_URL=https://yourdomain.com/callback (use  ngrok to expose your backend on local development)



```sh
npm start
```
or

```sh
npm run dev
```

---


## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@dev_williee](https://x.com/dev_williee) - archywilliams2@gmail.com

Project Link: [https://github.com/DeveloperWilliams/Daraja-api-node-express.git](https://github.com/DeveloperWilliams/Daraja-api-node-express.git)