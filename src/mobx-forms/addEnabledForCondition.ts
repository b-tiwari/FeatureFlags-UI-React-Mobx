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
  condition: {
    label: 'Condition',
    value: '',
    rules: 'required|string'
  },
  conditionValue: {
    label: 'Value',
    value: '',
    rules: 'required|string',
  }
};

const hooks = {

  async onSuccess(form: any) {
    // Form is valid! Send the request here.'
    // get field values
    const { featureId, condition, conditionValue } = form.values();
    await store.addEnabledForCondition(featureId, condition, conditionValue);
  },

  onError(form: any) {
    // get all form errors
    // All form errors' = form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Form Invalid, please enter valid values.');
  },
};

const addEnabledForConditionForm = new MobxReactForm({ fields }, { plugins, hooks });
export default addEnabledForConditionForm;
