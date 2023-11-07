const BaseController = require("./baseController");
const bcrypt = require("bcrypt");

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

  userCreateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const user = await this.model.findByPk(id);
    await user.createItem({ name, description });

    return res.json({ success: true, user });
  };

  basicSignIn = async (req, res) => {
    const { email, password } = req.body;
    // data validation to confirm i have everything
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing basic information" });
    }

    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }

    const compare = await bcrypt.compare(password, user.password) // true or false

    if(!compare){
      return res.status(403).json({success:false, msg:'password does not match'})
    }

    return res.json({success: true, user: {
      id: user.id,
      name: user.fullName
    }})
  };

  basicSignUp = async (req, res) => {
    const { email, fullName, age, gender, password } = req.body;

    // data validation to confirm i have everything
    if (!email || !fullName || !gender || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "missing basic information" });
    }

    // hashpassword

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.model.create({
      email,
      fullName,
      age,
      gender,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      user: {
        id: newUser.id,
        fullName,
      },
    });
  };
}

module.exports = UserController;
