import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { queryAllCommunities, saveCommunity } from '../src/services/communities';
import { OrkutNostalgicIconSet } from '../src/components/OrkutNostalgicIconSet';
import slugify from '../src/lib/Slugify';

export default function Home({ communitiesData }) {
  const usuarioAleatorio = 'isaacpontes';
  const [communities, setCommunities] = useState([]);
  const [communitiesCount, setCommunitiesCount] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(async () => {
    const githubResponse = await fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`).then(data => data.json());

    const userFollowers = githubResponse.map(user => user.login)

    setFollowers(userFollowers);

    setCommunities(communitiesData.allCommunities);
    setCommunitiesCount(communitiesData._allCommunitiesMeta.count);
  }, []);

  async function handleCreateCommunity(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get('title');
    const imageUrl = formData.get('image');
    const slug = slugify(title);

    const newCommunity = {
      title,
      imageUrl,
      slug
    }

    const data = await saveCommunity(newCommunity);

    const communitiesToUpdate = communities;
    communitiesToUpdate.pop();
    const updatedCommunities = [data.newRecord, ...communitiesToUpdate];
    setCommunities(updatedCommunities);

    event.target.reset();
  }

  return (
    <>
      <AlurakutMenu githubUser={usuarioAleatorio} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet confiavel={3} legal={2} sexy={1} />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

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
              Amigos ({followers.length})
            </h2>

            <ul>
              {followers.map((follower) => {
                return (
                  <li key={follower}>
                    <a href={`/users/${follower}`}>
                      <img src={`https://github.com/${follower}.png`} />
                      <span>{follower}</span>
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
              Comunidades ({communitiesCount})
            </h2>

            <ul>
              {communities.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/communities/${community.slug}`}>
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
  const communitiesData = await queryAllCommunities();

  return {
    props: {
      communitiesData
    },
  }
}