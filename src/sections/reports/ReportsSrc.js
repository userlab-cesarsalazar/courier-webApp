import api from '../../config/api'
import { stage } from '../../config/credentials'

const url = stage.reportURL;
const totals = (params) => api.get(`${url}?date=${params.date}&total=${params.total}`);
const closedReport = (params) => api.get(`${url}?date=${params.date}`);

const entriesTotal = (params) => api.get(`${url}/entries?date=${params.date}&total=${params.total}`);
const entriesDetails = (params) => api.get(`${url}/entries?date=${params.date}`);

const routeTotal = (params) => api.get(`${url}/route?total=${params.total}`);
const routeDetails = () => api.get(`${url}/route`);

const warehouseTotal = (params) => api.get(`${url}/warehouse?total=${params.total}`);
const warehouseDetails = () => api.get(`${url}/warehouse`);

export default {
  totals,
  closedReport,
  entriesDetails,
  entriesTotal,
  routeTotal,
  routeDetails,
  warehouseTotal,
  warehouseDetails
}
