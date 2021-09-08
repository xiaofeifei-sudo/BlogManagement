import React, {useState, useEffect} from "react";
import "../../static/styles/css/ArticleList.css";
import {List, Row, Col, Modal, message, Button, Switch} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons"
import axios from "axios";
import servicePath from "../../config/apiUrl";

const {confirm} = Modal;

function ArticleList(props) {

    const [list, setList] = useState([]);

    useEffect(() => {
        getList();
    }, []);

    //得到文章列表
    const getList = () => {
        axios({
            method: "get",
            url: servicePath.getArticleList,
            withCredentials: true,
            header: {"Access-Control-Allow-Origin": "*"}
        }).then(
            res => {
                setList(res.data.list);

            }
        );
    };


    //修改文章
    const updateArticle = (id,checked)=>{
        props.history.push('/index/add/'+id)
    }


//删除文章的方法
    const delArticle = (id) => {
        confirm({
            icon:<ExclamationCircleOutlined />,
            title: "确定要删除这篇博客文章吗?",
            content: "如果您确认删除,文章将永久删除,不得恢复!",
            okText:"确定",
            cancelText:"取消",
            onOk() {
                axios(servicePath.delArticle + id, {withCredentials: true}).then(
                    res => {
                        message.success("文章删除成功!");
                        getList();
                    }
                );
            },
            onCancel() {
                message.success("取消删除成功!");
            }
        });

    };
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.part_count}</span>集
                            </Col>
                            <Col span={3}>
                                {item.view_count}
                            </Col>

                            <Col span={4}>
                                <Button type="primary" onClick={()=>{
                                    updateArticle(item.id)
                                }}>修改</Button>&nbsp;

                                <Button onClick={() => {
                                    delArticle(item.id);
                                }}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    );

}

export default ArticleList;

