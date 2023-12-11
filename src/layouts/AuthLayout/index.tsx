import {
  Box,
  Flex,
  theme,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode, memo, useMemo } from 'react';

// Constants
import { IMAGES, THEMES, TITLES } from '@app/constants';

// Components
import { Benefit, Divider, IconButton, Logo } from '@app/components';
import AuthHeading from './Heading';
import AuthFooter from './Footer';
import { DarkTheme, LightTheme } from '@app/assets/icons';

// Types
import { TImage } from '@app/interfaces';

type TAuthLayoutProps = {
  children?: ReactNode;
  title?: string;
  isSignInForm?: boolean;
};

const AuthLayoutComponent = ({
  children,
  isSignInForm = true,
}: TAuthLayoutProps): JSX.Element => {
  const title: string = useMemo(
    (): string => (isSignInForm ? TITLES.SIGN_IN : TITLES.SIGN_UP),
    [isSignInForm],
  );
  const { url, alt }: TImage = useMemo(
    (): TImage => (isSignInForm ? IMAGES.SIGN_IN : IMAGES.SIGN_UP),
    [isSignInForm],
  );

  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex width="100%" minH="100vh">
      <Box
        as="section"
        p="40px 0 48px"
        flex={1}
        w={{
          base: '100%',
          md: 'unset',
        }}
        bg="background.body.secondary"
      >
        <Flex justifyContent="space-between" px={12}>
          <Logo />
          <IconButton onClick={toggleColorMode}>
            {colorMode === THEMES.LIGHT ? (
              <LightTheme color={colorFill} />
            ) : (
              <DarkTheme color={colorFill} />
            )}
          </IconButton>
        </Flex>
        <Box
          w={{
            base: '100%',
            sm: 425,
            md: 460,
          }}
          margin="auto"
          pt={24}
          pb={16}
          px={5}
          sx={{
            boxSizing: {
              base: 'border-box',
              md: 'unset',
            },
          }}
        >
          <AuthHeading title={title} />
          <Divider content={TITLES.AUTH_DiVIDER} />
          {children}
          <AuthFooter />
        </Box>
      </Box>
      <Benefit
        imageURL={url}
        alt={alt}
        heading="Speady, Easy and Fast"
        description={`BankCo. help you set saving goals, earn cash back offers, Go to
          disclaimer for more details and get paychecks up to two days early. Get
          a
            <span class="text-highlight">
              $20
            </span>
          bonus when you receive qualifying direct deposits`}
      />
    </Flex>
  );
};
const AuthLayout = memo(AuthLayoutComponent);

export default AuthLayout;
