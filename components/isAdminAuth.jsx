import { redirect } from "next/navigation";
import React from "react";
import { cookies } from 'next/headers'

export default function isAuth(Component) {
  return function IsAuth(props) {
    const cookiesList = cookies()
    const hasCookieAdmin = cookiesList.get('access')
    const hasCookie = cookiesList.has('w_number')
    console.log(hasCookie)
    console.log(hasCookieAdmin)
    if (hasCookieAdmin?.value == "standard" || !hasCookie) {
      return redirect("/AdminLogin");
    }
    return <Component {...props} />;
  };
}