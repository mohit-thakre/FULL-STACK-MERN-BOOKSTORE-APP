# Pages & Co - MERN Stack

This is a full-stack bookstore application where you can buy and sell books. The application is built using the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

The project is divided into two main directories at the root:

- `FRONTEND`: Contains the client-side code.
- `BACKEND`: Contains the server-side code.

## Getting Started

### Cloning the Repository

To get started, clone the repository:

git clone https://github.com/mohit-thakre/FULL-STACK-MERN-BOOKSTORE-APP.git

Copy code

### Backend (Server)

The backend is already deployed on Render. However, if you want to set up your own database and server, follow these steps:

1. Change the URI in the frontend configuration file:
   - Navigate to `FRONTEND/src/components/helper.jsx`.
   - Update the `appurl` to point to your backend server.

2. Set up your environment variables:

SECRET = secret_key
PORT = host_port
DB_URL = db_address

markdown
Copy code

### Frontend (Client)

1. Navigate to the `FRONTEND` directory:

cd FRONTEND

markdown
Copy code

2. Install the necessary dependencies:

npm install

markdown
Copy code

3. Start the frontend server:

npm start

Copy code

Now you can run the client and server independently.

## Running the Application

Once both the client and server are set up and running, you can access the bookstore application and start buying and selling books.

### Deployed Application

You can access the deployed application using the following link:

[Pages & Co](full-stack-mern-bookstore-app.vercel.app)

---
