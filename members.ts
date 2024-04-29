import client from './redis';
import { User } from './auto-register-users';

export const getAllmembers = async (): Promise<User[]> => {
  // get all keys and populate members values
  const keys = await client.keys("*");

  const members = await Promise.all(keys.map(async (key) => {
    const member = await client.get(key);
    console.log("member", member);
    return JSON.parse(member) as User;
  }))
  return members
}

export const setMemberCardNumber = async (userId: number, cardNumber: string) => {
  const user = await client.get(`${userId}`);
  if (!user) {
    throw new Error("User not found");
  }
  const member = JSON.parse(user) as User;
  member.cardNumber = cardNumber;
  await client.set(`${userId}`, JSON.stringify(member));
  return member;
}

