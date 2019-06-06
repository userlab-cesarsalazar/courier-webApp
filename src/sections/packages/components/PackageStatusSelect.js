//Libs
import React from 'react';

//Components
import {
  Select
} from 'antd';

const options = [
  { value: 'En Transito', label: 'En Transito' },
  { value: 'Listo para Entrega en Domicilio', label: 'Listo para Entrega en Domicilio' },
  { value: 'Entregado', label: 'Entregado' },
  { value: 'Entregado con saldo pendiente', label: 'Entregado con saldo pendiente' }
]

class PackageStatusSelect extends React.Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Select
        {...this.props}
      >
        {options.map((o, i) => <Select.Option key={i} value={o.value}>{o.label}</Select.Option>)}
      </Select>
    );
  }
}

export default PackageStatusSelect
