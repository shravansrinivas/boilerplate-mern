import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class TaskComment {
  id: string;
  createdBy: string;
  updatedBy: string;
  active: boolean;
  message: string;
  task: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GetCommentsForTaskParams = {
  taskId: string;
};
export type getCommentByIdParams = {
  commentId: string;
};

export type CreateTaskCommentParams = {
  accountId: string;
  task: string;
  message: string;
};

export type UpdateCommentParams = {
  commentId: string;
  message: string;
  accountId: string;
};

export type DeleteCommentParams = {
  commentId: string;
};

export enum TaskCommentErrorCode {
  NOT_FOUND = 'TASK_COMMENT_ERR_01',
}

export class TaskCommentNotFoundError extends ApplicationError {
  code: TaskCommentErrorCode;

  constructor(taskId: string) {
    super(`Comment with taskId ${taskId} not found.`);
    this.code = TaskCommentErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
