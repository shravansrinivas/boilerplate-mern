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

interface CommentsItemProps {
  comment: Comment;
  handleDeleteComment: (commentId: string) => void;
  handleEditComment: (comment: Comment) => void;
}

const CommentsItem: React.FC<CommentsItemProps> = ({
  comment,
  handleDeleteComment,
  handleEditComment,
}) => {
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
              {`${createdByUser.firstName} ${createdByUser.lastName}`} on{' '}
              {new Date(comment.updatedAt).toDateString()} commented
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
            onClick={() => handleEditComment(comment)}
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
};

export default CommentsItem;
