import autoBind from "auto-bind";
import UserModel from "./user.model.js";

class UserService {
    #model

    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }
}

export default new UserService();