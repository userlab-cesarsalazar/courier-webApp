//import api from '../../config/api'

const resource = '/service'

const list = async() => {

  //let locationFilter = ''

 // if (location) {
 //   locationFilter = '/location/'+location.value
 // }

  const packages = [] //= await api.makeRequestApi(locationFilter+resource, 'GET')

  return packages
}

// async function create(data) {
//   const service = await api.makeRequestApi(resource, 'POST', data)
//   return service
// }
//
// async function _delete(data) {
//   const service = await api.makeRequestApi(resource + '/' + data, 'DELETE')
//   return service
// }
//
// async function detail(data) {
//   const service = await api.makeRequestApi(resource + '/' + data, 'GET')
//   return service
// }
//
// async function edit(id, data) {
//   const service = await api.makeRequestApi(resource + '/' + id, 'PUT', data)
//   return service
// }

export default {
  list,
//  create,
//  _delete,
//  detail,
//  edit,
}
