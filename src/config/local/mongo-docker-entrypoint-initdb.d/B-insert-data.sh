#!/bin/sh

# Usage: drop a array json name with the collection name that you would like
# to create inside your datadir.

# datadir="$(dirname $0)/data" # Replace for development usage
datadir='/docker-entrypoint-initdb.d/data'
userauth='developer'
userpassword='password'

writeInfo() { # message
	echo "INFO: $@" >&2
}

writeFatal() { # message
	echo "FATAL ERROR: $@" >&2
	exit 1
}

getCollectionNameFromFilename() {
	basename $(echo $1 | sed 's/.json$//')
}

insertData () { # collection ./dir/to/data.json authuser authpassword
	writeInfo "Inserting data on $1 from $2"
	mongoimport --jsonArray -c $1 -d ${MONGO_INITDB_DATABASE} -u $3 -p $4 $2
	if [ $? -eq 0 ]; then
		writeInfo "Data from $2 inserted to $1 succesfully!"
	else
		writeFatal "Data from $2 could not be inserted."
	fi
}

for data in $(ls ${datadir}/*json)
do
	collection=$(getCollectionNameFromFilename $data)
	insertData $collection $data $userauth $userpassword
done
