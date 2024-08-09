import { ApiError, ApiResponse } from '../types';
import { Comment } from '../types/comment';
import { JsonObject } from '../types/common-types';
import { getAccessTokenFromStorage } from '../utils/storage-util';
import APIService from './api.service';

export default class CommentService extends APIService {
  addComment = async (
    taskId: string,
    message: string,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.post(
        `/comments/${taskId}`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(
        new Comment(response.data as JsonObject),
        undefined,
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getComments = async (taskId: string): Promise<ApiResponse<Comment[]>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.get(`/comments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      const comments: Comment[] = (response.data as JsonObject[]).map(
        (commentData) => new Comment(commentData),
      );
      return new ApiResponse(comments, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  deleteComment = async (commentId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      await this.apiClient.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };
}
