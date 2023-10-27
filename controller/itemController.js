const BaseController = require("./baseController");
const axios = require("axios");

class ItemController extends BaseController {
  constructor({pool, tblName}) {
    super({pool, tblName});
  }

  test = (req, res) => {
    return res.send("I am in my Items Controller");
  };

  pokemon = async (req, res) => {
    console.log(req.params)
    const { name } = req.params;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const pokeData = await axios.get(url);
    console.log("I GOT THE DATA!");

    return res.json({ data: pokeData.data });
  };
}

module.exports = ItemController;
