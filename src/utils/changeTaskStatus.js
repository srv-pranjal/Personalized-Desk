export const changeTaskStatus = (userDetails, setUserDetails, currTask) => {
  localStorage.setItem(
    "USER",
    JSON.stringify({
      ...userDetails,
      taskList: userDetails.taskList.map((todo) =>
        currTask.id === todo.id ? currTask : todo
      ),
    })
  );
  setUserDetails((user) => ({
    ...user,
    taskList: user.taskList.map((todo) =>
      currTask.id === todo.id ? currTask : todo
    ),
  }));
};
