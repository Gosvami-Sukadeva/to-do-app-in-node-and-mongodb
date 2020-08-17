const mongo = require('mongodb');
const client = new mongo.MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});

function addNewTodo(todosCollection,title){
    todosCollection.insertOne({
        title,
        done: false,
    },err => {
        if (err){
            console.log('Błąd podczas dodawania!', err)
        }else {
            console.log('Zadanie dodane.')
        }
        client.close();
    })
    
    
}

function showAllTodos(todosCollection){
    todosCollection.find({}).toArray((err, todos)=> {
        if (err){
            console.log('Błąd podczas pobierania!', err)
        }else {
            for(const todo of todos){
                console.log(`- ${todo.title} - ${todo.done ? 'Zakończony' : 'Do zrobienia'}`)
            }
        }
        client.close();
    })
}


function doTheToDo(todosCollection) {
const [command, ...args] = process.argv.splice(2);
switch(command){
    case 'add':
        addNewTodo(todosCollection, args[0]);
        break;
        case 'list':
            showAllTodos(todosCollection);
            break;
}
    // client.close();
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