import asyncHandler from "express-async-handler"
import Notes from "../models/notesModel.js"
import User from "../models/userModel.js"
export const getAllNotes= asyncHandler( async (req,res)=>{
    const note = await Notes.find({ user: req.user.id })
    res.status(200).json(note)
})

export const getNoteById= asyncHandler(  async(req,res)=>{

    const note = await Notes.findById(req.params.id);
    if(!note){
        res.status(400)
        throw new Error("Note not found")
    }
    res.status(200).json(note)
})


export const createNote= asyncHandler(  async(req,res)=>{
console.log(req.body)
if(!req.body.text){
    res.status(400)
     throw new Error("Please add a text field")
}
if(!req.body.description){
    res.status(400)
     throw new Error("Please add a description field")
}
const note = await Notes.create({
    text:req.body.text,
    description:req.body.description,
    user: req.user.id,
})
    res.status(201).json(note)
})
export const updateNote= asyncHandler(  async(req,res)=>{

    const note = await Notes.findById(req.params.id)

    if (!note) {
      res.status(400)
      throw new Error('Note not found')
    }
  
    const user = User.findById(req.user.id);
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the same notes user
    if (note.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedNote)
})

export const deleteNote= asyncHandler(  async(req,res)=>{
    const note = await Notes.findById(req.params.id);
    if(!note){
        res.status(400)
        throw new Error("Note not found")
    }

    const user = User.findById(req.user.id);
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    // Make sure the logged in user matches the same notes user
    if (note.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
    await note.remove();
    res.status(200).json({id: req.params.id})
})