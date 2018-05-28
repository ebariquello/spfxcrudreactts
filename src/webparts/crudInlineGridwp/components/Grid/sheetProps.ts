import * as React from 'react';
import { IContact } from '../../../../models/Contact';

export interface ISheetProps{
  contacts: IContact[];
  saveContact: any;
  deleteContact: any;
  addContact: any;
}