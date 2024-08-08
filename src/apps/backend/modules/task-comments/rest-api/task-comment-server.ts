import { ApplicationServer } from '../../application';

import TaskRouter from './task-comment-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/comments', router.router);
  }
}
