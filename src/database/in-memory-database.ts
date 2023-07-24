import { IDatabase, User } from "./database.interface";

// export class MemoryDatabase implements IDatabase {
//     users = new Map<string, User>();

//     // getUserByEpicId(epicId: string, displayName: string): User {
//     //     // let user = this.users.get(epicId);
//     //     // if (user == null) {
//     //     //     user = { displayName, epicId, ownId: crypto.randomUUID() }
//     //     //     this.users.set(epicId, user);
//     //     // }
//     //     // user.displayName = displayName;
//     //     // return user;
//     // }
// }