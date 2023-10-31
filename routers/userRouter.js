const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController) {
    this.controller = userController;
  }

  routes = () => {
    router.get("/firstRoute", this.controller.test);
    router.get('/base', this.controller.baseMethod);
    router.get('/all', this.controller.getAll)
    router.get('/:id', this.controller.getOne)
    router.post('/newUser', this.controller.createOne)
    // router.get
    // router.post
    // router.put
    // router.delete
    return router;
  };
}

module.exports = UserRouter;
