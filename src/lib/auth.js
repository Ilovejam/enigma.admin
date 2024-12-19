export const users = [
  { username: 'admin1', password: 'fb82ae3b35e126cf' },
  { username: 'mehmetabi', password: 'Mehmetabi123.' },
  { username: 'özlemabla', password: 'Özlemabla123.' },
];

export function authenticateUser(username, password) {
  return users.some(
    (user) => user.username === username && user.password === password
  );
}
