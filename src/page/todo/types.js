// @flow

export type Id = number;
export type Text = string;

export type Todo = {
  +id: Id,
  +text: Text,
  +completed: boolean
};

export type Todos = { [key: string]: Todo }; // Array<Todo>;
