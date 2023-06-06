import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleState, Comments, IArticle } from '../../components/types/IArticle';

const initialState: ArticleState = {
  articles: [
      {
        title: "Заголовок заголовок рыба",
        text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.",
        theme: "Тема 1",
        author: "Витя Сергеев",
        date: "04-06-2022",
        id: 1,
        comments: [
          {name: 'Вася',text: 'Класс!'},
          {name: 'Мария',text: 'ОГО!'}
        ]
      },
      {
        title: "Заголовок 2",
        text: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.",
        theme: "Тема 2",
        author: "Автор 2",
        date: "03-04-2023",
        id: 2,
        comments: [
          {name: 'Анатолий', text: 'Ну такое'},
          {name: 'Григорий', text: 'Ля)'}
        ]
      },
    ],
  formData: {
    title: '',
    text: '',
    theme: '',
    author: '',
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    comments: []
  },
  isEditingArticle: false,
  showFormState: false,
  currentList: [],
  showFormStateEditing: false,
  indexForEditing: 0
  }

export const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<IArticle>) => {
      state.articles.push(action.payload);
    },
    deleteArticle: (state, action: PayloadAction<number>) => {
      state.articles = state.articles.filter((article: IArticle) => article.id !== action.payload);
    },
    isEditArticle: (state, action: PayloadAction<boolean>) => {
      state.isEditingArticle = !state.isEditingArticle;
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      state.showFormState = !state.showFormState
    },
    toggleFormEditing: (state, action: PayloadAction<boolean>) => {
      state.showFormStateEditing = !state.showFormStateEditing
    },
    setCurrentList: (state, action: PayloadAction<IArticle[]>) => {
      state.currentList = action.payload;
    },
    setIndexForEditing: (state, action: PayloadAction<number>) => {
      state.indexForEditing = action.payload
    },
    editArticle: (state, action: PayloadAction<IArticle>) => {
      state.currentList[state.indexForEditing] = action.payload;
      const id = state.currentList[state.indexForEditing].id;
      const index = state.articles.findIndex((el) => el.id === id);
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },
    addComment: (state, action: PayloadAction<Comments>) => {
      const id = state.currentList[state.indexForEditing].id;
      const index = state.articles.findIndex((el) => el.id === id);
      if (index !== -1) {
        state.articles[index].comments.push(action.payload)
      }
    }
  },
});



export default articleListSlice.reducer;
