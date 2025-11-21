import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

type ApiResponse = Promise<{
  statusCode: number;
  headers: {
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Headers": string;
    "Access-Control-Allow-Methods": string;
  };
  body: string;
}>;

type ApiEvent = { httpMethod: string; body?: string | null; };

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

async function handleOptions(): ApiResponse {
  return { statusCode: 200, headers, body: "" };
}

async function handleGet(): ApiResponse {
  const result = await sql`SELECT * FROM tasks ORDER BY created_at DESC`;
  return { statusCode: 200, headers, body: JSON.stringify({ tasks: result }) };
}

async function handlePost(event: ApiEvent): ApiResponse {
  const { text } = JSON.parse(event.body || "{}");

  if (!text) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "El campo text es obligatorio" }),
    };
  }

  const result = await sql`
        INSERT INTO tasks (text)
        VALUES (${text})
        RETURNING *
      `;

  return { statusCode: 201, headers, body: JSON.stringify(result[0]) };
}

async function handlePut(event: ApiEvent): ApiResponse {
  const { id, done } = JSON.parse(event.body || "{}");

  if (!id) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Falta ID" }),
    };
  }

  const result = await sql`
        UPDATE tasks
        SET done = ${done}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

  return { statusCode: 200, headers, body: JSON.stringify(result[0]) };
}

async function handlePatch(event: ApiEvent): ApiResponse {
  const { id, text } = JSON.parse(event.body || "{}");

  if (!id) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Falta ID" }),
    };
  }

  if (typeof text !== "string" || text.trim() === "") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "El campo text es obligatorio" }),
    };
  }

  const result = await sql`
        UPDATE tasks
        SET text = ${text}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

  if (result.length === 0) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Tarea no encontrada" }),
    };
  }

  return { statusCode: 200, headers, body: JSON.stringify(result[0]) };
}

async function handleDelete(event: ApiEvent): ApiResponse {
  const { id } = JSON.parse(event.body || "{}");

  if (!id) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Falta ID" }),
    };
  }

  const result = await sql`
        DELETE FROM tasks
        WHERE id = ${id}
        RETURNING id
      `;

  if (result.length === 0) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Tarea no encontrada" }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: "Tarea eliminada", id: result[0].id }),
  };
}

export async function handler(event: ApiEvent): ApiResponse {
  try {
    switch (event.httpMethod) {
      case "OPTIONS":
        return handleOptions();
      case "GET":
        return handleGet();
      case "POST":
        return handlePost(event);
      case "PUT":
        return handlePut(event);
      case "PATCH":
        return handlePatch(event);
      case "DELETE":
        return handleDelete(event);
      default:
        return { statusCode: 405, headers, body: "Method Not Allowed" };
    }
  } catch (error: unknown) {
    console.error(error);
    const details = error instanceof Error ? error.message : String(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Error interno", details }),
    };
  }
}
