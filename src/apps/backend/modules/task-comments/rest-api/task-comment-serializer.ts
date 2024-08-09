import { TaskComment } from '../types';

export const serializeCommentAsJSON = (comment: TaskComment): unknown => ({
  id: comment.id,
  createdBy: comment.createdBy,
  updatedBy: comment.updatedBy,
  createdAt: comment?.createdAt,
  updatedAt: comment?.updatedAt,
  active: comment.active,
  message: comment.message,
  task: comment.task,
});
