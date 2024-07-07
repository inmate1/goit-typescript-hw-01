type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

function createOrUpdateUser(initialValues: Partial<User>): User {
  const currentUser: User = {
    name: "DefaultName",
    surname: "DefaultSurname",
    email: "default@mail.com",
    password: "defaultPassword",
  };
  return { ...currentUser, ...initialValues };
}

createOrUpdateUser({
  email: "user@mail.com",
  password: "password123",
});
