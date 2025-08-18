import autoBind from "auto-bind";
import OptionModel from "./option.model.js";
import CategoryModel from "../category/category.mode.js";
import {sendErrorResponse} from "../../common/responses.js";
import {CategoryMessages} from "../category/category.messages.js";
import {OptionMessages} from "./option.messages.js";
import slugify from "slugify";

class OptionService {
    #model
    #modelCategory

    constructor() {
        autoBind(this)
        this.#model = OptionModel
        this.#modelCategory = CategoryModel
    }

    async find() {
        const options = await this.#model.find({}, {__v: 0}, {sort: {_id: -1}}).populate([{
            path: "category",
            select: {name: 1, slug: 1}
        }]);
        return options;
    }

    async findById(id) {
        return await this.checkExistById(id)
    }

    findByCategoryId = async (id) => {
        return await this.#model.find({category: id}, {__v: 0}).populate([{
            path: "category",
            select: {name: 1, slug: 1}
        }])
    }

    async create(optionDto) {
        // check exist category
        const category = await this.checkExistCategoryById(optionDto.category);
        optionDto.category = category._id

        // check an existed key
        optionDto.key = slugify(optionDto.key, {trim: true, replacement: "_", lower: true});
        await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);

        if (optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",")
        } else if (Array.isArray(optionDto.enum)) optionDto.enum = []

        const option = await this.#model.create(optionDto);
        return option;

    }

    // lookup خالی یک ارایه میده

    findOptionsByCategorySlug = async (slug) => {
        const options = await this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                }
            },
            {
                $unwind: "$category",
            },

            {
                $addFields: {
                    categoryName: "$category.name",
                    categorySlug: "$category.slug",
                    categoryIcon: "$category.icon",
                }
            },
            {
                $project: {
                    // "category.name": 0,
                    // "category.slug": 0,
                    // "category.parent": 0,
                    // "category.parents": 0,
                    // "category._id": 0,
                    // "category.createdAt": 0,
                    // "category.updatedAt": 0,
                    // __v: 0
                    category:0
                }
            },
        ])
        return options;
    }

    checkExistById = async (id) => {
        const option = await this.#model.findById(id)
        if (!option) sendErrorResponse(OptionMessages.NotFount, 404)
        return option
    }

    async alreadyExistByCategoryAndKey(key, categoryId) {
        const isExist = await this.#model.findOne({category: categoryId, key})
        if (isExist) sendErrorResponse(OptionMessages.AlreadyExist, 409)
        return null
    }

    async checkExistCategoryById(id) {
        const category = await this.#modelCategory.findById(id);
        if (!category) sendErrorResponse(CategoryMessages.NotFount, 404)
        return category;
    }
}

export default new OptionService()