import React, { useState, useEffect } from 'react';
import { addArticle, isEditArticle, toggleForm, editArticle } from '../../store/reducer/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IArticle } from '../types/IArticle';
import { Form } from '../Form';
import { getIndexForEditing, getIsEditingArticle, getToggleShow, getArticles } from '../../store/reducer/selectors';
import styles from './add_article_form.module.scss'

export const AddArticleForm = ({ nameForm, buttonName, data }: { nameForm: string; buttonName: string; data?: IArticle }) => {
  const dispatch = useAppDispatch();
  const { showFormState, isEditingArticle, indexForEditing, articles } = useAppSelector((state) => ({
    showFormState: getToggleShow(state),
    isEditingArticle: getIsEditingArticle(state),
    indexForEditing: getIndexForEditing(state),
    articles: getArticles(state)
  }))

  const [formData, setFormData] = useState<IArticle>({
    title: '',
    text: '',
    theme: '',
    author: '',
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    comments: []
  });

  useEffect(() => {
    if (data && isEditingArticle) {
      setFormData({
        title: data.title || '',
        text: data.text || '',
        theme: data.theme || '',
        author: data.author || '',
        id: typeof data.id === 'string' ? parseInt(data.id) : data.id || 0,
        date: data.date || new Date().toLocaleDateString(),
        comments: data.comments || []
      });
    }
  }, [data, isEditingArticle, indexForEditing, articles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddArticle = (e: React.FormEvent) => {

      e.preventDefault();

      if (
        formData.title.trim() === '' ||
        formData.text.trim() === '' ||
        formData.theme.trim() === '' ||
        formData.author.trim() === ''
      ) {
        return;
      }

      const newArticle: IArticle = {
        ...formData,
        id: Date.now(),
      };
      if(!isEditingArticle) {
        dispatch(addArticle(newArticle))
        dispatch(toggleForm(!showFormState))
      } else {
        dispatch(editArticle(formData))
        dispatch(isEditArticle(!isEditingArticle))
      }
      setFormData({
        title: '',
        text: '',
        theme: '',
        author: '',
        id: 0,
        date: new Date().toLocaleDateString(),
        comments: []
      });
    
  };

  return (
    <div className={styles.block_add_article}>
      <h2 className={styles.head_text}>{nameForm}</h2>
      <Form
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddArticle={handleAddArticle}
      />
      <div>
        <button
          type="submit"
          onClick={handleAddArticle}
          disabled={
            formData.title.trim() === '' ||
            formData.text.trim() === '' ||
            formData.theme.trim() === '' ||
            formData.author.trim() === ''
          }
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};
