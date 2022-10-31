import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  // React State
  // 필드명을 반드시 state 으로 해야 한다.
  state = {
    todoData: [
      {
        id: 1,
        title: "공부하기",
        completed: true,
      },
      {
        id: 2,
        title: "청소하기",
        completed: false,
      },
    ],
    value: "",
  };

  handleClick = (id) => {
    const newTodoData = this.state.todoData.filter((todo) => todo.id !== id);
    // 클래스 컴포넌트 상태 변경은?
    // -> React State
    this.setState({ todoData: newTodoData });
  };

  handleChange = (e) => {
    // e.target.value에 사용자가 입력한 값이 저장되어 있다.
    console.log("e", e.target.value);
    this.setState({ value: e.target.value });
  };

  handleSubmit = () => {
    const newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    };

    this.setState({ value: "", todoData: [...this.state.todoData, newTodo] });
  };

    handleCompleteChange = (todoId) => {
        const newTodoData = this.state.todoData.map((todo) => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        this.setState({todoData: newTodoData});
    }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h3 className="text-2xl pt-10 mb-10 font-bold">PANSY TODO</h3>
          <div className="todo-container bg-gray-100 pb-5 rounded-md shadow-lg shadow-blue-100">
            <header className="todo-header bg-blue-500 text-white rounded-md">
              <div>
                <input type="checkbox"></input>
              </div>
              <div>오늘의 할 일</div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  this.setState({ todoData: [] });
                }}
              >
                Delete All
              </div>
            </header>

            {this.state.todoData.map((todo) => (
              <div
                key={todo.id}
                className="todo bg-blue-400 text-white rounded-md font-medium"
              >
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={() => this.handleCompleteChange(todo.id)}
                  ></input>
                </div>
                {/* 데이터를 참조하려면 중괄호{}로 감싸줘야 한다. */}
                <div style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.title}</div>
                <div
                  className="cursor-pointer"
                  onClick={() => this.handleClick(todo.id)}
                >
                  Delete
                </div>
              </div>
            ))}
          </div>

          {/* 입력 창 */}
          <div className="input-box text-left">
            <p className="mb-2 mt-16">
              <label htmlFor="todo-input" className="font-semibold text-base">
                오늘의 할 일
              </label>
            </p>
            <input
              type="text"
              className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-400 focus:ring-sky-400 focus:ring-1 sm:text-sm"
              placeholder="해야 할 일을 입력해주세요..."
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </div>

          <button
            type="button"
            className="rounded-full mt-5 bg-blue-400 hover:bg-blue-500 text-slate-50"
            onClick={this.handleSubmit}
          >
            등록
          </button>
        </div>
      </div>
    );
  }
}
