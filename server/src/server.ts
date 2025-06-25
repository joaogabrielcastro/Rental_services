import dotenv from 'dotenv';
dotenv.config();
import * as Provider from "fastify-type-provider-zod";
import { fastify } from "fastify";
import { fastifyJwt } from "@fastify/jwt";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { Router } from "./http/routes/router";
import { schedules } from "./http/schedules/schedules";

const app = fastify().withTypeProvider<Provider.ZodTypeProvider>();

app.setValidatorCompiler(Provider.validatorCompiler);
app.setSerializerCompiler(Provider.serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type"],
});

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!, // Agora está carregada corretamente
});

// Swagger config
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Rental service",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                authentication: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ authentication: [] }],
    },
    transform: Provider.jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.register(Router);

app.register(schedules);

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP Server Running");
});
