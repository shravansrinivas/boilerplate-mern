import { JsonObject } from './common-types';

export enum CommentOperationType {
  ADD = 'add',
  EDIT = 'edit',
  delete = 'delete',
}
export class Comment {
  id: string;
  message: string;
  task: string;
  updatedAt: Date;
  createdAt: Date;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.message = json.message as string;
    this.updatedAt = json.updatedAt as Date;
    this.createdAt = json.createdAt as Date;
    this.task = json.task as string;
  }
}
