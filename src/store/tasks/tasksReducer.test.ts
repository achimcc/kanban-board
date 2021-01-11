import { TaskStatus } from "../../common";
import tasksReducer from "./tasksReducer";

describe("tasksReducer", () => {
  it("returns default state", () => {
    expect(tasksReducer(undefined, { type: "DELETE", id: 1 })).toMatchObject({
      tasks: { allIds: [2, 3] },
    });
    expect(
      tasksReducer(undefined, { type: "DELETE", id: 1 })
    ).not.toMatchObject({
      tasks: { byIds: { 1: {} } },
    });
    expect(tasksReducer(undefined, { type: "DELETE", id: 1 })).toMatchObject({
      tasks: { byIds: { 2: {} } },
    });
    expect(
      tasksReducer(undefined, { type: "CREATE", id: 10, title: "Test Task" })
    ).toMatchObject({
      tasks: { byIds: { 10: { title: "Test Task" } } },
    });
  });
});
