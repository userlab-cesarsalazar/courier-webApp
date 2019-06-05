const dev = {
  baseUrl: 'https://bccmtpjj6g.execute-api.us-east-1.amazonaws.com/dev',
  baseUrlUsers: 'https://bccmtpjj6g.execute-api.us-east-1.amazonaws.com/dev/users',
  baseUrlPackages: 'https://e62jzws75m.execute-api.us-east-1.amazonaws.com/dev/packages',
  reportURL: 'https://e62jzws75m.execute-api.us-east-1.amazonaws.com/dev/reports',
  headers: {
    'content-type': 'application-json',
  },
}

const production = {
  baseUrl: 'https://hhl406mlz8.execute-api.us-east-1.amazonaws.com/dev',
  reportURL: 'https://e62jzws75m.execute-api.us-east-1.amazonaws.com/dev/reports'
  
}
//const localhost = 'http://localhost:3000/'
const local = {
  baseUrl: 'https://hhl406mlz8.execute-api.us-east-1.amazonaws.com/dev',
  reportURL: 'https://e62jzws75m.execute-api.us-east-1.amazonaws.com/dev/reports'
}

const enviroment = env => {
  switch (env) {
    case 'dev':
      return dev
    case 'production':
      return production
    default:
      return local
  }
}

module.exports = {
  stage: enviroment('dev'),
}
