export interface IDatabase {
  getUserByEpicId(epicId: string, displayName: string): User;
}

export interface User {
  epicId: string;
  displayName: string;
}
