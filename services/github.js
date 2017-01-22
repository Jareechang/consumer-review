/* External  */
const request = require('request')

/* Github Url Definitions */
const API_ROOT = 'https://api.github.com/search/users'
const API_QUERY = API_ROOT + '?q='

const popularParam = '+repos:%3E42+followers:%3E1000'

const queryByNameUrl = name =>
  API_QUERY + name

const queryByPopularUserUrl = name =>
  queryByNameUrl(name) + popularParam

/* Request Options */
const options = name => {
  return {
    url: queryByPopularUserUrl(name),
    headers: {
      'User-Agent': 'request'
    }
  }
}

const queryPopularUserOnly = function(name) {
  return new Promise(function(resolve, reject) {
    request(options(name), function(err, res, body) {
      if (err && res.statusCode !== 200 ) {
        reject(err)
      }
      resolve(body)
    })
  })
}

//queryPopularUserOnly('addy')
