import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // API 서버 URL
  const apiUrl = process.env.VITE_API_URL;
  
  // 요청 경로 추출
  // /api/proxy/auth/kakao/login -> /api/auth/kakao/login
  const path = req.url?.startsWith('/api/proxy') 
    ? req.url.replace('/api/proxy', '') 
    : req.url || '';
  
  const targetUrl = `${apiUrl}${path}`;

  // 쿼리 파라미터 추가
  const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
  const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

  try {
    // 요청 본문 처리
    let body: string | undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      if (req.body) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      }
    }

    const response = await fetch(finalUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization as string,
        }),
      },
      body,
    });

    const data = await response.json();
    
    // 응답 헤더 복사
    res.setHeader('Content-Type', 'application/json');
    
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      isSuccess: false,
      message: error.message || 'Proxy error',
      code: 'PROXY_ERROR'
    });
  }
}

