import { useUserDetails } from "contexts";
import { useState, useEffect, useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { GiCrossedBones } from "react-icons/gi";
import {
  changeTaskStatus,
  deleteAllTasks,
  deleteTaskById,
  isTaskInTaskList,
} from "utils";
import classNames from "classnames";
import "./Todo.css";

export const Todo = () => {
  const [showTodos, setShowTodos] = useState(false);
  const [task, setTask] = useState("");
  const inputRef = useRef();
  const { userDetails, setUserDetails } = useUserDetails();
  const { taskList } = userDetails;

  useEffect(() => {
    showTodos && inputRef.current.focus();
  }, [showTodos]);

  const addNewTaskHandler = (e) => {
    if (e.key === "Enter") {
      if (task.length !== 0 && !isTaskInTaskList(taskList, task)) {
        const newTask = {
          id: Math.floor(Math.random() * Date.now()),
          text: task,
          isCompleted: false,
        };
        localStorage.setItem(
          "USER",
          JSON.stringify({
            ...userDetails,
            taskList: [...userDetails.taskList, newTask],
          })
        );
        setUserDetails((user) => ({
          ...user,
          taskList: [...user.taskList, newTask],
        }));
      }
      setTask("");
    }
  };

  return (
    <>
      <div
        className="todo"
        onClick={() => setShowTodos((showTodos) => !showTodos)}
      >
        TODO
      </div>
      {showTodos && (
        <article className="todo__container">
          <div className="todo__header">
            <p>Today's Tasks</p>
            <AiOutlineDelete
              className="todo__clear"
              onClick={() => deleteAllTasks(userDetails, setUserDetails)}
              title="Delete All Tasks"
            />
          </div>
          <div className="todo__list">
            {taskList.map(({ id, text, isCompleted }) => (
              <label
                className={classNames("todo__task", {
                  todo__completed: isCompleted,
                })}
                key={id}
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) =>
                    changeTaskStatus(userDetails, setUserDetails, {
                      id,
                      text,
                      isCompleted: e.target.checked,
                    })
                  }
                />
                <p>{text}</p>
                <GiCrossedBones
                  className="todo__delete"
                  onClick={() =>
                    deleteTaskById(userDetails, setUserDetails, id)
                  }
                  title="Delete Task"
                />
              </label>
            ))}
          </div>
          <div className="todo__footer">
            <input
              className="todo__input"
              type="text"
              ref={inputRef}
              value={task}
              placeholder="Add a New Task"
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={addNewTaskHandler}
            />
          </div>
        </article>
      )}
    </>
  );
};
