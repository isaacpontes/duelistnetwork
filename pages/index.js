import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { saveCommunity } from '../src/services/communities';
import { OrkutNostalgicIconSet } from '../src/components/OrkutNostalgicIconSet';
import slugify from '../src/lib/slugify';
import nookies from 'nookies';
import { queryUser, saveUserProfile } from '../src/services/users';

export default function Home({ user, userFriends, userCommunities, currentGoogleUser }) {
  const [datoUser, setDatoUser] = useState({});
  const [communities, setCommunities] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    if (user === null) {
      const newUser = {
        name: currentGoogleUser.name,
        googleId: currentGoogleUser.googleId,
        avatarUrl: currentGoogleUser.imageUrl,
        friends: null,
        communities: null
      }

      const newUserData = await saveUserProfile(newUser);
      setDatoUser(newUserData);
    } else {
      setDatoUser(user);
      setFriends(userFriends);
      setCommunities(userCommunities);
    }
  }, []);

  async function handleCreateCommunity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const imageUrl = formData.get('image');
    const slug = slugify(title);
    const author = datoUser.id;

    const newCommunity = {
      title,
      imageUrl,
      slug,
      author
    }

    const data = await saveCommunity(newCommunity);
    event.target.reset();
    alert('Comunidade criada com sucesso!');
  }

  return (
    <>
      <AlurakutMenu currentGoogleUser={currentGoogleUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar currentGoogleUser={currentGoogleUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              {`Bem vindo(a), ${currentGoogleUser.givenName}`}
            </h1>

            <OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1} />
          </Box>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <Box>
              <h2 className="subTitle">Encontre outros duelistas!</h2>

              <Link href="/profiles">
                <button>
                  Ver todas os usuários
                </button>
              </Link>
            </Box>
            <Box>
              <h2 className="subTitle">Entre em uma comunidade!</h2>

              <Link href="/communities">
                <button>
                  Ver todas as comunidades
                </button>
              </Link>
            </Box>
          </div>

          <Box>
            <h2 className="subTitle">Que tal criar uma comunidade para o seu deck favorito?</h2>

            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="Coloque a URL da imagem de capa."
                  aria-label="Coloque a URL da imagem de capa."
                />
              </div>

              <button
                type="submit"
              >
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({friends.length})
            </h2>

            <ul>
              {friends.slice(0, 6).map((friend) => {
                return (
                  <li key={friend.id}>
                    <a href={`/profiles/${friend.id}`}>
                      <img src={friend.avatarUrl} />
                      <span>{friend.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <Link href="/amigos">
              <a className="boxLink">
                Ver todos
              </a>
            </Link>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities?.slice(0, 6).map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/communities/${community.id}`}>
                      <img src={community.imageUrl} alt={community.title} />
                      <span>{community.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <Link href="/comunidades">
              <a className="boxLink">
                Ver todos
              </a>
            </Link>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
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

  const userFriends = user?.friends ?? [];
  const userCommunities = user?.communities ?? [];

  return {
    props: {
      user,
      userFriends,
      userCommunities,
      currentGoogleUser
    },
  }
}
