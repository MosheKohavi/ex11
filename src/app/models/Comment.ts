import {IUser} from "./User";

export interface IComment {
  id: number,
  parentCommentId: number | null,
  ownerId: number,
  txt: string,
  createdAt: string,
  deletedAt: string | null,
}

export interface IAppComment extends IComment {
  subComments?: IAppComment[];
  user?: IUser;
}

export type CommentsObj = {
  [key: number]: IAppComment;
}
