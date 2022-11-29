import { Button } from "antd";
import { Link } from "react-router-dom";

export const Columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 300,
    sorter: (a, b) => a.name.charAt(0) - b.name.charAt(0),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      {
        text: "Male",
        value: "Male",
      },
      {
        text: "Female",
        value: "Female",
      },
      {
        text: "Other",
        value: "Other",
      },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.gender.includes(value),
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "DoB",
    dataIndex: "dateOfBirth",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Country",
    dataIndex: "country",
    width: 500,
  },
  {
    title: "Detail",
    width: 100,
    render: (_, user) => {
      return (
        <Link to={`/users/${user.id}`}>
          <Button>Detail</Button>
        </Link>
      );
    },
  },
];

export const onChangeTable = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
