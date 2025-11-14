import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // API 서버 URL (Vercel 환경 변수에서 가져오거나 기본값 사용)
  const apiUrl = process.env.VITE_API_URL || "http://localhost:8080";
  
  // 요청 경로 추출
  // vercel.json의 rewrites로 /api/:path*가 /api/proxy로 라우팅됨
  // req.url에는 원래 경로가 포함됨 (예: /api/auth/kakao/login)
  // 또는 /api/proxy로 올 수도 있으므로 확인 필요
  let path = req.url || '';
  
  // /api/proxy로 시작하면 제거 (rewrites로 인한 중복 방지)
  if (path.startsWith('/api/proxy')) {
    path = path.replace('/api/proxy', '');
  }
  
  // 경로가 비어있으면 /api로 시작하도록 (일반적으로는 이미 /api로 시작함)
  if (!path.startsWith('/api')) {
    path = `/api${path}`;
  }
  
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

