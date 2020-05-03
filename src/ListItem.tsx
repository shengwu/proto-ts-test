import React from 'react';

import { Item } from './generated/todo';

const ListItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div>
      <h2>{ item.title }</h2>
      <p>{ item.comment }</p>
      <p>Done? { item.done ? 'Yes' : 'No' }</p>
    </div>
  );
};

export default ListItem;
