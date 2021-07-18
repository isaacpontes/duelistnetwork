import Box from "../../src/components/Box"
import nookies from 'nookies';
import { queryCommunityById } from "../../src/services/communities";
import { AlurakutMenu } from "../../src/lib/AlurakutCommons";
import MainGrid from "../../src/components/MainGrid";

export default function Community({ community, currentGoogleUser }) {
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

          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <Box>

          </Box>
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

  return {
    props: {
      community,
      currentGoogleUser
    },
  }
}
