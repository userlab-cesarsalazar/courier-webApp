import React from 'react';
import { withRouter } from 'react-router';
import { Card, message, Divider, Col, Row, Table } from 'antd';

import ClientsSrc from '../ClientsSrc';

const DescriptionItem = ({ title, content }) => (
	<div className="desc-item-div">
		<p className="desc-item-p">{title}:</p>
		{content}
	</div>
);

class ClientViewPackage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			packages: [],
			loading: true,
			errors: {}
		};

		this.getColumns = this.getColumns.bind(this);
		this.getData = this.getData.bind(this);
		this.loadPackage = this.loadPackage.bind(this);
	}

	componentDidMount = async() =>{

		let profile = await ClientsSrc.getProfile()
    this.setState({ data: profile[0] })

		await this.loadPackage(profile[0].client_id);
	}

	loadPackage = async client_id => {
		try {
			let packages = await ClientsSrc.getPackage(client_id)
      console.log(packages)
      this.setState({ packages: packages.packages, loading: false});
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
			{ title: 'Descripcion', dataIndex: 'tracking', key: 'tracking' },
			{ title: 'Estado', dataIndex: 'entregado', key: 'entregado' },
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
			entregado: (d.entregado === 1) ? 'Entregado' :'',
			weight: d.weight,
			ing_date: d.ing_date,
			ent_date: d.ent_date,
			total_a_pagar: d.total_a_pagar,
			anticipo: d.total_a_pagar-d.anticipo
		}));
	};


	onBack = () => {
		this.props.history.push('/clients');
	};

	render() {
		const { loading } = this.state;
		return (
			<div>
				<Card loading={loading} title={`Codigo: ${this.state.data.client_id} - ${this.state.data.name}`} style={{ width: '100%' }}>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Email" content={this.state.data.email} />
						</Col>
						<Col span={12}>
							<DescriptionItem title="Telefono" content={this.state.data.phone} />
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<DescriptionItem title="Direccion" content={this.state.data.main_address} />
						</Col>
					</Row>
				</Card>
				<Divider/>
				<Table loading={this.props.loading} columns={this.getColumns()} dataSource={this.getData(this.state.packages)} pagination={false}/>
			</div>
		);
	}
}

export default withRouter(ClientViewPackage)