import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    Blog_title: { type: String, required: true, min: 4 },
    Blog_amount: { type: Number, required: true, min: 0 },
    Blog_fundraised: { type: Number, required: true, min: 0 },
    Blog_wallet: { type: String, required: true },
    Blog_reason: { type: String, required: true, min: 4 },
    Blog_city: { type: String, required: true, min: 4 },
    Blog_state: { type: String, required: true, min: 4 },
    Blog_pincode: { type: Number, required: true, min: 4 },
    Blog_content: { type: String, required: true, min: 6 },
    Blog_author: { type: String, required: true },
    tc: { type: Boolean, required: true },
})
const BlogModel = mongoose.model("blog", blogSchema)
export default BlogModel;