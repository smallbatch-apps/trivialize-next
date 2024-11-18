import { type NextRequest } from "next/server";

const camelToSnake = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake); // Recursively apply camelToSnake for arrays
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      acc[snakeKey] = camelToSnake(obj[key]); // Recursively handle nested objects
      return acc;
    }, {});
  }
  return obj; // Return the value unchanged if it's not an object or array
};

const snakeToCamel = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel); // Recursively apply snakeToCamel for arrays
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[camelKey] = snakeToCamel(obj[key]); // Recursively handle nested objects
      return acc;
    }, {});
  }
  return obj; // Return the value unchanged if it's not an object or array
};

export async function GET(
  req: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return handleRequest(req, { proxy: params.proxy });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return handleRequest(req, { proxy: params.proxy });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return handleRequest(req, { proxy: params.proxy });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { proxy: string[] } }
) {
  return handleRequest(req, { proxy: params.proxy });
}

export async function handleRequest(req: NextRequest, query: any) {
  const { searchParams } = req.nextUrl;
  const method = req.method.toUpperCase();
  const headers = Object.fromEntries(req.headers.entries());

  const token = req.cookies.get("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const params = searchParams.size > 0 ? "?" + searchParams.toString() : "";
  const url =
    process.env.NEXT_PUBLIC_REMOTE_API_HOST + query.proxy.join("/") + params;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    ...(method !== "GET" && {
      body: JSON.stringify(await req.json()),
    }),
  };

  try {
    const fetchResponse = await fetch(url, fetchOptions);
    const responseBody = await fetchResponse.json();

    const body = JSON.stringify(responseBody);
    const responseHeaders = new Headers(fetchResponse.headers);
    return new Response(body, {
      status: fetchResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.log(error.message);
    console.log(error);
    return new Response(
      JSON.stringify({ message: "An unknown error occurred" }),
      { status: 500 }
    );
  }
}
