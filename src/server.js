const grpc = require('grpc');
const data_pb = require('./generated/todo_pb');
const service_pb = require('./generated/todo_grpc_pb');
const google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
const google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb");

// We keep track of the todo list's items in memory, and this is the list of
// items it'll start with each time the server is restarted.
const homeworkItem = new data_pb.Item();
homeworkItem.setTitle('Do homework');
const dishesItem = new data_pb.Item();
dishesItem.setTitle('Wash dishes');
const dishesComment = new google_protobuf_wrappers_pb.StringValue();
dishesComment.setValue('and dry them');
const breakfastItem = new data_pb.Item();
breakfastItem.setTitle('Eat breakfast');
breakfastItem.setDone(true);
const DEFAULT_LIST_ITEMS = [
  homeworkItem,
  dishesItem,
  breakfastItem,
];
const items = DEFAULT_LIST_ITEMS;

// RPC implementations
const getList = (call, callback) => {
  const list = new data_pb.List();
  list.setItemsList(items);
  callback(null, list);
}

const createItem = (call, callback) => {
  items.push(call.getRequest());
  callback(null, new google_protobuf_empty_pb.Empty);
}

// Start something that will respond to requests
const main = () => {
  var server = new grpc.Server();
  server.addService(service_pb.TodoService, { getList, createItem });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  console.log('starting server...');
  server.start();
};

main();
