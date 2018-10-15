import http from './httpService';

export function register(user) {
  return http.post('http://localhost:3900/api/users', user);
}
