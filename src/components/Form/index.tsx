import { IArticle } from "../types/IArticle";
import styles from './form.module.scss'

type FormProps = {
    formData: IArticle;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleAddArticle: (e: React.FormEvent) => void;
  };
  
  export const Form = ({ formData, handleInputChange, handleAddArticle }: FormProps) => {
    return (
    <form onSubmit={handleAddArticle} className={styles.form}>
      <label>
        <div className={styles.block_input}>
          <p>
            Заголовок:
          </p>
          <p>
            <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </p>
        </div>
        </label>
      <br />
      <label>
      <div className={styles.block_input}>
        <p>
          Текст:
        </p>
          <p>
            <textarea name="text" className={styles.text_area} value={formData.text} onChange={handleInputChange}></textarea>
          </p>
        </div>
      </label>
      <br />
      <label>
      <div className={`${styles.block_input}, ${styles.block_theme}`}>
        <p className={styles.theme}>
          Тема:
        </p>
          <p>
            <input className={styles.input} type="text" name="theme" value={formData.theme} onChange={handleInputChange} />
          </p>
        </div>
      </label>
      <br />
      <label>
      <div className={styles.block_input}>
        <p>
          Автор:
        </p>
        <p>
          <input className={styles.input} type="text" name="author" value={formData.author} onChange={handleInputChange} />
        </p>
      </div>
        </label>
      <br />
    </form>
  );
};
