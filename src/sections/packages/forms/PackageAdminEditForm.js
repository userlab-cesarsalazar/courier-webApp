//Libs
import React from 'react';
import { withRouter } from 'react-router';
import Accounting from 'accounting';

//Api
import PackagesSrc from '../PackagesSrc';
import ClientsSrc from '../../clients/ClientsSrc';

//Components
import UIIntegerInput from '../../../commons/components/UIIntegerInput';
import ClientSearchSelect from '../../clients/components/ClientSearchSelect';

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row
} from 'antd';

const FormItem = Form.Item;

const initialState = {
  errors: {},
  loading: true,
  client_id: null,
  client_data: null,
  weight: null,
  tracking_number: '',
  description: 'Paquete'
}

class PackageAdminEditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      PackagesSrc.get(this.props.match.params.id)
        .then(_package => {
          this.setState({
            client_id: String(_package[0].client_id),
            tracking_number: _package[0].tracking,
            description: _package[0].description,
            weight: _package[0].weight || 1
          })
          return _package[0]
        })
        .then(_package => this.searchClient(_package.client_id))
        .then(_ => this.setState({ loading: false }))
        .catch(e => {
          this.setState({ loading: false });
          message.error(e.message);
        })

    }
  }

  handleChange = (name, value) => {

    let otherState = {}

    if(name === 'client' && value) {
      this.searchClient(value)
      otherState = { client_id : undefined }
    }

    if(name === 'client_id') {
      otherState = {
        client: undefined,
        client_data: undefined
      }
    }

    this.setState({ [name]: value, ...otherState })
  }

  onSave = async(e) => {

    try {
      e.preventDefault()

      this.setState({ loading: true })
      await this.validateFields()

      let _package = {
        tracking: this.state.tracking_number,
        client_id: this.state.client_data.client_id,
        weight: this.state.weight,
        description: this.state.description,
        category_id: 1,
        cuota: this.state.client_data.cuota,
        status: 0,
      }

      await PackagesSrc.update(this.props.match.params.id, _package);

      message.success('Actualizado satisfactoriamente');

      this.props.history.push('/packages')

    } catch (e) {

      message.error(e && e.message ? e.message : 'Error al guardar el paquete');

      this.setState({ loading: false });
    }
  };

  onBack = () => {
    this.props.history.push('/packages');
  };

  validateFields = async() => {

    try {

      let errors = {}

      if(!this.state.client_data) {
        errors.client = 'Es necesario buscar al cliente'
      }

      if(!this.state.tracking_number) {
        errors.tracking_number = 'El nro. de tracking es requerido'
      }

      if(!this.state.description) {
        errors.description = 'La descripcion es requerida'
      }

      if(!this.state.weight) {
        errors.weight = 'El peso es requerido'
      }

      this.setState({ errors })

      if (Object.keys(errors).length > 0)
        throw errors;

      return false

    } catch (errors) {
      throw errors;
    }
  }

  handleBlur = () => {
    this.validateFields()
  }

  searchClient = async client_id => {

    try {

      await this.setState({ clientLoading: true });

      let client = await ClientsSrc.getByClientId(client_id);

      await this.setState({ clientLoading: false, client_data: client[0] });

      this.handleBlur()

    } catch (e) {
      this.setState({ clientLoading: false });
      message.error(e);
    }
  }

  render() {
    const {
      loading,
      clientLoading,
      errors,
      tracking_number,
      description,
      weight,
      client_id,
      client,
      client_data
    } = this.state;

    return (
      <div>
        <Card title='Editar Paquete' style={{ width: '100%' }} loading={loading}>
          <Form>
            <Form.Item
              required
              validateStatus={errors.client && 'error'}
              help={errors.client}
              label={'Codigo del Cliente'}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Row gutter={24}>
                <Col span={20}>
                  <UIIntegerInput
                    onBlur={this.handleBlur}
                    onChange={e => this.handleChange('client_id', e.target.value)}
                    disabled={clientLoading}
                    value={client_id}
                    placeholder='Codigo del Cliente'
                  />
                </Col>
                <Col span={4}>
                  <Button
                    loading={clientLoading}
                    type='primary'
                    onClick={_ => this.searchClient(client_id)}
                  >
                    Buscar
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              required
              validateStatus={errors.client && 'error'}
              help={errors.client}
              label={'Cliente'}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <ClientSearchSelect
                onBlur={this.handleBlur}
                value={client}
                onChange={value => this.handleChange('client', value)}
              />

            </Form.Item>
            {client_data &&
            <div>
              <Form.Item
                label='Codigo del Cliente'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {client_data.client_id}
              </Form.Item>

              <Form.Item
                label='Nombre del Cliente'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {client_data.name}
              </Form.Item>

              <Form.Item
                label='Entrega'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {client_data.entrega}
              </Form.Item>

              <Form.Item
                label='Tarifa'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 12 }}
              >
                {Accounting.formatMoney(client_data.cuota, 'Q')}
              </Form.Item>

            </div>
            }

            <Form.Item
              required
              validateStatus={errors.tracking_number && 'error'}
              help={errors.tracking_number}
              label={'Nro. Tracking'}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                onBlur={this.handleBlur}
                placeholder={'Nro. Tracking'}
                value={tracking_number}
                onChange={e => this.handleChange('tracking_number', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              required
              validateStatus={errors.weight && 'error'}
              help={errors.weight}
              label={'Peso (Libras)'}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <InputNumber
                onBlur={this.handleBlur}
                style={{ width: '100%' }}
                placeholder={'Peso (Libras)'}
                value={weight}
                onChange={value => this.handleChange('weight', value)}
              />
            </Form.Item>

            <Form.Item
              required
              validateStatus={errors.description && 'error'}
              help={errors.description}
              label={'Descripcion'}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                onBlur={this.handleBlur}
                placeholder={'Descripcion'}
                value={description}
                onChange={e => this.handleChange('description', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label='Total a Pagar'
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {client_data && !isNaN(weight) ? Accounting.formatMoney(client_data.cuota * weight, 'Q') : 'Q0'}
            </Form.Item>

            <FormItem wrapperCol={{ span: 6, offset: 9 }}>
              <Button type='primary' onClick={this.onSave} loading={loading}>Actualizar</Button>
              <Button type='danger' className='btn-separator' onClick={this.onBack} loading={loading}>Regresar</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedCreateForm = Form.create()(PackageAdminEditForm);
export default withRouter(WrappedCreateForm)