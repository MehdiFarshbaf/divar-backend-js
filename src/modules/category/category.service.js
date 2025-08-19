import autoBind from "auto-bind"
import CategoryModel from "./category.mode.js";
import {sendErrorResponse} from "../../common/responses.js";
import {CategoryMessages} from "./category.messages.js";
import slugify from "slugify";
import {isValidObjectId, Types} from "mongoose";
import OptionModel from "../option/option.model.js";

class CategoryService {
    #model
    #optionModel

    constructor() {
        autoBind(this)
        this.#model = CategoryModel
        this.#optionModel = OptionModel
    }

    async createCategory(categoryDto) {

        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {

            const existCategory = await this.checkExistingCategoryById(categoryDto.parent)
            categoryDto.parent = existCategory._id

            categoryDto.params = [
                ...new Set((
                    [existCategory._id.toString()].concat(existCategory.parents.map(id => id.toString()))
                ).map(id => new Types.ObjectId(id)))
            ]
        }

        if (categoryDto?.slug) {
            categoryDto.slug = slugify(categoryDto.slug);
            await this.alreadyExistBySlug(categoryDto.slug)
        } else {
            categoryDto.slug = slugify(categoryDto.name);
        }
        const newCategory = await this.#model.create(categoryDto)
        return newCategory
    }

    async find() {
        // اونایی که پدر ندارند
        return await this.#model.find({parent: {$exists: false}})
    }

    deleteCategory = async (id) => {
        await this.checkExistingCategoryById(id)
        await this.#optionModel.deleteMany({category: id}).then(async () => {
            await this.#model.deleteOne({_id: id})
        })
        return true
    }

    async checkExistingCategoryById(id) {
        const category = await this.#model.findById(id)
        if (!category) sendErrorResponse(CategoryMessages.NotFount, 404)
        return category
    }

    async checkExistBySlug(slug) {
        const category = await this.#model.findOne({slug})
        if (!category) sendErrorResponse(CategoryMessages.NotFount, 404)
        return category
    }

    async alreadyExistBySlug(slug) {
        const category = await this.#model.findOne({slug})
        if (category) sendErrorResponse(CategoryMessages.AlreadyExist, 409)
        return null
    }


}

export default new CategoryService()