import { shallow, render, mount, ReactWrapper } from "enzyme";
import { TaskStatus } from "../../common";
import configureMockStore from "redux-mock-store";
import TaskList from "./TaskList";
import { Provider } from "react-redux";
import { Store } from "redux";
import {
  SkipPrevious,
  SkipNext,
  Close,
  MenuOpenTwoTone,
} from "@material-ui/icons";
import { ShallowRenderer } from "react-dom/test-utils";

const mockStore = configureMockStore([]);

describe("Task", () => {
  var store: Store;
  var statusToTaskList: any;
  beforeEach(() => {
    store = mockStore({
      ui: {
        taskStatus: {
          [TaskStatus.ToDo]: [1],
          [TaskStatus.Doing]: [2],
          [TaskStatus.Done]: [3],
        },
      },
      data: {
        tasks: {
          byIds: {
            1: {
              title: "item 1",
            },
            2: {
              title: "item 2",
            },
            3: {
              title: "item 3",
            },
          },
          allIds: [1, 2, 3],
        },
      },
    });
    store.dispatch = jest.fn();
    statusToTaskList = (status: TaskStatus) =>
      mount(
        <Provider store={store}>
          <TaskList status={status} title={"Test Title"} />
        </Provider>
      );
  });
  it("is truthy", () => {
    expect(TaskList).toBeTruthy();
  });

  it("to match snapshot", () => {
    const component = statusToTaskList(TaskStatus.ToDo);
    expect(component).toMatchSnapshot();
  });
});
