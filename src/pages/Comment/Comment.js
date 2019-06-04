import React, { Component } from 'react';
import { Input,Row, Col, Form, Button, Select, Rate, Upload, Icon, Modal, List, Avatar, Divider } from 'antd';
import styles from "./Comment.less";
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

@connect(({ comment, loading })=> {
  return ({
    previewVisible: comment.previewVisible,
    previewImage: comment.previewImage,
    fileList: comment.fileList,
    commentList: comment.commentList,
    loading: loading.effects['comment/addComment'],
  })
})
@Form.create()
class SearchHouse extends Component {

  constructor(props){
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type:"comment/getCommentList"
    })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleSubmit = e => {
    const { dispatch,loading } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:"comment/addComment",
          payload:{
            comments:values,
          }
        });
      }
    });
    if(loading === false){
        const { form } = this.props;
        form.resetFields();
    }
  };

  handleChange = ({ fileList }) => this.setState({ fileList });


  renderComment(){
    const {
      form: { getFieldDecorator },
    } = this.props;
    // const { previewVisible, previewImage, fileList } = this.props;
    // const uploadButton = (
    //   <div>
    //     <Icon type="plus" />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );
    return(
      <div>
        <Form className="form" onSubmit={this.handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Item label="选择平台评价：" >
                  {getFieldDecorator('starPlatform', { initialValue: '自如' })(
                    <Select style={{ width: 120 }}>
                      <Option value="自如">自如</Option>
                      <Option value="蛋壳公寓">蛋壳公寓</Option>
                      <Option value="链家">链家</Option>
                      <Option value="我爱我家">我爱我家</Option>
                  </Select>
                  )}
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="平台打分：" >
                  {getFieldDecorator('starScore', { initialValue: 3 })(
                    <Rate />
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="发表评价：" >
              {getFieldDecorator('comment', { initialValue: '' })(
                <TextArea
                  placeholder="您可以发表自己的体会，为他人选择服务提供更好的参考依据"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />
              )}
          </Form.Item>
          {/* <Form.Item label="上传图片" >
            <div className="clearfix">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </Form.Item> */}
          <Form.Item >
            <Button type="primary" htmlType="submit">发表</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  renderCommentList(){
    const { commentList } = this.props;
    const pagination  = {
      pageSize:5,
    }
    return(
      <List
        header="评价列表："
        className="list"
        itemLayout="horizontal"
        pagination= {pagination}
        dataSource={commentList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.username}</a>}
              description={item.comment}
            />
          </List.Item>
        )}
      />
    )
  }

  render() {
    return(
      <div className={styles.root}>
        {this.renderCommentList()}
        {this.renderComment()}
      </div>
    );
  }
}

export default SearchHouse;
