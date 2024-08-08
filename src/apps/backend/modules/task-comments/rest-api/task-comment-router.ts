import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { CommentsController } from './task-comment-controller';

export default class TaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new CommentsController();

    router.use(accessAuthMiddleware);

    router.post('/:taskId', ctrl.createComment);
    router.get('/:taskId', ctrl.getComments);
    router.patch('/:commentId', ctrl.updateComment);
    router.delete('/:commentId', ctrl.deleteComment);
  }
}
