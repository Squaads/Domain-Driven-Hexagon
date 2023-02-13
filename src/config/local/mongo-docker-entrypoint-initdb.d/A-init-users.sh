#!/bin/sh

writeInfo() { # message
	echo "INFO: $@" >&2
}

writeFatal() { # message
	echo "FATAL ERROR: $@" >&2
	exit 1
}

createMongoUser() { # username password
	writeInfo "Creating user $1..."
	echo " 
	use ${MONGO_INITDB_DATABASE};
	db.createUser({
	user: \"$1\",
	pwd: \"$2\",
	roles: [{ role: 'readWrite', db: \"${MONGO_INITDB_DATABASE}\" }]
	});
	exit
	" | mongosh
	if [ $? -eq 0 ]; then
		writeInfo "User $1 created succesfully!"
	else
		writeFatal "User $1 could not be created."
	fi
}

createMongoUser 'developer' 'password'
