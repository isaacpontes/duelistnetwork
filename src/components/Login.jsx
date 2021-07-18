import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../utils/refreshToken';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useEffect, useState } from 'react';

const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;

export default function Login() {
  const [currentUser, setCurrentUser] = useState({});
  const router = useRouter();

  const onSuccess = async (response) => {
    setCurrentUser(response.profileObj);
    nookies.set(null, 'CURRENT_USER', JSON.stringify(response.profileObj), {
      path: '/',
      maxAge: 86400
    });

    console.log('Success! loggedUser:', response.profileObj.googleId);
    refreshTokenSetup(response);
  };

  const onFailure = (response) => {
    console.log('Oh no, something went wrong! response:', response.profileObj);
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
  });

  useEffect(() => {
    if (currentUser && loaded) {
      router.push('/');
    }
  }, [currentUser]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signIn();
        // router.push('/');
      }}
    >
      <button
        type="submit"
        style={{
          background: '#DB4A39',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <img src="/google.svg" alt="google login" height="20" width="20"></img>

        <span className="buttonText">Entre com o Google</span>
      </button>
    </form>
  )
}
