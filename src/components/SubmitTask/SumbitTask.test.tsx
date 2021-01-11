import SubmitTask from "./SubmitTask";
import { mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Store } from "redux";
import { act } from "react-dom/test-utils";

const mockStore = configureMockStore();

describe("Task", () => {
  let store: Store;
  let component: any;
  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    component = mount(
      <Provider store={store}>
        <SubmitTask />
      </Provider>
    );
  });

  it("is truthy and mounted component is visible", () => {
    expect(SubmitTask).toBeTruthy();
    expect(component).toBeVisible;
  });

  it("to match snapshot", () => {
    expect(component).toMatchSnapshot();
  });

  it("is dispatching create action with correct title", () => {
    act(() => {
      const input = component.find("input").at(0);
      input.props().onChange({
        currentTarget: { value: "Test Title" },
      });
    });
    component.find("button").simulate("click");
    expect(store.dispatch).toHaveBeenCalled;
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CREATE",
        title: "Test Title",
      })
    );
  });
});
