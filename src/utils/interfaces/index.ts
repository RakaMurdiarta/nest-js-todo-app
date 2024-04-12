import { Request } from 'express';
/**
 * APPROCH 1: 
 * export interface CustomRequest extends Request {
  user: string;
},
 */

export interface CustomRequest {
  user: string;
}

declare module 'express' {
  interface Request extends CustomRequest {}
}
