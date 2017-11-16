export interface EnabledFor {
  _id?: string,
  allNoneOrFewSelected: string;
  accountEndsWith?: [number];
  accountStartsWith?: [number];
  accountLastDigitGT?: number;
  accountLastDigitLT?: number;
  accounts?: [string]
};

export interface ElementMapper {
  condition: string;
  element: 'select' | 'input';
  options?: { value: string, text: string }[];
  multiValue: boolean;
  label: string;
  type?: 'text' | 'email' | 'number';
  value?: string;
  defaultValue?: string;
}

export const EnabledForConditionsConfig: ElementMapper[] = [
  {
    condition: 'allNoneOrFewSelected', element: 'select',
    options: [{ value: 'all', text: 'all' }, { value: 'none', text: 'none' }, { value: 'selected', text: 'selected' }],
    multiValue: false, label: 'All or None or Few selected accounts'
  },
  { condition: 'accountEndsWith', element: 'input', type: 'number', multiValue: true, label: 'Account Numbers that end with' },
  { condition: 'accountStartsWith', element: 'input', type: 'number', multiValue: true, label: 'Account Numbers that starts with' },
  { condition: 'accountLastDigitLT', element: 'input', type: 'number', multiValue: false, label: 'Account Numbers with Last Digit(s) Less Than' },
  { condition: 'accountLastDigitGT', element: 'input', type: 'number', multiValue: false, label: 'Account Numbers with Last Digit(s) Greater Than' },
  { condition: 'accounts', element: 'input', type: 'text', multiValue: true, label: 'Account Numbers' }
];

export const EnabledForAccountLables = [
  { val: 'all', label: 'All Accounts' },
  { val: 'none', label: 'None' },
  { val: 'selected', label: 'Account Numbers satitsfying below conditions' }
]

// function to filter out those EnabledFor Conditions that have empty array values
// isArray or lodash _.isEmpty doesn't wont as expected on mongoose objects
// using 'EnabledForConditionElements' multiValue property to check is the value would be an array.
export const isConditionValueNonEmpty = (key: string, conditionValue: any) => {
  const [conditionElement] = EnabledForConditionsConfig.filter((c) => c.condition === key);
  if (conditionElement && conditionElement.multiValue) {
    try {
      return conditionValue.length > 0;
    } catch (e) {
      return true;
    }
  } else {
    return true;
  }
}
