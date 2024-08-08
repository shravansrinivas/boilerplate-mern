import { TaskComment } from '../types';

export const serializeCommentAsJSON = (comment: TaskComment): unknown => ({
  id:    comment.id,
  createdBy:  comment.createdBy,
  updatedBy:  comment.updatedBy,
  active:  comment.active,
  message:  comment.message,
  task:  comment.task,
});
