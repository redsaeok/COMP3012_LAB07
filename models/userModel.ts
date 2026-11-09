import { IUser } from "../interfaces";

const database : IUser[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "user",
    username: "jimmy_smith",
    strategy: "local",
    strategy_id: "1"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "admin",
    username: "johnny_doe",
    strategy: "local",
    strategy_id: "2"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
    username: "jonathan_chen",
    strategy: "local",
    strategy_id: "3"
  },
  {
    id: 4,
    name: "John Glenn",
    email: "johnglenn@shaw.ca",
    password: "admin",
    role: "admin",
    username: "john_glenn",
    strategy: "local",
    strategy_id: "4"
  }
];

const userModel = {

  /* FIXED ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIXED ME (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findByStrategyId: (id: string, strategy: string) => {
    const user = database.find((user) => user.strategy_id === id && user.strategy === strategy);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with strategy: ${strategy} and strategy_id: ${id}`);
  },
  findByIdOrCreate: (id: number | null, strategy: string, user: IUser) => {
    if (  
      user.strategy_id === null || 
      user.strategy_id === undefined || 
      user.strategy === null || 
      user.strategy === undefined) {
      throw new Error(`Invalid id or strategy: ${id}, ${strategy}`);
    }

    try {      
      user = userModel.findByStrategyId(user.strategy_id, user.strategy);
      console.log(`User with id: ${id} already exists`);
    } catch (error) {
      database.push({...user, id:database.length+1});
      user = database[database.length-1];
      console.log(`User with id: ${user.id} created`);
    }
    return user;
  }
};

export { database, userModel };
