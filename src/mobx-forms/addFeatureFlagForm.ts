import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import store from '../mobx-stores/featureFlags'
import { KeyVal } from '../common/interfaces';

const plugins = { dvr: validatorjs };


const fields = {
  app: {
    label: 'Application',
    value: 'CBUI',
    rules: 'required|string',
    options: [
      { value: 'cbui', text: 'CBUI' },
      { value: 'act ', text: 'ACT' }
    ]
  },
  key: {
    label: 'Key',
    value: '',
    rules: 'required|string',
  },
  description: {
    label: 'Description',
    value: '',
    rules: 'string',
  }
};

const hooks = {

  async onSuccess(form: any) {
    const { app, key, description } = form.values();
    const enabledFor = {
      allNoneOrFewSelected: 'none'
    }
    const KeyVals: KeyVal[] = [];

    // update value in DB via storage
    try {
      await store.addFeatureFlag({ app, key, description, enabledFor, KeyVals });
      return true
    } catch (err) {
      return false;
    }
  },

  onError(form: any) {
    // get all form errors
    // 'All form errors' = form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Form Invalid, please enter valid values.');
  },

};

const addFeatureFlagForm = new MobxReactForm({ fields }, { plugins, hooks });
export default addFeatureFlagForm;
