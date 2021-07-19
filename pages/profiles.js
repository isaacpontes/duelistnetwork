import Link from 'next/link';
import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import nookies from 'nookies';
import styled from 'styled-components';
import { addFriend, queryAllProfiles, queryUser } from '../src/services/users';
import { useRouter } from 'next/router';

const Container = styled.div`
  padding: 2rem 1rem;
  @media(min-width: 860px) {
    padding: 2rem 4rem;
  }
  @media(min-width: 1280px) {
    padding: 2rem 0;
    max-width: 1110px;
    margin: 0 auto;
  }
`;

const EntriesGrid = styled.ul`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
  max-height: 220px;
  list-style: none;

  @media(min-width: 512px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media(min-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media(min-width: 860px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media(min-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  @media(min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  li {
    img {
      object-fit: cover;
      background-position: center center;
      width: 100%;
      height: 100%;
      position: relative;
    }

    a {
      display: inline-block;
      height: 128px;
      position: relative;
      overflow: hidden;
      border-radius: 8px;

      span {
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 600;
        position: absolute;
        left: 0;
        bottom: 10px;
        z-index: 2;
        padding: 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-indeX: 1;
        background-image: linear-gradient(0deg,#00000099,transparent);
      }
    }

    button {
      margin: .5rem auto 1rem;
    }
  }
`;

export default function Profiles({ user, allProfiles, currentGoogleUser }) {
  const router = useRouter();
  const [profiles, setProfiles] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(async () => {
    setProfiles(allProfiles);
  }, []);

  async function handleAddFriend(event) {
    event.preventDefault();
    setIsAdding(true);
    const formData = new FormData(event.target);

    const profile = formData.get('profile');
    const name = formData.get('name');

    const response = await addFriend(user.id, profile);

    setIsAdding(false);

    if (response.updated) {
      alert(`Você agora é amigo de ${name}`);
      return;
    }

    alert(`Parece que você já é amigo de ${name}.`);

  }

  return (
    <>
      <AlurakutMenu currentGoogleUser={currentGoogleUser} />

      <Container>
        <Box style={{ height: '100%' }}>
          <h2 className="subTitle">Adicione seu colegas duelistas!</h2>

          <EntriesGrid>
            {profiles?.map((profile) => {
              return (
                <li key={profile.id}>
                  <a href={`/profiles/${profile.id}`}>
                    <img src={profile.avatarUrl} alt={profile.name} />
                    <span>{profile.name}</span>
                  </a>
                  <form onSubmit={handleAddFriend}>
                    <input type="hidden" name="profile" value={profile.id} />
                    <input type="hidden" name="name" value={profile.name} />
                    <button type="submit" disabled={isAdding ? true : false}>
                      {isAdding ? 'Adicionando...' : 'Adicionar'}
                    </button>
                  </form>
                </li>
              )
            })}
          </EntriesGrid>
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const userCookie = nookies.get(context).CURRENT_USER;

  if (!userCookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const currentGoogleUser = JSON.parse(userCookie);

  const user = await queryUser(currentGoogleUser.googleId);

  const allProfiles = await queryAllProfiles(currentGoogleUser.googleId);

  return {
    props: {
      user,
      allProfiles,
      currentGoogleUser
    },
  }
}
