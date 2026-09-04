import { handleChatRequest } from "./chat/http.mjs";
import { handleCmsRequest } from "./cms/http.mjs";
import { send } from "./http-util.mjs";

export async function handleApiRequest(req, res) {
  if (await handleChatRequest(req, res)) return true;
  if (await handleCmsRequest(req, res)) return true;
  return false;
}

export function apiVitePlugin() {
  return {
    name: "obs-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        handleApiRequest(req, res)
          .then((handled) => {
            if (!handled) next();
          })
          .catch((error) => {
            console.error("[obs api]", error);
            if (!res.headersSent) send(res, 500, { error: "API error" });
          });
      });
    },
  };
}
