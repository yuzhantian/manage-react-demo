import React from 'react'
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

class SearchFormComponent extends React.Component {

    getFields() {
        const { getFieldDecorator } = this.props.form;
        const _arr = this.props.searchField;
        let child = [];
        for (let i = 0; i < _arr.length; i++) {
            child.push(
                <Form.Item label={_arr[i].labelName} key={_arr[i].fieldName}>
                    {getFieldDecorator(_arr[i].fieldName)(<Input placeholder={_arr[i].placeholder} />)}
                </Form.Item>
            )
        }

        return child;
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.props.getSearch(values);
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        return (
            <Form layout="inline" onSubmit={this.handleSearch}>
                {this.getFields()}
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={{ marginLeft: 8 }} onClick={() => this.props.form.resetFields()}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}

const SearchForm = Form.create({ name: 'advanced_search' })(SearchFormComponent);

export default SearchForm;