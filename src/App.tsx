import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import SubmitTask from "./components/SubmitTask/SubmitTask";
import { Box, Typography } from "@material-ui/core";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Typography variant="h4" align="center">
          Kanban Board App
        </Typography>
        <Box display="flex">
          <SubmitTask />
        </Box>
        <KanbanBoard />
      </div>
    </Provider>
  );
}

export default App;
