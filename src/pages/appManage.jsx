import React from 'react';
import reqwest from 'reqwest';
import SearchForm from '../components/searchForm';
import { Table } from 'antd';

class AppManage extends React.Component {
    componentDidMount() {
        this.fetch();
    }

    state = {
        searchField: [
            { labelName: 'APP名称', fieldName: 'appName', placeholder: '请输入APP名称' }
        ],
        columns: [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                render: name => `${name.first} ${name.last}`,
                width: '20%',
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                width: '20%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
        ],
        data: [],
        pagination: {},
        loading: false,
    }

    getSearch = (values) => {
        if (true) {
            let __params = {
                results: 10,
                page: 1
            }
            this.fetch(__params);
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then(data => {
            console.log(data);
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    };


    render() {
        return (
            <div>
                <SearchForm
                    searchField={this.state.searchField}
                    getSearch={this.getSearch}
                />
                <h2 style={{ margin: '20px 0' }}>查询结果：共查到{this.state.pagination.total}条数据</h2>
                <Table
                    columns={this.state.columns}
                    rowKey={record => record.login.uuid}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default AppManage;