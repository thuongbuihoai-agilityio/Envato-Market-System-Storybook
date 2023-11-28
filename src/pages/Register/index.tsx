import { ChangeEvent, memo, useCallback } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants/routers';

// Layouts
import { AuthLayout } from '@layouts/index';

// Components
import { InputField } from '@components/index';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AUTH_SCHEMA } from '@constants/form';

type TRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAcceptPrivacyPolicy: boolean;
};

const RegisterPage = () => {
  const { control, handleSubmit } = useForm<TRegisterForm>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      isAcceptPrivacyPolicy: false,
    },
  });
  const { isOpen: isShowPassword, onToggle: onShowPassword } = useDisclosure();
  const { isOpen: isShowConfirmPassword, onToggle: onShowConfirmPassword } =
    useDisclosure();

  const renderPasswordIcon = useCallback(
    (isCorrect: boolean, callback: typeof onShowPassword): JSX.Element => {
      const Icon = isCorrect ? ViewIcon : ViewOffIcon;

      return (
        <Icon
          color="gray.400"
          w="25px"
          h="25px"
          cursor="pointer"
          onClick={callback}
        />
      );
    },
    [],
  );

  // TODO: Will be update when API ready
  const handleSubmitForm: SubmitHandler<TRegisterForm> =
    useCallback(() => {}, []);

  return (
    <AuthLayout isSignInForm={false}>
      <VStack
        as="form"
        gap={6}
        onSubmit={handleSubmit(handleSubmitForm)}
        id="register-form"
      >
        <HStack
          gap={{
            base: 6,
            md: 10,
          }}
          w="100%"
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
        >
          <Controller
            control={control}
            rules={AUTH_SCHEMA.FIRST_NAME}
            name="firstName"
            render={({ field, fieldState: { error } }) => (
              <InputField
                variant="authentication"
                placeholder="First name"
                {...field}
                isError={!!error}
                errorMessages={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={AUTH_SCHEMA.LAST_NAME}
            name="lastName"
            render={({ field, fieldState: { error } }) => (
              <InputField
                variant="authentication"
                placeholder="Last name"
                {...field}
                isError={!!error}
                errorMessages={error?.message}
              />
            )}
          />
        </HStack>

        <Controller
          control={control}
          rules={AUTH_SCHEMA.EMAIL}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <InputField
              variant="authentication"
              placeholder="Email"
              {...field}
              isError={!!error}
              errorMessages={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={AUTH_SCHEMA.EMAIL}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <InputField
              type="password"
              variant="authentication"
              placeholder="Password"
              rightIcon={renderPasswordIcon(isShowPassword, onShowPassword)}
              {...field}
              isError={!!error}
              errorMessages={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={AUTH_SCHEMA.EMAIL}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <InputField
              type="password"
              variant="authentication"
              placeholder="Confirm password"
              rightIcon={renderPasswordIcon(
                isShowConfirmPassword,
                onShowConfirmPassword,
              )}
              {...field}
              isError={!!error}
              errorMessages={error?.message}
            />
          )}
        />
        <Flex gap={3}>
          <Controller
            control={control}
            name="isAcceptPrivacyPolicy"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                size="md"
                colorScheme="green"
                isChecked={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.checked)
                }
              ></Checkbox>
            )}
          />
          <Text color="text.secondary" fontSize="md" flex={1}>
            By creating an account, you agreeing to our
            <Text as="span" color="text.primary">
              Privacy Policy
            </Text>
            , and
            <Text as="span" color="text.primary">
              Electronics Communication Policy.
            </Text>
          </Text>
        </Flex>
      </VStack>

      <Button
        type="submit"
        textTransform="capitalize"
        my={7}
        form="register-form"
      >
        Sign Un
      </Button>

      <Text fontWeight="medium" textAlign="center">
        Already have an account?
        <Text
          as={Link}
          to={ROUTES.REGISTER}
          fontWeight="semibold"
          textDecoration="underline"
        >
          Sign In
        </Text>
      </Text>
    </AuthLayout>
  );
};

const Register = memo(RegisterPage);
export default Register;
