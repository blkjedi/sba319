import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();


//! username email password isAdmin

// Create a user
router.post("/", async (req, res) => {
  let collection = await db.collection("users");
  let newDocument = req.body;

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Get a user entry
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a update to users
router.put("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };

  let result = await collection.updateOne(query, {$set:{username:req.body.username}});

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// Delete a single user
router.delete("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

//? sign in 

router.post("/signin", async(req,res)=>{
    const user = await db.collection('users').findOne({email:req.body.email})
    if (!user){
        res.send('server not found')
    }
    if (req.body.password !== user.password){
        res.send('user not found')
    }
    res.send(user)
})


export default router;
