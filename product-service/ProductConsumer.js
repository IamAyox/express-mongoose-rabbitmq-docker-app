let amqp = require("amqplib");
let Product = require('./models/Product');


module.exports = async ()=>{
    const conn = await amqp.connect('amqp://localhost');
    let channel = await conn.createChannel();
    await channel.assertExchange('commande');
    const {queue} = channel.assertQueue('commande-product');
    channel.bindQueue('commande-product','commande',"");
    channel.consume(queue,async msg=>{
        let {products} = JSON.parse(msg.content.toString());
        console.log(products);
        Product.updateMany({_id:{$in : products}},
            {$inc : {quantity: -1}}
            ).then(()=>console.log('quantity reduced'))
            .catch((err)=>console.log(err));
        channel.ack(msg)
    })
}
// module.exports = async amqp.connect("amqp://localhost",(error,connection)=>{
//     if(error) console.log('error')
//     else{
//         let channel = await connection.createChannel((error,channel)=>{
//             if(error) throw error;
//             let queue = 'hello1';
//             var msg = process.argv.slice(2).join(' ') || "Hello ...!";
//             channel.assertQueue(queue,{durable:true});
//             channel.sendToQueue(queue,Buffer.from(msg),{persistent:true});
//             console.log(`[x] sent ${msg}`)
//         });
//         setTimeout(()=>{
//             connection.close();
//             process.exit(0);
//         },1000)
//     }
// })