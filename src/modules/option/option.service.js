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