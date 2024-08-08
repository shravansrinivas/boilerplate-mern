import TaskReader from './internal/task-comment-reader';
import TaskWriter from './internal/task-comment-writer';
import {
  CreateTaskCommentParams,
  DeleteCommentParams,
  GetCommentsForTaskParams,
  TaskComment,
  UpdateCommentParams,
} from './types';

export default class TaskService {
  public static async createComment(params: CreateTaskCommentParams): Promise<TaskComment> {
    return TaskWriter.createComment(params);
  }

  public static async deleteComment(params: DeleteCommentParams): Promise<void> {
    return TaskWriter.deleteComment(params);
  }

  public static async updateComment(params: UpdateCommentParams): Promise<TaskComment> {
    return TaskWriter.updateComment(params);
  }

  public static async getCommentsForTask(params: GetCommentsForTaskParams): Promise<TaskComment[]> {
    return TaskReader.getCommentsForTask(params);
  }
}
