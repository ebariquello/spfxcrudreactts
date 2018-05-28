import * as React from 'react';

export interface ICellProps {
    name: string;
    value: string;
    className: string;
    readOnly: boolean;
    rowEdited: any;
  }