# AgriLink

**AgriLink** is a **MERN-based web platform** designed to connect **farmers and buyers directly**, providing a transparent and efficient online marketplace for agricultural products. The platform helps farmers manage their crops and orders, while buyers can browse products, place orders, and communicate with farmers directly.  

---

## Features

### Farmer Dashboard
- Add, update, and delete crop listings  
- View and manage received orders  
- Update order status (pending, accepted, completed)  
- View personal profile, number of crops listed, and orders received  

### Buyer Dashboard
- Browse and search crops by category, price, or location  
- Place crop orders directly with farmers  
- Send contact requests to farmers  
- View order history and profile details  

### Admin Dashboard
- View all users, crops, and orders  
- Monitor platform activity and ensure data integrity  

### Authentication & Security
- Secure user registration and login with JWT-based authentication  
- Planned OTP-based mobile verification  
- Planned email verification for added account security  

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Extras:** Real-time chat via Socket.io (planned), Fast2SMS/Firebase OTP  

---

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/agrilink.git 

### Installation & Setup

## Navigate to the project directory:

cd agrilink

## Install backend dependencies:
cd backend
npm install

## Install frontend dependencies:
cd ../frontend
npm install

## Setup environment variables:

Create a .env file in the backend folder with the following content:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Run the application:

### Start backend:

cd backend
npm run dev


### Start frontend:

cd ../frontend
npm start

## Usage

Register as a farmer or buyer

Farmers can manage crops and orders

Buyers can browse crops, place orders, and contact farmers

Admin can view all users, crops, and orders
