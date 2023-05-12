import mongoose, { ClientSession } from 'mongoose';

export const mongooseTransactionSessionCreator = async (): Promise<ClientSession> => {
    const session = await mongoose.startSession();

    session.startTransaction();

    return session;
};
