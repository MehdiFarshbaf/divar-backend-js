import autoBind from "auto-bind";
import OptionService from "./option.service.js";

class OptionController {
    #service

    constructor() {
        autoBind(this)
        this.#service = OptionService
    }
}

export default new OptionController()