import { useRouter } from 'next/router';
import { useGoogleLogout } from 'react-google-login';
import nookies from 'nookies';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

export default function Logout() {
  const router = useRouter();

  const onLogoutSuccess = () => {
    nookies.destroy(null, 'CURRENT_USER');
    console.log('Success! Bye, bye o/');
  };

  const onFailure = (response) => {
    console.log('Oh no, something went wrong! response:', response);
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button
      onClick={() => {
        signOut();
        router.push('/login');
      }}
      style={{
        display: 'block',
        color: '#ffffff'
      }}
    >
      Logout
    </button>
  )
}
