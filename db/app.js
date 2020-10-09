const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const { UUID } = require('sequelize')




const app = express()
app.use(bodyParser.json())

const connection = new Sequelize('school', 'root','14022619',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

var Team = connection.define('Team',{
    
        uuid:{ 
            type:Sequelize.STRING,
            primaryKey:true
        },
        name: Sequelize.STRING,
        text: Sequelize.TEXT
},
{
    tableName: "Team",
    timestamps: false

})
Team.associate = function (models) {


    Team.hasOne(models.Player);
}


var Player = connection.define('Player',{
        
        name: Sequelize.STRING,
        bio: Sequelize.TEXT,
        UUID:{
            type:Sequelize.STRING,
            foreignKey:UUID}
},
{
    tableName: "Player",
    timestamps: false

})
Player.removeAttribute('id')
 Player.associate = function (models) {


    Player.belongsTo(models.Team,{ as:'shiva', foreignKey:'UUID'})
 };

  app.post("/addData", async (req, res, next) => {
    try {     
      const header = await Team.create({
          uuid:req.body.uuid,
          name : req.body.name,
          text : req.body.text}).then(Player.create({name:req.body.name,bio:req.body.bio,UUID:req.body.uuid}) )
      res.json(header);
    } catch (error) {
      console.log(error)
      res.status(500)    
            }
  });


app.listen(4500,()=>{
    console.log("server is running");
})