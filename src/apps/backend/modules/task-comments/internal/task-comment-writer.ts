import {
  CreateTaskCommentParams,
  DeleteCommentParams,
  TaskComment,
  TaskCommentNotFoundError,
  UpdateCommentParams,
} from '../types';

import TaskCommentRepository from './store/task-comment-repository';
import TaskCommentReader from './task-comment-reader';
import TaskCommentUtil from './task-comment-util';

export default class TaskCommentWriter {
  public static async createComment(
    params: CreateTaskCommentParams,
  ): Promise<TaskComment> {
    const createdComment = await TaskCommentRepository.create({
      createdBy: params.accountId,
      updatedBy: params.accountId,
      task: params.task,
      message: params.message,
    });
    const commentWithMetaInfo = await TaskCommentReader.getCommentById({
      commentId: createdComment._id.toString(),
    });
    return commentWithMetaInfo;
  }

  public static async updateComment(
    params: UpdateCommentParams,
  ): Promise<TaskComment> {
    const comment = await TaskCommentRepository.findOneAndUpdate(
      {
        _id: params.commentId,
        active: true,
      },
      {
        $set: {
          message: params.message,
          updatedBy: params.accountId,
        },
      },
      { new: true },
    );

    if (!comment) {
      throw new TaskCommentNotFoundError(params.commentId);
    }

    return TaskCommentUtil.convertTaskCommentDBToTaskComment(comment);
  }

  public static async deleteComment(
    params: DeleteCommentParams,
  ): Promise<void> {
    await TaskCommentRepository.findByIdAndUpdate(params.commentId, {
      $set: {
        active: false,
      },
    });
  }
}
