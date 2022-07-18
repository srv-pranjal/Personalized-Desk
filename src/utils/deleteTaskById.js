export const deleteTaskById = (userDetails, setUserDetails, currTaskId) => {
  localStorage.setItem(
    "USER",
    JSON.stringify({
      ...userDetails,
      taskList: userDetails.taskList.filter(({ id }) => id !== currTaskId),
    })
  );
  setUserDetails((user) => ({
    ...user,
    taskList: userDetails.taskList.filter(({ id }) => id !== currTaskId),
  }));
};
