import { createUser, getUserByEmail } from '../db/users';
import express from 'express';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.password +authentication.salt');
        if (!user) {
            return res.sendStatus(404);
        }

        if (authentication(password, user.authentication.salt) !== user.authentication.password) {
            return res.sendStatus(401);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user.authentication.salt);

        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const oldUser = await getUserByEmail(email);
        if (oldUser) {
            return res.sendStatus(409);
        }

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication: {
                password: authentication(password, salt),
                salt,
            }
        });

        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)

    }
}