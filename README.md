### e-RATOS (frontend)
This is React.js-based frontend for [e-Ratos](https://github.com/Popov85/ratos3) 
(Embeddable Remote Automatised Teaching and Controlling System) project.
It consists of multiple modules (entry points):
- Session (session.js)
- Student (student.js)
- Staff (staff.js)

All output .js files are supposed to be available as same-origin scripts due to LTI v1.0 limitations 
(all the logic handling authentication is implemented at the backend in Spring Security framework).
This repo as a separated one is solely for the sake of development convenience, 
thus a separate deployment of this front-end is not implied.


#### Technologies
- React;
- Redux;
- Bootstrap;
- HTML;
- Babel;
- Node.js (solely for development), npm
- Parcel bundler (based on Webpack).

#### Build and deployment
For development:
Launches index.html in browser and tracks changes in js.files

```
npm start
```
For debugging:
Creates build in /dist folder with all the entry points not minimized for debugging

```
npm run dev
```
For production:
Creates build in /dist folder with all the entry points minimized for production

```
npm run prod
```

#### Integration with backend server
After creating the bunch of output files (img, css, js, etc.) for production in /dist folder, manually copy these files to backend folder [/static](https://github.com/Popov85/ratos3/tree/master/src/main/resources);
An aggregate automatised way to do it is under consideration.


