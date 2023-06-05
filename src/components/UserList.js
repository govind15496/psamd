import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card, Modal, Form, Input } from "antd";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (userId) => {
    // Filter out the user with the given userId from the users array
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };
  const handleLike = (userId) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            liked: !user.liked,
          };
        }
        return user;
      });
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Update the user's info
      const updatedUsers = users.map((user) => {
        if (user.id === editingUser.id) {
          return {
            ...user,
            ...values,
          };
        }
        return user;
      });
      setUsers(updatedUsers);
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {loading ? (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      ) : (
        <div className="card-container">
          {users.map((user) => (
            <Card
              key={user.id}
              style={{
                width: 340,
              }}
              cover={
                <img
                  className="card-containerImage"
                  style={{
                    width: "100%",
                    height: "13em",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    backgroundColor: "#f5f5f5",
                  }}
                  src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                  alt={user.username}
                />
              }
              actions={[
                user.liked ? (
                  <HeartFilled
                    style={{ color: "red", fontSize: "20px" }}
                    onClick={() => handleLike(user.id)}
                  />
                ) : (
                  <HeartOutlined
                    style={{
                      color: "red",
                      fontSize: "1.4em",
                    }}
                    onClick={() => handleLike(user.id)}
                  />
                ),
                <EditOutlined
                  style={{ fontSize: "1.4em" }}
                  onClick={() => handleEdit(user)}
                />,
                <DeleteOutlined
                  style={{ fontSize: "1.4em" }}
                  onClick={() => handleDelete(user.id)}
                />,
              ]}
            >
              <div className="info">
                <h2>{user.name}</h2>
                <div className="info__">
                  <MailOutlined
                    style={{ fontSize: "1.3em", paddingRight: "0.5em" }}
                  />
                  <p>{user.email}</p>
                </div>
                <div className="info__">
                  <PhoneOutlined
                    style={{ fontSize: "1.3em", paddingRight: "0.5em" }}
                  />
                  <p>{user.phone}</p>
                </div>
                <div className="info__">
                  <GlobalOutlined
                    style={{ fontSize: "1.3em", paddingRight: "0.5em" }}
                  />
                  <p>{user.website}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserList;
