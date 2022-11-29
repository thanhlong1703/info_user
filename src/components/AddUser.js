//
import React from "react";
//
import {
  Button,
  Input,
  Row,
  Col,
  Form,
  Radio,
  Select,
  Checkbox,
  DatePicker,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { schema } from "../comon/Schema";
import { postData } from "../service/postData";
import { optionsHobby } from "../comon/Hobby";
import "./User.css";

function AddUser() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      country: "Viet Nam",
    },
  });

  const onSubmit = (data) => {
    data.dateOfBirth = Date.parse(data.dateOfBirth);
    postData("/users", data);
    reset([]);
  };
  return (
    <div className="main">
      <Row>
        <Col span={10} offset={7}>
          <Form onFinish={handleSubmit(onSubmit)}>
            <div className="email">
              <label>Email</label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} status={errors.email && "error"} />
                )}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            <div className="password">
              <label>Password</label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input.Password
                    type="password"
                    autocomplete="on"
                    {...field}
                  />
                )}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="name">
              <label>Name</label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => <Input {...field} />}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="phone">
              <label>Phone</label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => <Input {...field} />}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="age">
              <label>Age</label>
              <Controller
                control={control}
                name="age"
                render={({ field }) => <Input {...field} />}
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div className="date-input ">
              <label className="space">Date of Birth</label>

              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <DatePicker format={"DD/MM/YYYY"} {...field} />
                )}
              />
            </div>
            <br />
            <div className="gender-radio ">
              <label className="space">Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Radio.Group
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                  >
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                    <Radio value="Other">Other</Radio>
                  </Radio.Group>
                )}
              />
            </div>
            <div className="select-country">
              <label className="space">Country</label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "Viet Nam", label: "Viet Nam" },
                      { value: "England", label: "England" },
                      { value: "Japan", label: "Japan" },
                    ]}
                  />
                )}
              />
            </div>
            <div className="isGraduate">
              <label className="space">Is Graduate</label>
              <Controller
                name="isGraduate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Radio.Group
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                  >
                    <Radio value="Graduated">Graduated</Radio>
                    <Radio value="Ungraduated">Ungraduated</Radio>
                  </Radio.Group>
                )}
              />
            </div>
            <div className="hobby">
              <label className="space">Hobby</label>
              <Controller
                name="hobby"
                control={control}
                render={({ field }) => (
                  <Checkbox.Group
                    options={optionsHobby}
                    defaultValue={["Music"]}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="btn-submit">
              <Button htmlType="submit">Submit</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddUser;
