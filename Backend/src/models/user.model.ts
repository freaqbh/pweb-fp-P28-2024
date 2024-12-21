import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface userInterface extends Document {
    username: string;
    email: string;
    password: string;
    admin: boolean;
    tokens: { token: string }[];
    generateAuthToken: () => Promise<string>;
}

const userSchema = new Schema<userInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { 
            _id: user._id.toString(),
            admin: user.admin // Menyertakan status admin dalam token
        }, process.env.JWT_SECRET || "", {
        expiresIn: "1h", // Optional: Set token expiration
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model<userInterface>("User", userSchema);

export default User;
export type { userInterface };
