import { Schema, Types } from 'mongoose';

export interface TaskCommentDB {
  _id: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  task: Types.ObjectId;
  active: boolean;
  message: string;
  updatedAt: Date;
  createdAt: Date;
}

export const TaskCommentDbSchema: Schema = new Schema<TaskCommentDB>(
  {
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
      index: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
      index: true,
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
      index: true,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'task-comments',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
