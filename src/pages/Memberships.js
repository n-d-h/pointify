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
  Modal
} from "antd";

import { ToTopOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import memberApi from "../apis/memberApi";


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
    title: "PROGRAM",
    dataIndex: "program",
    key: "program",
    width: "32%",
  },
  {
    title: "CUSTOMER",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "TOTAL",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "DATECREATED",
    key: "datecreated",
    dataIndex: "datecreated",
  },
  {
    title: "STATE",
    key: "state",
    dataIndex: "state",
  },
  {
    title: "",
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

function MemberShips() {
  const [listMembers, setListMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("dateCreated,asc");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);  
  const [visible, setVisible] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      await memberApi.getAll({ search: search, sort: sort, page: page - 1 })
        .then((res) => {
          console.log(res.data);
          setListMembers(res.data.content);
          setTotal(res.data.totalElements);
          setLoading(false);
        })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [search, sort, page]);

  const data = listMembers.map((member) => {
    return {
      key: member.id,
      program: (
        <>
          <Title level={5}>{member.programName}</Title>
        </>
      ),
      customer: (
        <>
          <div className="author-info">
            <Title level={5}>{member.customerName}</Title>
            <p>{member.level}</p>
          </div>
        </>
      ),

      total: (
        <>
          <div className="author-info">
            <span>Receipt: <p style={{ color: "#06a806", display: "inline-block" }}>{member.totalReceipt}</p></span>
            <br />
            <span>Expenditure: <p style={{ color: "red", display: "inline-block" }}>{member.totalExpenditure}</p></span>
          </div>
        </>
      ),
      datecreated: (
        <>
          <span>{member.dateCreated}</span>
        </>
      ),
      state: (
        <>
          <Tag color={member.state ? "blue" : "red"}>{member.state ? "ACTIVE" : "INACTIVE"}</Tag>
        </>
      ),
      detail: (
        <>
          <Button style={{ marginRight: 20 }} type="link">View Customers</Button>
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
              title="Memberships Table"
              extra={
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: 30 }}>
                    <Radio.Group onChange={onChange} defaultValue="dateCreated,asc">
                      {/* <Radio.Button value="id,asc">All</Radio.Button> */}
                      <Radio.Button value="dateCreated,asc">Oldest</Radio.Button>
                      <Radio.Button value="dateCreated,desc">Latest</Radio.Button>
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
                  loading={loading}
                  pagination={{ position: ["bottomCenter"], pageSize: 10, current: page, total: total }}
                  onChange={(pagination) => setPage(pagination.current)}
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
    </>
  );
}

export default MemberShips;
