const express = require('express');
const cors = require('cors');
const app= express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// Amer-kitchen
// U7g3RhJaoRGjq1ae

// meddel Ware
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASSWORD}@cluster0.xuxoczf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run(){
    try{
        const servicesCollcation=client.db('Amer-kitchen').collection('Serves')

        app.get("/services",async(req,res)=>{
            const qurey ={}
            const cursor = servicesCollcation.find(qurey)
            const result =await cursor.limit(3).toArray()
            res.send(result)
        })
        

    }
    finally{

    }
}
run().catch(err=>console.error(err))


const port =process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.send("hello word")
})

app.listen(port,()=>{
    console.log('server is running')
})