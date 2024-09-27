import { Hono } from "hono";

const app = new Hono().post("/", async (c) => {
  const { name } = await c.req.json();

  return c.json({ name });
});

export default app;
