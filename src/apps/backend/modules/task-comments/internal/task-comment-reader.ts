import { GetCommentsForTaskParams, TaskComment } from '../types';

import TaskRepository from './store/task-comment-repository';
import TaskCommentUtil from './task-comment-util';

export default class TaskReader {
  public static async getCommentsForTask(
    params: GetCommentsForTaskParams,
  ): Promise<TaskComment[]> {
    const taskDb = await TaskRepository.find({
      task: params.taskId,
      active: true,
    })
      .sort({ createdAt: -1 })
      .populate({ path: "createdBy updatedBy", select: "firstName lastName -_id" });
    return taskDb.map(TaskCommentUtil.convertTaskCommentDBToTaskComment);
  } 
}
