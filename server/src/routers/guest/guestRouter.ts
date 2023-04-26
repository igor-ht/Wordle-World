import express from 'express';
import { handleGuestNewSession, handleGuestNewGame, handleSearchGuest, handleCreateNewGuest } from './guestApi';

const guestRouter = express.Router();

guestRouter.get('/handleSearchGuest', handleSearchGuest);

guestRouter.get('/handleCreateNewGuest', handleCreateNewGuest);

guestRouter.post('/handleGuestNewSession', handleGuestNewSession);

guestRouter.post('/handleGuestNewGame', handleGuestNewGame);

export default guestRouter;
