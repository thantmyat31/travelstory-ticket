import React, {useState} from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import useCheckTokenValid from './../../hooks/useCheckTokenValid';

import Layout from './../Layout/Layout';
import DBLeftSidebar from './../DBLeftSidebar/DBLeftSidebar';
import DBRightContent from './../DBRightContent/DBRightContent';

import styles from './DBLayout.module.css';

const DBLayout = ({ navLinks, routes }) => {
    useCheckTokenValid();
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

    const renderNavLinks = (navLinks) => {
        return navLinks.map((link, index) => <NavLink key={index} exact to={link.path} className={styles.navLink} activeClassName={styles.active}>{link.name}</NavLink>)
    }

    const renderRoutes = (routes) => {
        return routes.map((route, index) => {
            const { path, component } = route;
            return <Route key={index} exact path={path} component={component} />;
        })
    }

    return ( 
        <Layout>
            <div className={styles.dashboard}>
                <DBLeftSidebar setCloseFromProps={(value) => setIsDrawerOpen(value)} isDrawerOpen={isDrawerOpen}>
                    {renderNavLinks(navLinks)}
                </DBLeftSidebar>

                <DBRightContent onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </DBRightContent>
            </div>
        </Layout>   
     );
}
 
export default DBLayout;