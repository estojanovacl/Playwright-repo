export type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

/**
 * The user all tests run as. Credentials come from the environment. The profile details are only
 * used when the setup step has to register the user again after ParaBank's database was reset.
 */
export function getExistingUser(): User {
  return {
    username: requireEnv('PARABANK_USERNAME'),
    password: requireEnv('PARABANK_PASSWORD'),
    firstName: 'Quipu',
    lastName: 'Tester',
    street: '1 Main Street',
    city: 'Skopje',
    state: 'MK',
    zipCode: '1000',
    phoneNumber: '070000000',
    ssn: '123-45-6789',
  };
}
