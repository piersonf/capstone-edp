import express, { json } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import {PythonShell} from 'python-shell'

let ml_modeling_filename = 'query_model.py'
let ml_modeling_path = `../ml_modeling/${ml_modeling_filename}`

const app = express();
const PORT = 3000;
// in general these should be in a .env file,
// but they're fine here for now since they're just localhost
const url = 'mongodb://localhost:27017';
const dbName = 'entrdir'
app.use(cors());
app.use(express.json());

// "adapted" from TSE... some sort of login form?
// but we'll need to change this for mongo!

// app.post('/employee/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);
//         if (result.rows.length > 0) {
//             res.status(200).json({ uid: result.rows[0].uid });
//         } else {
//             res.status(401).json({ message: 'Authentication failed' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

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

app.get('/api/queryModel', async (req, res) => {
    try {
        // const { work_location, role } = req.body;
        // let features = [work_location, role]
        

        let options = {
            // mode: 'text',
            // scriptPath: ml_modeling_path,
            // args: features
            pythonOptions: ['-u']
        };

        PythonShell.run(ml_modeling_path, options).then(messages =>{
    
            console.log(messages);
            
        });
        
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('You took my stapler... Something went wrong!');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});