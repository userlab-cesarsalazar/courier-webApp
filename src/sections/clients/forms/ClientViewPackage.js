import React from 'react';
import Accounting from 'accounting';
import { withRouter } from 'react-router';
import { Card, message, Divider, Col, Row, Table, Button } from 'antd';
import  { Cache } from 'aws-amplify';
import ClientsSrc from '../ClientsSrc';

const DescriptionItem = ({ title, content }) => (
	<div className='desc-item-div'>
		<p className='desc-item-p'>{title}:</p>
		{content}
	</div>
);

class ClientViewPackage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
      notDeliveredPackages: [],
      deliveredPackages: [],
			loading: false,
			errors: {}
		};

		this.getColumns = this.getColumns.bind(this);
		this.getData = this.getData.bind(this);
		this.loadPackage = this.loadPackage.bind(this);
		this.onAddPackage = this.onAddPackage.bind(this);
	}

	componentDidMount(){
		this.loadPackage();
	}

	loadPackage = async() => {
		try{
			this.setState({ loading: true })
			await ClientsSrc.getPackage(this.props.match.params.id).then(
        packages => {
          this.setState({data: packages.profile}, _ => {
            if(packages.profile === 'cliente'){
              let profile = packages.profile
              Cache.setItem('userApp',profile);
            }
          });
          this.setState({
            notDeliveredPackages: packages.packages.filter(p => p.status !== 'Entregado'),
            deliveredPackages: packages.packages.filter(p => p.status === 'Entregado')
          });
					}
			)
   
   
			this.setState({ loading: false });
		} catch (e) {
			console.log(e)
			if (e && e.message) {
				message.error(e.message);
			}
			this.setState({ loading: false })
		}
	};

	getColumns = ()=>{
		let columns = [
			{ title: 'Ref#', dataIndex: 'package_id', key: 'package_id' },
			{ title: 'Tracking', dataIndex: 'tracking', key: 'tracking' },
			{ title: 'Estado', dataIndex: 'status', key: 'status' },
			{ title: 'Peso', dataIndex: 'weight', key: 'weight' },
			{ title: 'Ingreso', dataIndex: 'ing_date', key: 'ing_date' },
			{ title: 'Entrega', dataIndex: 'ent_date', key: 'ent_date' },
			{ title: 'Total', dataIndex: 'total_a_pagar', key: 'total_a_pagar' },
			{ title: 'Pendiente', dataIndex: 'anticipo', key: 'anticipo' }
		];
		return columns
	}

	getData = (data)=>{
		return data.map( (d) => ({
			key: d.package_id,
			package_id: d.package_id,
			tracking:  d.tracking,
			status: d.status,
			weight: d.weight,
			ing_date: d.ing_date,
			ent_date: d.ent_date,
			total_a_pagar: Accounting.formatMoney(d.total_a_pagar, 'Q'),
			anticipo: Accounting.formatMoney(d.total_a_pagar-d.anticipo, 'Q')
		}));
	};

	onBack = () => {
		this.props.history.push('/clients');
	};

	onAddPackage = () => {
		this.props.history.push(`/clients/addpackage`);
	};

	render() {
		const { loading } = this.state;
		return (
			<div>
				<Card loading={loading} title={`Código: ${this.state.data.client_id } - ${this.state.data.name}`} style={{ width: '100%' }}  extra={ (Cache.getItem('userApp').profile === 'cliente') ? <Button type='primary' icon='file-add' title='Registrar paquete' onClick={this.onAddPackage}>Registrar Paquete</Button> : ''} >
					<Row>
						<Col span={12}>
							<DescriptionItem title='Email' content={this.state.data.email} />
						</Col>
						<Col span={12}>
							<DescriptionItem title='Teléfono' content={this.state.data.phone} />
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title='Dirección' content={this.state.data.main_address} />
						</Col>
					</Row>
				</Card>
				<Divider/>
        <h3>Paquetes Pendientes</h3>
        <Table loading={this.props.loading} columns={this.getColumns()} dataSource={this.getData(this.state.notDeliveredPackages)} pagination={false}/>
        <br/>
        <h4>Total Libras Pendientes: {this.state.notDeliveredPackages && this.state.notDeliveredPackages.length > 0 ? this.state.notDeliveredPackages.map(p => p.weight).reduce((a, b) => a + b) : 0}</h4>
        <h4>Monto Total Pendiente: {Accounting.formatMoney(this.state.notDeliveredPackages && this.state.notDeliveredPackages.length > 0 ? this.state.notDeliveredPackages.map(p => p.total_a_pagar - p.anticipo).reduce((a, b) => a + b) : 0, 'Q')}</h4>
        <Divider/>
        <h3>Paquetes Entregados</h3>
        <Table loading={this.props.loading} columns={this.getColumns()} dataSource={this.getData(this.state.deliveredPackages)} pagination={false}/>
			  <br/>
        <h4>Total Libras Entregadas: {this.state.deliveredPackages && this.state.deliveredPackages.length > 0 ? this.state.deliveredPackages.map(p => p.weight).reduce((a, b) => a + b) : 0}</h4>
        <h4>Monto Total Entregado: {Accounting.formatMoney(this.state.deliveredPackages && this.state.deliveredPackages.length > 0 ? this.state.deliveredPackages.map(p => p.total_a_pagar - p.anticipo).reduce((a, b) => a + b) : 0, 'Q')}</h4>
      </div>
		);
	}
}

export default withRouter(ClientViewPackage)