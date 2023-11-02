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
    router.get('/allItems/:id', this.controller.findOneWithItem)
    router.post('/addItem/:id', this.controller.userCreateItem)
    router.get('/:id', this.controller.getOne)
    router.post('/newUser', this.controller.createOne)
    router.put('/test/:var', this.controller.infoPass)
    // router.get
    // router.post
    // router.put
    // router.delete
    return router;
  };
}

module.exports = UserRouter;
