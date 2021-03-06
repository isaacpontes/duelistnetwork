import { useEffect, useState } from 'react';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { queryAllCommunities } from '../src/services/communities';
import nookies from 'nookies';
import styled from 'styled-components';
import { joinCommunity, queryUser } from '../src/services/users';
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

const PaginationButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .5rem;
  margin-top: 1rem;
`;

export default function Communities({ user, allCommunities, _allCommunitiesMeta, currentGoogleUser }) {
  const router = useRouter();
  const { page } = router.query;
  const [communities, setCommunities] = useState([]);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(async () => {
    setCommunities(allCommunities);
  }, []);

  async function handleJoinCommunity(event) {
    event.preventDefault();
    setIsJoining(true);
    const formData = new FormData(event.target);

    const community = formData.get('community');
    const title = formData.get('title');

    const response = await joinCommunity(user.id, community);

    setIsJoining(false);

    if (response.updated) {
      alert(`Voc?? entrou na comunidade ${title}.`);
      return;
    }

    alert('Parece que voc?? j?? ?? membro dessa comunidade.');
  }

  function isLastPage() {
    const totalEntries = _allCommunitiesMeta.count;
    const currentPage = page ?? 0;
    return totalEntries / (currentPage + 1) <= 20 ? true : false;
  }

  return (
    <>
      <AlurakutMenu currentGoogleUser={currentGoogleUser} />

      <Container>
        <Box>
          <h2 className="subTitle">Entre em uma comunidade!</h2>

          <EntriesGrid>
            {communities?.map((community) => {
              return (
                <li key={community.id}>
                  <a href={`/communities/${community.id}`}>
                    <img src={community.imageUrl} alt={community.title} />
                    <span>{community.title}</span>
                  </a>
                  <form onSubmit={handleJoinCommunity}>
                    <input type="hidden" name="community" value={community.id} />
                    <input type="hidden" name="title" value={community.title} />
                    <button type="submit" disabled={isJoining ? true : false}>
                      {isJoining ? 'Entrando...' : 'Entrar'}
                    </button>
                  </form>
                </li>
              )
            })}
          </EntriesGrid>

          <PaginationButtons>
            <form>
              <input
                type='hidden'
                name='page'
                value={typeof page === 'number' ? page - 1 : 0}
              />
              <button disabled={!page || page === '0' ? true : false}>
                P??gina Anterior
              </button>
            </form>
            <form>
              <input
                type='hidden'
                name='page'
                value={typeof page === 'number' ? page + 1 : 1}
              />
              <button disabled={isLastPage() ? true : false}>
                P??gina Seguinte
              </button>
            </form>
          </PaginationButtons>
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const userCookie = nookies.get(context).CURRENT_USER;
  const { page } = context.query;

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

  const response = await queryAllCommunities(page);

  const { allCommunities, _allCommunitiesMeta } = response;

  return {
    props: {
      user,
      allCommunities,
      _allCommunitiesMeta,
      currentGoogleUser
    },
  }
}
