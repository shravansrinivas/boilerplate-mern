import React, { useState } from 'react';
import TextArea from '../../../components/input/text-area';
import {
  Button,
  HorizontalStackLayout,
  VerticalStackLayout,
} from '../../../components';
import { ButtonKind, ButtonSize } from '../../../types/button';

import toast from 'react-hot-toast';
import { AsyncError } from '../../../types';
import { useCommentContext } from '../../../contexts';
import CommentsList from './CommentsList';

interface CommentSectionProps {
  taskId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ taskId }) => {
  const [commentMessage, setCommentMessage] = useState('');
  const [showComments, setShowComments] = useState(false);
  const handleCommentChange = (event) => {
    setCommentMessage(event.target.value);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const onSuccess = () => {
    toast.success('Your comment has been added successfully');
    setCommentMessage('');
  };
  const {
    addComment,
    isAddCommentLoading,
    setCommentsForTask,
    commentsForTask,
    getComments,
    deleteComment,
  } = useCommentContext();

  const fetchComments = () => {
    getComments(taskId).catch((error) => onError(error as AsyncError));
  };
  // useEffect(() => {
  //   getComments(taskId).catch((error) => onError(error as AsyncError));
  // }, []);

  const handleCommentAddition = (taskId: string, message: string) => {
    addComment(taskId, message)
      .then((newComment) => {
        setCommentsForTask([newComment, ...commentsForTask]);
        onSuccess();
      })
      .catch((error) => {
        onError(error as AsyncError);
      });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId)
      .then(() => {
        setCommentsForTask(
          commentsForTask.filter((comment) => comment.id !== commentId),
        );
        toast.success('Comment deleted successfully!');
      })
      .catch((error) => onError(error as AsyncError));
  };
  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  return (
    <VerticalStackLayout gap={3}>
      <HorizontalStackLayout gap={3}>
        <div>
          <TextArea
            cols={30}
            disabled={false}
            error=""
            name="comment-message"
            onChange={handleCommentChange}
            placeholder="Enter comment"
            rows={2}
            value={commentMessage}
          />
        </div>
        <VerticalStackLayout gap={1}>
          <div>
            <Button
              onClick={() => handleCommentAddition(taskId, commentMessage)}
              kind={ButtonKind.PRIMARY}
              size={ButtonSize.MINI}
              disabled={!commentMessage}
              startEnhancer={
                <img src="assets/svg/plus-icon.svg" alt="Add Comment" />
              }
              isLoading={isAddCommentLoading}
            >
              Add Comment
            </Button>
          </div>
          <div>
            <Button
              size={ButtonSize.MINI}
              kind={ButtonKind.SECONDARY}
              onClick={toggleComments}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
          </div>
        </VerticalStackLayout>
      </HorizontalStackLayout>
      {showComments ? (
        <CommentsList
          handleDeleteComment={handleDeleteComment}
          comments={commentsForTask}
        />
      ) : null}
    </VerticalStackLayout>
  );
};

export default CommentSection;
