export interface IComments {
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
  comments: IComments[]
}

export interface IArticleState {
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

export interface AddArticleFormProps {
  nameForm: string;
  buttonName: string;
  data?: IArticle;
}
export interface IArticleListProps {
  onButtonClick: () => void;
}
export interface IFormProps {
  formData: IArticle;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAddArticle: (e: React.FormEvent) => void;
}