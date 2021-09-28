import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
    state = {
        viewCompleted: false,
        activeItem: {
            title: "",
            description: "",
            completed: false
        },
        todoList: []
    };

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/todos/")
            .then((res) => this.setState({ todoList: res.data }))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = item => {
        this.toggle();
        if (item.id) {
            axios
                .put(`/api/todos/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
        }
        axios
            .post("/api/todos/", item)
            .then((res) => this.refreshList());
    };

    createItem = () => {
        const item = {
            title: "",
            description: "",
            completed: false
        };
        this.setState({
            activeItem: item,
            modal: !this.state.modal
        });
    };

    displayCompleted = status => {
        if (status) {
            return this.setState({ viewCompleted: true });
        }
        return this.setState({ viewCompleted: false });
    };

    editItem = (item) => {
        this.setState({
            activeItem: item,
            modal: !this.state.modal
        });
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/todos/${item.id}/`)
            .then((res) => this.refreshList());
    };

    renderTabList = () => {
        return (
            <div className="nav nav-tabs my-5">
                <button
                    className={
                        this.state.viewCompleted ? "nav-link active" : "nav-link"
                    }
                    onClick={() => this.displayCompleted(true)}
                >
                    Complete
                </button>
                <button
                    className={
                        this.state.viewCompleted ? "nav-link" : "nav-link active"
                    }
                    onClick={() => this.displayCompleted(false)}
                >
                    Incomplete
                </button>
            </div>
        );
    };

    renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.todoList.filter(
            item => item.completed === viewCompleted
        );
        return newItems.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.description}>
                    {item.title}
                </span>
                <span>
                    <button
                        className="btn btn-secondary mr-2"
                        onClick={() => this.editItem(item)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(item)}>
                        <i className="fa fa-remove"></i>
                    </button>
                </span>
            </li>
        ));
    };

    render() {
        return (
            <main className="container">
                <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-success">Add Task</button>
                            </div>

                            {this.renderTabList()}

                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        )
    }
}

export default App;
