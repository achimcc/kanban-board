import { shallow } from "enzyme";
import { TaskStatus } from "../../common";
import configureMockStore from "redux-mock-store";
import Item from "./Task";
import { Provider } from "react-redux";

describe("Task", () => {
  it("is truthy", () => {
    expect(Item).toBeTruthy();
  });
  const mockStore = configureMockStore();
  const storeStateMock = {
    ui: {},
    tasks: {},
  };
  const store = mockStore(storeStateMock);
  const task: ITask = {
    id: 2,
    title: "test item",
    status: TaskStatus.ToDo,
  };
  const wrapper = shallow(
    <Provider store={store}>
      <Item task={task} />
    </Provider>
  );
});
