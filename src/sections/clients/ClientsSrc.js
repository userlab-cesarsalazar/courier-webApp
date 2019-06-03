import api from '../../config/api'
import { stage } from '../../config/credentials'

const url = stage.baseUrlUsers;
const baseUrl = stage.baseUrl;

const list = (params) => api.get(url+'?type=cliente'+params);
const getProfile = () => api.get(url+'/profile');
const create = _users => api.post(url, _users);
const update = (_users,user_id) => api.put(url+'/'+user_id, _users);

const getByClientId = client_id => api.get(url+'?client_id='+client_id);

const getByName = name => api.get(`${baseUrl}/search?str=${name}`)

export default {
  list,
  create,
  update,
  getProfile,
  getByClientId,
  getByName
}
