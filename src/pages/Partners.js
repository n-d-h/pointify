import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Input,
  Tag,
  Modal,
  message as popMessage,
} from "antd";

import { ToTopOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import partnerApi from "../apis/partnerApi";


// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";

const { Title } = Typography;
const { Search } = Input;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "PARTNER",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "FUNCTION",
    dataIndex: "function",
    key: "function",
  },

  {
    title: "STATE",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "PHONE",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "ACTION",
    key: "detail",
    dataIndex: "detail",
    width: "18%",
  }
];

const project = [
  {
    title: "COMPANIES",
    dataIndex: "name",
    width: "32%",
  },
  {
    title: "BUDGET",
    dataIndex: "age",
  },
  {
    title: "STATUS",
    dataIndex: "address",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
  },
];
const dataproject = [
  {
    key: "1",

    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava1} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Spotify Version</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$14,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={30} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava2} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Progress Track</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$3,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={10} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "3",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava3} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Jira Platform Errors</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">Not Set</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">done</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={100} size="small" format={() => "done"} />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "4",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}> Launch new Mobile App</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$20,600</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress
            percent={50}
            size="small"
            status="exception"
            format={() => "50%"}
          />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "5",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava5} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Web Dev</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$4,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">working</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={80} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },

  {
    key: "6",
    name: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" src={ava6} size={25} alt="" />
          <div className="avatar-info">
            <Title level={5}>Redesign Online Store</Title>
          </div>
        </Avatar.Group>
      </>
    ),
    age: (
      <>
        <div className="semibold">$2,000</div>
      </>
    ),
    address: (
      <>
        <div className="text-sm">canceled</div>
      </>
    ),
    completion: (
      <>
        <div className="ant-progress-project">
          <Progress percent={0} size="small" />
          <span>
            <Link to="/">
              <img src={pencil} alt="" />
            </Link>
          </span>
        </div>
      </>
    ),
  },
];

function Partners() {
  const [listPartners, setListPartners] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id,asc");
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [delId, setDelId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      await partnerApi.getAll({ search: search, sort: sort, page: page - 1 })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setListPartners(res.data.content);
          setTotal(res.data.totalElements);
        })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [search, sort, page]);

  const showModal = (id) => {
    setLoadModal(true);
    setOpen(true);
    console.log("partner id", id);
    partnerApi.get(id)
      .then((res) => {
        console.log(res.data.partner.userName);
        setDetails(res.data);
        setLoadModal(false);
      }).catch((err) => {
        console.log(err);
      });

  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    setOpenDelete(false);
  };


  const showModalDel = (id) => {
    setOpenDelete(true);
    setDelId(id);
    // console.log("partner id", id);
  };

  const handleDel = () => {
    console.log("partner id", delId);
    setConfirmLoading(true);
    partnerApi.delete(delId)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          popMessage.success("Delete success");
          setConfirmLoading(false);
          setDelId(null);
          setOpenDelete(false);
          fetchPartners();
        }
      }
      ).catch((err) => {
        console.log(err);
      }
      );
  };

  const data = listPartners.map((partner) => {
    return {
      key: partner.id,
      name: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={partner.image}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>{partner.userName}</Title>
              <p>{partner.fullName}</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>{partner.code}</Title>
            <p>{partner.email}</p>
          </div>
        </>
      ),

      status: (
        <>
          <Tag color={partner.state ? "blue" : "red"}>{partner.state ? "ACTIVE" : "INACTIVE"}</Tag>
        </>
      ),
      phone: (
        <>
          <span>{partner.phone}</span>
        </>
      ),
      detail: (
        <>
          <u style={{ marginRight: 100, color: "#1890ff", cursor: "pointer" }} onClick={() => showModal(partner.id)}>View</u>
          <DeleteTwoTone twoToneColor="#eb2f96" onClick={() => showModalDel(partner.id)} />
        </>
      ),
    }
  })

  const onSearch = (value) => setSearch(value);

  const onChange = (e) => {
    console.log(`radio checked:${e.target.value}`)
    setSort(e.target.value);
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Partners Table"
              extra={
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: 30 }}>
                    <Radio.Group onChange={onChange} defaultValue="id,asc">
                      <Radio.Button value="id,asc">Oldest</Radio.Button>
                      <Radio.Button value="id,desc">Latest</Radio.Button>
                    </Radio.Group>
                  </div>

                  <div style={{ marginRight: 20 }}>
                    <Search
                      placeholder="input search text"
                      allowClear
                      enterButton="Search"
                      size="default"
                      onSearch={onSearch}
                    />
                  </div>
                </div>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{ position: ["bottomCenter"], pageSize: 10, current: page, total: total }}
                  onChange={(pagination) => setPage(pagination.current)}
                  loading={loading}
                  className="ant-border-space"
                />
              </div>
            </Card>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Customers Table"
              extra={
                <>
                  {/* <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="online">ONLINE</Radio.Button>
                    <Radio.Button value="store">STORES</Radio.Button>
                  </Radio.Group> */}
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={project}
                  dataSource={dataproject}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div className="uploadfile pb-15 shadow-none">
                <Upload {...formProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title={
          <>
            <DeleteTwoTone twoToneColor="#eb2f96" />
            {"  Delete Partner"}
          </>
        }
        visible={openDelete}
        onOk={handleDel}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this partner?</p>
      </Modal>

      <Modal
        title={
          <h2 style={{ color: "gray", fontWeight: "bold" }}>Partner Details</h2>
        }
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
        loading={loadModal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          (details?.numOfCustomers > 0 && (
            <Button key="customer" type="primary" onClick={handleOk}>
              View Customers
            </Button>
          )),
          (details?.programList?.length > 0 && (
            <Button key="program" type="primary" onClick={handleOk}>
              View Programs
            </Button>
          )),
        ]}
      >
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>User Name :</p>
              {/* <p>Full Name :</p>
            <p>Code :</p>
            <p>Phone :</p>
            <p>Email :</p>
            <p>Customers :</p>
            <p>Programs :</p>
            <p>Address :</p> */}
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.userName}</p>
              {/* <p>{details?.partner?.fullName}</p>
            <p>{details?.partner?.code}</p>
            <p>{details?.partner?.phone}</p>
            <p>{details?.partner?.email}</p>
            <p>{details?.partner?.address}</p>
            <p>{details?.numOfCustomers}</p>
            <p>{details?.programList && details.programList.length || 0}</p> */}
            </div>

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Full Name :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.fullName}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Code :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.code}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Phone :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.phone}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Email :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.email}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "flex-start",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p style={{ width: 80 }}>Address :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.address}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Customers :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.numOfCustomers}</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 80,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Programs :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.programList && details.programList.length || 0}</p>
            </div>
          </div>

        </>
      </Modal>
    </>
  );
}

export default Partners;
