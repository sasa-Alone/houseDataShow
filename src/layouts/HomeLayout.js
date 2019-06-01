import React,{ Component, Fragment } from 'react';
import style from './HomeLayout.less';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.png';
import bg3 from '../assets/bg3.png';
import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpg';
import house3 from '../assets/house3.jpg';
import description from '../assets/description.png';
import { connect } from 'dva';
import router from 'umi/router';
import WrappedNormalLoginForm from '../components/Login/Login';
import WrappedRegistrationForm from '../components/Register/Register';
import { Layout, Menu, Carousel, Divider, Row, Col, Card, Icon, Modal } from 'antd';

const { Header, Content, Footer } = Layout;

@connect(({ global,loading }) => ({
    collapsed: global.collapsed,
    loginVisible: global.loginVisible,
    registerVisible: global.registerVisible,
}))
class BasicLayout extends Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    };

    showLoginModal = () => {
      const { dispatch } = this.props;
      dispatch({
        type:"global/save",
        payload:{
          loginVisible: true
        },
      });
    };

    hideLoginModal = () => {
      const { dispatch } = this.props;
      dispatch({
        type:"global/save",
        payload:{
          loginVisible: false,
        },
      });
    };

    showRegisterModal = () => {
      const { dispatch } = this.props;
      dispatch({
        type:"global/save",
        payload:{
          registerVisible: true,
        },
      });
    };

    hideRegisterModal = () => {
      const { dispatch } = this.props;
      dispatch({
        type:"global/save",
        payload:{
          registerVisible: false,
        },
      });
    };

    handleGoToRegister = () => {
      console.log("handleGoToRegister")
      this.hideLoginModal();
      this.showRegisterModal();
    }

    handleClick = (e) => {
      if(e.key === "1"){
        router.push('/');
        return;
      }
      if(e.key === "2"){
        router.push('/index');
        return;
      }
      router.push('/');
      return;
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };

    handleLogin = (username,password) =>{
      const { dispatch } = this.props;
      console.log("login")
      dispatch({
        type:'global/login',
        payload:{
          username,
          password
        }
      })
    }

    handleRegister = (username,password) =>{
      const { dispatch } = this.props;
      console.log("register")
      dispatch({
        type:'global/register',
        payload:{
          username,
          password
        }
      })
    }

  renderPicList(){
    return(
      <div style={{ background: '#ECECEC', padding: '30px', margin: '20px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
                  bordered={false}
                  cover={<img alt="example" src={house1} />}
                  />
          </Col>
          <Col span={8}>
          <Card
                  bordered={false}
                  cover={<img alt="example" src={house2} />}
                  />
          </Col>
          <Col span={8}>
          <Card
                  bordered={false}
                  cover={<img alt="example" src={house3} />}
                  />
          </Col>
        </Row>
      </div>
    )
  }

  renderlogin(){
    const { loginVisible } = this.props;
    return(
      <div>
        <Modal
          title={<div style={{margin:"auto",textAlign:"center"}}>登录</div>}
          visible={loginVisible}
          footer={null}
          onOk={this.hideLoginModal}
          onCancel={this.hideLoginModal}
          okText="确认"
          cancelText="取消"
        >
          <WrappedNormalLoginForm onClick={this.handleGoToRegister} onLogin={this.handleLogin}/>
        </Modal>
      </div>
    )
  }

  renderRegister(){
    const { registerVisible } = this.props;
    return(
      <div>
        <Modal
          title={<div style={{margin:"auto",textAlign:"center"}}>注册</div>}
          visible={registerVisible}
          footer={null}
          onOk={this.hideRegisterModal}
          onCancel={this.hideRegisterModal}
          okText="确认"
          cancelText="取消"
        >
          <WrappedRegistrationForm onRegister={this.handleRegister}/>
        </Modal>
      </div>
    )
  }

  render() {
    return (
      <div className={style.root}>
        <Layout className="layout">
          <Header className="header">
            <div className="logo">
              {/* <img src={logo} alt="logo" /> */}
              <Icon type="home" style={{ fontSize: '25px', color: '#08c' }}/>
              <span className="title">
                Fast Rent
              </span>
            </div>
            <Menu
              theme="dark"
              className="menu"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              onClick={this.handleClick}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">找房</Menu.Item>

            </Menu>
            <div  className="login">
              <a href= "#" onClick={this.showLoginModal} >登录</a>
              <Divider type="vertical" />
              <a href="#" onClick={this.showRegisterModal}>注册</a>
            </div>
          </Header>
          <Carousel autoplay className="banner">
            <div>
              <img src={bg2} alt="bgImage"/>
            </div>
            <div>
              <img src={bg1} alt="bgImage"/>
            </div>
            <div>
              <img src={bg3} alt="bgImage"/>
            </div>
          </Carousel>
          <Content className="content" style={{ padding: '0 50px' }}>
            <div style={{ minHeight: 280 }}>
              <div className="description">
                <h2>快速找房 不再烦恼</h2>
                <h3>真实 &nbsp; 便捷 &nbsp;&nbsp;&nbsp; 高效 给您全面的信息指南</h3>
                {this.renderPicList()}
                <h2>为什么要选择我们？</h2>
                <p>
                  随着租赁用房供应规模的增加, 如何让租赁者寻找到最合适的APP软件，使租客不至于深陷各种APP之间，并且快速有针对性的寻找房源信息也成为一个亟待解决的问题。本平台将对各大平台的房源信息特点进行定期分析，能够为租客租房提供一个较为明确的方向。
                </p>
                <img src={description} alt="description"/>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Fragment>
              Copyright <Icon type="copyright" /> 2019 <Icon type="github" />Rent House Data Analysis By DSS
            </Fragment>
          </Footer>
        </Layout>

        {this.renderlogin()}
        {this.renderRegister()}
      </div>
    );
  }
}

export default BasicLayout;
