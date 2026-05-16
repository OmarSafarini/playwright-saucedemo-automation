export const invalidCheckoutScenarios = [
  { firstName: '',     lastName: 'Test', postalCode: '12345', error: 'Error: First Name is required',  description: 'empty first name'  },
  { firstName: 'Omar', lastName: '',     postalCode: '12345', error: 'Error: Last Name is required',   description: 'empty last name'   },
  { firstName: 'Omar', lastName: 'Test', postalCode: '',      error: 'Error: Postal Code is required', description: 'empty postal code' },
  { firstName: '', lastName: '', postalCode: '', error: 'Error: First Name is required', description: 'empty all fields' },
];
