const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const { UUID } = require('sequelize')
//const router = express.Router()



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

var Player = connection.define('Player',{
        
        name: Sequelize.STRING,
        bio: Sequelize.TEXT
},
{
    tableName: "Player",
    timestamps: false

})
Player.removeAttribute('id')

Player.belongsTo(Team,{ as:'shiva', foreignKey:'UUID'})


app.get('/fetchdata',async function(req, res){
    var ab=await Player.findAll({include:[{model:Team,as:'shiva'}]})
    console.log(Player.findAll({include:[{model:Team,as:'shiva'}]}));
    res.send(ab)
})


app.post('/new',async function(req,res) {
    console.log(req.body);
    await Team.create( {
        name:req.body.name,
        bio:req.body.bio 
       
    }).then(result=>console.log(result))
    res.status(200).send()
})

// connection.sync(
//     {
//     logging: console.log,
//     force: true
// }
// )
// .then(() =>{
//     console.log('connection to database established successfully.');
// })
// .catch(err => {
//     console.log("unable to connect to db",err);
// });

app.listen(4900,()=>{
    console.log("server is running");
})