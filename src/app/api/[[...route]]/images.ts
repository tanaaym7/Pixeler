import { unsplashApi } from "@/lib/unsplash";
import { Hono } from "hono";

const DEFAULT_COUNT = 10;
const DEFAULT_COLLECTION_IDS = ["317099"];

const app = new Hono().get("/", async (c) => {
  const images = await unsplashApi.photos.getRandom({
    collectionIds: DEFAULT_COLLECTION_IDS,
    count: DEFAULT_COUNT,
  });
  if (images.errors) {
    return c.json(
      { error: "something went wrong", errors: images.errors },
      400
    );
  }
  let response = images.response;
  if (!Array.isArray(response)) {
    response = [response];
  }
  return c.json({ data: response });
});

export default app;
