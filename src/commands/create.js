module.exports = async (message, args, db) => {
	try {
		console.log(message);
		db.find({
			user: message.author.tag,
		}, function(err, docs) {
			if(!docs.length > 0) {
				db.insert({ user: message.author.tag,
					gold: 0,
					silver: 0,
					bronce: 0,
					iron: 0,
					hp: 0,
				});
			}
			console.log(docs);
		});
	}
	catch (e) {
		throw e;
	}
};