import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import logo from '../../imgs/logo.png';
import { AuthContainer } from './authComponents';
import { Content, Form, Input } from '../styledComponents';

const StyledForgot = styled.p`
  height: 15px;

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  cursor: pointer;

  text-align: right;

  color: #011338;
`;

const Button = styled.button.attrs(
  (props: { c: string; wid: string; bc: string }) => props
)`
  height: 47px;

  border: 2px solid #5f8f3e;
  box-sizing: border-box;
  border-radius: 12px;

  cursor: pointer;
  background: ${({ bc }) => bc};

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  text-align: center;

  width: 100%;
  @media only screen and (min-width: 300px) {
    width: ${({ wid }) => wid};
  }

  color: ${(props) => props.c};
`;

const Flex = styled.div.attrs((props: { ai: string; dir: string }) => props)`
  display: flex;
  align-items: ${({ ai }) => ai};
  justify-content: space-between;
  flex-direction: ${({ dir }) => dir};
`;

const StyledImage = styled.img`
  height: auto;
  width: auto;
  max-width: 173px;
  max-height: 173px;
`;

const CLink = styled(Link)`
  width: 45%;
`;

const FLink = styled(Link)`
  text-decoration: none;
`;

// eslint-disable-next-line max-len
export default function LoginPage({
  setUser,
}: {
  setUser: (val: string) => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // "required" attribute on input validates

  // only runs when form not disabled (requirements met)
  const retrieveUser = () => {
    console.log(username);
    console.log(password);
  };

  // authenticate sign in
  const signIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
      setUser(user.userSub);
      console.log(`Successful sign in for user: ${username}`);
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  return (
    <AuthContainer>
      <Flex dir="column" ai="center">
        <StyledImage src={logo} alt="The Land Conservancy of SLO logo" />
      </Flex>
      <Content>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            retrieveUser();
            signIn();
          }}
        >
          <Input
            type="email"
            id="f1"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="email"
            required
          />
          <Input
            type="password"
            id="f2"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />

          <Flex dir="row">
            <CLink to="/create-account">
              <Button type="button" c="#5F8F3E" wid="100%">
                {' '}
                Create Account{' '}
              </Button>
            </CLink>
            <Button type="submit" bc="#5F8F3E" c="#ffffff" wid="45%">
              {' '}
              Sign in{' '}
            </Button>
          </Flex>
        </Form>
        <FLink to="/forgot-password">
          <StyledForgot> Forgot password? </StyledForgot>
        </FLink>
      </Content>
    </AuthContainer>
  );
}
