import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import CompanyList from '../components/CompanyList';


const AppRouter = () => (
    <BrowserRouter>
        <div style={{height:'100%'}}>
            <Route path='/' component={CompanyList} exact={true} />
        </div>
    </BrowserRouter>
);

export default AppRouter;