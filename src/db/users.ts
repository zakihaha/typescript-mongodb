import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            required: true,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    }
});

export const User = mongoose.model('User', UserSchema);

export const getUsers = () => {
    return User.find();
}

export const getUserByEmail = (email: string) => {
    return User.findOne({ email });
}

export const getUserBySessionToken = (sessionToken: string) => {
    return User.findOne({ 'authentication.sessionToken': sessionToken });
}

export const getUserById = (id: string) => {
    return User.findById(id);
}

export const createUser = (user: any) => {
    return User.create(user);
}

export const deleteUserById = (id: string) => {
    return User.findByIdAndDelete(id);
}

export const updateUserById = (id: string, update: any) => {
    return User.findByIdAndUpdate(id, update, { new: true });
}