/**
 * ctrmsl-site — static assets + edge HTTPS enforcement.
 *
 * ctrmsl.com / www.ctrmsl.com are Cloudflare Worker Custom Domains, which do NOT honor the
 * zone-level "Always Use HTTPS" setting, so the http->https redirect (SEC-001) is enforced here.
 * run_worker_first:true (wrangler.jsonc) ensures this runs before assets are served; everything
 * else is delegated to the static-assets binding (which still applies _headers / _redirects / 404).
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let scheme = url.protocol.replace(':', '');
    try {
      const v = request.headers.get('CF-Visitor');
      if (v) scheme = JSON.parse(v).scheme || scheme;
    } catch (e) { /* ignore malformed header */ }

    if (scheme === 'http') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
