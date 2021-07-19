import Box from "../../src/components/Box"
import nookies from 'nookies';
import { AlurakutMenu } from "../../src/lib/AlurakutCommons";
import MainGrid from "../../src/components/MainGrid";
import { queryProfileById, queryUser } from "../../src/services/users";
import { ProfileRelationsBoxWrapper } from "../../src/components/ProfileRelations";
import { OrkutNostalgicIconSet } from "../../src/components/OrkutNostalgicIconSet";
import { queryUserDuelLogs, saveDuelLog } from "../../src/services/duelLogs";
import DuelLog from "../../src/components/DuelLog";
import { useEffect, useState } from "react";

export default function Profile({ profile, currentDatoUser, duelLogs, currentGoogleUser }) {
  const [allDuelLogs, setAllDuelLogs] = useState([]);

  useEffect(() => {
    setAllDuelLogs(duelLogs);
  })

  async function handlePostDuelLog(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const comment = formData.get('comment');
    const victory = formData.get('victory') === 'on' ? true : false;
    const author = currentDatoUser.id;
    const opponent = profile.id;

    const newDuelLog = {
      comment,
      victory,
      author,
      opponent
    }

    const data = await saveDuelLog(newDuelLog);
    event.target.reset();
  }

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
              {`Mural de ${profile.name}`}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">{`Poste sobre seus duelos contra ${profile.name}`}</h2>

            <form onSubmit={handlePostDuelLog}>
              <div>
                <textarea
                  name="comment"
                  rows="4"
                  placeholder="Como foi o duelo?"
                  aria-label="Como foi o duelo?"
                  required
                ></textarea>
              </div>
              <div style={{ marginLeft: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label>Você venceu?</label>
                  <input
                    type="checkbox"
                    name="victory"
                    aria-label="Coloque a URL da imagem de capa."
                    style={{ width: 'fit-content', margin: '10px 8px' }}
                  />
                </div>

                <button
                  type="submit"
                >
                  Postar
                </button>
              </div>
            </form>
          </Box>

          <Box>
            <h2 className="subTitle">Duelos</h2>

            {allDuelLogs.map((duelLog) => {
              return (
                <DuelLog key={duelLog.id} duelLog={duelLog} />
              )
            })}
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos
            </h2>

            <ul>
              {profile.friends?.map((profile) => {
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
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades
            </h2>

            <ul>
              {profile.communities?.map((community) => {
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
  const duelLogs = await queryUserDuelLogs(id);

  return {
    props: {
      profile,
      currentDatoUser,
      duelLogs,
      currentGoogleUser
    },
  }
}
