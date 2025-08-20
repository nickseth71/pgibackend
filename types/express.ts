import type { Request, Response } from 'express';
import type { UserModel } from '../interfaces/user-type.ts';
import type { EquipmentModel } from '../interfaces/equipment-type.ts';


export interface User extends UserModel {}
export interface Equipment extends EquipmentModel {}


export interface ExpressRequest extends Request {
  user?: User;
  equipment?: Equipment;
}

export type ExpressResponse = Response;
export type UserRequest = ExpressRequest;

