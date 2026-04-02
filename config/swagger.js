import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard Backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    
    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Records", description: "Financial Records APIs" },
      { name: "Users", description: "User Management APIs" },
      { name: "Dashboard", description: "Analytics APIs" },
    ],
  },

  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);