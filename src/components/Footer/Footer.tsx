import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import { IconContext } from 'react-icons';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io';
import { fire } from '../../../firebase';
import { logoutMutation } from '../../graphql/mutations';
import { getMeQuery } from '../../graphql/queries';
import { CopyRight, Divider, FollowTitle, FooderHeader, FooterInnerWrapper, HeaderText, LinkSection, LinkText, ShareIcon, SocialIcons, Wrapper } from './styles';

export interface ShopCardProps {
  classes: any;
}

function Footer(props: ShopCardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const onLogoutClick = async (logout, error) => {
    fire
      .auth()
      .signOut()
      .then(
        async function () {
          const response = await logout({
            refetchQueries: [
              {
                query: getMeQuery,
              },
            ],
          });
        },
        function (error2) {
          console.log(error);
          console.log(error2);
        }
      );
  };
  return (
    <Mutation mutation={logoutMutation}>
      {(logout, { loading, error }) => (
        <Wrapper>
          <FooterInnerWrapper>
            <FooderHeader>
              <Link href="/new-shop">
                <a>
                  <HeaderText>Start a new shop</HeaderText>
                </a>
              </Link>
              {!isAuthenticated ? (
                <Link href="/auth">
                  <a>
                    <HeaderText>Login</HeaderText>
                  </a>
                </Link>
              ) : (
                  <div role="button" onClick={() => onLogoutClick(logout, error)}>
                    <HeaderText disabled={loading}>Logout</HeaderText>
                  </div>
                )}
            </FooderHeader>
            <Divider />
            <LinkSection>
              <LinkText>About us</LinkText>
              <LinkText>Contact us</LinkText>
              <LinkText>Blog</LinkText>
              <LinkText>Browse feeds</LinkText>
              <LinkText>Browse shops</LinkText>
            </LinkSection>

            <FollowTitle>Follow Us</FollowTitle>
            <SocialIcons>
              <a href="https://www.facebook.com/agoraexpoinc/" target="_blank">
                <ShareIcon>
                  <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
                    <IoLogoFacebook />
                  </IconContext.Provider>
                </ShareIcon>
              </a>
              <a href="https://twitter.com/agoraexpo" target="_blank">
                <ShareIcon>
                  <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
                    <IoLogoTwitter />
                  </IconContext.Provider>
                </ShareIcon>
              </a>
              <a href="https://www.instagram.com/agora_expo/" target="_blank">
                <ShareIcon>
                  <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
                    <IoLogoInstagram />
                  </IconContext.Provider>
                </ShareIcon>
              </a>
              <a href="https://www.linkedin.com/company/agoraexpo-inc/" target="_blank">
                <ShareIcon>
                  <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
                    <IoLogoLinkedin />
                  </IconContext.Provider>
                </ShareIcon>
              </a>
              <a href="https://www.youtube.com/channel/UCybfGsMQoZe92JEaFwPv20g" target="_blank">
                <ShareIcon>
                  <IconContext.Provider value={{ style: { color: 'inherit', fontSize: '30px' } }}>
                    <IoLogoYoutube />
                  </IconContext.Provider>
                </ShareIcon>
              </a>
            </SocialIcons>
            <CopyRight>&copy;agoraexpo 2019</CopyRight>
          </FooterInnerWrapper>
        </Wrapper>
      )}
    </Mutation>
  );
}

export default Footer;
