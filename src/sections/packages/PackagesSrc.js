import api from '../../config/api'
import { stage } from '../../config/credentials'

const url = stage.baseUrlPackages;

const list = () => api.get(url)

export default {
    list,
}
