import {
  getCommentByIdParams,
  GetCommentsForTaskParams,
  TaskComment,
  TaskCommentNotFoundError,
} from '../types';

import TaskRepository from './store/task-comment-repository';
import TaskCommentUtil from './task-comment-util';

export default class TaskCommentReader {
  public static async getCommentsForTask(
    params: GetCommentsForTaskParams,
  ): Promise<TaskComment[]> {
    const taskDb = await TaskRepository.find({
      task: params.taskId,
      active: true,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: 'createdBy updatedBy',
        select: 'firstName lastName -_id',
      });
    return taskDb.map(TaskCommentUtil.convertTaskCommentDBToTaskComment);
  }
  public static async getCommentById(
    params: getCommentByIdParams,
  ): Promise<TaskComment> {
    const commentDb = await TaskRepository.findOne({
      _id: params.commentId,
      active: true,
    }).populate({
      path: 'createdBy updatedBy',
      select: 'firstName lastName -_id',
    });
    if (!commentDb) {
      throw new TaskCommentNotFoundError(params.commentId);
    }
    return TaskCommentUtil.convertTaskCommentDBToTaskComment(commentDb);
  }
}
