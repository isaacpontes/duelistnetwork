import styled from "styled-components";
import { AlurakutProfileSidebarMenuDefault } from "../lib/AlurakutCommons";
import Box from "./Box";

export default function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <ProfileSidebar.Avatar src={propriedades.currentGoogleUser.imageUrl} />
      <hr />

      <a className="boxLink" href={propriedades.currentGoogleUser.imageUrl}>
        {propriedades.currentGoogleUser.name}
      </a>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

ProfileSidebar.Avatar = styled.img`
  width: 100%;
  border-radius: 8px;
  max-height: 128px;
`;
