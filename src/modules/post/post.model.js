import {model, Schema, Types} from "mongoose";

const PostSchema = new Schema({
    name: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: Types.ObjectId, ref: 'category', required: true},
    province: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    coordinate: {type: [String], required: true},
    images: {type: [String], required: false, default: []},
}, {
    timestamps: true
})

const PostModel = model("post", PostSchema);
export default PostModel;