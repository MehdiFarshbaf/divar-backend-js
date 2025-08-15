import autoBind from "auto-bind"
import {sendSuccessResponse} from "../../common/responses.js";
import {CategoryMessages} from "./category.messages.js";
import categoryService from "./category.service.js";

class CategoryController {
    #service

    constructor() {
        autoBind(this)
        this.#service = categoryService
    }

    async createCategory(req, res, next) {
        try {
            const {name, icon, parent, slug} = req.body
            const newCategory = await this.#service.createCategory({name, icon, parent, slug})
            sendSuccessResponse(res, 201, newCategory, CategoryMessages.created)
        } catch (err) {
            next(err)
        }
    }

    async find(req, res, next) {
        try {
            const categories = await this.#service.find()
            sendSuccessResponse(res, 200, categories)
        } catch (err) {
            next(err)
        }
    }

}

export default new CategoryController