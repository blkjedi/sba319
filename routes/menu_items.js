import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();


//! itemname isHot isCombo price


//?new menu item
router.post("/", async (req, res) => {
    let collection = await db.collection("menu_items");
    let newDocument = req.body;
  
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });


  //?get menu item
  router.get("/:id", async (req, res) => {
    let collection = await db.collection("menu_items");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  //? udate menu
router.put("/:id", async (req, res) => {
    let collection = await db.collection("menu_items");
    let query = { _id: new ObjectId(req.params.id) };
  
    let result = await collection.updateOne(query, {$set:{itemname:req.body.itemname}});
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
  
  
  //? delete menu item
  router.delete("/:id", async (req, res) => {
    let collection = await db.collection("menu_items");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  export default router;