import { articleListSlice } from "./articleListSlice";

export const { addArticle, deleteArticle, isEditArticle, editArticle, toggleForm, setCurrentList, toggleFormEditing, setIndexForEditing, addComment } = articleListSlice.actions;