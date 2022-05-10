// Non 2xx errors are treated as ok by fetch
// We'd like them to be errors

// We can type fetch, but it's just out of scope here, so there are some 'any' thrown in
export default function checkStatus(res: any) {
  if (res.ok) {
    return res;
  }
  const err: Error & { response?: any } = new Error(res.statusText);
  err.response = res;
  throw err;
}
