import useReflare from "reflare";

const handleRequest = async (request: Request): Promise<Response> => {
  const reflare = await useReflare();

  reflare.push({
    path: "/*",
    upstream: {
      domain: "api.openai.com",
      protocol: "https",
    },
  });

  return reflare.handle(request);
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
// https://community.openai.com/t/api-access-failed-showing-cloudflare-block-page/506015/22
export const config = {
  runtime: "edge",
  // https://vercel.com/docs/edge-network/regions#region-list
  regions: [
    "arn1",
    "bom1",
    "cdg1",
    "cle1",
    "cpt1",
    "dub1",
    "fra1",
    "gru1",
    // 'hkg1', ip blocked by openai
    "hnd1",
    "iad1",
    "icn1",
    "kix1",
    "lhr1",
    "pdx1",
    "sfo1",
    "sin1",
    "syd1",
  ],
};
