const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.controller = userController;
  }

  routes = () => {
    router.get('/getAll', this.controller.getAll)
    router.get("/firstRoute", this.controller.test);
    router.get('/base', this.controller.baseMethod)
    router.get('/:id', this.controller.findById)
    // router.get
    // router.post
    // router.put
    // router.delete
    return router;
  };
}

module.exports = UserRouter;
