import api from '../../config/api'
import { stage } from '../../config/credentials'

const url = stage.reportURL;
const totals = (params) => api.get(`${url}?date=${params.date}&total=${params.total}`);
const closedReport = (params) => api.get(`${url}?date=${params.date}`);

const entriesTotal = (params) => api.get(`${url}/entries?date=${params.date}&total=${params.total}`);
const entriesDetails = (params) => api.get(`${url}/entries?date=${params.date}`);


export default {
  totals,
  closedReport,
  entriesDetails,
  entriesTotal
}
