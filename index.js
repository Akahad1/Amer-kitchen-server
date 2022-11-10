const express = require('express');
const cors = require('cors');
const app= express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        const reviewsCollcation=client.db('Amer-kitchen').collection('reviews')

        app.get("/services",async(req,res)=>{
            const qurey ={}
            const cursor = servicesCollcation.find(qurey)
            const result =await cursor.limit(3).toArray()
            res.send(result)
        })
        app.get("/allservices",async(req,res)=>{
            const qurey ={}
            const cursor = servicesCollcation.find(qurey)
            const result =await cursor.toArray()
            res.send(result)
        })
        app.get('/allservices/:id',async(req,res)=>{
            const id =req.params.id
            const qurey ={_id:ObjectId(id)}
            const result= await servicesCollcation.findOne(qurey)
            res.send(result)
        })

        app.post('/allservices',async(req,res)=>{
            const service=req.body;
            console.log(service)
            const result =await servicesCollcation.insertOne(service)
            res.send(result)
        })

        app.post("/reviews",  async(req,res)=>{
            const review=req.body
            console.log(review)
            const result =await reviewsCollcation.insertOne(review)
            res.send(result)})
        

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