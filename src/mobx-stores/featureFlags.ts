import axios from 'axios';
import { action, observable, useStrict } from 'mobx';
import appConfig from '../config';
import { App, FeatureFlag, KeyVal } from '../common/interfaces';

useStrict(true);

export class FeatureFlagsStore {
  // observables - things need to be kept under watch for the app to react
  @observable featureFlags: FeatureFlag[] = [];
  @observable applications: App[] = [];
  @observable selectedApp: string = 'cbui';
  @observable selectedFeatureFlag: FeatureFlag;
  @observable responseError: string;

  // computed props


  // actions

  // In strict mode, only actions can modify mobx state 
  @action setFeatureFlags = (featureFlags: FeatureFlag[]) => { this.featureFlags = [...featureFlags]; }

  @action setError = (errorMsg: string) => {
    this.responseError = errorMsg;
  }
  @action resetError = () => {
    this.responseError = '';
  }

  @action async updateSelectedApp(app: string) {
    this.selectedApp = app;
    await this.getFeatureFlags();
  }

  @action updateStoreFeatureFlag = (featureFlag: FeatureFlag) => {
    this.resetError();
    const features = this.featureFlags.filter((f) => f._id !== featureFlag._id);
    features.push(featureFlag);
    this.featureFlags = [...features];
  }

  @action async getFeatureFlags() {
    this.resetError();
    const response = await axios.get(`${appConfig.API_URL}/featureflags/${this.selectedApp}`)
    this.setFeatureFlags(<FeatureFlag[]>response.data);
  }

  @action async addFeatureFlag(feature: FeatureFlag) {
    this.resetError();
    const response = await axios.post(`${appConfig.API_URL}/api/v1/featureflags`, feature);
    this.updateStoreFeatureFlag(<FeatureFlag>response.data);
  }

  @action async updateFeatureFlag(feature: FeatureFlag) {
    this.resetError();
    const response = await axios.put(`${appConfig.API_URL}/featureflags/${feature._id}`, feature);
    this.updateStoreFeatureFlag(<FeatureFlag>response.data);
  }


  @action async addEnabledForCondition(featureId: string, key: string, value: string | number) {
    this.resetError();
    try {
      const url = `${appConfig.API_URL}/featureflags/${featureId}/conditions/`;
      const condition = { key, value };
      await axios.post(url, { condition });
      this.getFeatureFlags();
    } catch (err) {
      this.setError(err.response.data.error.message);
    }
  }

  @action async updateEnabledForCondition(featureId: string, condition: string, value: string | number, remove: boolean = false) {
    this.resetError();
    try {
      const url = `${appConfig.API_URL}/featureflags/${featureId}/conditions/${condition}`;
      await axios.put(url, { remove, newValue: value });
      this.getFeatureFlags();
    } catch (err) {
      this.setError(err.response.data.error.message);
    }
  }

  @action async deleteFeatureFlag(featureId: string) {
    this.resetError();
    await axios.delete(`${appConfig.API_URL}/featureflags/${featureId}`);
    this.getFeatureFlags();
  }

  @action async deleteEnabledForCondition(featureId: string, condition: string, value?: string | number | string[] | number[]) {
    this.resetError();
    let url: string = `${appConfig.API_URL}/featureflags/${featureId}/conditions/${condition}`;
    try {
      if (value) {
        url = `${url}/${value}`;
      }
      await axios.delete(url);
      this.getFeatureFlags();
    } catch (err) {
      this.setError(err.response.data.error.message);
    }
  }

  @action clearFeatureFlags = () => { this.featureFlags = []; }

  @action addKeyValPair = async (featureId: string, key: string, value: string) => {
    this.resetError();
    const url: string = `${appConfig.API_URL}/featureflags/${featureId}/keyvals`;
    try {
      const keyVal: KeyVal = { key, value };
      await axios.post(url, { keyVal });
      this.getFeatureFlags();
    } catch (err) {
      this.setError(err.response.data.error.message);
    }
  }

  @action updateKeyValPair = async (featureId: string, key: string, value: string) => {
    this.resetError();
    const url: string = `${appConfig.API_URL}/featureflags/${featureId}/keyvals`;
    try {
      const keyVal: KeyVal = { key, value };
      console.log('updating Keyval pair = ', keyVal);
      await axios.put(url, { keyVal });
      this.getFeatureFlags();
    } catch (err) {
      console.log('error updating Keyval pair = ');
      this.setError(err.response.data.error.message);
    }
  }

  @action deleteKeyValPair = async (featureId: string, key: string) => {
    this.resetError();
    const url: string = `http://localhost:2000/api/v1/featureflags/${featureId}/keyvals/${key}`;
    try {
      await axios.delete(url);
      this.getFeatureFlags();
    } catch (err) {
      this.setError(err.response.data.error.message);
    }
  }
}

const store = new FeatureFlagsStore();
export default store;
