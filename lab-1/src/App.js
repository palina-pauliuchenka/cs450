import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: ''
    };
  }

  handleInputChange = (event) => {
      console.log(`${event}: was entered.`);
      this.setState({ inputText: event.target.value });
  }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addTodo();
        }
    };

    addTodo = () => {
        const { inputText, todos } = this.state;
        if (inputText.trim()) {
            this.setState({
                todos: [...todos, inputText],
                inputText: ''
            });
        }
    };

    deleteTodo = (index) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter((_, i) => i !== index)
        });
    };

  render() {

      const { todos, inputText } = this.state;

    return (

        <section className={"max-w-xl mx-auto border py-12 my-12 text-center"}>

            <h1 className={"text-2xl font-bold"}>My Majestic ToDo App 📚</h1>

            <div
                className={"w-full flex justify-center flex-col py-4 px-6"}
            >
                <div className={"flex items-center mb-2"}>
                    <input
                        type="text"
                        value={inputText}
                        className={"border border-gray-400 shadow-lg rounded-md mr-2 w-full focus:outline-none focus:border px-1"}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <button
                        onClick={this.addTodo}
                        className={"border border-gray-400 rounded-md px-2 w-40 shadow-lg"}>
                        Add Todos ✅
                    </button>
                </div>

                <ul className={"mt-2"}>
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className={"flex justify-between"}
                        >
                            {todo}
                            <button
                                onClick={() => this.deleteTodo(index)}
                                className={"ml-2"}
                            >🗑️
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );
  }
}

export default App
