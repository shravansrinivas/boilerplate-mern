import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import CommentService from '../services/comment.service';
import { ApiResponse, AsyncError } from '../types';
import { Comment } from '../types/comment';
import useAsync from './async.hook';

type CommentContextType = {
  addComment: (taskId: string, message: string) => Promise<Comment>;
  isAddCommentLoading: boolean;
  addedComment: Comment;
  addCommentError: AsyncError;
  getComments: (taskId: string) => Promise<Comment[]>;
  comments: Comment[];
  isGetCommentsLoading: boolean;
  getCommentsError: AsyncError;
  commentsForTask: Comment[];
  setCommentsForTask: React.Dispatch<React.SetStateAction<Comment[]>>;
  deleteComment: (commentId: string) => Promise<void>;
  deleteCommentError: AsyncError;
  isDeleteCommentLoading: boolean;
};

const CommentContext = createContext<CommentContextType | null>(null);

const commentService = new CommentService();

export const useCommentContext = (): CommentContextType =>
  useContext(CommentContext);

const addCommentFn = async (
  taskId: string,
  message: string,
): Promise<ApiResponse<Comment>> => commentService.addComment(taskId, message);

const deleteCommentFn = async (commentId: string): Promise<ApiResponse<void>> =>
  commentService.deleteComment(commentId);

export const CommentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [commentsForTask, setCommentsForTask] = useState<Comment[]>([]);

  const getCommentsFn = async (
    taskId: string,
  ): Promise<ApiResponse<Comment[]>> => {
    const response = await commentService.getComments(taskId);
    setCommentsForTask(response.data);
    return response;
  };

  const {
    asyncCallback: addComment,
    isLoading: isAddCommentLoading,
    result: addedComment,
    error: addCommentError,
  } = useAsync(addCommentFn);

  const {
    asyncCallback: getComments,
    isLoading: isGetCommentsLoading,
    result: comments,
    error: getCommentsError,
  } = useAsync(getCommentsFn);

  const {
    asyncCallback: deleteComment,
    error: deleteCommentError,
    isLoading: isDeleteCommentLoading,
  } = useAsync(deleteCommentFn);

  return (
    <CommentContext.Provider
      value={{
        addComment,
        isAddCommentLoading,
        addedComment,
        addCommentError,
        getComments,
        comments,
        getCommentsError,
        isGetCommentsLoading,
        setCommentsForTask,
        commentsForTask,
        deleteComment,
        deleteCommentError,
        isDeleteCommentLoading,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
