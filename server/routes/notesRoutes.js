import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/note").get(protect,getAllNotes).post(protect,createNote);
router.route("/note/:id").get(protect,getNoteById).put(protect,updateNote).delete(protect,deleteNote)



export default router;