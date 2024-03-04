'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export default async function Logout() {
    cookies().delete('w_number')
    cookies().delete('name')
    cookies().delete('email')
    cookies().delete('access')
    cookies().delete('employmentType')
    redirect("/AdminLogin");
  }