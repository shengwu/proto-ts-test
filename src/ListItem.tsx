import React from 'react';

import { Item } from '../generated/todo';

export const ListItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div>
      <h2>{ item.title }</h2>
      <p>{ item.comment }</p>
      <p>Done? { item.done }</p>
    </div>
  );
};

export default ListItem;
