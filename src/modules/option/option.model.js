import {model, Schema, Types} from "mongoose";

const OptionSchema = new Schema({
    title: {type: String, required: true},
    key: {type: String, required: true},
    type: {type: String, enum: ["number", "string", "array", "boolean"], required: true},
    enum: {type: Array, default: []},
    guid: {type: String, required: false},
    category: {type: Types.ObjectId, ref: 'category', required: true},
}, {
    timestamps: true
})

const optionModel = model("post", OptionSchema);
export default optionModel;