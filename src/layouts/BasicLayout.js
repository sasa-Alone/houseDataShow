import React,{ Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import style from './BasicLayout.less';
import logo from '../assets/logo.png';
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
      router.push('/searchHouse');
      return;
    }
    if(e.key === "2"){
      router.push('/dataAnalysis');
      return;
    }
    if(e.key === "3"){
      router.push('/monitor');
      return;
    }
    if(e.key === "4"){
      router.push('/user');
      return;
    }
    router.push('/');
    return;
  }

  render() {
    const { children, collapsed } = this.props;
    return (
      <div className={style.root}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
              <img src={logo} alt="logo" />
              <span className="title">
                Fast Rent
              </span>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
              <Menu.Item key="1" >
                <Icon type="user" />
                <span>房源搜索shishikannengbunegnyong </span>
              </Menu.Item>
              <Menu.Item key="2" >
                <Icon type="video-camera" />
                <span>数据分析</span>
              </Menu.Item>
              <Menu.Item key="3" >
                <Icon type="upload" />
                <span>爬虫监控</span>
              </Menu.Item>
              <Menu.Item key="4" >
                <Icon type="upload" />
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
