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
For debugging:<br>
[Make sure to switch dev [profile](https://github.com/Popov85/ratos3-frontend/blob/master/src/profile.js) to true ]
Creates build in /dist folder with all the entry points not minimized for debugging

```
npm run dev
```
For production:<br>
[Make sure to switch dev [profile](https://github.com/Popov85/ratos3-frontend/blob/master/src/profile.js) to false ]
Creates build in /dist folder with all the entry points minimized for production

```
npm run prod
```

#### Integration with backend server
After creating the bunch of output files (img, css, js, etc.) for production in /dist folder, manually copy these files to backend folder [/static](https://github.com/Popov85/ratos3/tree/master/src/main/resources);
An aggregate automatised way to do it is under consideration.


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





