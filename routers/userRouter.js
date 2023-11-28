const express = require("express");
const router = express.Router();

class UserRouter {
  constructor(userController, basicAuth, jwtAuth, jwtCheck) {
    this.controller = userController;
    this.basicAuth = basicAuth
    this.jwtAuth = jwtAuth
    this.jwtCheck = jwtCheck
  }

  routes = () => {
    router.get("/firstRoute", this.controller.test);
    router.get('/base', this.controller.baseMethod);
    router.get('/all', this.controller.getAll)
    router.get('/allItems/:id', this.controller.findOneWithItem)
    router.post('/addItem/:id', this.controller.userCreateItem)
    
    router.post('/newUser', this.controller.createOne)
    router.put('/test/:var', this.controller.infoPass)
    router.post('/basicSignUp', this.controller.basicSignUp)
    router.post('/basicSignIn', this.controller.basicSignIn)
    router.post('/jwtSignUp', this.controller.jwtSignUp)
    router.post('/jwtSignIn', this.controller.jwtSignIn)
    // protecting any route BELOW
    // router.use(this.basicAuth)


    router.get('/basicTest', this.basicAuth, this.controller.basicTest)
    router.get('/jwtTest', this.jwtAuth, this.controller.basicTest)
    router.get('/auth0Test', this.jwtCheck, this.controller.basicTest)



    router.get('/:id', this.controller.getOne)
    // router.get
    // router.post
    // router.put
    // router.delete
    return router;
  };
}

module.exports = UserRouter;
