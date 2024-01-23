import * as context from 'next/headers';
import { redirect } from 'next/navigation';
import { Login } from '~/components/auth';

/**
 * @enable LuciaAuth
 */
import { auth, authRedirects } from '~/lib/auth';

export default async function Page() {
  const authRequest = auth.handleRequest('GET', context);
  const session = await authRequest.validate();
  if (session) redirect(authRedirects.afterLogin);

  return <Login provider='google'>Login with Google</Login>;
}
