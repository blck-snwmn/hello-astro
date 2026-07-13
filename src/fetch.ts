import { actions, i18n, middleware, pages, sessions } from 'astro/hono';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono();

app.use(logger());
app.get('/api/health', (context) => context.json({ ok: true }));
app.use(sessions());
app.use(actions());
app.use(middleware());
app.use(i18n());
app.use(pages());

export default app;
