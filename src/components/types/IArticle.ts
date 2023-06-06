export interface Comments {
  name: string;
  text: string
}
export interface IArticle {
  title: string;
  text: string;
  theme: string;
  author: string;
  date: string;
  id: number;
  comments: Comments[]
}

export interface ArticleState {
  articles: IArticle[];
  isEditingArticle: boolean;
  showFormState: boolean
  formData: IArticle,
  currentList: IArticle[],
  showFormStateEditing: boolean,
  indexForEditing: number
}

export interface IArticleProps extends IArticle {
  index: number;
}
