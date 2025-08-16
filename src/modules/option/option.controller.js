import autoBind from "auto-bind";
import OptionService from "./option.service.js";
import {sendSuccessResponse} from "../../common/responses.js";
import {OptionMessages} from "./option.messages.js";

class OptionController {
    #service

    constructor() {
        autoBind(this)
        this.#service = OptionService
    }

    async create(req, res, next) {
        try {
            const {title, key, type, enum: list, guid, category} = req.body;
            const newCategory = await this.#service.create({title, key, type, enum: list, guid, category})
            sendSuccessResponse(res, 201, newCategory, OptionMessages.created)
        } catch (error) {
            next(error)
        }
    }

    findByCategoryId = async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }

    findById = async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }

    find = async (req, res, next) => {
        try {
            const options = await this.#service.find()
            sendSuccessResponse(res, 200, options)
        } catch (error) {
            next(error)
        }
    }
}

export default new OptionController()