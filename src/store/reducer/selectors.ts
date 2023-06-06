import { RootState } from '../store';
import {createSelector} from '@reduxjs/toolkit'

const getListItems = (state:RootState) => {
    return state.articleListSlice
}

export const getArticles = createSelector(getListItems, ({
    articles
}) => articles)

export const getToggleShow = createSelector(getListItems, ({
    showFormState
}) => showFormState)

export const getFormData = createSelector(getListItems,({
    formData
}) => formData)

export const getCurrentList = createSelector(getListItems, ({
    currentList
}) => currentList)

export const getIsEditingArticle = createSelector(getListItems, ({
    isEditingArticle
}) => isEditingArticle)

export const getIndexForEditing = createSelector(getListItems, ({
    indexForEditing
}) => indexForEditing)
