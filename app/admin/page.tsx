import * as React from 'react';
import isAuth from "../../components/isAuth";
import AdminPage from './adminPage'

function Finished() {
    return (<AdminPage/>);
}

export default isAuth(Finished);