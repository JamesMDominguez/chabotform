import { redirect } from "next/navigation";
import React from "react";
import { cookies } from 'next/headers'

export default function isAuth(Component) {
  return function IsAuth(props) {
    const cookiesList = cookies()
    const hasCookieAdmin = cookiesList.get('access')
    if (hasCookieAdmin?.value == "standard") {
      return redirect("/AdminLogin");
    }
    return <Component {...props} />;
  };
}