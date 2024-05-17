import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();


//! storename city state zip 


//?new store
router.post("/", async (req, res) => {
    let collection = await db.collection("store_locations");
    let newDocument = req.body;
  
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });


  //?get store
  router.get("/:id", async (req, res) => {
    let collection = await db.collection("store_locations");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  //? update store
router.put("/:id", async (req, res) => {
    let collection = await db.collection("store_locations");
    let query = { _id: new ObjectId(req.params.id) };
  
    let result = await collection.updateOne(query, {$set:{storename:req.body.storename}});
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
  
  
  //? delete store
  router.delete("/:id", async (req, res) => {
    let collection = await db.collection("store_locations");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  export default router;