import React from 'react';
import { Comment } from '../../../types/comment';
import {
  Badge,
  Button,
  HorizontalStackLayout,
  MenuItem,
  ParagraphMedium,
  ParagraphSmall,
  VerticalStackLayout,
} from '../../../components';
import { ButtonKind, ButtonSize } from '../../../types/button';

interface CommentsListProps {
    comments: Comment[];
    handleDeleteComment: (commentId: string) => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, handleDeleteComment }) => {
  const handleEdit = (comment: Comment) => {
    console.log('handleEdit', comment);
  };

  return (
    <div>
      {comments.length === 0 ? (
        <ParagraphSmall>No comments to show yet!</ParagraphSmall>
      ) : (
        comments.map((comment) => {
          const createdByUser = JSON.parse(
            comment.createdBy.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'),
          );
          return (
            <div
              key={comment.id}
              className="relative rounded-sm border border-stroke bg-white p-4 shadow-default"
            >
              <VerticalStackLayout gap={3}>
                <ParagraphSmall>
                  <HorizontalStackLayout gap={2}>
                    <div>
                      {`${createdByUser.firstName} ${createdByUser.lastName}`} on {new Date(comment.updatedAt).toDateString()} commented
                    </div>
                  </HorizontalStackLayout>
                </ParagraphSmall>
                <div>
                  <ParagraphMedium>{comment.message}</ParagraphMedium>
                </div>
                <div>
                  {comment.updatedAt !== comment.createdAt ? (
                    <Badge>Edited</Badge>
                  ) : null}
                </div>
              </VerticalStackLayout>
              <div className="absolute right-4 top-4">
                <MenuItem>
                  <Button
                    onClick={() => handleEdit(comment)}
                    kind={ButtonKind.SECONDARY}
                    size={ButtonSize.DEFAULT}
                    startEnhancer={
                      <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteComment(comment.id)}
                    kind={ButtonKind.SECONDARY}
                    size={ButtonSize.COMPACT}
                    startEnhancer={
                      <img src="assets/svg/delete-icon.svg" alt="Delete task" />
                    }
                  >
                    Delete
                  </Button>
                </MenuItem>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CommentsList;
