const amqp = require("amqplib");

module.exports = async (user, products) => {
	const connection = await amqp.connect("amqp://127.0.0.1:5672");

	const channel = await connection.createChannel();

	await channel.assertExchange("commande");

	const msg = JSON.stringify({
		user,
		products
	});

	channel.publish("commande", "", Buffer.from(msg));
}