import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
      },
    description: {
        type: String,
        required: [true, 'Please add a decription value'],
      },

},
{
    timestamps: true,
  }
)

export default mongoose.model("Note",noteSchema)