import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import * as layoutConstants from '../constants/layout';
import { isUserAuthenticated } from '../helpers/authUtils';
// All layouts/containers
import AuthLayout from '../layouts/Auth';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal';
import VerticalLayout from '../layouts/Vertical';
import { allFlattenRoutes as routes } from './index';


class Routes extends Component {
  getLayout = () => {
    if (!isUserAuthenticated()) {
      return AuthLayout;
    }

    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case layoutConstants.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case layoutConstants.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      default:
        layoutCls = HorizontalLayout;
        break;
    }
    return layoutCls;
  };

  shouldComponentUpdate(nextProps) {
    let oldLayout = { ...this.props.layout };
    delete oldLayout.showRightSidebar;
    let newLayout = { ...nextProps.layout };
    delete newLayout.showRightSidebar;
    return (
      JSON.stringify(oldLayout) !== JSON.stringify(newLayout) ||
      JSON.stringify(this.props.user) !== JSON.stringify(nextProps.user)
    );
  }

  render() {
    const Layout = this.getLayout();
    return (
      <BrowserRouter>
        <Layout {...this.props}>
          <Switch>
            {routes.map((route, index) => {
              return (
                !route.children && (
                  <route.route
                    key={index}
                    path={route.path}
                    roles={route.roles}
                    exact={route.exact}
                    component={route.component}>
                  </route.route>
                )
              );
            })}
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
    user: state.Auth.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(Routes);
