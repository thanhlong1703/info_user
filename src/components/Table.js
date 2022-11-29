import React from "react";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Columns, onChangeTable } from "../comon/Columns";
import { getUsers } from "../redux/UsersSlice";

function TableUsers() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.listUser.listUsers);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getDataUsers = async () => {
      try {
        await dispatch(getUsers("/users"));
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };
    getDataUsers();
  }, []);

  return (
    <Table
      dataSource={data}
      columns={Columns}
      loading={loading}
      onChange={onChangeTable }
    ></Table>
  );
}
export default TableUsers;
