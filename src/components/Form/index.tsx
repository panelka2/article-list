import { IFormProps } from "../../types/IArticle";
import styles from "./form.module.scss";

export const Form = ({
  formData,
  handleInputChange,
  handleAddArticle,
}: IFormProps) => (
  <form onSubmit={handleAddArticle} className={styles.form}>
    <label>
      <div className={styles.block_input}>
        <p>Заголовок:</p>
        <p>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </p>
      </div>
    </label>
    <br />
    <label>
      <div className={styles.block_input}>
        <p>Текст:</p>
        <p>
          <textarea
            name="text"
            className={styles.text_area}
            value={formData.text}
            onChange={handleInputChange}
          ></textarea>
        </p>
      </div>
    </label>
    <br />
    <label>
      <div className={`${styles.block_input}, ${styles.block_theme}`}>
        <p className={styles.theme}>Тема:</p>
        <p>
          <input
            className={styles.input}
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
          />
        </p>
      </div>
    </label>
    <br />
    <label>
      <div className={styles.block_input}>
        <p>Автор:</p>
        <p>
          <input
            className={styles.input}
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </p>
      </div>
    </label>
    <br />
  </form>
);
