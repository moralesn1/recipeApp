const express = require("express");
const router = express.Router();
const Note = require("../models/note");

router.get("/", async (req, res) => {
  const notes = await Note.find().sort({ createdAt: "desc" });
  res.render("notes/notes", { notes: notes, note: new Note() });
});

router.get("/new", (req, res) => {
  res.render("notes/new", { note: new Note() });
});

router.post("/", async (req, res) => {
  let note = new Note({
    text: req.body.text,
  });

  console.log(note);

  try {
    note = await note.save();
    console.log("note created");
    res.redirect("/notes");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  res.redirect("/notes");
});
module.exports = router;
