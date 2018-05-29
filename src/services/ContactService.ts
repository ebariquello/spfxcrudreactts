import { Contact } from "../models/Contact";
import { IContactsService } from "./IContactService";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class ContactsService implements IContactsService {
    
    private httpClient: SPHttpClient;
    private contacts: Contact[];
    private webAbsoluteUrl: string;

    public constructor(webPartContext: IWebPartContext){
        this.httpClient = webPartContext.spHttpClient;
        this.contacts = new Array();
        this.webAbsoluteUrl = webPartContext.pageContext.web.absoluteUrl;

        this.getContacts = this.getContacts.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.addContact = this.addContact.bind(this);

    }

    public getContacts(): Promise<Contact[]>{

        let url = this.webAbsoluteUrl + "/_api/Lists/getByTitle('Contacts')//items?$select=Id,Title,Address,Company,Phone,Email";
        this.contacts = [];

        return this.httpClient.get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json().then((data) => {
                data.value.forEach(c => {
                    this.contacts.push(new Contact(c.Id,c.Title,c.Address, c.Company,c.Phone,c.Email));
                });
                return this.contacts;
            });
        });
    }

    public saveContact(contact:Contact): Promise<Contact[]>{

        let url = this.webAbsoluteUrl + "/_api/Lists/getByTitle('Contacts')/getItemByStringId('" + contact.id + "')";

        const httpClientOptions: ISPHttpClientOptions = {
            body:JSON.stringify({
                Title: contact.name,
                Address: contact.address,
                Company: contact.company,
                Phone: contact.phone,
                Email: contact.email
            })
        };
        httpClientOptions.headers = { 
             'IF-MATCH': '*',
             'X-Http-Method': 'PATCH' 
        };
        
        return this.httpClient.post(url, SPHttpClient.configurations.v1, httpClientOptions)
        .then((response: SPHttpClientResponse) => {
            return this.getContacts();
        });
    }

    public deleteContact(contact): Promise<Contact[]> {

        let url = this.webAbsoluteUrl + "/_api/Lists/getByTitle('Contacts')/getItemByStringId('" + contact.id + "')";

        const httpClientOptions: ISPHttpClientOptions = { };
        httpClientOptions.headers = {'IF-MATCH': '*'};
        httpClientOptions.method = "DELETE";
        
        return this.httpClient.fetch(url, SPHttpClient.configurations.v1, httpClientOptions)
        .then((response: SPHttpClientResponse) => {
            return this.getContacts();
        });
    }

    public addContact(): Promise<Contact[]> {

        let url = this.webAbsoluteUrl + "/_api/Lists/getByTitle('Contacts')/items";
        
        const httpClientOptions: ISPHttpClientOptions = {
            body:JSON.stringify({
                Title: "Full Name",
                Address: "St Memphis 01",
                Company: "XPTO",
                Phone: "34344444",
                Email: "teste@teste.com.br"
            })
        };
        
        return this.httpClient.post(url, SPHttpClient.configurations.v1, httpClientOptions)
       .then((response: SPHttpClientResponse) => {
            return this.getContacts();
        });
    }
}