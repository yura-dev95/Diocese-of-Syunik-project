import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSeo } from '../../constants/seo';

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function Seo() {
  const location = useLocation();

  useEffect(() => {
    const seo = resolveSeo(location.pathname);
    const canonical = `${window.location.origin}${location.pathname}`;
    const image = seo.image ? new URL(seo.image, window.location.origin).toString() : undefined;

    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: location.pathname.startsWith('/admin') ? 'noindex,nofollow' : 'index,follow' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    if (image) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
    }
    upsertLink('canonical', canonical);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Diocese of Syunik',
      url: window.location.origin,
      email: 'info@syunikdiocese.am',
      address: 'Goris, Syunik Province, Armenia',
    };
    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="organization"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'organization';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [location.pathname]);

  return null;
}
