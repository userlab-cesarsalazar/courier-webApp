
//Data for menu
const menuOptions = [{
  name: 'DASHBOARD',              //Required
  key: 'dashboard',               //Required
  icon: 'dashboard',              //Required
  route: '/dashboard',            //Required if doesn't have sections
  possiblePermissions: ['read'],  //Required if doesn't have sections
  requiredPermissions: ['read']   //Required if doesn't have sections
}, {
  name: 'USERS',
  key: 'users',
  icon: 'team',
  route: '/users',
  possiblePermissions: [ 'read', 'add', 'edit', 'delete' ]
},{
  name: 'CLIENTS',
  key: 'clients',
  icon: 'team',
  route: '/clients',
  possiblePermissions: [ 'read', 'add', 'edit', 'delete' ]
}, {
  name: 'PACKAGES',
  key: 'packages',
  icon: 'gift',
  route: '/packages',
  possiblePermissions: [ 'read', 'add', 'edit', 'delete' ]
}, {
  name: 'REPORTS',
  key: 'reports',
  icon: 'area-chart',
  route: '/reports',
  possiblePermissions: ['read'],  //Required if doesn't have sections
  requiredPermissions: ['read']   //Required if doesn't have sections
}];

export {
  menuOptions
}