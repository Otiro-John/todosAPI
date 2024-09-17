//creating the todo list api
//creating the server
const express = require('express');
const app = express();
const PORT = 3000;

//middleware to parse json bodies
app.use(express.json());


//defining todos routes
//the data structure for todos
let todos =  [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build a to-do API', completed: false }
  ];

  //getting the requests
  app.get('/todos', (req, res)=>{
res.json(todos);
  });

  //getting a single todo by id
  //Add a route that returns a specific to-do based on the id parameter
  app.get('/todos:id', (req, res)=>{
        //making the id to be an integer
        const todoId = parseInt(req.params.id);
        //the find method returns the value of the first element in an array that satisfies the provided testing function
        const todo = todos.find(t => t.id === todoId);
      //checking if the conditions are true if not then an error message will be added
        if (todo) {
          res.json(todo);
        } else {
          res.status(404).json({ error: 'To-do not found' });
        }
  });

  //creating a new todo

  app.get('/todos', (req, res)=>{
  const {title} = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: todos.length + 1,  // Auto-increment ID
    title: title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
  });


  //Update a To-do: Add a PUT route to update the title or completed status of a to-do

  app.get('/todos', (req, res)=>{
    const todoId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todo = todos.find(t => t.id === todoId);
  
    if (todo) {
      if (title) todo.title = title;
      if (completed !== undefined) todo.completed = completed;
      res.json(todo);
    } else {
      res.status(404).json({ error: 'To-do not found' });
    }
  });

  //Delete a To-do: Add a DELETE route to remove a to-do by id:

  app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);
  
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      res.json({ message: 'To-do deleted' });
    } else {
      res.status(404).json({ error: 'To-do not found' });
    }
  });
  

  //starting the server
  app.listen(PORT, () =>{
    console.log(`Server running on  http://localhost:${PORT}`);
});