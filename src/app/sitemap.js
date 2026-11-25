export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://afterclass.in';
  const lastModified = new Date();

  const routes = [
    '',
    '/clubs',
    '/dhanda',
    '/events',
    '/opportunities',
    '/notices',
    '/developers',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' || route === '/dhanda' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/dhanda' || route === '/clubs' ? 0.9 : 0.7,
  }));
}

