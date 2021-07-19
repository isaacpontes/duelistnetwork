import styled from "styled-components"
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function DuelLog({ duelLog }) {
  dayjs.extend(relativeTime);

  return (
    <>
      <hr />
      <DuelLog.Wrapper>
        <DuelLog.Title>
          <a href={`/profiles/${duelLog.author.id}`}>
            <img src={duelLog.author.avatarUrl} alt={duelLog.author.name} />
            <div>
              <h4>{duelLog.author.name}</h4>
              <span>{dayjs(duelLog.createdAt).fromNow()}</span>
            </div>
          </a>
        </DuelLog.Title>
        <DuelLog.Content>
          {duelLog.comment}
        </DuelLog.Content>
        <footer>
          {`Vencedor: ${duelLog.victory ? duelLog.author.name : duelLog.opponent.name}`}
        </footer>
      </DuelLog.Wrapper>
    </>
  )
}

DuelLog.Wrapper = styled.article`
  padding: 1rem 0 .25rem;
`;

DuelLog.Title = styled.header`
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    color: #232323;
    font-weight: 700;
    text-decoration: none;

    img {
      object-fit: cover;
      background-position: center center;
      position: relative;
      height: 48px;
      width: 48px;
      border-radius: 12px;
    }

    span {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

DuelLog.Content = styled.div`
  padding: 1rem 0 .5rem;
`;
