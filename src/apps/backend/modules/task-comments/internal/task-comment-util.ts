import { TaskComment } from '../types';

import { TaskCommentDB } from './store/task-comments-db';

export default class TaskUtil {
  public static convertTaskCommentDBToTaskComment(
    taskDb: TaskCommentDB,
  ): TaskComment {
    const taskComment = new TaskComment();
    taskComment.id = taskDb._id.toString();
    taskComment.active = taskDb.active;
    taskComment.createdBy = taskDb.createdBy.toString();
    taskComment.updatedBy = taskDb.updatedBy.toString();
    taskComment.createdAt = taskDb.createdAt;
    taskComment.updatedAt = taskDb.updatedAt;
    taskComment.task = taskDb.task.toString();
    taskComment.message = taskDb.message;

    return taskComment;
  }
}
