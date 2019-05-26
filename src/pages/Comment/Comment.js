import React, { Component } from 'react';
import { Input,Row, Col, Form, Button, Select, Rate, Upload, Icon, Modal, List, Avatar, Divider } from 'antd';
import styles from "./Comment.less";
import { connect } from 'dva';

const { Option } = Select;
const { TextArea } = Input;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

@connect(({ comment, loading })=> {
  return ({
    previewVisible: comment.previewVisible,
    previewImage: comment.previewImage,
    fileList: comment.fileList,
    commentList: comment.commentList,
    loading: loading.effects['comment/getCommentList'],
  })
})
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

  handleChange = ({ fileList }) => this.setState({ fileList });


  renderComment(){
    const { previewVisible, previewImage, fileList } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <div>
        <Form className="form">
          <Row>
            <Col md={12}>
              <Form.Item label="选择平台评价：" >
                <Select style={{ width: 120 }} defaultValue={"ziru"}>
                  <Option value="ziru">自如</Option>
                  <Option value="danke">蛋壳公寓</Option>
                  <Option value="lianjia">链家</Option>
                  <Option value="myhome">我爱我家</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={12}>
              <Form.Item label="平台打分：" >
                <Rate defaultValue={3}/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="发表评价：" >
            <TextArea
              placeholder="您可以发表自己的体会，为他人选择服务提供更好的参考依据"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label="上传图片" >
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
          </Form.Item>
          <Form.Item >
            <Button type="primary">发表</Button>
          </Form.Item>
        </Form>
        <Divider />
      </div>
    )
  }

  renderCommentList(){
    const { commentList } = this.props;
    console.log("commentList,commentList",commentList)

    return(
      <List
        header="评价列表："
        className="list"
        itemLayout="horizontal"
        pagination
        dataSource={commentList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.user}</a>}
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
        {this.renderComment()}
        {this.renderCommentList()}
      </div>
    );
  }
}

export default SearchHouse;
