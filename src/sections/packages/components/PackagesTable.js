import React from 'react';
import { withRouter } from 'react-router';
import { Table , Button , Spin } from 'antd';
import servicesPackages from '../PackagesSrc';
import InfiniteScroll from 'react-infinite-scroller';

class PackagesTable extends React.Component {

    constructor(props){
        super(props);

        this.onAdd = this.onAdd.bind(this);

        this.getColumns = this.getColumns.bind(this);
        this.getData = this.getData.bind(this);

        this.state = {
            data: [],
            isPageTween: false,
            loading: false,
            hasMore: true,
        };
    }

    componentDidMount(){
        //servicesPackages.list().then(packages => this.setState({data:packages}, _ => console.log(this.state.data,'data')))
        this.loadData();
    }

    getColumns = ()=>{
        let columns = [
            { title: 'Tracking', dataIndex: 'tracking', key: 'tracking' },
            { title: 'Fecha Registro', dataIndex: 'ing_date', key: 'ing_date' },
            { title: 'Estado', dataIndex: 'status', key: 'status' },
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
            key: d.package_id,
            tracking: d.tracking,
            ing_date: d.ing_date,
            status:  d.status
        }));
    }

    loadData = () => {
        //if (!this.state.loading) this.setState({ loading: true })
       /* servicesPackages.list()
            .then(packages => this.setState({data:packages},{ loading: false }))
            .catch(e => {
                //alert.error(e)
            })*/
        servicesPackages.list().then(packages => this.setState({data:packages}, _ => console.log(this.state.data,'data')))
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
                <div className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={false}
                        hasMore={!this.state.loading && this.state.hasMore}
                    >
                    <Table columns={this.getColumns()} dataSource={this.getData(this.state.data)}/>
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container"><Spin /></div>
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default withRouter(PackagesTable)
