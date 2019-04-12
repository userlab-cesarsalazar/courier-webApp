
//Data for menu
const menuOptions = [{
  name: 'Dashboard',              //Required
  key: 'dashboard',               //Required
  icon: 'dashboard',              //Required
  route: '/dashboard',            //Required if doesn't have sections
  possiblePermissions: ['read'],  //Required if doesn't have sections
  requiredPermissions: ['read']   //Required if doesn't have sections
}, {
  name: 'Clients',
  key: 'clients',
  icon: 'team',
  route: '/clients',
  possiblePermissions: [ 'read', 'add', 'edit', 'delete' ]
}, {
  name: 'Packages',
  key: 'packages',
  icon: 'gift',
  route: '/packages',
  possiblePermissions: [ 'read', 'add', 'edit', 'delete' ]
}];

export {
  menuOptions
}