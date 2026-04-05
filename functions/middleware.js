export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    
    const protectedPaths = ['/list', '/dashboard', '/api/list', '/api/manage'];
    
    if (protectedPaths.some(path => url.pathname.startsWith(path))) {
        const auth = request.headers.get('Authorization');
        
        if (!auth) {
            return new Response('Unauthorized', {
                status: 401,
                headers: { 'WWW-Authenticate': 'Basic realm="Protected"' }
            });
        }
        
        const base64 = auth.split(' ')[1];
        const [user, pass] = atob(base64).split(':');
        
        if (user !== 'admin' || pass !== 'bdef') {
            return new Response('Forbidden', { status: 403 });
        }
    }
    
    return next();
}
