import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';

import AppManage from './pages/appManage';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
    state = {
        collapsed: false,
        selectedKey: ['appManage']
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={this.state.selectedKey}
                        mode="inline"
                        defaultOpenKeys={['sub1']}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>配置管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3">配置管理</Menu.Item>
                            <Menu.Item key="4">监听查询</Menu.Item>
                            <Menu.Item key="appManage"><a href="#/appManage">应用管理</a></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ backgroundColor: '#fff', padding: '16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>配置管理</Breadcrumb.Item>
                            {/* <Breadcrumb.Item>应用管理</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <Router>
                            <Route path="/appManage" component={AppManage}></Route>
                        </Router>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;