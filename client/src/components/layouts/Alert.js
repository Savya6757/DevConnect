import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts &&
    alerts.length > 0 &&
    alerts.map((a) => {
      return (
        <div key={a.id} className={`alert alert-${a.alertType} my-1`}>
          {a.msg}
        </div>
      );
    })
  );
};

export default Alert;
