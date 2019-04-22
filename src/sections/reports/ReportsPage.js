//Libs
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Select, Button , Card , DatePicker , Checkbox, Col , Row , Radio} from 'antd';
//Api

//Components

//Styles

//const
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class ReportsPage extends Component {

  constructor(props){
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      radioValue : 'today'
    }
  }

  onSearch = () => {
  };

  handleSelectChange = (e) => {
    this.setState({radioValue: e.target.value});
  };

  render() {
    return (
      <div>
        <Card title="Reportes" style={{ width: '100%' }}>
          <Form>
            <Row>
              <Col span={12} offset = {3}>
                <Radio.Group defaultValue="today" buttonStyle="solid" onChange={this.handleSelectChange} className="radio-margin">
                  <Radio.Button value="today">Hoy</Radio.Button>
                  <Radio.Button value="week">Semana actual</Radio.Button>
                  <Radio.Button value="month">Mes actual</Radio.Button>
                  <Radio.Button value="custom">Personalizar</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={12}>
                <div className={this.state.radioValue !== 'custom' ? 'hidden' : ''}>
                  <FormItem label="Rango de fechas" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                    <RangePicker />
                  </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="Cod. Cliente" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Nombre Cliente" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Nro. Tracking" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Estado" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
                  <Select placeholder="Seleccione">
                    <Option value="registrado">Registrado</Option>
                    <Option value="transito">En transito guatemala</Option>
                    <Option value="recibidofi">Recibido en oficina</Option>
                    <Option value="ruta">En ruta</Option>
                    <Option value="entregado">Entregado</Option>
                    <Option value="tba">TBA</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <FormItem wrapperCol={{ span: 6, offset: 9 }}>
              <Button type="primary" onClick={this.onSearch}>Buscar</Button>
            </FormItem>

          </Form>
        </Card>
      </div>
    );
  }
}

export default withRouter(ReportsPage)