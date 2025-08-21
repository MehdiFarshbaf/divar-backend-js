import autoBind from "auto-bind";
import PostModel from "./post.model.js";

class PostService {
    #model

    constructor() {
        autoBind(this)
        this.#model = PostModel;
    }

    createPost = () => {
    }
    updatePost = () => {
    }
    deletePost = () => {
    }
    findPost = () => {
    }
    findPostById = () => {
    }
}

export default new PostService();