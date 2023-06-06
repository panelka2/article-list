import './App.css';
import { ArticleList } from './components/ArticleList/index';
import { AddArticleForm } from './components/AddArticleForm';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { isEditArticle, toggleForm, toggleFormEditing } from './store/reducer/actions';
import { getCurrentList, getIndexForEditing, getIsEditingArticle, getToggleShow } from './store/reducer/selectors';
import { useEffect, useRef } from 'react';

function App() {
  const dispatch = useAppDispatch()
  const popupRef = useRef<HTMLDivElement>(null);
  const editPopupRef = useRef<HTMLDivElement>(null);

  const {showFormState, isEditingArticle, currentList, indexForEditing} = useAppSelector((state) => ({
    showFormState: getToggleShow(state),
    isEditingArticle: getIsEditingArticle(state),
    currentList: getCurrentList(state),
    indexForEditing: getIndexForEditing(state)
  }))
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        toggleFormAction()
      } 
      if (editPopupRef.current && !editPopupRef.current.contains(event.target as Node)) {
        toggleFormActionEditing()
      } 
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFormAction = () => {
    dispatch(toggleForm(!showFormState))
  };

  const toggleFormActionEditing = () => {
    dispatch(toggleFormEditing)
    dispatch(isEditArticle(!isEditingArticle))
  }


  return (
    <div className="App">
      
      {showFormState && (
        <div className='other_block'>
          <div className="popup" ref={popupRef}>
            <div className="popup-content">
              <button className="close-button" onClick={toggleFormAction}>
                Закрыть
              </button>
              <AddArticleForm nameForm="Добавить статью" buttonName="Добавить" />
            </div>
        </div>
        </div>
      )}
       {isEditingArticle && (
        <div className='other_block'>
        <div className="popup" ref={editPopupRef}>
          <div className="popup-content">
            <button className="close-button" onClick={toggleFormActionEditing}>
              Закрыть
            </button>
            <AddArticleForm nameForm="Редактировать статью" buttonName="Сохранить" data={currentList[indexForEditing]}/>
          </div>
        </div>
        </div>

      )
       }
        <ArticleList onButtonClick={toggleFormAction} />
    </div>
  );
}

export default App;
