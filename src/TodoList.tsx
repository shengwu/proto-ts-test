import React from 'react';
import { Item } from '../generated/todo'
import ListItem from './ListItem';

const TodoList: React.FC<{ items: Array<Item> }> = ({ items }) => {
  return (
    <div>
      <h1>Things to do:</h1>
      {items.map(item => ( <ListItem item={item} /> ))}
    </div>
  );
};

export default TodoList;
