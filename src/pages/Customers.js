import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Modal,
    message,
    Select,
    Button,
    Avatar,
    Typography,
    Input,
    Tag
} from "antd";

import { ToTopOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import customerApi from "../apis/customerApi";
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
    const [open, setOpen] = useState(false);
    const [listCustomers, setListCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("id,asc");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(5);
    const [filter, setFilter] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [name, setName] = useState(searchParams.get('partner'));
    const [defaultFilter, setDefaultFilter] = useState(searchParams.get('partner'));
    const [details, setDetails] = useState(null);
    // const name = searchParams.get('partner');

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            await customerApi.getAll({
                search: search,
                partner: filterValue,
                sort: sort,
                page: page - 1,
                limit: limit
            })
                .then((res) => {
                    console.log(res.data);
                    setLoading(false);
                    setListCustomers(res.data.content);
                    setTotal(res.data.totalElements);
                })
        } catch (error) {
            console.log(error);
            setLoading(false);
            setListCustomers(null);
            setTotal(0);
        }
    };

    const fetchFilter = async () => {
        try {
            await partnerApi.getAll({ sort: "id,asc", limit: 1000 })
                .then((res) => {
                    const data = res.data.content;
                    setFilter(data);
                    if (name) {
                        const value = data.find((item) => item.fullName === name);
                        // console.log(value);
                        setFilterValue(value.id);
                        // setDefaultFilter(name);
                        setName(null);
                    }
                })
        } catch (error) {
            console.log(error);
            setFilter([]);
        }
    }

    useEffect(() => {
        fetchCustomers();
        fetchFilter();
    }, [search, sort, page, limit, filterValue]);


    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber.length === 10) {
            return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else if (phoneNumber.length === 11) {
            return phoneNumber.replace(/(\d{5})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        // Return the original phone number if it doesn't match the expected length
        return phoneNumber;
    }

    const showModal = (id) => {
        setOpen(true);
        customerApi.getDetails(id)
            .then((res) => {
                setDetails(res.data);
            }).catch((err) => {
                console.log(err);
            })
    };

    const data = listCustomers?.map((customer) => {
        return {
            key: customer.id,
            name: (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={customer?.image || face}
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
                        <p>{customer.phone && formatPhoneNumber(customer.phone)}</p>
                    </div>
                </>
            ),

            status: (
                <>
                    {/* <Button type="primary" className="tag-primary">
                        {customer.state ? "ACTIVE" : "INACTIVE"}
                    </Button> */}
                    <Tag color={customer.state ? "green" : "red"}>{customer.state ? "ACTIVE" : "INACTIVE"}</Tag>
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
                    <Button style={{ marginRight: 20 }} onClick={() => showModal(customer.id)} type="link">View Details</Button>
                </>
            ),
        }
    })

    const onSearch = (value) => setSearch(value);

    const onChange = (e) => {
        console.log(`radio checked:${e.target.value}`)
        setSort(e.target.value);
    };

    const options = [];
    for (let i of filter) {
        options.push({
            id: i.id,
            label: i.fullName,
            value: i.fullName,
        });
    }

    const handleChange = (...props) => {
        // console.log(props);
        const ids = props[1].map((obj) => obj.id);
        const format = ids !== null ? ids.join(',') : null;
        // console.log(filterValue);
        // console.log(format);
        setFilterValue(format);
    };

    const handleCancel = () => {
        setOpen(false);
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
                                    <div style={{ marginRight: 35, width: 500 }}>
                                        <Select
                                            maxTagCount='responsive'
                                            defaultValue={defaultFilter ? [defaultFilter] : undefined}
                                            size="large"
                                            bordered={false}
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="click here to select partner(s)..."
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </div>
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
                                    pagination={{ position: ["bottomCenter"], pageSize: limit, current: page, total: total, showSizeChanger: true, pageSizeOptions: ["5", "10", "20", "50"] }}
                                    onChange={(pagination) => { setPage(pagination.current); setLimit(pagination.pageSize); }}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>


                    </Col>
                </Row>
            </div>

            <Modal
                title={
                    <h2 style={{ color: "gray", fontWeight: "bold" }}>Customers Details</h2>
                }
                visible={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
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
                                width: 180,
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
                            <p>{details?.customer?.fullName}</p>
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
                                width: 180,
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
                            <p>{details?.customer?.email}</p>
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
                                width: 180,
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
                            <p>{details?.customer?.phone ? formatPhoneNumber(details?.customer?.phone) : ""}</p>
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
                                width: 180,
                                marginRight: 30,
                                color: "gray",
                                fontSize: 18,
                                textAlign: "right",
                                marginRight: 30,
                                marginLeft: 10,
                            }}>
                            <p>From Partner :</p>
                        </div>
                        <div style={{ fontSize: 18 }}>
                            <p>{details?.customer?.partnerName}</p>
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
                                width: 180,
                                marginRight: 30,
                                color: "gray",
                                fontSize: 18,
                                textAlign: "right",
                                marginRight: 30,
                                marginLeft: 10,
                            }}>
                            <p>Number of MemberShip :</p>
                        </div>
                        <div style={{ fontSize: 18 }}>
                            <p>{details?.membershipList?.length || 0}</p>
                        </div>
                    </div>
                </>
            </Modal>
        </>
    );
}

export default Customers;
