import React, { useEffect, useState } from 'react';
import DatePickerWeb from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const useEnsurePortalDiv = (id = 'datepicker-portal') => {
  useEffect(() => {
    let portal = document.getElementById(id);
    if (!portal) {
      portal = document.createElement('div');
      portal.id = id;
      portal.style.position = 'absolute';
      portal.style.zIndex = 9999;
      document.body.appendChild(portal);
    }
    return () => {
    };
  }, [id]);

  return id;
};

export const DatePicker = (props) => {
  const portalId = useEnsurePortalDiv();

  return (
    <DatePickerWeb
      {...props}
      portalId={portalId}
      popperClassName="rnw-datepicker-popper" 
      dateFormat="dd/MM/yyyy"
      // calendarStartDay={1}
    />
  );
};
