const mongo = require('mongodb');
const client = new mongo.MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});

function doTheToDo(todosCollection) {
const [command, ...args] = process.argv.splice(2);
console.log(command, args)
    client.close();
}

client.connect(err => {
    if(err) {
        console.log('Błąd połaczenia!', err)
    }else {
        console.log('Połaczenie udane!')

        const db = client.db('test');
        const todosCollection = db.collection('todos')

        doTheToDo(todosCollection)
     
        // client.close();
    }
})