import api from '../../config/api'
import { stage } from '../../config/credentials'

const url = stage.baseUrlUsers;

const list = () => api.get(url)

export default {
    list,
}
