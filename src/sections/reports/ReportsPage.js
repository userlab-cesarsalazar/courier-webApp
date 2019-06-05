//Libs
import React, { Component } from 'react'
import { withRouter } from 'react-router'

//Api
import ClientsSrc from "../clients/ClientsSrc";

//Components
import UIDateSelect from '../../commons/components/UIDateSelect'
import UIIntegerInput from '../../commons/components/UIIntegerInput'
import ClientSearchSelect from '../clients/components/ClientSearchSelect'

import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Col,
  Row,
  message
} from 'antd'
//Styles

//const
const FormItem = Form.Item
const Option = Select.Option


class ReportsPage extends Component {
  constructor(props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
    this.state = {
      radioValue: 'today',
      dateRange: null
    }
  }

  onSearch = () => {}

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
      dateRange,
      client_id,
      client
    } = this.state

    return (
      <div>
        <Card title='Reportes' style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span={24}>
                <FormItem label='Fecha' labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <UIDateSelect
                    onChange={value => this.handleChange('dateRange', value)}
                    value={dateRange}
                    placeholder={'Fecha'}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='Cod. Cliente' labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <UIIntegerInput
                    onBlur={this.handleBlur}
                    onChange={e => this.handleChange('client_id', e.target.value)}
                    value={client_id}
                    placeholder='Cod. Cliente'
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='Nombre Cliente' labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <ClientSearchSelect
                    value={client}
                    onChange={value => this.handleChange('client', value)}
                  />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='Nro. Tracking' labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Input placeholder={'Nro. Tracking'} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='Estado' labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Select placeholder='Seleccione'>
                    <Option value='registrado'>Registrado</Option>
                    <Option value='transito'>En transito guatemala</Option>
                    <Option value='recibidofi'>Recibido en oficina</Option>
                    <Option value='ruta'>En ruta</Option>
                    <Option value='entregado'>Entregado</Option>
                    <Option value='tba'>TBA</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <FormItem wrapperCol={{ span: 6, offset: 9 }}>
              <Button type='primary' onClick={this.onSearch}>
                Buscar
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

export default withRouter(ReportsPage)
