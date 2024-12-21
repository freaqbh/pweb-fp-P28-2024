import { userInterface } from "../models/user.model";
import bcrypt from "bcrypt";
import  User  from "../models/user.model";

interface newUser {
    username: string;
    email: string
    password: string;
    admin: boolean;
}

interface login {
    email: string;
    password: string;
}

export type { newUser, login };

export const auth = {
    async register({ username, email, password, admin }: newUser) {
        try {
            
            if (!User.db) throw new Error("Database connection error");

            const user = new User({ username, email, admin, password });
            await user.save();

            
            const token = await user.generateAuthToken();
            return user;
        } catch (error) {
            console.error("Error registering user:", (error as Error).message || error);
            throw new Error("Could not register user. Please try again.");
        }
    },

    async login({ email, password }: login) {
        try {
            
            if (!User.db) throw new Error("Database connection error");

            
            const user = await User.findOne({ email });
            if (!user) throw new Error("User not found");

            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error("Invalid password");

           
            const token = await user.generateAuthToken();
            return { token, user: user.toJSON() };
        } catch (error) {
            console.error("Error logging in user:", (error as Error).message || error);
            throw new Error("Could not log in user. Please try again.");
        }
    },
};
