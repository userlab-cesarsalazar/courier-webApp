//Libs
import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { menuOptions } from './commons/consts/Menu';
import moment from 'moment';
import { withUserDefaults } from './commons/components/UserDefaults';

//Services

//Pages
//DashBoard
import DashboardPage from './sections/dashboard/DashboardPage';

//Clients
import ClientsPage from './sections/clients/ClientsPage';

//Packages
import PackagesPage from './sections/packages/PackagesPage';

//Components
import UISpinner from './commons/components/UISpinner';

import {
  Layout,
  Menu,
  Icon,
  Avatar
} from 'antd';


const {
  Header,
  Content,
  Footer,
  Sider
} = Layout;

const SubMenu = Menu.SubMenu;

//Const

const routes = [
  { route: '/dashboard', component: DashboardPage },
  { route: '/clients', component: ClientsPage },
  { route: '/packages', component: PackagesPage },
];

class Router extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false,
      login: false,
      loading: false,
      username: '',
      UserStorage: null,
      menuLoading: true,
      menuOptions: null,
      routes: [],
      year: moment().format('YYYY')
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  changeLanguage = language => {
    this.props.userDefaults.changeLanguage(language);
  };

  render() {
    const {
      language,
      getWord
    } = this.props.userDefaults;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={240}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <header className='App-header'>
            <Avatar
              src={'http://traestodo.com/traestodo17/assets/img/logo/logo-traestodo.png'}
              shape={'square'}
              size={this.state.collapsed ? 40 : 80}
            />
            {!this.state.collapsed && <h2 className='App-version'>v0.0.2</h2>}
          </header>

          <br/>

          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[this.props.location && this.props.location.pathname]}
          >
            {menuOptions && menuOptions.length > 0 && menuOptions.map((option, i) =>

              option.sections && option.sections.length > 0 ?

                <SubMenu key={`menu${i}`} title={<span><Icon type={option.icon}/><span>{option.name}</span></span>}>
                  {option.sections && option.sections.length > 0 && option.sections.map(section => {

                    return section.menus && section.menus.length > 0 && section.menus.map(menu =>
                      <Menu.Item key={menu.route}>
                        <Link to={menu.route}>
                          <span>{menu.name}</span>
                        </Link>
                      </Menu.Item>
                    )
                  })}
                </SubMenu>
                :
                <Menu.Item key={option.route}>
                  <Link to={option.route}>
                    <Icon type={option.icon}/>
                    <span>{getWord(option.name)}</span>
                  </Link>
                </Menu.Item>
            )}
          </Menu>
        </Sider>

        <Layout>
          <Header style={{background: '#fff', padding: 0}}>

            <div className={{display: 'flex', paddingRight: '16px'}}>
              <Menu mode='horizontal'>
                <SubMenu style={{float: 'right'}} title={<span><Icon type='user'/>{this.state.username}</span>}>
                  <Menu.Item key='logout' onClick={this.signOut}>
                    Sign out
                  </Menu.Item>
                  <Menu.Item key='language' onClick={_ => this.changeLanguage(language === 'EN' ? 'ES' : 'EN')}>
                    {language === 'EN' ? 'Español' : 'English'}
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </div>

          </Header>

          <Content style={{margin: '0 16px'}}>

            <div style={{padding: 24, minHeight: 360}}>
              {this.state.loading ?
                <UISpinner/>
                :
                <Switch>
                  {routes.map((r, i) =>
                    <Route exact key={i} path={r.route} component={r.component}/>
                  )}
                  <Redirect to={routes && routes.length > 0 ? routes[0].route : '/'}/>
                </Switch>
              }
            </div>
          </Content>

          <Footer style={{textAlign: 'center'}}>
            TraesTodo ©{this.state.year}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default withUserDefaults(Router)