import React, { useState, useContext, useEffect, useRef } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Modal,
  Pagination,
  Upload,
  message,
  Input,
  DatePicker
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  UserOutlined
} from "@ant-design/icons";

import moment from 'moment';

import { LoginContext } from "../context/LoginProvider";
import adminApi from "../apis/adminApi";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function About() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const { admin, setAdmin } = useContext(LoginContext);
  const [avatar, setAvatar] = useState(null);
  const [listAdmin, setListAdmin] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  // const [part, setPart] = useState("a");
  const [pencilFill, setPencilFill] = useState(false);
  const refName = useRef(null);
  const refPhone = useRef(null);
  const [dob, setDob] = useState('');


  const fetchAdminList = async () => {
    try {
      await adminApi.getList({ sort: "id,desc", limit: 5, page: current - 1 })
        .then((res) => {
          setListAdmin(res.data.content);
          setTotal(res.data.totalElements);
        })
    } catch (error) {
      console.log("Failed to fetch admin list: ", error);
    }
  };


  useEffect(() => {
    if (admin) {
      setAvatar(admin.image);
      setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: admin.image }]);
      setDob(admin.dob);
      fetchAdminList();
    }
  }, [admin, pencilFill, current]);


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setError(null);
    for (var i = 0; i < newFileList.length; i++) {
      if (newFileList[i].type !== 'image/jpeg' && newFileList[i].type !== 'image/png') {
        newFileList[i].status = 'error';
        setError('Only JPG/PNG file can be uploaded!');
      }
      else { newFileList[i].status = 'done'; setError(null); }
    }
    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <VerticalAlignTopOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload (0/1)
      </div>
    </div>
  );


  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={pencilFill ? "#1890ff" : "gray"}
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      // className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      // className="fill-fill-gray-7"
      ></path>
    </svg>,
  ];

  const data = listAdmin.map((item, index) => {
    return {
      key: index,
      title: item.userName,
      avatar: item.image,
      description: item.email,
    };
  });


  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  const dateFormat = 'YYYY-MM-DD';

  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{5})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    // Return the original phone number if it doesn't match the expected length
    return phoneNumber;
  }

  const HandleDate = (date, string) => {
    setDob(string);
  }

  const fetchAdmin = async () => {
    try {
      await adminApi.getProfile()
        .then((res) => {
          setAdmin(res.data);
        })
    } catch (error) {
      console.log("Failed to fetch admin: ", error);
    }
  };

  const onSubmit = () => {
    if (fileList.length === 0) {
      setError('Please upload your avatar!');
    }
    // console.log(refName?.current.state.value);
    // console.log(refPhone?.current.state.value);
    // console.log(dob);
    // console.log(fileList[0]?.originFileObj);
    const data = {
      id: admin?.id,
      fullName: refName?.current.state.value,
      phone: refPhone?.current.state.value,
      dob: dob,
      image: fileList[0]?.originFileObj,
      status: admin?.status,
    }

    if (data.fullName === '' || data.phone === '' || data.dob === '') {
      message.error('Please fill in all fields!');
      return;
    }
    else {
      adminApi.update(admin?.id, data)
        .then((res) => {
          if (res.status === 200) {
            setPencilFill(!pencilFill);
            fetchAdmin();
            message.success('Update successfully!');
          }
        }).catch((error) => {
          console.log(error);
          message.error('Update failed!');
        })
    }

  }


  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={avatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{admin?.fullName}</h4>
                  <p>{admin?.email}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* <Radio.Group defaultValue="a" onChange={(e) => {setPart(e.target.value); if (e.target.value === 'c') window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });}}>
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">EDIT</Radio.Button>
              </Radio.Group> */}
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            // style={part === 'a' ? { border: "2px solid #1890ff" } : {}}
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link" onClick={() => setPencilFill(!pencilFill)}>{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              {" "}
              This is an official Admin account of Pointify web application. <br />
              <i style={{ color: 'gray' }}>(the below information is from this account)</i>{" "}
            </p>
            <hr className="my-25" />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: '67%' }}>
                {/* <form onSubmit={(e) => {
                  if (fileList.length === 0) {
                    handleEntailmentRequest(e);
                    setError('Please upload your shop avatar!');
                  }
                  else {
    
                    handleEntailmentRequest(e)
                    var list = [];
                    for (var i = 0; i < e.target.length; i++) {
                      list.push(e.target[i].value)
                    }
                    onSubmit(list);
                  }
                }}> */}
                <Descriptions title={
                  <>
                    <UserOutlined style={{ marginRight: 7, marginBottom: 14, color: "gray" }} />
                    <p style={{ display: "inline-block" }}>{admin?.userName}</p>
                  </>}>
                  <Descriptions.Item label="Full Name" span={3}>
                    {pencilFill ? <Input maxLength={50} ref={refName} style={{ width: 300 }} defaultValue={admin?.fullName} /> : admin?.fullName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mobile" span={3}>
                    {pencilFill ? <Input maxLength={1} type="number" ref={refPhone} style={{ width: 300 }} defaultValue={admin?.phone} /> : admin ? formatPhoneNumber(admin.phone) : null}
                    {/* {admin ? formatPhoneNumber(admin.phone) : null} */}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email" span={3}>
                    {admin?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Birth day" span={3}>
                    {pencilFill ? <DatePicker required defaultValue={moment(dob, dateFormat)} onChange={HandleDate} /> : admin?.dob}
                  </Descriptions.Item>
                  <Descriptions.Item label="Social" span={3}>
                    <a href="#pablo" className="mx-5 px-5">
                      {<TwitterOutlined />}
                    </a>
                    <a href="#pablo" className="mx-5 px-5">
                      {<FacebookOutlined style={{ color: "#344e86" }} />}
                    </a>
                    <a href="#pablo" className="mx-5 px-5">
                      {<InstagramOutlined style={{ color: "#e1306c" }} />}
                    </a>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {pencilFill && (
                <div style={{ width: '33%' }}>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>

                  <p style={{ color: "red" }}>{error}</p>
                </div>
              )}
            </div>

            {pencilFill && (
              <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <Button type="primary" size="default" onClick={onSubmit} style={{ width: 100 }} className="mt-25 mr-30">
                  Save
                </Button>
                <Button type="default" size="default" onClick={() => setPencilFill(!pencilFill)} style={{ width: 100 }} className="mt-25">
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            // style={part === 'b' ? { border: "2px solid #1890ff" } : {}}
            bordered={false}
            title={<h6 className="font-semibold m-0">Admin List</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            extra={
              <Pagination simple current={current} total={total} onChange={(e) => setCurrent(e)} />
            }
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              // pagination={{ pageSize: 5, position: ["topRight"]}}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      {/* <Card
        // style={part === 'c' ? { border: "2px solid #1890ff" } : {}}
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Edit account</h6>
            <p>Edit current account information</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.titile}</h5>
                <p>{p.disciption}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <img src={imageURL} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card> */}
    </>
  );
}

export default About;
