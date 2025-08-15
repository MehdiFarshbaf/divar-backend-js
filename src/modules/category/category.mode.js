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
        ref: 'category',
        required: false,
    },
    parents: {
        type: [Types.ObjectId],
        ref: 'category',
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
    ref: 'category',
    localField: '_id',
    foreignField: 'parent',
})

function autoPopulate(next) {
    this.populate([{path: "children"}])
    next()
}

CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate)

const CategoryModel = model("category", CategorySchema);

export default CategoryModel;