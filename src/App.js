import React from "react";
import MainContent from "./component/MainContent";
import Sidenav from "./component/Sidenav";

const App = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidenav/>
      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <MainContent/>
      </div>
    </div>
  );
};

export default App;
