import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ClientApps from '../ClientApps/ClientApps';
import FeatureFlagsList from '../FeatureFlagsList/FeatureFlagsList';
import AddNewFeatureFlag from '../AddNewFeatureFlag/AddNewFeatureFlag';

const PageContent = () => {
  return <main>
    <Switch>
      <Route path="/" exact component={FeatureFlagsList} />
      <Route path="/apps" component={ClientApps} />
      <Route path="/addfeature" component={AddNewFeatureFlag} />
    </Switch>
  </main>
}

export default PageContent;
