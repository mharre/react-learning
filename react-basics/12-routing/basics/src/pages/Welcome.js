import React from 'react';
import { Route } from 'react-router-dom';

const Welcome = () => {
    return (
        <section>
            <h1>The Welcome Page</h1>
            <Route path='/welcome/new-user'>
                <p>Welcome new user!!</p>
            </Route>
        </section>
    )
};
// Route becomes active if it matches the route from one level back

export default Welcome;