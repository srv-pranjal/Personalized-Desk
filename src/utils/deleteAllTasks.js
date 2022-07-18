export const deleteAllTasks = (userDetails, setUserDetails) => {
  localStorage.setItem(
    "USER",
    JSON.stringify({
      ...userDetails,
      taskList: [],
    })
  );
  setUserDetails((user) => ({
    ...user,
    taskList: [],
  }));
};
