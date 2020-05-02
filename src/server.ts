import grpc from 'grpc';

import { Item, List, google } from '../generated/todo'
import { TodoService } from '../generated/todo_grpc_pb';

// We keep track of the todo list's items in memory, and this is the list of
// items it'll start with each time the server is restarted.
const DEFAULT_LIST_ITEMS: Array<Item> = [
  Item.create({
    title: 'Do homework',
  }),
  Item.create({
    title: 'Wash dishes',
    comment: google.protobuf.StringValue.create({
      value: 'and dry them',
    }),
  }),
  Item.create({
    title: 'Eat breakfast',
    done: true,
  }),
];
const items = DEFAULT_LIST_ITEMS;

// RPC implementations
const getList = (call: any, callback: any) => {
  const list = List.create({ items });
  callback(null, list);
}

const createItem = (call: any, callback: any) => {
  items.push(call.getRequest());
  callback(null, new google.protobuf.Empty);
}

// Start something that will respond to requests
const main = () => {
  var server = new grpc.Server();
  server.addService(TodoService, { getList, createItem });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
};

main();
