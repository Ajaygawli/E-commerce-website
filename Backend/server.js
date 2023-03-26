const app = require("./app");


const dotenv = require("dotenv");
const  connectDatabase = require("./config/database")

//Handling Uncaught Exception 
process.on("uncaughtException" , (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception `);
    process.exit(1);

})


//config
dotenv.config({path: "Backend/config/config.env"});

// connecting to database ......


connectDatabase()

 const server = app.listen(process.env.PORT , ()=> {
    console.log(`server started  on http://localhost:${process.env.PORT}`);
})


// Unhandled  Prommise Rejection 

process.on("unhandledRejection" , err =>{
    console.log(`Error : ${err.message} `);
    console.log(`shutting down the server due to unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});

