import { Task } from '../types';

export const serializeTaskAsJSON = (task: Task): unknown => ({
  id: task.id,
  account: task.account,
  description: task.description,
  title: task.title,
  sharedWith: task.sharedWith,
  commentsCount: task?.commentsCount || 0 ,
});
