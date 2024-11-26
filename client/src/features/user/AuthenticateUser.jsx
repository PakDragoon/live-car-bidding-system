import Button from '../../ui/Button';
import { useNavigation, useActionData, redirect, Form } from 'react-router-dom';
import { isValidEmail } from '../../utils/helpers'

function AuthenticateUser() {
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="POST">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Email</label>
        <input className="input grow" type="email" name="email" required />
        {formErrors?.email && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {formErrors.email}
          </p>
        )}
      </div>

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="sm:basis-40">Password</label>
        <input className="input grow" type="password" name="password" required />
      </div>

      <Button disabled={isSubmitting} type="primary">
        {isSubmitting ? 'Creating User....' : `Create User`}
      </Button>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  const errors = {};
  if (!isValidEmail(data.email)) errors.email = 'Please give us your valid email. You will need it for login.';
  if (Object.keys(errors).length > 0) return errors;
  
  console.log("🚀 ~ action ~ data:", data)
  // const newOrder = await authenticateUser(data);

  return redirect(`/auction/all`);
}

export default AuthenticateUser;
