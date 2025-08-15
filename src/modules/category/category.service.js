import autoBind from "auto-bind"
import CategoryModel from "./category.mode.js";

class CategoryService {
    #model
    constructor() {
        autoBind(this)
        this.#model = CategoryModel
    }

}

export default new CategoryService()