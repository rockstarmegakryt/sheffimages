export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const jsonRequest = await request.json();
        const authCode = jsonRequest.authCode;
        const username = jsonRequest.username;
        const password = jsonRequest.password;
        
        // Проверяем BASIC авторизацию (логин/пароль)
        const basicUser = env.BASIC_USER || 'admin';
        const basicPass = env.BASIC_PASS || 'cfbed';
        
        if (username === basicUser && password === basicPass) {
            return new Response('Login success', { 
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Проверяем authCode (для обратной совместимости)
        const rightAuthCode = env.AUTH_CODE || '';
        
        if (rightAuthCode && authCode === rightAuthCode) {
            return new Response('Login success', { 
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response('Unauthorized', { status: 401 });
        
    } catch (error) {
        return new Response('Error', { status: 500 });
    }
}
