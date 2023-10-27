const BaseController = require("./baseController");

class UserController extends BaseController {
  constructor({pool, tblName}) {
    super({pool, tblName});
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

//   getAll = (req, res) => {
//     const sqlQuery = "SELECT * FROM users;";
//     this.pool.query(sqlQuery, (err, results) => {
//       if (err) {
//         console.log("There has been an error!");
//         return res.json({ success: false, msg: err });
//       }
//       const data = results.rows;

//       return res.json({ success: true, data });
//     });
//   };
}

module.exports = UserController;
