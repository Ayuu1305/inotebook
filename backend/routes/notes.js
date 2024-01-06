const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// ROUTE 1: Get All the notes using GET "/api/auth/fetchallnotes" (login required)

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 2 Add a New Note using POST "/api/auth/addnote" login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 5 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {}
  }
);

// ROUTE 3: Update an existing notes using post "/api/auth/fetchallnotes" (login required)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a new note object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  try {
    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    if (!note) {
      return res.status(404).send("Note not found after update");
    }

    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ROUTE 4: Delete an existing notes using delete "/api/auth/deletenote" (login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      // Find the note to be deleted
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }
  
      // Allow deletion only if the user owns this note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      // Delete the note
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
  
      if (!deletedNote) {
        return res.status(404).send("Note not found after deletion");
      }
  
      res.json({ success: "Note has been deleted", note: deletedNote });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

module.exports = router;
