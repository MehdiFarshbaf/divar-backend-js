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
            const {title, key, type, enum: list, guid, category, required} = req.body;
            const newCategory = await this.#service.create({title, key, type, enum: list, guid, category, required})
            sendSuccessResponse(res, 201, newCategory, OptionMessages.created)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const {title, key, type, enum: list, guid, category, required} = req.body;
            const {id} = req.params
            const updateOption = await this.#service.update(id, {
                title,
                key,
                type,
                enum: list,
                guid,
                category,
                required
            })
            sendSuccessResponse(res, 200, updateOption, OptionMessages.Update)
        } catch (error) {
            next(error)
        }
    }

    // find options by category id
    findByCategoryId = async (req, res, next) => {
        try {
            const {id} = req.params
            const options = await this.#service.findByCategoryId(id)
            sendSuccessResponse(res, 200, options)

        } catch (error) {
            next(error)
        }
    }

    findById = async (req, res, next) => {
        try {
            const {id} = req.params
            const option = await this.#service.findById(id)
            sendSuccessResponse(res, 200, option)
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

    findOptionsByCategorySlug = async (req, res, next) => {
        const {slug} = req.params
        const options = await this.#service.findOptionsByCategorySlug(slug)
        sendSuccessResponse(res, 200, options)
    }

    deleteOptionById = async (req, res, next) => {
        try {
            const {id} = req.params
            await this.#service.deleteOptionById(id)
            sendSuccessResponse(res, 200, undefined, OptionMessages.Deleted)
        } catch (error) {
            next(error)
        }
    }
}

export default new OptionController()