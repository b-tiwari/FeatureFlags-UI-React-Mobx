import React from 'react';
import store from '../../mobx-stores/featureFlags';
import { observer } from 'mobx-react';


interface State {
  selectedApp: string
}

@observer
export default class ClientApps extends React.Component<{}, State> {
  clientApps = ['cbui', 'act'];

  constructor() {
    super();
    this.state = {
      selectedApp: store.selectedApp
    }
  }

  renderAppsOptions = () => {
    return this.clientApps.map((a) => {
      return <option value={a} key={a}>{a}</option>;
    })
  }

  render() {
    return (
      <div className="select warning">
        <span className="arr"></span>
        <select value={this.state.selectedApp} onChange={this.onAppSelect}>
          {this.renderAppsOptions()};
      </select>
      </div>
    )
  }

  onAppSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ selectedApp: (e.target as any).value });
    store.updateSelectedApp((e.target as any).value);
  }

}

