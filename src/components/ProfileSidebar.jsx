import styled from "styled-components";
import { AlurakutProfileSidebarMenuDefault } from "../lib/AlurakutCommons";
import Box from "./Box";

export default function ProfileSidebar(propriedades) {
    return (
        <Box as="aside">
            <ProfileSidebar.Avatar src={`https://github.com/${propriedades.githubUser}.png`} />
            <hr />

            <a className="boxLink" href={`https://github.com/${propriedades.githubUser}.png`}>
                @{propriedades.githubUser}
            </a>
            <hr />

            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

ProfileSidebar.Avatar = styled.img`
    border-radius: 8px;
    max-height: 128px;
`;