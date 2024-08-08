import { TaskComment } from '../types';

import { TaskCommentDB } from './store/task-comments-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskCommentDB): TaskComment {
    const taskComment = new TaskComment();
    taskComment.id = taskDb._id.toString();

    return taskComment;
  }
}
