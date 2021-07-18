import Box from "../../src/components/Box"
import nookies from 'nookies';
import { queryCommunityById } from "../../src/services/communities";
import { AlurakutMenu } from "../../src/lib/AlurakutCommons";
import MainGrid from "../../src/components/MainGrid";
import { queryProfilesByCommunityId } from "../../src/services/users";
import { ProfileRelationsBoxWrapper } from "../../src/components/ProfileRelations";

export default function Community({ community, communityMembers, currentGoogleUser }) {
  return (
    <>
      <AlurakutMenu currentGoogleUser={currentGoogleUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <Box as="aside">
            <img
              src={community.imageUrl}
              alt={community.title}
              style={{
                width: '100%',
                borderRadius: '8px',
                maxHeight: '128px',
              }}
            />
            <hr />
            <a className="boxLink" href={community.imageUrl}>
              {community.title}
            </a>
            <hr />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Últimas Postagens
            </h1>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Membros da Comunidade
            </h2>

            <ul>
              {communityMembers?.map((member) => {
                return (
                  <li key={member.id}>
                    <a href={`/profiles/${member.id}`}>
                      <img src={member.avatarUrl} alt={member.name} />
                      <span>{member.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
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

  const { id } = context.params;

  const community = await queryCommunityById(id);
  const communityMembers = await queryProfilesByCommunityId(id);

  return {
    props: {
      community,
      communityMembers,
      currentGoogleUser
    },
  }
}
