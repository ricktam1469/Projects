import { cartEntries } from "./cartentries";

export class Cart{
    id:number;
    entries : cartEntries[];
    userId: number;
    totalPrice:number;
    totalQuantity:number;
}