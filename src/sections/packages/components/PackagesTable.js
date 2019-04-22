import React from 'react';
import { withRouter } from 'react-router';
import { Table , Button } from 'antd';

class PackagesTable extends React.Component {

    constructor(props){
        super(props);

        this.onAdd = this.onAdd.bind(this);

        this.columns = [
            { title: 'Traking', dataIndex: 'name', key: 'name' },
            { title: 'Fecha Registro', dataIndex: 'age', key: 'age' },
            { title: 'Estado', dataIndex: 'address', key: 'address' },
            {
                title: 'Accion',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span>
                        <Button type="default" icon="edit" onClick={(e) => { this.onEdit(record.key, e); }}/>
                        <Button type="danger" icon="delete" onClick={(e) => { this.onDelete(record.key, e); }}/>
                    </span>
                ),
            },
        ];

        this.data = [
            {
                key: 1,
                name: 'John Brown',
                age: 32,
                address: 'New York No.1 Lake Park',
            },
            {
                key: 2,
                name: 'Jim Green',
                age: 42,
                address: 'London No.1 Lake Park',
            },
        ];

        this.state = {
            data: this.data,
            isPageTween: false,
        };
    }

    onDelete = (key, e) => {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data, isPageTween: false });
    };

    onEdit = (key, e) => {

    };

    onAdd = () => {
        this.props.history.push('/packages/create');
    };

    render() {
        return (
            <div>
                <div className={'table-action-bar'}>
                    <h2>{this.props.objectVariable.title}</h2>
                    {this.props.objectVariable.showBtn ? <Button type="primary" onClick={this.onAdd}>Nuevo</Button> : ''}
                </div>
                <Table columns={this.columns} dataSource={this.state.data}/>
            </div>
        );
    }
}

export default withRouter(PackagesTable)
