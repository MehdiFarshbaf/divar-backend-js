import autoBind from "auto-bind";
import OptionModel from "./option.model.js";

class OptionService {
    #model

    constructor() {
        autoBind(this)
        this.#model = OptionModel
    }
}

export default new OptionService()