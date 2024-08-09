import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentService from '../task-comment-service';
import {
  CreateTaskCommentParams,
  DeleteCommentParams,
  GetCommentsForTaskParams,
  TaskComment,
  UpdateCommentParams,
} from '../types';

import { serializeCommentAsJSON } from './task-comment-serializer';

export class CommentsController {
  createComment = applicationController(
    async (req: Request<CreateTaskCommentParams>, res: Response) => {
      const comment: TaskComment = await CommentService.createComment({
        accountId: req.accountId,
        message: req.body.message,
        task: req.params.taskId,
      });

      const taskJSON = serializeCommentAsJSON(comment);

      res.status(HttpStatusCodes.CREATED).send(taskJSON);
    },
  );

  deleteComment = applicationController(
    async (req: Request<DeleteCommentParams>, res: Response) => {
      await CommentService.deleteComment({
        commentId: req.params.commentId,
      });

      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );

  getComments = applicationController(
    async (req: Request<GetCommentsForTaskParams>, res: Response) => {
      const comments = await CommentService.getCommentsForTask({
        taskId: req.params.taskId,
      });
      const commentsJSON = comments.map(serializeCommentAsJSON);
      res.status(HttpStatusCodes.OK).send(commentsJSON);
    },
  );

  updateComment = applicationController(
    async (req: Request<UpdateCommentParams>, res: Response) => {
      const updatedTask: TaskComment = await CommentService.updateComment({
        accountId: req.accountId,
        message: req.body.message,
        commentId: req.params.commentId,
      });
      const taskJSON = serializeCommentAsJSON(updatedTask);

      res.status(HttpStatusCodes.OK).send(taskJSON);
    },
  );
}
