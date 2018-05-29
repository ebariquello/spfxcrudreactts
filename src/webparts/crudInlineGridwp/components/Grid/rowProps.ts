import * as React from 'react';
import { IContact } from '../../../../models/Contact';


export interface IRowProps{
  contact: IContact;
  contactEdited: Function;
  contactDeleted: Function;
}
