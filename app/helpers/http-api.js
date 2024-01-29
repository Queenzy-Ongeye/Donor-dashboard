import { getToken } from './session-manager';

import buildPath from './build-path';

const ALLOWED_METHODS = {
  GET:  {},
  POST: { requiresBody:true },
  PUT:  { requiresBody:true },
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiGet  = (path, pathParams, queryParams) => apiFetch('GET',  path, pathParams, queryParams);
export const apiPut  = (path, pathParams, body)        => apiFetch('PUT',  path, pathParams, null, body);

export function apiPost(path, pathParams, searchParams, body) {
  switch(arguments.length) {
    case 0: case 1: throw new Error('Missing required arg(s): path and/or body!');
    case 2:
      body = pathParams;
      pathParams = null;
      break;
    case 3:
      body = searchParams;
      searchParams = null;
      break;
    case 4: /* full complement */ break;
    default: throw new Error(`Unexpected arg count: ${arguments.length}`);
  }
  return apiFetch('POST', path, pathParams, null, body);
};

export const apiPostFiles = (path, files) => {
  const formData = new FormData();
  Object.entries(files).forEach(([ name, data ]) => formData.append(name, data));
  return apiFetch('POST', path, null, null, formData);
};

const apiFetch = async (method, path, pathParams, queryParams, body) => {
  if(!ALLOWED_METHODS[method]) throw new Error(`Method not allowed: '${method}'`);

  if(ALLOWED_METHODS[method].requiresBody && body == null) throw new Error(`Cannot ${method} without a body.`);

  const url = new URL(baseUrl + buildPath(path, pathParams));
  if(url.toString().includes('{') || url.toString().includes('}')) throw new Error(`URL '${url}' includes curlies; is it missing params?`);

  if(queryParams) {
    const usp = new URLSearchParams(queryParams);
    url.search = usp;
  }

  const headers = {};

  const token = await getToken();
  if(!token) throw new Error('Auth token not loaded!');

  // If this is moved to a cookie, credentials:'include' will be required.
  headers['Authorization'] = token;

  if(body) {
    if(body instanceof FormData) {
      // handled automatically
    } else {
      headers['content-type'] = 'application/json';
      body = JSON.stringify(body);
    }
  }

  const res = await fetch(url, { method, headers, body });

  if(res.ok) {
    if(isJson(res)) return await res.json();
    else            return await res.text();
  }

  const err = new Error(`Non-OK response received from ${path}!`);
  err.status = res.status;
  if(isJson(res)) err.body = await res.json();
  else            err.body = await res.text();

  throw err;
};

function isJson(res) {
  return res.headers.get('content-type')?.match(/^application\/json(;.*)?$/);
}
