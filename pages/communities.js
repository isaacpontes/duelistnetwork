import Link from 'next/link';
import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { queryAllCommunities } from '../src/services/communities';
import nookies from 'nookies';
import styled from 'styled-components';
import { joinCommunity, queryUser } from '../src/services/users';

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

export default function Communities({ user, allCommunities, currentGoogleUser }) {
  const [communities, setCommunities] = useState([]);

  useEffect(async () => {
    setCommunities(allCommunities);
  }, []);

  return (
    <>
      <AlurakutMenu currentGoogleUser={currentGoogleUser} />

      <Container>
        <Box style={{ height: '100%' }}>
          <h2 className="subTitle">Entre em uma comunidade!</h2>

          <EntriesGrid>
            {communities?.map((community) => {
              return (
                <li key={community.id}>
                  <a href={`/communities/${community.id}`}>
                    <img src={community.imageUrl} alt={community.title} />
                    <span>{community.title}</span>
                  </a>
                  <button
                    onClick={() => {
                      const userCommunities = user.communities.map(item => item.id);
                      const communitiesToUpdate = [...userCommunities, community.id];
                      joinCommunity(user.id, communitiesToUpdate);
                      alert(`Você entrou na comunidade ${community.title}`);
                    }}
                  >
                    Entrar
                  </button>
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

  const allCommunities = await queryAllCommunities(currentGoogleUser.googleId);

  return {
    props: {
      user,
      allCommunities,
      currentGoogleUser
    },
  }
}
