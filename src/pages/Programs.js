import {
  Row,
  Col,
  Card,
  Tag,
  Button,
  Pagination,
  Descriptions,
  Avatar,
  Badge,
  Checkbox,
  Input,
  Select,
  Modal
} from "antd";

import { useDebounce } from "use-debounce";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import programApi from "../apis/programApi";
import partnerApi from "../apis/partnerApi";
import ProgramDetail from "./ProgramDetail";

import { PlusOutlined, ExclamationOutlined } from "@ant-design/icons";
import mastercard from "../assets/images/mastercard-logo.png";
import paypal from "../assets/images/paypal-logo-2.png";
import visa from "../assets/images/visa-logo.png";

function Programs() {
  const data = [
    {
      title: "March, 01, 2021",
      description: "#MS-415646",
      amount: "$180",
    },
    {
      title: "February, 12, 2021",
      description: "#RV-126749",
      amount: "$250",
    },
    {
      title: "April, 05, 2020",
      description: "#FB-212562",
      amount: "$550",
    },
    {
      title: "June, 25, 2019",
      description: "#QW-103578",
      amount: "$400",
    },
    {
      title: "March, 03, 2019",
      description: "#AR-803481",
      amount: "$700",
    },
  ];

  const wifi = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 22.5 20.625"
      key={0}
    >
      <g id="wifi" transform="translate(0.75 0.75)">
        <circle
          id="Oval"
          cx="1.5"
          cy="1.5"
          r="1.5"
          transform="translate(9 16.875)"
          fill="#fff"
        ></circle>
        <path
          id="Path"
          d="M0,1.36a6.377,6.377,0,0,1,7.5,0"
          transform="translate(6.75 11.86)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path-2"
          data-name="Path"
          d="M14.138,2.216A12.381,12.381,0,0,0,0,2.216"
          transform="translate(3.431 6)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path-3"
          data-name="Path"
          d="M0,3.294a18.384,18.384,0,0,1,21,0"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
      </g>
    </svg>,
  ];

  const angle = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      key={0}
    >
      <g id="bank" transform="translate(0.75 0.75)">
        <path
          id="Shape"
          transform="translate(0.707 9.543)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path"
          d="M10.25,0,20.5,9.19H0Z"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path-2"
          data-name="Path"
          d="M0,.707H20.5"
          transform="translate(0 19.793)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
      </g>
    </svg>,
  ];

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="#1890ff"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      // className="ant-btn-primary"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      // className="ant-btn-primary"
      ></path>
    </svg>,
  ];
  const download = [
    <svg
      width="15"
      height="15"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key="0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L9 10.5858L9 3C9 2.44772 9.44771 2 10 2C10.5523 2 11 2.44771 11 3L11 10.5858L12.2929 9.29289C12.6834 8.90237 13.3166 8.90237 13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
        fill="#111827"
      ></path>
    </svg>,
  ];
  const deletebtn = [
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        fill="#111827"
        className="fill-danger"
      ></path>
    </svg>,
  ];

  const information = [
    {
      title: "Oliver Liam",
      description: "Viking Burrito",
      address: "oliver@burrito.com",
      vat: "FRB1235476",
    },
    {
      title: "Lucas Harper",
      description: "Stone Tech Zone",
      address: "lucas@syone-tech.com",
      vat: "FRB1235476",
    },
    {
      title: "Oliver Liam",
      description: "ethan@fiber.com",
      vat: "NumberFRB1235476",
    },
  ];
  const calender = [
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill="#111827"
        className="fill-muted"
      ></path>
    </svg>,
  ];
  const mins = [
    <svg
      width="10"
      height="10"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
        className="fill-danger"
      ></path>
    </svg>,
  ];
  const newest = [
    {
      headding: <h6>NEWEST</h6>,
      avatar: mins,
      title: "Netflix",
      description: "27 March 2021, at 12:30 PM",
      amount: "- $2,500",
      textclass: "text-light-danger",
      amountcolor: "text-danger",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Apple",
      description: "27 March 2021, at 04:30 AM",
      amount: "+ $2,000",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
  ];
  const yesterday = [
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Stripe",
      description: "26 March 2021, at 12:30 AM",
      amount: "+ $750",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "HubSpot",
      description: "26 March 2021, at 11:30 AM",
      amount: "+ $1,050",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Creative Tim",
      description: "26 March 2021, at 07:30 AM",
      amount: "+ $2,400",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
      title: "Webflow",
      description: "26 March 2021, at 04:00 AM",
      amount: "Pending",
      textclass: "text-warning",
      amountcolor: "text-warning-b",
    },
  ];
  const { Search } = Input;
  const [selectedValue, setSelectedValue] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [filterData, setFilterData] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [name, setName] = useState(searchParams.get('partner'));
  const defaultFilter = searchParams.get('partner');
  const [showDetails, setShowDetails] = useState(false);
  const [detailId, setDetailId] = useState(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      await programApi.getAll({
        search: search,
        partner: filterData,
        sort: selectedValue || 'id,asc',
        limit: 4,
        page: current - 1
      })
        .then((res) => {
          setLoading(false);
          setPrograms(res.data.content);
          setTotal(res.data.totalElements);
          console.log(res.data.totalElements);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setPrograms(null);
      setTotal(0);
    }
  };

  const fetchFilter = async () => {
    try {
      await partnerApi.getAll({ sort: 'id,asc', limit: 1000 })
        .then((res) => {
          const data = res.data.content;
          setFilter(data);
          if (name) {
            const value = data.find((item) => item.fullName === name);
            // console.log(value);
            setFilterData(value.id);
            // setDefaultFilter(name);
            setName(null);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPrograms();
    fetchFilter();
  }, [current, search, selectedValue, filterData]);

  const onChange = (checkedValues) => {
    if (checkedValues.length > 0) {
      setSelectedValue(checkedValues[0]);
    } else {
      setSelectedValue(null);
    }
  };

  const onSearch = (value) => setSearch(value);

  const options = [];
  for (let i of filter) {
    options.push({
      id: i.id,
      label: i.fullName,
      value: i.fullName,
    });
  }
  const handleChange = (...props) => {
    const ids = props[1].map((obj) => obj.id);
    const format = ids !== null ? ids.join(',') : null;
    setFilterData(format);
  };

  // const handleDetail = (id) => {
  //   try {
  //     setShowModal(true);
  //     programApi.getDetail(id)
  //       .then((res) => {
  //         setDetails(res.data);
  //         // console.log(res.data.program.state);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleDetail = (id) => {
    setShowDetails(true);
    setDetailId(id);
  }

  const handleBack = () => {
    setShowDetails(false);
    setDetailId(null);
  }

  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 10) {
      return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{5})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    // Return the original phone number if it doesn't match the expected length
    return phoneNumber;
  }

  const timeRemaining = (expDate) => {
    return expDate ? Math.floor((new Date(expDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;
  }

  return (
    <>
      {!showDetails && (<Row gutter={[24, 0]}>
        <Col span={24} md={16} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 style={{ color: 'gray' }} className="font-bold m-0">Programs Information</h6>]}
            bodyStyle={{ paddingTop: "0" }}
            loading={loading}
            extra={
              <Pagination simple pageSize={4} current={current} total={total} onChange={(e) => setCurrent(e)} />
            }
          >
            <Row gutter={[24, 24]}>
              {programs?.map((program, index) => (
                <Col span={24} key={index}>
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                      <Descriptions title={
                        <>
                          <span>
                            {program?.programName}
                            {program?.dateUpdated && new Date(program?.dateUpdated) > new Date ?
                              (<Tag color="green" style={{ marginLeft: 7 }}>{timeRemaining(program?.dateUpdated)} days</Tag>) :
                              (<Tag color="volcano" style={{ marginLeft: 7 }}>Expired</Tag>)}
                          </span>
                        </>
                      }>
                        <Descriptions.Item label="Date Created" span={3}>
                          {program?.dateCreated}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date Expired" span={3}>
                          {program?.dateUpdated}
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                          <Badge
                            style={{ color: program?.state ? '#8c8c8c' : '#d9d9d9' }}
                            status={`${program?.state ? 'success' : 'default'}`}
                            text={`${program?.state ? 'ACTIVE' : 'INACTIVE'}`}
                          />
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className="col-action">
                      <Button type="link" onClick={() => handleDetail(program.id)} className="ant-btn-primary">
                        {pencil} DETAIL
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}

              {!programs && (
                <Col span={24} key={1}>
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                      <Descriptions title='No Data'>
                        <Descriptions.Item label="Date Created" span={3}>
                          No Data
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Update" span={3}>
                          No Data
                        </Descriptions.Item>
                        <Descriptions.Item span={3}>
                          <Badge
                            style={{ color: '#d9d9d9' }}
                            status='default'
                            text='INACTIVE'
                          />
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className="col-action">
                      <Button type="link" className="ant-btn-primary">
                        {pencil} NO DATA
                      </Button>
                    </div>
                  </Card>
                </Col>
              )}
            </Row>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Search Programs</h6>}
            extra={
              <p className="card-header-date">
                {calender}
                <span>programs</span>
              </p>
            }
          >
            <div>
              <div>
                <h6 style={{ color: '#bcbaba', marginBottom: 20 }}>Search bar</h6>
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="default"
                  onSearch={onSearch}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <h6 style={{ color: '#bcbaba', marginBottom: 20 }}>Sort</h6>
                <Checkbox.Group
                  style={{
                    width: '100%',
                  }}
                  value={selectedValue}
                  onChange={onChange}
                >
                  <div style={{ marginBottom: 20, marginLeft: 50 }}>
                    <Checkbox value="dateCreated,desc">Recently Created</Checkbox>
                  </div>
                  <div style={{ marginBottom: 20, marginLeft: 50 }}>
                    <Checkbox value="dateCreated,asc">Formerly Created</Checkbox>
                  </div>
                  <div style={{ marginBottom: 20, marginLeft: 50 }}>
                    <Checkbox value="dateUpdated,desc">Recently Expired</Checkbox>
                  </div>
                  <div style={{ marginLeft: 50 }}>
                    <Checkbox value="dateUpdated,asc">Formerly Expired</Checkbox>
                  </div>
                </Checkbox.Group>
              </div>
              <div style={{ marginTop: 30 }}>
                <h6 style={{ color: '#bcbaba', marginBottom: 20 }}>Filter by partner</h6>
                <div style={{ marginBottom: 20 }}>
                  <Select
                    maxTagCount={20}
                    defaultValue={defaultFilter ? [defaultFilter] : undefined}
                    size="large"
                    bordered={false}
                    mode="multiple"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    placeholder="Please click here to select partner(s)..."
                    onChange={handleChange}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>)}

      {showDetails && (<ProgramDetail id={detailId} setShowDetails={handleBack} />)}
      {/* <Modal
        visible={showModal}
        title={
          <h2 style={{ color: "gray", fontWeight: "bold" }}>{details?.program.programName}</h2>
        }
        width={800}
        // onOk={handleOk}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowModal(false)}>
            Return
          </Button>,
        ]}
      >
        <>
          <p style={{ color: "gray", marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>Partner Info</p>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Partner Name :</p>
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
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Partner Email :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.email}</p>
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
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Partner Phone :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.partner?.phone ? formatPhoneNumber(details?.partner?.phone) : ""}</p>
            </div>
          </div>

          <p style={{ color: 'gray', marginTop: 10, marginBottom: 10, fontWeight: 'bold' }}>Program Info</p>

          <div
            style={{
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}>

            <div
              style={{
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Status :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.program?.state ? 'Active' : 'Inactive'}</p>
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
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Members :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.numOfMembers}</p>
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
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Date Created :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.program?.dateCreated}</p>
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
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Last Update :</p>
            </div>
            <div style={{ fontSize: 18 }}>
              <p>{details?.program?.dateUpdated}</p>
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
                width: 150,
                marginRight: 30,
                color: "gray",
                fontSize: 18,
                textAlign: "right",
                marginRight: 30,
                marginLeft: 10,
              }}>
              <p>Description :</p>
            </div>
            <div style={{ fontSize: 18, width: 550 }}>
              <p>{details?.program?.description}</p>
            </div>
          </div>

        </>
      </Modal> */}
    </>
  );
}

export default Programs;
