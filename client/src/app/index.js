import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { CapcodesList, CapcodesInsert, CapcodesUpdate} from '../pages'
import { PagesList } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/pages/list" exact component={PagesList} />
                <Route path="/capcodes/list" exact component={CapcodesList} />
                <Route path="/capcodes/create" exact component={CapcodesInsert} />
                <Route
                    path="/capcodes/update/:id"
                    exact
                    component={CapcodesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
