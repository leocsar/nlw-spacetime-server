import 'dotenv/config';

import { resolve } from 'node:path';
import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

// Routes
import { authRoutes } from './routes/auth';
import { memoriesRoutes } from './routes/memories';
import { uploadRoutes } from './routes/upload';

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: 'spacetime',
});

app.register(multipart);
app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
});

// Routes
app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then((res) => {
    console.log('Server running on http://192.168.0.46:3333');
  });
