import React from 'react';
import { Comment } from '../../../types/comment';
import {
  ParagraphMedium,
  ParagraphSmall,
  VerticalStackLayout,
} from '../../../components';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div>
      {comments.length === 0 ? (
        <ParagraphSmall>No comments to show yet!</ParagraphSmall>
      ) : (
        comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className="relative rounded-sm border border-stroke bg-white p-4 shadow-default"
            >
              <VerticalStackLayout gap={3}>
                <div>{new Date(comment.updatedAt).toLocaleDateString()}</div>
                <div>
                  <ParagraphMedium>{comment.message}</ParagraphMedium>
                </div>
              </VerticalStackLayout>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentsList;
