const express = require("express");
const List = require("../models/List");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");

//!ROUTE 1: Fetch all the Data api/collections login required

router.get("/allnotes", fetchUser, async (req, res) => {
  try {
    const item = await List.find({ user: req.user.id });
    res.json(item);
  } catch (error) {
    res.status(401).send("iternal error");
    console.log(error);
  }
});


//! for all the data 

router.get('/alltheDatafromlist',fetchUser, async(req,res)=>{
  try {
    const allData=await List.find();
    res.json(allData);
  } catch (error) {
    res.status(401).send("iternal error");
    console.log(error);
  }
})

//!ROUTE 2: add Item   api/additem login required

router.post(
  "/additem",
  fetchUser,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),

    body("amount", "Ammount is not empty").notEmpty(),
  ],
  async (req, res) => {
    try {
      const { name, amount } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const list = new List({
        name,
        amount,
        user: req.user.id,
      });
      const savelist = await list.save();
      res.json(savelist);
    } catch (error) {
      res.status(401).send("iternal error");
      console.log(error);
    }
  }
);

//!ROUTER 3: update a list api/collections/upadate login required

router.put("/update/:id", fetchUser, async (req, res) => {
  try {
    const { name, amount } = req.body;
    let newitem = {};
    if (name) {
      newitem.name = name;
    }
    if (amount) {
      newitem.amount = amount;
    }
    //*find updated nad upadate it
    let item = await List.findById(req.params.id);
    if (!item) {
      return;
      res.status(401).send("not found");
    }
    if (item.user.toString() !== req.user.id) {
      return;
      res.status(401).send("not allowed");
    }

    item = await List.findByIdAndUpdate(
      req.params.id,
      { $set: newitem },
      { new: true }
    );
    res.json({ item });
  } catch (error) {
    console.log(eroor);
    res.status(401).send("some error occursed");
  }
});

//!Route 4: Delet item api/collections/Deletiem login required

router.delete("/deleteitem/:id", fetchUser, async (req, res) => {
  try {
    const { name, amount } = req.body;

    //*find updated nad upadate it
    let item = await List.findById(req.params.id);
    if (!item) {
      return;
      res.status(404).send("not found");
    }
    if (item.user.toString() !== req.user.id) {
      return;
      res.status(404).send("not allowed");
    }

    item = await List.findByIdAndDelete(req.params.id);
    res.json({ success: "item deleted" });
  } catch (error) {
    console.log(eroor);
    res.status(401).send("some error occursed");
  }
});

module.exports = router;
