import express, { json } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = 3000;
// in general these should be in a .env file,
// but they're fine here for now since they're just localhost
const url = 'mongodb://localhost:27017';
const dbName = 'entrdir'
app.use(cors());
app.use(express.json());

// to login, send a POST request to /api/employee/login with JSON body: {"employee_id": "<id>", "password": "<password>"}
app.post('/api/login', async (req, res) => {
    const { employee_id, password } = req.body;
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('login');
        const employee = await collection.findOne({ 'employee_id': parseInt(employee_id) });
        // if password is incorrect...
        if(employee.password !== password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // on successful login, return employee details
        employee.message = 'Login successful';
        res.json(employee);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('You took my stapler... Something went wrong!');
    }
});


app.get('/api/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('employee');
        const employee = await collection.findOne({ 'id': parseInt(id) });
        // return JSON obj, NOT array
        res.json(employee);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("You took my stapler... No employee found!");
    }
});

// search by name. request body JSON: {"searchTerm": "<name>"}
app.post('/api/employee/search', async (req, res) => {
    try {
        const { searchTerm } = req.body;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('employee');
        const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
        const employees = await collection.find({ 'name': regex }).toArray();
        res.json(employees);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('You took my stapler... Something went wrong!');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});