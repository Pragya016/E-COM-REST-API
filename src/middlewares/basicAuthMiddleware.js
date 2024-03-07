import { UserModel } from "../features/user/userModel.js";

const basicAuth = (req, res, next) => {

    // check if user is authorised or not
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Not authorized!');
    }

    // extract credentials
    const basic64Credentials = authHeader.replace('Basic', '');

    // decode credentials
    const decodedCredentials = Buffer.from(basic64Credentials, 'base64').toString('utf-8'); //[username : password]

    const creds = decodedCredentials.split(':')
    const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

    if (!user) {
        return res.status(401).send('incorrect credentials!');
    }

    next();
}

export default basicAuth;