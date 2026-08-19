import React from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./Items.module.css";

const Item = ({ task, ondone, ondelete }) => {
  return (
    <li className={styles.Item}>
      {task.status === "Pending" ? <p>{task.name}</p> : <del>{task.name}</del>}

      <div>
        <button
          className={styles.donebtn}
          onClick={() => {
            ondone(task.id);
          }}
          style={{ color: "#006400" }}
        >
          ✓
        </button>

        <button
          className={styles.deletebtn}
          onClick={() => {
            ondelete(task.id);
          }}
          style={{ color: "red" }}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default Item;
