import React, { useEffect, useState } from "react";

import "../../static/styles/css/AddArticle.css";

import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"


import moment from "moment";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import axios from "axios";
import servicePath from "../../config/apiUrl";

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState("发布日期"); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("文章类型"); //选择的文章类别
  const [sourceType, setSourceType] = useState(""); //文章来源
  const [disabled, setDisabled] = useState(false); //提交修改后不能再次点击

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true, //启动类似Github样式的Markdown定义的,不修正Markdown的错误,填写true或者false
    pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    tables: true, //支持Github形式的表格，必须打开gfm选项
    breaks: true, //支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false,
    hlghlight:function(code){
      return hljs.highlightAuto(code).value;
    }

  });

  // 修改文章内容生效
  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  // 修改文章介绍标题生效
  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  //从中台得到文章类别信息
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      if (res.data.data === "没有登录") {
        localStorage.removeItem("openId");
        props.history.push("/login");
      } else {
        setTypeInfo(res.data.data);
      }
    }).catch((error)=>{
      message.error("服务器奔溃..."+error)
    })
  };

  //验证是否为空
  const condition = () => {
    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }

    return true;
  };

  // 保存文章
  const saveArticle = () => {
    if (condition) {
      let dataProps = {}; //传递到接口的参数
      // 传入接口参数
      dataProps.type_id = selectedType;
      dataProps.title = articleTitle;
      dataProps.article_content = articleContent;
      dataProps.introduce = introducemd;
      dataProps.addTime = new Date(showDate).getTime() / 1000;

      if (articleId === 0) {
        // 随机浏览量
        dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
        axios({
          method: "post",
          url: servicePath.addArticle,
          data: dataProps,
          withCredentials: true,
        }).then((res) => {
          setArticleId(res.data.insertId);
          if (res.data.isScuccess) {
            message.success("文章保存成功");
          } else {
            message.error("文章保存失败");
          }
        });
      } else {
        dataProps.id = articleId;
        axios({
          method: "post",
          url: servicePath.updateArticle,
          header: { "Access-Control-Allow-Origin": "*" },
          data: dataProps,
          withCredentials: true,
        }).then((res) => {
          if (res.data.isScuccess) {
            message.success("文章保存成功");
          } else {
            message.error("保存失败");
          }
        });
      }
    }
  };



  useEffect(() => {
    getTypeInfo();
    //获取文章的Id
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);

  //选择类别后的便哈
  const selectTypeHandler = (value) => {
    setSelectType(value);
  };

  // 根据Id获取数据
  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      //let articleInfo= res.data.data[0]
      setArticleTitle(res.data.data[0].title);
      setArticleContent(res.data.data[0].article_content);
      let html = marked(res.data.data[0].article_content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);
      setSelectType(res.data.data[0].typeId);
    });
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                size="large"
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>

            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介"
              />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml,
                }}
              ></div>
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  locale={locale}
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                  placeholder={showDate}
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;
