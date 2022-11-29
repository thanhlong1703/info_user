import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import TableUsers from "./components/Table";
import DetailUser from "./components/DetailUser";

import "./App.css";
import { Menu } from "antd";

function App() {
  const items = [
    { label: <Link to="/list">List</Link>, key: "item-1" },
    { label: <Link to="/create">Create</Link>, key: "item-2" },
  ];
  return (
    <div className="App">
      <Menu items={items} mode="horizontal" />;
      <div className="routes">
        <Routes>
          <Route path="/" element={<TableUsers />} />
          <Route path="/list" element={<TableUsers />} />
          <Route path="/create" element={<AddUser />} />
          <Route path="/users/:userId" element={<DetailUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
