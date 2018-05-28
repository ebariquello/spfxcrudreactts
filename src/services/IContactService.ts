import { Contact } from "../models/Contact";

export interface IContactsService{
    getContacts():Promise<Contact[]>;
    saveContact(contact:Contact):Promise<Contact[]>;
    deleteContact(contact): Promise<Contact[]>;
    addContact():Promise<Contact[]>;
}

