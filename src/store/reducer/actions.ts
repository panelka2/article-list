import {articleListSlice} from "./articleListSlice";

import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IArticle } from "../../components/types/IArticle";

export const useArticleFilters = () => {
  const articles = useAppSelector((state) => state.articleListSlice.articles);
  const [filters, setFilters] = useState({
    search: '',
    theme: '',
    author: '',
    date: '',
  });

  const filteredArticles = articles.filter((article: IArticle) => {
    return (
      (article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.theme.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.theme === '' || article.theme === filters.theme) &&
      (filters.author === '' || article.author === filters.author) &&
      (filters.date === '' || article.date === filters.date)
    );
  });

  const uniqueThemes = Array.from(new Set(articles.map((article: IArticle) => article.theme)));
  const uniqueAuthors = Array.from(new Set(articles.map((article: IArticle) => article.author)));

  const uniqueDates = Array.from(new Set(articles.map((article: IArticle) => article.date)));


  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      theme: '',
      author: '',
      date: '',
    });
  };

  return {
    filteredArticles,
    filters,
    uniqueThemes,
    uniqueAuthors,
    uniqueDates,
    handleFilterChange,
    resetFilters,
  };
};

export const { addArticle, deleteArticle, isEditArticle, editArticle, toggleForm, setCurrentList,toggleFormEditing, setIndexForEditing, addComment } = articleListSlice.actions;