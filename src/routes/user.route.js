const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { userValidation } = require("../validations");
const authMiddleware = require("../middlewares/authentication");

const { catchAsync, upload } = require("../utils");
const { userService } = require("../services");
const httpStatus = require("http-status");

/**
 * @api {get} /users Get Users
 * @apiName GetUsers
 * @apiDescription Get all users
 * @apiGroup User
 * @apiPermission authenticated (only)
 * @apiValidation {getUsers}
 */
router
  .route("/")
  .get(
    authMiddleware,
    validate(userValidation.getUsers),
    catchAsync(async (req, res) => {
      const users = await userService.getUsers(
        req.query.sortBy,
        req.query.page,
        req.query.limit
      );
      res.send(users);
    })
  )
  /**
   * @api {post} /users Create User
   * @apiName CreateUser
   * @apiDescription Create a new user
   * @apiGroup User
   * @apiPermission authenticated (only)
   * @apiValidation {createUser}
   */
  .post(
    upload.single("file"),
    validate(userValidation.createUser),
    catchAsync(async (req, res) => {
      const user = await userService.createUser(req.body, req.file);
      res.status(httpStatus.CREATED).send(user);
    })
  );

/**
 * @api {put} /users/:userId Update User
 * @apiName UpdateUser
 * @apiDescription Update a user
 * @apiGroup User
 * @apiPermission authenticated (only)
 * @apiValidation {updateUser}
 */
router
  .route("/:userId")
  .put(
    upload.single("file"),
    validate(userValidation.updateUser),
    catchAsync(async (req, res) => {
      const user = await userService.updateUser(
        req.params.userId,
        req.body,
        req.file
      );
      res.send(user);
    })
  )
  /**
   * @api {delete} /users/:userId Delete User
   * @apiName DeleteUser
   * @apiDescription Delete a user
   * @apiGroup User
   * @apiPermission authenticated (only)
   * @apiValidation {deleteUser}
   */
  .delete(
    validate(userValidation.deleteUser),
    catchAsync(async (req, res) => {
      await userService.deleteUser(req.params.userId);
      res.status(httpStatus.NO_CONTENT).send();
    })
  );

module.exports = router;
