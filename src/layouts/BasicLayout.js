import React,{ Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import style from './BasicLayout.less';
import { connect } from 'dva';
import router from 'umi/router';

const { Header, Sider, Content } = Layout;

@connect(({ global }) => ({
    collapsed: global.collapsed,
}))
class BasicLayout extends Component {

    constructor(props){
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

  handleToggle(){
    const { dispatch,collapsed } = this.props;
    dispatch({
      type:'global/save',
      payload:{
        collapsed:!collapsed
      }
    })
  };

  handleClick = (e) => {
    if(e.key === "1"){
      router.push('/index/searchHouse');
      return;
    }
    if(e.key === "2"){
      router.push('/index/dataAnalysis');
      return;
    }
    if(e.key === "3"){
      router.push('/index/monitor');
      return;
    }
    if(e.key === "4"){
      router.push('/index/user');
      return;
    }
    if(e.key === "5"){
      router.push('/index/comment');
      return;
    }
    router.push('/index');
    return;
  }

  render() {
    const { children, collapsed } = this.props;
    return (
      <div className={style.root}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
              <Icon type="home" style={{ fontSize: '25px', color: '#08c' }}/>
              <a className="title" href="/">
                Fast Rent
              </a>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
              <Menu.Item key="1" >
                <Icon type="search" />
                <span>房源搜索</span>
              </Menu.Item>
              <Menu.Item key="2" >
                <Icon type="area-chart" />
                <span>数据分析</span>
              </Menu.Item>
              <Menu.Item key="3" >
                <Icon type="dashboard" />
                <span>爬虫监控</span>
              </Menu.Item>
              <Menu.Item key="5" >
                <Icon type="form" />
                <span>评价讨论</span>
              </Menu.Item>
              <Menu.Item key="4" >
                <Icon type="user" />
                <span>个人中心</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.handleToggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              { children  }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;
