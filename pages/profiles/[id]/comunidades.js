import Box from "../../../src/components/Box"
import nookies from 'nookies';
import { AlurakutMenu } from "../../../src/lib/AlurakutCommons";
import MainGrid from "../../../src/components/MainGrid";
import { queryProfileById, queryUser } from "../../../src/services/users";
import { ProfileRelationsBoxWrapper } from "../../../src/components/ProfileRelations";
import { OrkutNostalgicIconSet } from "../../../src/components/OrkutNostalgicIconSet";
import Link from "next/link";

export default function Comunidades({ profile, currentDatoUser, currentGoogleUser }) {
  return (
    <>
      <AlurakutMenu currentGoogleUser={currentGoogleUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <Box as="aside">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              style={{
                width: '100%',
                borderRadius: '8px',
                maxHeight: '128px',
              }}
            />
            <hr />
            <a className="boxLink" href={profile.avatarUrl}>
              {profile.name}
            </a>
            <hr />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              {`Comunidades de ${profile.name}`}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>

          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({profile.friends?.length})
            </h2>

            <ul>
              {profile.friends?.slice(0, 6).map((profile) => {
                return (
                  <li key={profile.id}>
                    <a href={`/profiles/${profile.id}`}>
                      <img src={profile.avatarUrl} alt={profile.name} />
                      <span>{profile.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <Link href={`/profiles/${profile.id}/amigos`}>
              <a className="boxLink">
                Ver todos
              </a>
            </Link>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({profile.communities?.length})
            </h2>

            <ul>
              {profile.communities?.slice(0, 6).map((community) => {
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

            <Link href={`/profiles/${profile.id}/comunidades`}>
              <a className="boxLink">
                Ver todas
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

  const currentDatoUser = await queryUser(currentGoogleUser.googleId);

  const { id } = context.params;

  const profile = await queryProfileById(id);

  return {
    props: {
      profile,
      currentDatoUser,
      currentGoogleUser
    },
  }
}
