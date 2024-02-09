import { useEffect, useState } from "react";
import Card from "./components/card";
import "./App.css";

export default function App() {
  // const [todoTaskList, setTodoTaskList] = useState([{ title: "Task A" }]);
  // const [inProgressTaskList, setInProgressTaskList] = useState([
  //   { title: "Task B" },
  // ]);
  // const [doneTaskList, setDoneTaskList] = useState([{ title: "Task C" }]);

  const [todoTaskList, setTodoTaskList] = useState([]);
  const [inProgressTaskList, setInProgressTaskList] = useState([]);
  const [doneTaskList, setDoneTaskList] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/tasks", {
      headers: {},
    })
      .then((res) => {
        console.log("RES: ", res);
        if (!res.ok) {
          setError("Cannot get data.");
          return;
        }
        return res.json();
      })
      .then(({ data }) => {
        console.log("DATA:", data);
        setTodoTaskList(data[0]);
        setInProgressTaskList(data[1]);
        setDoneTaskList(data[2]);
      });
  }, []);

  const moveLeft = (event) => {
    let index = event.target.id.split("-")[1];
    if (event.target.id.includes("inProgress")) {
      const clickedTask = inProgressTaskList.splice(index, 1);
      setTodoTaskList([...todoTaskList, clickedTask[0]]);
    }
    if (event.target.id.includes("done")) {
      const clickedTask = doneTaskList.splice(index, 1);
      setInProgressTaskList([...inProgressTaskList, clickedTask[0]]);
    }
  };

  const moveRight = (event) => {
    let index = event.target.id.split("-")[1];
    if (event.target.id.includes("todo")) {
      const clickedTask = todoTaskList.splice(index, 1);
      setInProgressTaskList([...inProgressTaskList, clickedTask[0]]);
    }

    if (event.target.id.includes("inProgress")) {
      const clickedTask = inProgressTaskList.splice(index, 1);
      setDoneTaskList([...doneTaskList, clickedTask[0]]);
    }
  };

  return (
    <main>
      <h2>Kanban Board</h2>
      <div className="mainContainer">
        <div className="cardContainer">
          <h3>ToDo</h3>
          {todoTaskList &&
            todoTaskList.map((todo, index) => (
              <Card
                key={`todo-${index}`}
                id={`todo-${index}`}
                title={todo.title}
                rightClick={(event) => moveRight(event)}
              />
            ))}
        </div>
        <div className="spacer"></div>
        <div className="cardContainer">
          <h3>In Progress</h3>
          {inProgressTaskList &&
            inProgressTaskList.map((inProgress, index) => (
              <Card
                key={`inProgress-${index}`}
                id={`inProgress-${index}`}
                title={inProgress.title}
                leftClick={(event) => moveLeft(event)}
                rightClick={(event) => moveRight(event)}
              />
            ))}
        </div>
        <div className="spacer"></div>
        <div className="cardContainer">
          <h3>Done</h3>
          {doneTaskList &&
            doneTaskList.map((done, index) => (
              <Card
                key={`done-${index}`}
                id={`done-${index}`}
                title={done.title}
                leftClick={(event) => moveLeft(event)}
              />
            ))}
        </div>
      </div>
      {error && <div>{error}</div>}
    </main>
  );
}
