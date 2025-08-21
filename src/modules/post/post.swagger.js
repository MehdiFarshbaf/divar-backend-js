/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post module and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of the option
 *                      example: ""
 *                  key:
 *                      type: string
 *                      description: The key used to identify the option
 *                      example: ""
 *                  required:
 *                      type: boolean
 *                      description: required field
 *                      example: false
 *                  type:
 *                      type: string
 *                      enum: ["number","string","array","boolean"]
 *                      description: The data type of the option
 *                      example: "boolean"
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 *                      description: Possible values for the option (if applicable)
 *                      example: ["red","blue","green"]
 *                  category:
 *                      type: string
 *                      format: objectid
 *                      description: Reference to the category this option belongs to
 *                      example: ""
 *                  guid:
 *                      type: string
 *                      example: ""
 *              required:
 *                  - title
 *                  - type
 *                  - key
 *                  - category
 *          UpdateOption:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of the option
 *                      example: ""
 *                  key:
 *                      type: string
 *                      description: The key used to identify the option
 *                      example: ""
 *                  required:
 *                      type: boolean
 *                      description: required field
 *                      example: false
 *                  type:
 *                      type: string
 *                      enum: ["number","string","array","boolean"]
 *                      description: The data type of the option
 *                      example: "boolean"
 *                  enum:
 *                      type: array
 *                      items:
 *                          type: string
 *                      description: Possible values for the option (if applicable)
 *                      example: ["red","blue","green"]
 *                  category:
 *                      type: string
 *                      format: objectid
 *                      description: Reference to the category this option belongs to
 *                      example: ""
 *                  guid:
 *                      type: string
 *                      example: ""
 */

/**
 * @swagger
 * /option:
 *  post:
 *      summary: create new option for category
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 * /option/{id}:
 *  put:
 *      summary: update option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              description: optionId
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *      responses:
 *          201:
 *              description: updated option
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get all options of category
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *      responses:
 *          200:
 *              description: successfully
 */

/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *      summary: get all options of category
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: slug
 *      responses:
 *          200:
 *              description: successfully
 */

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          200:
 *              description: successfully
 */

/**
 * @swagger
 * /option:
 *  get:
 *      summary: get all options
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: successfully
 */

/**
 * @swagger
 * /option/{id}:
 *  delete:
 *      summary: delete option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          200:
 *              description: deleted successfully
 */