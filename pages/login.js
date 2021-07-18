import { useState } from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import Login from '../src/components/Login';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState('omariosouto');

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e rivais duelistas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> suas vitórias, derrotas e decklists (ou só as suas histórias engraçadas) em um só lugar</p>
        </section>

        <section className="formArea">
          <div className="box">
            {/* <form onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              // alert('Alguém clicou no botão!')
              console.log('Usuário: ', githubUser)
              fetch('https://alurakut.vercel.app/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ githubUser: githubUser })
              })
                .then(async (respostaDoServer) => {
                  const dadosDaResposta = await respostaDoServer.json()
                  const token = dadosDaResposta.token;
                  nookies.set(null, 'USER_TOKEN', token, {
                    path: '/',
                    maxAge: 86400 * 7
                  })
                  router.push('/')
                })
            }}>
              <p>
                Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
              </p>
              <input
                placeholder="Usuário"
                value={githubUser}
                onChange={(evento) => {
                  setGithubUser(evento.target.value)
                }}
              />
              {githubUser.length === 0
                ? 'Preencha o campo'
                : ''
              }
              <button type="submit">
                Login
              </button>
            </form> */}

            <p>
              Acesse agora mesmo com sua conta do <strong>Google</strong>!
            </p>

            <div style={{ marginTop: '2rem' }}>
              <Login />
            </div>
          </div>

          {/* <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer> */}
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}
