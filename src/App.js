import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/about'
import {v4 as uuid} from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2').then
    (res => this.setState({todos: res.data}))
  }

  //Toggle ToDo
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map( todo =>{
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    }) })

  }

  //Delete ToDo
  delToDo = (id) =>{
    axios.delete('https://jsonplaceholder.typicode.com/todos/$(id)')
    .then(res => this.setState({ todos: [...this.state.todos.filter
      (todo => todo.id !== id)]}))

  }

  //Add ToDo
  addTodo = (title) => {
    // const newTodo = { id: uuid(),title,completed: false }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => {
      res.data.id = uuid();
      this.setState({ todos: [...this.state.todos, res.data] })
    })
    }

  render(){
    return (
    <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <Route exact path="/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <Todos todos={this.state.todos} markComplete={this.markComplete}
              delToDo={this.delToDo}/>
            </React.Fragment>
          )}/>
          <Route path="/about" component={About}/>
        </div>
      </div>
    </Router>
  );
}
}

export default App;
