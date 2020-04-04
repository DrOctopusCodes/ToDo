import React, {Component} from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

class Todos extends Component{



  render(){
    return this.props.todos.map((todo => (
      <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delToDo={this.props.delToDo}/>
    )));
  }
}

//PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delToDo: PropTypes.func.isRequired
}

export default Todos;
