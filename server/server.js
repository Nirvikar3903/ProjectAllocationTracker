// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from './config/db.js'
// import authRoutes from './routes/authRoutes.js';
// //added this command

// import employeeRoutes from './routes/employeeRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';
// import allocationRoutes from './routes/allocationRoutes.js';

// dotenv.config();
// connectDB();

// // middleware
// const app = express();

// app.use(cors());
// app.use(express.json());

// //  routes

// app.use('/api/auth', authRoutes);
// app.use('/api/employee',employeeRoutes)
// app.use('/api/project',projectRoutes)
// app.use('/api/allocation',allocationRoutes)

// const PORT = process.env.PORT ;

// app.listen(PORT , ()=>{
//     console.log(`Server is running on port ${PORT}`)
//     console.log(`Lets work on port ${PORT}`)
    
// })

// server/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import allocationRoutes from './routes/allocationRoutes.js';

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/allocation', allocationRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
