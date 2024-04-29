import client from "./redis";

export type User = {
  username?: string;
  cardNumber?: string;
}

export const autoRegisterUsers = async (ctx: any, next: any) => {
  console.log('Middleware function to automatically register users and store username with user ID');
  try {
    const userId = ctx.from.id;
    const user: User = {
      username: ctx.from.username
    }
    console.log("user", JSON.stringify({ id: userId, user: user }));

    const checkIfUserExists = await client.get(`${userId}`);
    if (!checkIfUserExists) {
      await client.set(`${userId}`, JSON.stringify(user))
      console.log('User registered:', user);
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
  // Continue to the next middleware or handler
  next();

}
