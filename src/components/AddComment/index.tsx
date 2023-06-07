import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { addComment, setIndexForEditing } from "../../store/reducer/actions";
import styles from "./addComment.module.scss";

export const AddComment = ({ index }: { index: number }) => {
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState({
    name: "",
    text: "",
  });

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setComment({
      ...comment,
      text: e.target.value,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setComment({
      ...comment,
      name: e.target.value,
    });
  };

  const handleSubmitComment = (): void => {
    if (!comment.name || !comment.text) {
      return;
    }

    setComment({
      name: "",
      text: "",
    });
    dispatch(setIndexForEditing(index));
    dispatch(addComment(comment));
  };

  const isButtonDisabled = !comment.name || !comment.text;

  return (
    <div>
      <div className={styles.input_block}>
        <input
          className={styles.name_input}
          type="text"
          value={comment.name}
          onChange={handleNameChange}
          placeholder="Ваше имя"
        />
      </div>
      <div className={styles.area_block}>
        <textarea
          value={comment.text}
          onChange={handleCommentChange}
          placeholder="Ваш комментарий"
        />
        <div className={styles.leave_comment}>
          <button onClick={handleSubmitComment} disabled={isButtonDisabled}>
            Отправить комментарий
          </button>
        </div>
      </div>
    </div>
  );
};
