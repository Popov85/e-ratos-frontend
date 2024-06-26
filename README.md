### e-RATOS (frontend)
This is React.js-based frontend for [e-Ratos](https://github.com/Popov85/ratos3) 
(Embeddable Remote Automatised Teaching and Controlling System) project.
It consists of multiple logical modules (within single entry point):
- Session
- Student
- Staff

All output .js files are supposed to be available as same-origin scripts due to LTI v1.0 limitations 
(all the logic handling authentication is implemented at the backend in Spring Security framework).
So, make sure that proxy is set up properly to be available at the same URL as BE API:

- https://domain-name.com for FE
- https://domain-name.com/api for BE (API calls)


#### Technologies
- Node.js (v20.12.2 [LTS](https://github.com/nodejs/node/releases/tag/v20.12.2), for dev);
- Npm (v10.5.0);
- Parcel (v2.12.0+ Babel).
- React (v16.12.0);
- Redux (v4.0.4);
- Bootstrap (v4.3.1);
- Bootstrap [tables](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/about.html)


#### Local development:
Make sure to set (.env at src/ root)

`# Define the profile. Allowed values: 'dev', 'prod',

E_RATOS_PROFILE=dev`

`# Define the base URL for the API or application. Allowed values: http://localhost:1234, https://www.e-ratos.xyz

E_RATOS_BASE_URL=http://localhost:1234`

This set-up populates some test data out of the box to redux storage.

##### Local development (proxying):

Please, see proxy set-up for Parcel at [.proxyrc.js](https://parceljs.org/features/development/)
The key idea is that for local development with BE server available at http://localhiost:8080
all you http requests were proxying to that URL from the default Parcel URL http://localhost:1234
not causing any CORS issues and preserving http session cookies at localhost;


#### Build and deployment
For development:
Launches index.html in browser and tracks changes in .js files

```
npm start
```
For debugging:<br>
[Make sure to switch profile at .env file to 'dev' ]
Creates build in /dist folder with all the entry points not minimized for debugging

```
npm run dev
```
For production:<br>
[Make sure to switch profile at .env file to 'prod' ]
Creates build in /dist folder with all the entry points minimized for production

```
npm run prod
```

#### Dockerize

 - Prepare /dist folder for prod (make sure to set-up proper values in .env)
 - Build Docker image from Dockerfile:

```
docker build -t e-ratos-frontend .
```

- Create a container from the image:

```
docker run -d -p 80:80 e-ratos-frontend
```

### Configure nginx

nginx.conf is required to respond to any of the app's URL paths, like /login, /staff, etc.

As described here: [info](https://medium.com/@berkslv/how-to-deploy-a-react-app-with-nginx-using-docker-with-react-router-dom-628d2d86d30a)

#### TODO
#####  Session module
1. Add QuestionFBSQ (normal, answered, checked, etc.) [see Java abstraction](https://github.com/Popov85/ratos3/blob/master/src/main/java/ua/edu/ratos/dao/entity/question/QuestionFBSQ.java);
1. Add QuestionFBMQ (normal, answered, checked, etc.) [see Java abstraction](https://github.com/Popov85/ratos3/blob/master/src/main/java/ua/edu/ratos/dao/entity/question/QuestionFBMQ.java);
1. Add QuestionMQ (normal, answered, checked, etc.) [see Java abstraction](https://github.com/Popov85/ratos3/blob/master/src/main/java/ua/edu/ratos/dao/entity/question/QuestionMQ.java);
1. Add QuestionSQ (normal, answered, checked, etc.) [see Java abstraction](https://github.com/Popov85/ratos3/blob/master/src/main/java/ua/edu/ratos/dao/entity/question/QuestionSQ.java);
#####  Staff module
1. Inside Scheme, add CRUD on Options;
2. Inside Scheme, add CRUD on Gradings (3 types);
3. Inside Scheme add student groups;
4. Add students groups management (create group, add member, look-up student, etc.);
5. Add mistake reports management (alerts about reports, fixing mistakes, etc.)
##### Student module
1. Create this module;
2. Add student results review across departments;
3. Add student preserved sessions management;
4. Add student starred questions management;
5. Add student complaints management;
6. Add student gamification panel (current status name, total points {weekly, monthly, total}, TOP-10 students weekly, all times, etc.)

##### For implementors
Guys, please make sure to cross the finished items out.





