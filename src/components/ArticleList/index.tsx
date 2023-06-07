import { setCurrentList } from "../../store/reducer/actions";
import { Article } from "../Article";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { getArticles } from "../../store/reducer/selectors";
import styles from "./articleList.module.scss";
import { IArticleListProps } from "../../types/IArticle";
import { useArticleFilters } from "../../hooks/useArticleFilters";

export const ArticleList = ({ onButtonClick }: IArticleListProps) => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => ({
    articles: getArticles(state),
  }));
  const {
    filteredArticles,
    filters,
    uniqueThemes,
    uniqueAuthors,
    uniqueDates,
    handleFilterChange,
    resetFilters,
  } = useArticleFilters();

  useEffect(() => {
    dispatch(setCurrentList(filteredArticles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, articles]);

  const handleClick = (): void => {
    onButtonClick();
  };
  return (
    <div className={styles.main_blocks}>
      <div>
        <div className={styles.header}>
          <div className={styles.filter_block}>
            <label>
              <input
                className={styles.search_input}
                type="text"
                placeholder="Поиск"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </label>
          </div>
          <div className={styles.block_button}>
            <button className={styles.add_button} onClick={handleClick}>
              + Написать
            </button>
          </div>
        </div>
        <div className={styles.bottom_filter_block}>
          <div>
            <label>
              Тема:
              <select
                value={filters.theme}
                onChange={(e) => handleFilterChange("theme", e.target.value)}
              >
                <option value="">Все</option>
                {uniqueThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Автор:
              <select
                value={filters.author}
                onChange={(e) => handleFilterChange("author", e.target.value)}
              >
                <option value="">Все</option>
                {uniqueAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Дата:
              <select
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
              >
                <option value="">Все</option>
                {uniqueDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={resetFilters} className={styles.reset_filter_button}>
            Сбросить фильтр
          </button>
        </div>
      </div>
      <div className={styles.list_block}>
        {filteredArticles.map((el, index) => (
          <Article
            key={el.id}
            title={el.title}
            text={el.text}
            theme={el.theme}
            author={el.author}
            date={el.date}
            id={el.id}
            index={index}
            comments={el.comments}
          />
        ))}
      </div>
    </div>
  );
};
