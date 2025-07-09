# capstone-edp

# Running React
In a termianl window, navigate to "...capstone-edp/react"
`npm install`
`npm run dev`

# Running the Server
In a separate termianl window, navigate to "...capstone-edp/server"
`npm install`
`npm start`

# Setting up MongoDB

1- Open up mongosh and create a database named "entrdir"
`use entrdir`

2- In a separate terminal, nagivate to "...capstone-edp/mongo" and execute this command:
`mongoimport --uri mongodb://localhost:27017/entrdir --collection employee --drop --file employee.json --jsonArray`

Refer to lab WA3236 as an example for React/Express/Mongo