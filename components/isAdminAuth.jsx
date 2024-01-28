import { redirect } from "next/navigation";
import React from "react";
import { cookies } from 'next/headers'

export default function isAuth(Component) {
  return function IsAuth(props) {
    const cookiesList = cookies()
    const hasCookie = cookiesList.has('w_number')
    const hasCookieAdmin = cookiesList.has('access')
    if (!hasCookie && !hasCookieAdmin) {
      return redirect("/Login");
    }
    return <Component {...props} />;
  };
}