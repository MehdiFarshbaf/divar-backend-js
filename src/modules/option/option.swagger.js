/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option module and routes
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
 * /option/{categoryId}:
 *  get:
 *      summary: get all options of category
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *      responses:
 *          200:
 *              description: successfully
 */