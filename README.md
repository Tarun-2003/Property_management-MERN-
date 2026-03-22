# Property Management Application (MERN Stack)

A full-stack property management platform built using the MERN stack (MongoDB, Express, React, Node.js) with TypeScript. The application enables efficient management of real estate listings through a scalable and modern web architecture.

## Overview

This project is designed to simulate a real-world property management system where users can manage property data through a responsive web interface and a RESTful backend.

It demonstrates full-stack development skills including API design, database integration, frontend architecture, and deployment.

## Key Features

- Full-stack MERN architecture with clear client-server separation  
- RESTful API for managing property data  
- Type-safe development using TypeScript  
- Scalable React frontend with modular components  
- Backend built with Express and Node.js  
- MongoDB integration for persistent data storage  
- Docker support for containerized deployment  
- Environment-based configuration for flexibility  

## Tech Stack

Frontend: React  
Backend: Node.js, Express  
Database: MongoDB  
Languages: TypeScript, JavaScript  
DevOps: Docker  
Deployment: Netlify  
Tooling: ESLint  

## Architecture

The application follows a standard client-server architecture:

- Client handles UI rendering and user interactions  
- Server exposes REST APIs for data operations  
- MongoDB stores and manages application data  

This separation ensures scalability and maintainability.

## Prerequisites

- Node.js (v16 or higher)  
- npm or yarn  
- MongoDB (local or cloud instance)  

### Installation

Clone the repository:

```bash
git clone https://github.com/Tarun-2003/Property_management-MERN-.git
cd Property_management-MERN-

cd server
npm install

cd ../client
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string'

cd server
npm run dev

cd client
npm start
```
##Live Demo

http://startling-sorbet-3e1931.netlify.app/login
