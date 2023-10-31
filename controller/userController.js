const BaseController = require('./baseController')

class UserController extends BaseController{
    constructor(model){
        super(model)
    }

    test=(req,res)=>{

        // I can do what i want in here

        /**
         * connect DB
         * third part API calls
         * Calculations
         * 
         */
        return res.send('I am in my User Controller')
    }

}

module.exports = UserController