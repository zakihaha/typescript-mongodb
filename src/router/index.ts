import express from 'express';
const router = express.Router();

import authentication from './authentication';

export default (): express.Router => {
    authentication(router);

    return router;
}