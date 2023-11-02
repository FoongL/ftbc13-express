const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor(model, items) {
    super(model);
    this.items = items;
  }

  test = (req, res) => {
    // I can do what i want in here

    /**
     * connect DB
     * third part API calls
     * Calculations
     *
     */
    return res.send("I am in my User Controller");
  };

  findOneWithItem = async (req, res) => {
    const { id } = req.params;

    // lazy loading method
    const lazyUser = await this.model.findByPk(id);
    const usersItems = await lazyUser.getItems();

    // eager loading method
    const eagerUser = await this.model.findOne({
      where: { id },
      include: { model: this.items },
    });
    return res.json({
      success: true,
      lazy: { user: lazyUser, items: usersItems },
      eager: eagerUser,
    });
  };

  userCreateItem = async( req, res) =>{
    const {id} = req.params;
    const {name, description} = req.body

    const user = await this.model.findByPk(id)
    await user.createItem({name, description})


    return res.json({success: true, user})


  }
}

module.exports = UserController;
