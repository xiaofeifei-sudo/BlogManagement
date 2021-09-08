import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
// 导入阿里巴巴字体图标库
import Iconfont from "../config/alibaba.js";
import { Route, Link } from "react-router-dom";
// 导入子组件
import AddArticle from "./children/AddArticle";
import ArticleList from "./children/ArticleList";

import "../static/styles/css/AdminIndex.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo">NingBlog后台管理系统</div>
        <Menu theme="dark" defaultSelectedKeys={["addArticle"]} mode="inline">
          <Menu.Item key="workbench">
            <Iconfont type="icon-gongzuotai_xuanzhong"></Iconfont>
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="remanagement">
            <Iconfont type="icon-menu_ziyuanguanli"></Iconfont>
            <span>资源管理</span>
          </Menu.Item>
          <SubMenu
            key="articleManagement"
            title={
              <span>
                <Iconfont type="icon-wenzhangguanli"></Iconfont>
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">
              <Link to="/admin/AddArticle">
                <span>添加文章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="articleList">
              <Link to="/admin/ArticleList">
                <span>文章列表</span>
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="其他信息"
            title={
              <span>
                <Iconfont type="icon-qitadingdan"></Iconfont>
                <span>其他信息</span>
              </span>
            }
          >
            <Menu.Item key="friendLink">友情链接</Menu.Item>
            <Menu.Item key="qqInfo">QQ登录信息</Menu.Item>
            <Menu.Item key="codeTest">代码测试</Menu.Item>
          </SubMenu>

          <SubMenu
            key="commentManagement"
            title={
              <span>
                <Iconfont type="icon-liuyanguanli"></Iconfont>
                <span>留言管理</span>
              </span>
            }
          >
            <Menu.Item key="articleComment">文章留言</Menu.Item>
            <Menu.Item key="interactComment">互动留言</Menu.Item>
          </SubMenu>

          <SubMenu
            key="RN管理"
            title={
              <span>
                <span>RN管理</span>
              </span>
            }
          >
            <Menu.Item key="主页视频">
              <span>主页视频</span>
            </Menu.Item>
            <Menu.Item key="上方视频">
              <span>上方视频</span>
            </Menu.Item>
            <Menu.Item key="下方视频">
              <span>下方视频</span>
            </Menu.Item>
            <Menu.Item key="评论管理">
              <span>评论管理</span>
            </Menu.Item>
            <Menu.Item key="视频审核">
              <span>视频审核</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ background: "#fff" }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <div>
              <Route path="/admin/" exact component={AddArticle} />
              <Route path="/admin/AddArticle/" exact component={AddArticle} />
              <Route
                path="/admin/AddArticle/:id"
                exact
                component={AddArticle}
              />
              <Route path="/admin/ArticleList/" exact component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>NingBlog.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
