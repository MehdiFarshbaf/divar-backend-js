import autoBind from "auto-bind";
import PostService from "./post.service.js";

class PostController {
    #service

    constructor() {
        autoBind(this)
        this.#service = PostService
    }

    createPost = (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }
    updatePost = (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }
    deletePost = (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }
    findPost = (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }
    findPostById = (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    }

}

export default new PostController()