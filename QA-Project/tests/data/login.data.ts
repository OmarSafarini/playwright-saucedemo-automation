export const invalidScenarios = [
  { username: 'standard_user',   password: 'koko',          description: 'Invalid Password'     },
  { username: 'koko',            password: 'secret_sauce',  description: 'Invalid Username'     },
  { username: '',                password: 'secret_sauce',  description: 'Empty Username'       },
  { username: 'standard_user',   password: '',              description: 'Empty Password'       },
  { username: '',                password: '',              description: 'Empty Fields'         },
  { username: 'a'.repeat(50),    password: 'secret_sauce',  description: 'Long Username'        },
  { username: 'standard_user',   password: 'a'.repeat(50), description: 'Long Password'        },
  { username: 'locked_out_user', password: 'secret_sauce',  description: 'Locked User Login'   },
  { username: ' standard_user ', password: 'secret_sauce',  description: 'Username with spaces' },
];
