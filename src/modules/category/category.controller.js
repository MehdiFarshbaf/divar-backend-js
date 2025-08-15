import autoBind from "auto-bind"
import categoryService from "./category.service"

class CategoryController{
    #service

    constructor(){
        autoBind(this)
        this.#service = categoryService
    }

}

export default new CategoryController