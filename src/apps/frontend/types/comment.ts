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
  createdBy: string;
  updatedBy: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.message = json.message as string;
    this.createdBy = json.createdBy as string;
    this.updatedBy = json.updatedBy as string;
    this.updatedAt = json.updatedAt as Date;
    this.createdAt = json.createdAt as Date;
    this.task = json.task as string;
  }
}
