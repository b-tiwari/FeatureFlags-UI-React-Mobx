import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import store from '../mobx-stores/featureFlags'

const plugins = { dvr: validatorjs };


const fields = {
  featureId: {
    label: 'featureId',
    value: '',
    rules: 'required|string',
  },
  propertyKey: {
    label: 'Property',
    value: '',
    rules: 'required|string'
  },
  propVal: {
    label: 'Value',
    value: '',
    rules: 'required|string',
  }
};

const hooks = {

  async onSuccess(form: any) {
    console.log('form is valid, values=', form.values());
    // Form is valid! Send the request here.'
    // get field values
    const { featureId, propertyKey, propVal } = form.values();
    await store.addKeyValPair(featureId, propertyKey, propVal);
  },

  onError(form: any) {
    // get all form errors
    // All form errors' = form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Form Invalid, please enter valid values.');
  },
};

const addKeyValPairForm = new MobxReactForm({ fields }, { plugins, hooks });
export default addKeyValPairForm;
