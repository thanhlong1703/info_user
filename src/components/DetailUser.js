//
import React, { useEffect, useRef, useState } from "react";
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
  Modal,
  DatePicker,
  notification,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//
import { clearUser, getUser } from "../redux/UsersSlice";
import { delData } from "../service/deleteData";
import { schema } from "../comon/Schema";
import { patchData } from "../service/patchData";
import { optionsHobby } from "../comon/Hobby";
import "./User.css";

function DetailUser() {
  const { userId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stopLoading, setstopLoading] = useState(false);

  const navigate = useNavigate();

  const dataUser = useSelector((store) => store.listUser).user;
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, des) => {
    api.info({
      message: Notification,
      description: des,
      placement,
    });
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (dataUser) {
      reset({
        name: dataUser.name,
        address: dataUser.address,
        email: dataUser.email,
        dateOfBirth: moment(
          moment(new Date(dataUser.dateOfBirth)).format("DD/MM/YYYY"),
          "DD/MM/YYYY"
        ),
        isGraduate: dataUser.isGraduate,
        phone: dataUser.phone,
        gender: dataUser.gender,
        hobby: dataUser.hobby,
        age: dataUser.age,
        country: dataUser.country,
      });
    }
  }, [dataUser]);

  useEffect(() => {
    dispatch(clearUser());
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const getDataUser = async () => {
      await dispatch(getUser(`/users/${userId}`));
    };
    getDataUser();
  }, []);
  //Update user
  const dataUpdate = useRef();
  const showUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };
  const handleOkUpdate = async () => {
    setLoading(true);
    await patchData(`/users/${userId}`, dataUpdate.current);
    setTimeout(async () => {
      setIsModalOpen(false);
      openNotification("topRight", "Update User success!!!");
      setTimeout(() => {
        navigate("/list");
      }, 2000);
    }, 1000);
  };
  //Delete user
  const showDeleteModal = () => {
    setIsModalOpen(true);
  };
  const handleDeleteOk = async () => {
    setLoading(true);
    await delData(`/users/${userId}`);
    setTimeout(async () => {
      setIsModalOpen(false);
      openNotification("topRight", "Delete User success!!!");
      setTimeout(() => {
        navigate("/list");
      }, 2000);
    }, 1000);
  };
  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };
  if (loading) {
    setTimeout(() => {
      setstopLoading(true);
    }, 3000);
  }
  const onSubmit = (data) => {
    data.dateOfBirth = Date.parse(data.dateOfBirth);
    dataUpdate.current = data;
  };
  return (
    <div className="main">
      {contextHolder}
      <Row>
        <Col span={10} offset={7}>
          <Form onFinish={handleSubmit(onSubmit)}>
            <div className="email">
              <label>Email</label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    autocomplete="on"
                    {...field}
                    status={errors.email && "error"}
                  />
                )}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            {/* <div className="password">
              <label>Password</label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input.Password autocomplete="on" {...field} />
                )}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div> */}
            <div className="name">
              <label>Name</label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => <Input autocomplete="on" {...field} />}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="phone">
              <label>Phone</label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => <Input autocomplete="on" {...field} />}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="age">
              <label>Age</label>
              <Controller
                control={control}
                name="age"
                render={({ field }) => <Input autocomplete="on" {...field} />}
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div className="date-input ">
              <label className="space">Date of Birth</label>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    type="date"
                    autocomplete="on"
                    {...field}
                  />
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
                    defaultValue={"Viet Nam"}
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
                    defaultValue={["Pear"]}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="btn-submit">
              <Button htmlType="submit" onClick={showUpdateModal}>
                Submit
              </Button>
              <Modal
                title="Confirm"
                open={isUpdateModalOpen}
                onOk={handleOkUpdate}
                onCancel={handleUpdateCancel}
                confirmLoading={loading}
              >
                <p>Do you want update this user?</p>
              </Modal>
              <Button type="primary" onClick={showDeleteModal}>
                Delete
              </Button>
              <Modal
                title="Warning!!"
                open={isModalOpen}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
                confirmLoading={loading}
              >
                <p>Do you want delete this user?</p>
              </Modal>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default DetailUser;
