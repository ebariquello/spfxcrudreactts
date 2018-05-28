import { IContactsService } from "./IContactService";
import { Contact } from "../models/Contact";

export class MockContactsService implements IContactsService{

    private contacts:Contact[];

    constructor(){

        this.contacts = new Array();
        this.contacts.push(new Contact(1, "Cox", "Brian", "555-555-5555", "brianc@wingtip.com"));
        this.contacts.push(new Contact(2, "Doyle", "Patricia", "555-555-5555", "patriciad@wingtip.com"));
        this.contacts.push(new Contact(3, "Yali", "David", "555-555-5555", "davidy@wingtip.com"));

        this.getContacts = this.getContacts.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    public getContacts(): Promise<Contact[]>{
        return new Promise<Contact[]>(resolve => {
            resolve(this.contacts);
        });
    }

    public saveContact(contact): Promise<Contact[]> {
        this.contacts.forEach(c => {
            if (c.id === contact.id) {
                c.lastName = contact.lastName;
                c.firstName = contact.firstName;
                c.phone = contact.phone;
                c.email = contact.email;
            }
        });
        return new Promise<Contact[]>(resolve => {
            resolve(this.contacts);
        });
    }

    public deleteContact(contact): Promise<Contact[]> {
        this.contacts = this.contacts.filter(c => {
            return c.id !== contact.id;
        });
        return new Promise<Contact[]>(resolve => {
            resolve(this.contacts);
        });
    }

    public addContact(): Promise<Contact[]> {
        this.contacts.push(new Contact(this.contacts.length + 1,"Last Name","First Name","Phone","Email"));
        return new Promise<Contact[]>(resolve => {
            resolve(this.contacts);
        });
    }
}
