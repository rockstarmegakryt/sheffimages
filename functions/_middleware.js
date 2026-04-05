export async function onRequest(context) {
    const { request, next } = context;
    
    const auth = request.headers.get('Authorization');
    
    if (!auth) {
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Gallery"'
            }
        });
    }
    
    const base64 = auth.split(' ')[1];
    const [user, pass] = atob(base64).split(':');
    
    const validUser = 'admin';
    const validPass = 'Bidenchort7!';
    
    if (user !== validUser || pass !== validPass) {
        return new Response('Forbidden', { status: 403 });
    }
    
    return next();
}
