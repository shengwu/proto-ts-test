import { TodoServiceClient } from "../generated/todo_pb_service";
import { Item, List } from "../generated/todo_pb";

const client = new TodoServiceClient("https://my.grpc/server");
const list = client.getList({}, (err, list) => {
  console.log(list);
});
