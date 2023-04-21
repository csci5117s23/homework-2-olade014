
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string } from 'yup';

const todoYup = object({
    userId: string().required(),
    name: string().required(),
    done: boolean().default(false),
    createdOn: date().default(() => new Date()),
})

//From Tech-Stack-2-Kluver-Demo
const userAuth = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.replace('Bearer ','');
        // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
        const token_parsed = jwtDecode(token);
        req.user_token = token_parsed;
      }
      next();
    } catch (error) {
      next(error);
    } 
  }
app.use(userAuth)




// Use Crudlify to create a REST API for any collection
// crudlify(app)
crudlify(app, {todo: todoYup})

// bind to serverless runtime
export default app.init();