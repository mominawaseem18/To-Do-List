import React, { useState } from "react";
import styles from "./Todo.module.css";
import Items from "./Items";

const Todo = () => {
  // Task list (FIXED: "tasks" small letter ke sath aur || [] lagaya taakhay khali hone par error na aye)
  const Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [list, setList] = useState(Tasks); // FIXED: Quotes hata diye hain

  // input text
  const [input, setinput] = useState("");

  // event listener
  const handeinputchange = (e) => {
    setinput(e.target.value);
  };

  const addtaskhandler = (e) => {
    e.preventDefault();

    const task = {
      id: Math.floor(Math.random() * 21243124389),
      name: input,
      status: "Pending",
    };

    const prevTasks = list;

    const updatedTasks = [...prevTasks, task];

    setList(updatedTasks);

    setinput("");

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const clearAllhandler = () => {
    setList([]);
    localStorage.removeItem("tasks");
  };

  const markdonehandler = (id) => {
    const updatedList = list.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          status: "Completed",
        };
      }

      return element;
    });

    setList(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  };

  const markdeletehandler = (id) => {
    const updatedList = list.filter((element) => {
      return element.id !== id;
    });

    setList(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputbox}>
        <h1>Make your To-Do List</h1>

        <div>
          <p>Add you items here ✏️</p>

          <form>
            <input
              type="text"
              placeholder="Your Item"
              value={input}
              onChange={handeinputchange}
            />

            <button onClick={addtaskhandler}>Submit</button>
          </form>

          <h3>Your Tasks</h3>

          <ul>
            {list.map((element) => (
              <Items
                key={element.id}
                task={element}
                ondone={markdonehandler}
                ondelete={markdeletehandler}
              />
            ))}
          </ul>

          {list.length !== 0 && (
            <div>
              <div className={styles.clearAllContainer}>
                <button className={styles.clearAll} onClick={clearAllhandler}>
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
