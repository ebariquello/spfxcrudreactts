import * as React from 'react';
import { IContact } from '../../../../models/Contact';
import * as PropTypes from 'prop-types';
export interface IRowProps{
  contact: IContact;
  contactEdited: any;
  contactDeleted: any;
}
