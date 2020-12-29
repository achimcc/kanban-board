import { shallow, render, mount, ReactWrapper } from "enzyme";
import { TaskStatus } from "../../common";
import configureMockStore from "redux-mock-store";
import Task from "./Task";
import { Provider } from "react-redux";
import { Store } from "redux";
import { SkipPrevious, SkipNext, Close } from "@material-ui/icons";
import { ShallowRenderer } from "react-dom/test-utils";

const mockStore = configureMockStore([]);

describe("Task", () => {
  var store: Store;
  var componentFromTask: any;
  beforeEach(() => {
    store = mockStore({
      ui: {},
      tasks: {},
    });
    store.dispatch = jest.fn();
    componentFromTask = (task: ITask) =>
      mount(
        <Provider store={store}>
          <Task task={task} />
        </Provider>
      );
  });
  it("is truthy", () => {
    expect(Task).toBeTruthy();
  });

  it("to match snapshot", () => {
    const task: ITask = {
      id: 2,
      title: "test item",
      status: TaskStatus.Done,
    };
    const component = componentFromTask(task);
    expect(component).toMatchSnapshot();
  });

  it("can move left", () => {
    const task: ITask = {
      id: 2,
      title: "test item",
      status: TaskStatus.Done,
    };
    const component = componentFromTask(task);
    component.find(SkipPrevious).simulate("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_STATUS",
      id: 2,
      status: TaskStatus.Doing,
    });
  });
  it("can be deleted", () => {
    const task: ITask = {
      id: 2,
      title: "test item",
      status: TaskStatus.Done,
    };
    const component = componentFromTask(task);
    expect(component).toMatchSnapshot();
    component.find(Close).simulate("click");
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "DELETE",
      id: 2,
    });
  });
});
