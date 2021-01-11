import { TaskStatus } from "../../common";
import uiReducer from "./uiReducer";

describe("tasksReducer", () => {
  it("returns default state", () => {
    expect(uiReducer(undefined, { type: "DELETE", id: 1 })).toMatchObject({
      taskStatus: { [TaskStatus.ToDo]: [] },
    });
    expect(uiReducer(undefined, { type: "DELETE", id: 1 })).not.toMatchObject({
      taskStatus: { [TaskStatus.ToDo]: [1] },
    });
    expect(uiReducer(undefined, { type: "DELETE", id: 1 })).toMatchObject({
      taskStatus: {},
    });
    expect(
      uiReducer(undefined, { type: "CREATE", id: 10, title: "Test Task" })
    ).toMatchObject({
      taskStatus: { [TaskStatus.ToDo]: [1, 10] },
    });
    expect(
      uiReducer(undefined, {
        type: "SET_STATUS",
        id: 1,
        status: TaskStatus.Doing,
      })
    ).toMatchObject({
      taskStatus: {
        [TaskStatus.ToDo]: expect.not.arrayContaining([1]),
        [TaskStatus.Doing]: expect.arrayContaining([1]),
      },
    });
  });
});
