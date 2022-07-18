export const isTaskInTaskList = (taskList, task) =>
  taskList.find(({ text }) => text === task) ? true : false;
