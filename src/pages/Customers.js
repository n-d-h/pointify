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
    Tag
} from "antd";

import { ToTopOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import customerApi from "../apis/customerApi";


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
        title: "CUSTOMER",
        dataIndex: "name",
        key: "name",
        width: "32%",
    },
    {
        title: "CONTACT",
        dataIndex: "contact",
        key: "contact",
    },

    {
        title: "STATE",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "PARTNER",
        key: "partner",
        dataIndex: "partner",
    },
    {
        title: "",
        key: "detail",
        dataIndex: "detail",
        width: "18%",
    }
];


function Customers() {
    const [listCustomers, setListCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("id,asc");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            await customerApi.getAll({ search: search, sort: sort, page: page - 1 })
                .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    setListCustomers(res.data.content);
                    setTotal(res.data.totalElements);
                })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [search, sort, page]);

    const data = listCustomers.map((customer) => {
        return {
            key: customer.id,
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={face3}
                        ></Avatar>
                        <div className="avatar-info">
                            <Title level={5}>{customer.fullName}</Title>
                            <p>{customer.dob}</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            contact: (
                <>
                    <div className="author-info">
                        <Title level={5}>{customer.email}</Title>
                        <p>{customer.phone}</p>
                    </div>
                </>
            ),

            status: (
                <>
                    {/* <Button type="primary" className="tag-primary">
                        {customer.state ? "ACTIVE" : "INACTIVE"}
                    </Button> */}
                    <Tag color={customer.state ? "blue" : "red"}>{customer.state ? "ACTIVE" : "INACTIVE"}</Tag>
                    {/* <span>{partner.state}</span> */}
                </>
            ),
            partner: (
                <>
                    <span>{customer.partnerName}</span>
                </>
            ),
            detail: (
                <>
                    <Button style={{ marginRight: 20 }} type="link">View MemberShips</Button>
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
                            title="Customers Table"
                            extra={
                                <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: 30 }}>
                                        <Radio.Group onChange={onChange} defaultValue="id,asc">
                                            {/* <Radio.Button value="id,asc">All</Radio.Button> */}
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
                                    loading={loading}
                                    pagination={{ position: ["bottomCenter"], pageSize: 10, current: page, total: total }}
                                    onChange={(pagination) => setPage(pagination.current)}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>


                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Customers;
