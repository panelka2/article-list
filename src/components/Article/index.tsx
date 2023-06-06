import { useState } from 'react';
import { IArticleProps } from "../types/IArticle";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteArticle, isEditArticle, setIndexForEditing } from '../../store/reducer/actions';
import { getIsEditingArticle } from "../../store/reducer/selectors";
import { AddComment } from "../AddComment";
import styles from './article.module.scss';
import editImg from '../../icons/edit.png';
import deleteImg from '../../icons/delete.png';
import messangerImg from '../../icons/messenger.png';

export const Article = ({ id, title, text, theme, author, date, index, comments }: IArticleProps) => {
  const dispatch = useAppDispatch();
  const { isEditingArticle } = useAppSelector((state) => ({
    isEditingArticle: getIsEditingArticle(state),
  }));

  const [showComments, setShowComments] = useState(false);

  const handleEditArticle = () => {
    dispatch(isEditArticle(!isEditingArticle));
    dispatch(setIndexForEditing(index));
  };

  const handleDelete = () => {
    dispatch(deleteArticle(id));
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className={styles.article_block}>
      <div className={styles.article}>
        <span className={styles.author_block}>
          <p className={styles.author}>{author}</p>
          <p className={styles.date}>{date}</p>
        </span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.theme}>{theme}</p>
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.icons}>
        <img
          src={editImg}
          alt="Edit"
          className={styles.editButton}
          onClick={handleEditArticle}
        />
        <img
          src={messangerImg}
          alt="Message"
          className={styles.messageButton}
          onClick={handleToggleComments}
        />
        <img
          src={deleteImg}
          alt="Delete"
          className={styles.deleteButton}
          onClick={handleDelete}
        />
      </div>
      {showComments && (
        <div className={styles.comments}>
          <AddComment index={{ index: index }}/>
          {comments.map((el, i) => (
            <div className={styles.comment_block} key={i}>
              <p className={styles.comment_name}>{el.name}</p>
              <p className={styles.comment_text}>{el.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
