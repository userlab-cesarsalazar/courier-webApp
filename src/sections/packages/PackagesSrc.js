import api from '../../config/api';
import { stage } from '../../config/credentials';

const url = stage.baseUrlPackages;

const list = () => api.get(url);

const create = _package => api.post(url, _package);

const get = package_id => api.get(url+'/'+package_id);

const update = (package_id, _package) => api.put(url+'/'+package_id, _package);

const getByFilter = pararms => api.get(url+'?tracking='+pararms.tracking+'&client_id='+pararms.client_id);

export default {
  create,
  get,
  list,
  update,
  getByFilter
}
