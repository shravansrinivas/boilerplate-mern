import { ApplicationRepository } from '../../../application';

import { TaskCommentDB, TaskCommentDbSchema } from './task-comments-db';

const TaskRepository = ApplicationRepository<TaskCommentDB>(
  'TaskComment',
  TaskCommentDbSchema,
);

export default TaskRepository;
