import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/uploads";
import { resolve } from "path";
  
const app = fastify();

app.register(multipart);
app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: "spacetime",
});

app.register(uploadRoutes);
app.register(authRoutes);
app.register(memoriesRoutes);

app
  .listen({
    port: 8000,
    host: "127.0.0.1",
  })
  .then(() => {
    console.log("😎 rodando fino demais chefe");
  });
