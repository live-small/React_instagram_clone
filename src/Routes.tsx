import Home from "pages/Home";
import Direct from "pages/Direct";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                {/* Direct */}
                <Route path="/direct" component={Direct} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
