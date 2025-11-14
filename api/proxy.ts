import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // API 서버 URL (Vercel 환경 변수에서 가져오거나 기본값 사용)
  const apiUrl = process.env.VITE_API_URL;
  
  // vercel.json rewrites로 path가 쿼리 파라미터로 전달됨
  // /api/auth/kakao/login → /api/proxy?path=auth/kakao/login
  const pathParam = req.query.path;
  const path = typeof pathParam === 'string' ? pathParam : (Array.isArray(pathParam) ? pathParam.join('/') : '');
  const targetUrl = `${apiUrl}/api/${path}`;

  // 쿼리 파라미터 추가 (path 제외)
  const { path: _, ...queryParams } = req.query;
  const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
  const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;
  
  console.log('Proxy request:', {
    method: req.method,
    pathParam,
    path,
    targetUrl: finalUrl,
  });

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
    console.error('Proxy error:', {
      message: error.message,
      stack: error.stack,
      targetUrl: finalUrl,
    });
    res.status(500).json({ 
      isSuccess: false,
      message: error.message || 'Proxy error',
      code: 'PROXY_ERROR'
    });
  }
}

