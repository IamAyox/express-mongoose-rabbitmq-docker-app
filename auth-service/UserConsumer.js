let amqp = require("amqplib");
let User = require('./models/User');


module.exports = async ()=>{
    const conn = await amqp.connect('amqp://localhost');
    let channel = await conn.createChannel();
    await channel.assertExchange('commande');
    const {queue} = channel.assertQueue('commande-user');
    channel.bindQueue('commande-user','commande',"");
    channel.consume(queue,async msg=>{
        let {user} = JSON.parse(msg.content.toString());
        // console.log(data);
        User.updateMany({email: user.email},
            {$inc : {points: +1}}
            ).then(()=>console.log(`points added to ${user.name}`))
            .catch((err)=>console.log(err));
        channel.ack(msg)
    })
}