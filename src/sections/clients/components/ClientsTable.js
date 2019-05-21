import React from 'react';
import { withRouter } from 'react-router';
import { Table , Button } from 'antd';
import servicesClient from '../ClientsSrc'

class ClientsTable extends React.Component {

    constructor(props){
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.getData = this.getData.bind(this);

        this.state = {
            data: [],
            isPageTween: false,
        };
    }

    componentDidMount(){
        servicesClient.list().then(clients => this.setState({data:clients}, _ => console.log(this.state.data,'data')))
    }

    getColumns = ()=>{
        let columns = [
            { title: 'Tipo Usuario', dataIndex: 'type', key: 'type' },
            { title: 'Nombre', dataIndex: 'name', key: 'name' },
            { title: 'Activo', dataIndex: 'activo', key: 'activo' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
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

        return columns
    }

    getData = (data)=>{

        return data.map( (d) => ({
                key: d.id,
                name:  d.name,
                email: d.email,
                type: d.type,
                activo: d.activo
        }));
    }

    onDelete = (key, e) => {
        e.preventDefault();
        const data = this.state.data.filter(item => item.key !== key);
        this.setState({ data, isPageTween: false });
    };

    onEdit = (key, e) => {

    };

    onAdd = () => {
       this.props.history.push('/clients/create');
    };

    render() {
        return (
            <div>
                <div className={'table-action-bar'}>
                    <h2>{this.props.objectVariable.title}</h2>
                    {this.props.objectVariable.showBtn ? <Button type="primary" onClick={this.onAdd}>Nuevo</Button> : ''}
                </div>
                <Table columns={this.getColumns()} dataSource={this.getData(this.state.data)}/>
            </div>
        );
    }
}

export default withRouter(ClientsTable)
