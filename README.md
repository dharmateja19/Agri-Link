
# AgriLink — Farmer-to-Buyer Marketplace

AgriLink is a full-stack agricultural marketplace that connects farmers and buyers through a single web platform. Farmers can manage crop listings and incoming orders, while buyers can discover agricultural products, place orders, and contact farmers.

**[Live Demo](https://agri-link-blond.vercel.app/)** · **[Source Code](https://github.com/dharmateja19/Agri-Link)** · **[AgriLink V2](https://github.com/dharmateja19/Agri-Link-V2)**

---

## Overview

Traditional agricultural trade can involve fragmented communication between farmers and buyers. AgriLink provides a centralized platform for crop discovery, order management, and role-specific workflows.

The application includes dedicated farmer, buyer, and administrator dashboards to support marketplace operations.

## Features

### Farmer Dashboard
- Create, update, and delete crop listings.
- View and manage incoming orders.
- Update order statuses.
- View profile information, crop listings, and received orders.

### Buyer Dashboard
- Browse and search crops by category, price, or location.
- Place orders directly with farmers.
- Send contact requests to farmers.
- View order history and profile details.

### Admin Dashboard
- View registered users, crop listings, and orders.
- Monitor platform activity and marketplace data.

### Authentication and Access Control
- User registration and login.
- JWT-based authentication.
- Role-specific access for platform workflows.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Deployment | Vercel (frontend) |

## Architecture

```text
User
  |
  v
React.js Frontend
  |
  v
Express.js REST APIs
  |
  v
Node.js Backend
  |
  v
MongoDB Database
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database or MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/dharmateja19/Agri-Link.git
cd Agri-Link
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Use the environment variable names expected by the backend code. Never commit your `.env` file or real credentials.

### 3. Start the Backend

```bash
npm run dev
```

### 4. Configure and Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

If your frontend's `package.json` uses a different start script, use the configured script instead.

### 5. Open the Application

Open the local URL displayed by the frontend development server.

## Application Workflow

1. Register or log in using an appropriate user account.
2. Farmers create and manage crop listings.
3. Buyers browse available crops and place orders.
4. Farmers manage incoming orders and update their statuses.
5. Administrators monitor users, listings, and orders.

## Project Evolution

AgriLink V2 builds on the farmer–buyer concept with a dedicated deal-management workflow.

V2 introduces:
- Offers and counteroffers.
- Deal-status tracking.
- Completion confirmation by both parties.
- Email verification and password recovery.

**Explore V2:** [AgriLink V2 Repository](https://github.com/dharmateja19/Agri-Link-V2)

## Future Improvements

- Email and mobile verification, where not yet implemented.
- Real-time chat between farmers and buyers.
- Additional security, testing, and marketplace enhancements.

---

**Project:** AgriLink  
**Category:** Full-Stack Web Development  
**Live Application:** https://agri-link-blond.vercel.app/
