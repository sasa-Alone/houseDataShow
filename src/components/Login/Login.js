import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './Login.less';

class NormalLoginForm extends Component {
  handleSubmit = e => {
    const { onLogin } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(onLogin){
          onLogin(values.username,values.password);
        }
      }
    });
  };

  handleClick = (e)=>{
    const { onClick } = this.props;
    e.preventDefault();
    if(onClick){
      onClick();
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.root}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)} */}
            {/* <a className="login-form-forgot" href="">
              忘记密码
            </a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <a href="" onClick={this.handleClick}>马上注册</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;
