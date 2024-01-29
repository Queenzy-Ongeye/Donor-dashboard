import { omit as _omit } from 'lodash';

export default function buildPath(template, pathParams, searchParams) {
  let path = template;

  if(pathParams) {
    const keys = keysFrom(path);
    if(keys) {
      if(keys.some(k => !Object.prototype.hasOwnProperty.call(pathParams, k) || pathParams[k] == null)) {
        throw new Error('Failed: missing expected path param(s).');
      }

      // TODO check for unused keys

      path = keys.reduce((p, k) => p.replaceAll(`{${k}}`, encodeURIComponent(pathParams[k])), path);
    }
  }

  if(searchParams) {
    const usp = new URLSearchParams(searchParams);
    path += '?' + usp;
  }

  return path;
}

export const buildPathSelectively = ({ method, path, params }) => {
  const pathKeys = keysFrom(path);
  const remainingParams = _omit(params, pathKeys);
  switch(method) {
    case 'GET':  return { path:buildPath(path, params, remainingParams), remainingParams:null };
    case 'POST': return { path:buildPath(path, params),                  remainingParams };
    default:     throw new Error(`Unknown or missing method: '${method}'`);
  }
};

function keysFrom(path) {
  return path.match(/{[^[}]+}/g)?.map(k => k.substr(1, k.length-2));
}
