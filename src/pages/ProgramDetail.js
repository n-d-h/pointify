import { Table, Row, Col, Button, notification, Tag, Typography, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import programApi from '../apis/programApi';

function ProgramDetail({ id, setShowDetails }) {
    const [loading, setLoading] = useState(false);
    const [proramDetails, setProgramDetails] = useState({});
    const [partner, setPartner] = useState({});
    const [level, setLevel] = useState([]);
    const { Title } = Typography;
    const [showTagInfo, setShowTagInfo] = useState(false);

    const handleTagMouseEnter = () => {
        setShowTagInfo(true);
    };

    const handleTagMouseLeave = () => {
        setShowTagInfo(false);
    };

    const fetchProgramDetails = () => {
        setLoading(true);
        programApi.getDetail(id)
            .then((response) => {
                setProgramDetails(response.data.program);
                setPartner(response.data.partner);
                setLevel(response.data.levelList);
            }).catch((error) => {
                notification.error({
                    message: error.response.data,
                    description: '',
                });
            }).finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchProgramDetails();
    }, [id]);

    const columnPartners = [
        {
            title: "PARTNER",
            dataIndex: "fullName",
            key: "fullName",
            width: '27%'
        },
        {
            title: "CONTACT",
            dataIndex: "contact",
            key: "contact",
            width: '27%'
        },
        {
            title: "CODE",
            dataIndex: "code",
            key: "code"
        },
        {
            title: "ADDRESS",
            key: "address",
            dataIndex: "address",
            width: '28%'
        }
    ];

    const dataPartner = [
        {
            fullName: (
                <>
                    <Title level={5}>{partner.fullName}</Title>
                </>
            ),
            code: (
                <>
                    <span>{partner.code}</span>
                </>
            ),
            partner: (
                <>
                    <span>{partner.partnerName}</span>
                </>
            ),
            contact: (
                <>
                    <div className="author-info">
                        <Title level={5}>{partner.email}</Title>
                        <p>{partner.phone ? formatPhoneNumber(partner.phone) : ''}</p>
                    </div>
                </>
            ),
            address: (
                <>
                    <span style={{ width: 100, overflow: 'hidden', whiteSpace: 'pre-line' }}>{partner.address}</span>
                </>
            )
        }
    ];

    const columnLevels = [
        {
            title: "#",
            dataIndex: "number",
            key: "number",
            align: "center"
        },
        {
            title: "LEVEL",
            dataIndex: "level",
            key: "level",
            align: "center"
        },
        {
            title: "DESCRIPTION",
            dataIndex: "description",
            key: "description",
            align: "center"
        },
        {
            title: "CONDITION",
            key: "condition",
            dataIndex: "condition",
            align: "center"
        },
    ];

    const getColor = (level) => {
        switch (level?.toUpperCase()) {
            case "PLATINUM":
                return "#a112c3";
            case "GOLD":
                return "#e0bb00";
            case "SILVER":
                return "#978d8d";
            case "BRONZE":
                return "#c26f1c";
            default:
                return "#000";
        }
    }

    const dataLevel = level.map((levelList, index) => {
        return {
            key: index,
            number: index + 1,
            level: (
                <>
                    <span style={{ color: getColor(levelList.level) }}>{levelList.level}</span>
                </>
            ),
            description: (
                <>
                    <span>{levelList.description}</span>
                </>
            ),
            condition: (
                <>
                    <span>{levelList.condition}</span>
                </>
            ),
        }
    });


    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber.length === 10) {
            return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        } else if (phoneNumber.length === 11) {
            return phoneNumber.replace(/(\d{5})(\d{3})(\d{3})/, '$1 $2 $3');
        }
        // Return the original phone number if it doesn't match the expected length
        return phoneNumber;
    }

    const timeRemaining = Math.floor(
        (new Date(proramDetails.dateUpdated) - new Date()) / (1000 * 60 * 60 * 24));


    return (
        <>
            <Button type="primary" onClick={setShowDetails}>BACK TO LIST</Button>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            loading={loading}
                            style={{ marginTop: 50 }}
                            bordered={false}
                            title={<h3 className="font-semibold m-0">Program Details</h3>}
                            bodyStyle={{ paddingTop: 0, paddingBottom: 16, fontSize: 15, marginTop: 30 }}
                        >
                            <div style={{ marginBottom: 10 }} className='card-program-details'>
                                <div style={{ width: 130, marginBottom: 3, color: '#b4afaf' }}>
                                    <label className='card-program-details-label'>Program Name :</label>
                                </div>
                                {proramDetails.dateUpdated && new Date(proramDetails.dateUpdated) < new Date() ? (
                                    <>
                                        <span  style={{ marginLeft: 20 }}>
                                            {proramDetails.programName}
                                            <Tag
                                                style={{ marginLeft: 7 }}
                                                color={"red"}
                                                className={showTagInfo ? "tag-hover-pointer" : ""}
                                                onMouseEnter={handleTagMouseEnter}
                                                onMouseLeave={handleTagMouseLeave}
                                                title={`This program has expired`}>
                                                Expired
                                            </Tag>
                                        </span>
                                    </>
                                ) : (
                                    <span  style={{ marginLeft: 20 }}>
                                        {proramDetails.programName}
                                        <Tag
                                            style={{ marginLeft: 7 }}
                                            color={"green"}
                                            className={showTagInfo ? "tag-hover-pointer" : ""}
                                            onMouseEnter={handleTagMouseEnter}
                                            onMouseLeave={handleTagMouseLeave}
                                            title={`This program has ${timeRemaining} days left`}
                                        >
                                            {timeRemaining} days
                                        </Tag>
                                    </span>
                                )}
                            </div>
                            <div style={{ marginBottom: 10 }} className='card-program-details'>
                                <div style={{ width: 130, marginBottom: 3, color: '#b4afaf' }}>
                                    <label className='card-program-details-label'>Partner Name:</label>
                                </div>
                                <span style={{ marginLeft: 20 }}>{proramDetails.partnerName}</span>
                            </div>
                            <div style={{ marginBottom: 10 }} className='card-program-details'>
                                <div style={{ width: 130, marginBottom: 3, color: '#b4afaf' }}>
                                    <label className='card-program-details-label'>Created Date:</label>
                                </div>
                                <span  style={{ marginLeft: 20 }}>{proramDetails.dateCreated}</span>
                            </div>
                            <div style={{ marginBottom: 10 }} className='card-program-details'>
                                <div style={{ width: 130, marginBottom: 3, color: '#b4afaf' }}>
                                    <label className='card-program-details-label'>Expired Date:</label>
                                </div>
                                <span  style={{ marginLeft: 20 }}>{proramDetails.dateUpdated}</span>
                            </div>
                            <div style={{ marginBottom: 10 }} className='card-program-details-description'>
                                <label style={{ color: '#b4afaf' }} className='card-program-details-label'>Description:</label>
                                <div style={{ marginTop: 3 }}>
                                    <span  style={{ marginLeft: 20 }}>{proramDetails.description}</span>
                                </div>
                            </div>
                            <hr className="my-25" />
                        </Card>

                        <div className="table-responsive">
                            <h1 style={{
                                fontSize: 20,
                                color: 'black',
                                marginTop: 30,
                                marginBottom: 30,
                                fontWeight: 600
                            }}>Organizational partner</h1>
                            <Table
                                loading={loading}
                                columns={columnPartners}
                                dataSource={dataPartner}
                                pagination={false}
                                className="ant-border-space"
                                style={{ marginBottom: 30 }}
                            />
                        </div>
                        <div className="table-responsive">
                            <h1 style={{
                                fontSize: 20,
                                color: 'black',
                                marginTop: 30,
                                marginBottom: 30,
                                fontWeight: 600
                            }}>Level of Program</h1>
                            <Table
                                loading={loading}
                                columns={columnLevels}
                                dataSource={dataLevel}
                                pagination={false}
                                className="ant-border-space"
                                style={{ marginBottom: 50 }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ProgramDetail;