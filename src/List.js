import React from "react";
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: localStorage.getItem("tasks")
        ? localStorage.getItem("tasks").split(",")
        : [],
      date: localStorage.getItem("date")
        ? localStorage.getItem("date").split(",")
        : [],
      input: "",
      dateinput: "",
      count: 0,
      restore: []
    };
  }

  componentDidMount() {
    //  localStorage.clear();
    alert("mounted");
    var count = localStorage.getItem("count");
    var tasks = localStorage.getItem("tasks");
    var date = localStorage.getItem("date");

    if (count != null) {
      this.setState({ count: parseInt(count) });
    } else if (tasks != null) {
      this.setState({ tasks: tasks });
    } else if (date != null) {
      this.setState({ date: date });
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("count", this.state.count);
      localStorage.setItem("tasks", this.state.tasks);
      localStorage.setItem("date", this.state.date);
    });
  }

  render() {
    return (
      <div className="center">
        <h1>To Do list</h1>
        <table className="center">
          {this.state.tasks.map((task, i) => (
            <tr className="li" key={i}>
              <td> {task}</td>

              <td>
                <td>
                  {" "}
                  <button
                    className="button"
                    onClick={event => {
                      this.deleteTask(event, i);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className="button"
                    onClick={event => {
                      this.edit(event, i);
                    }}
                  >
                    {" "}
                    Edit{" "}
                  </button>
                </td>
              </td>
              {this.state.date.map((dt, i) => (
                <td>{dt}</td>
              ))}
            </tr>
          ))}
        </table>
        <input
          className="box"
          onKeyPress={this.inputKeyPress}
          onChange={this.handleChange}
          value={this.state.input}
        />
        <input
          className="box"
          onKeyPress={this.inputKeyPress}
          onChange={this.handleChangeDate}
          value={this.state.dateinput}
        />
        <button className="button" onClick={this.addtask}>
          Add task
        </button>
        <button className="button" onClick={this.Update}>
          Update
        </button>
        <button class="button" onClick={this.getdata}>
          {" "}
          Load Data
        </button>
        <h2>Remaining tasks:{this.state.count}</h2>
        <h1>Deleted Tasks</h1>
        {this.state.restore.map((task, i) => (
          <li className="li" key={i}>
            {task} &nbsp;
            <button
              class="button"
              onClick={event => {
                this.Restore(event, i);
              }}
            >
              Restore
            </button>{" "}
            &nbsp;
            <button
              class="button"
              onClick={event => {
                this.DP(event, i);
              }}
            >
              Delete Permanently
            </button>
          </li>
        ))}{" "}
        <br />
      </div>
    );
  }

  getdata = () => {
    fetch(
      "https://raw.githubusercontent.com/gudasaisoumya/TODOList/main/sample.json"
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({ tasks: data });
        //this.setState({ count: count });
        this.cached["tasks"] = { test: "testing" };
        //this.cached["count"] = { test: "testing" };
      });
  };

  edit = (event, i) => {
    this.setState({
      input: this.state.tasks[i],
      index: i
    });
  };
  Update = (event, i) => {
    var n = [...this.state.tasks];
    n[this.state.index] = this.state.input;
    this.setState({
      tasks: n,
      input: ""
    });
  };
  inputKeyPress = event => {
    if (event.key === "Enter") {
      this.setState(state => ({
        tasks: [...state.tasks, state.input],
        input: "",
        count: this.state.count + 1
      }));
    }
  };
  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };
  handleChangeDate = event => {
    this.setState({
      dateinput: event.target.value
    });
  };
  deleteTask = (event, i) => {
    alert("You are deleting the task?");
    var n = [...this.state.tasks];
    this.state.restore = [...this.state.restore, n.splice(i, 1)];

    this.setState(state => ({
      tasks: n,
      count: this.state.count - 1
    }));
    console.log(this.state.restore);
  };

  addtask = () => {
    this.setState(state => ({
      tasks: [...state.tasks, state.input],
      date: [...state.date, state.dateinput],
      dateinput: "",
      input: "",
      count: this.state.count + 1
    }));
  };
  DP = (event, i) => {
    var s = [...this.state.restore];
    s.splice(i, 1);
    this.setState({
      restore: s
    });
  };

  Restore = (event, i) => {
    var r = [...this.state.restore];
    this.state.tasks = [...this.state.tasks, r.splice(i, 1)];
    this.state.restore.splice(i, 1);
    this.setState({
      tasks: this.state.tasks,
      count: this.state.count + 1
    });
  };
}
