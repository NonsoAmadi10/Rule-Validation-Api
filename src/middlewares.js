import Response from './utils';



export const sanitizer =(req, res, next) => {
    const {rule, data } = req.body;

    if(!rule) return Response('rule is required.','error',null, res);
    if(!data) return Response('data is required.', 'error', null, res);

    return next();
}

