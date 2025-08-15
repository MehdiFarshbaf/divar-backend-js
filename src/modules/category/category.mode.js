import {model, Schema, Types} from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        index: true,
    },
    icon: {
        type: String,
        required: true,
    },
    parent: {
        type: Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    parents: {
        type: [Types.ObjectId],
        ref: 'Category',
        required: false,
        default: [],
    }
}, {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
        virtuals: true,
    }
})

CategorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent',
})

// export default model("category", CategorySchema)

const CategoryModel = model("category", CategorySchema);

export default CategoryModel;