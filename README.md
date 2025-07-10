# capstone-edp

# Running React
In a termianl window, navigate to "...capstone-edp/react". Use `npm install` to install dependencies then `npm run dev` to run the web application.

# Running the Server
In a separate termianl window, navigate to "...capstone-edp/server". Use `npm install` to install dependencies then `npm start` to run the server.

# Setting up MongoDB

1- Open mongosh and create a database named "entrdir"
`use entrdir`

2- In a separate terminal, nagivate to "...capstone-edp/mongo" and execute this command:
`mongoimport --uri mongodb://localhost:27017/entrdir --collection employee --drop --file employees.json --jsonArray`

Refer to lab WA3236 as an example for React/Express/Mongo