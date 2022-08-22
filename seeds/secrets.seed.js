const mongoose = require('mongoose');
const Secret = require('../models/Secret.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/whispererZ";

const secrets = [ 

    { secret: "I have slept with my auntie, then killed her. -lonelywolf123" },

    { secret: "I hate my family, I would kill them all if I had the chance. -littlemanbigdreams" },

    { secret: "Actually, I was going to marry my husbands older brother, but when he died, I didnt want to be single. -ladyStoneheart" },

    { secret: "Im secretly a lesbian. -needlelover" },

    { secret: "I find hurting women more fun than making love to them. -SonofSatan" },

    { secret: "When her mother didnt reciprocate my love, I decided to hit on her daughter. -pimpofWesteros" },

    { secret: "I hid that my sister had given birth to a boy and lied that the baby was my bastard son. Thats why my wife hates me. -northernwarrior" },

    { secret: "I love riding dragons but in reality I am afraid of heights. -mommyDragon" },

    { secret: "All I wanted was to find a rich husband, but eventually I found myself a top executive. -Quuenofthe0North" },

    { secret: "To be honest Im dead inside. -mountainStyle", },
];


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return Secret.create(secrets)
  })
  .then( (secrets) => {
     console.log(`created ${secrets.length} secrets`);
     mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });