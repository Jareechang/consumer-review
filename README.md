# Dev News aggregate

centralized places to Get aggregated of information of the dev community.

### Getting started

**exporting env:**

create a **.env** file with the twitter app exports (consumer_key, consumer_secret, access_token, access_token_secret)

```shell
export $(cat .env | grep -v ^# | xargs)
```

##### Commands

**Server:** `yarn start-server`     
**Client:** `yarn start-client` (default port: 3000)

Upon running, visit http://localhost:8080.

### Technologies

##### Client:
* React.js
* Alt.js (Flux)
* CSS Modules
* ES6/ES7
  - Decorator for Alt.js
* React Router 4
* Webpack 2
  - Async Route loading
* Seamless Immutable

##### Server:
* Node.js
  - Hot Reload (HMR)
  - Server rendering (SSR)
  - Backend REST API
