import api from '../../config/api';
import { stage } from '../../config/credentials';

const url = stage.baseUrlPackages;

const list = () => api.get(url);

const create = _package => api.post(url, _package);

export default {
  create,
  list
}
