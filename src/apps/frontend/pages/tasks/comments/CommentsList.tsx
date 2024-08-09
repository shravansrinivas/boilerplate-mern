import React from 'react';
import { Comment } from '../../../types/comment';
import { ParagraphSmall } from '../../../components';
import CommentsItem from './CommentItem';

interface CommentsListProps {
  comments: Comment[];
  handleDeleteComment: (commentId: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  handleDeleteComment,
}) => {
  const handleEdit = (comment: Comment) => {
    console.log('handleEdit', comment);
  };

  return (
    <div>
      {comments.length === 0 ? (
        <ParagraphSmall>No comments to show yet!</ParagraphSmall>
      ) : (
        comments.map((comment) => (
          <CommentsItem
            handleEditComment={handleEdit}
            handleDeleteComment={handleDeleteComment}
            comment={comment}
          />
        ))
      )}
    </div>
  );
};

export default CommentsList;
