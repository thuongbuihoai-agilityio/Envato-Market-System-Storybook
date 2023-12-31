import { ChangeEvent, memo, useCallback, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler } from 'react-hook-form';

// Hooks
import { useAuth, useForm } from '@app/hooks';

// HOCs
import { withAuthenticationLayout } from '@app/hocs/withAuthentication';
import { withErrorBoundary } from '@app/hocs/withErrorBoundary';

// Constants
import { ROUTES, ERROR_MESSAGES, AUTH_SCHEMA } from '@app/constants';

// Components
import { InputField } from '@app/components';

// Types
import { TUserDetail } from '@app/interfaces/user';

// Utils
import { validatePassword } from '@app/utils/helpers';

type TRegisterForm = Omit<TUserDetail, 'id' | 'createdAt'> & {
  confirmPassword: string;
  isAcceptPrivacyPolicy: boolean;
};

const RegisterPage = () => {
  const { signUp } = useAuth();
  const redirect = useNavigate();
  // Control form
  const {
    control,
    formState: {
      errors: { root },
    },
    watch,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<TRegisterForm>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      isAcceptPrivacyPolicy: false,
    },
  });

  // Control show/hide password and confirmPassword
  const { isOpen: isShowPassword, onToggle: onShowPassword } = useDisclosure();
  const { isOpen: isShowConfirmPassword, onToggle: onShowConfirmPassword } =
    useDisclosure();

  // Disable button when wait response from Server
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const isDisabledSubmitBtn: boolean =
    isSubmit || !Object.values(watch()).every((value) => value);

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

  const handleSubmitForm: SubmitHandler<TRegisterForm> = useCallback(
    async (data) => {
      setIsSubmit(true);

      const {
        isAcceptPrivacyPolicy: _isAcceptPrivacyPolicy,
        confirmPassword: _confirmPassword,
        ...fieldValues
      } = data;
      try {
        const { errors } = await signUp(fieldValues);

        if (errors) {
          return Object.entries(errors).forEach(([key, value]) =>
            setError(key as keyof typeof data, {
              type: 'custom',
              message: value,
            }),
          );
        }

        redirect(ROUTES.ROOT);
      } catch (error) {
        setError('root', {
          type: 'custom',
          message: ERROR_MESSAGES.SOMETHING_ERROR,
        });
      } finally {
        setIsSubmit(false);
      }
    },
    [redirect, setError, signUp],
  );

  const handleClearErrorMessage = useCallback(
    (field: keyof TRegisterForm, onChange: (value: string) => void) =>
      (data: string) => {
        clearErrors(field);
        onChange(data);
      },
    [clearErrors],
  );

  return (
    <>
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
                isDisabled={isSubmit}
                onChange={handleClearErrorMessage('firstName', field.onChange)}
                aria-label="first-name"
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
                isDisabled={isSubmit}
                onChange={handleClearErrorMessage('lastName', field.onChange)}
                aria-label="last-name"
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
              isDisabled={isSubmit}
              onChange={handleClearErrorMessage('email', field.onChange)}
              aria-label="email"
            />
          )}
        />

        <Controller
          rules={{ validate: validatePassword }}
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => {
            const { message } = error ?? {};

            return (
              <InputField
                type={isShowPassword ? 'text' : 'password'}
                variant="authentication"
                placeholder="Password"
                rightIcon={renderPasswordIcon(isShowPassword, onShowPassword)}
                {...field}
                isError={!!message}
                errorMessages={message}
                isDisabled={isSubmit}
                onChange={handleClearErrorMessage('password', field.onChange)}
                aria-label="password"
                role="textbox"
              />
            );
          }}
        />

        <Controller
          control={control}
          rules={AUTH_SCHEMA.CONFIRM_PASSWORD}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <InputField
              type={isShowConfirmPassword ? 'text' : 'password'}
              variant="authentication"
              placeholder="Confirm password"
              rightIcon={renderPasswordIcon(
                isShowConfirmPassword,
                onShowConfirmPassword,
              )}
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              isDisabled={isSubmit}
              onChange={handleClearErrorMessage(
                'confirmPassword',
                field.onChange,
              )}
            />
          )}
        />
        <Flex gap={3}>
          <Controller
            control={control}
            rules={AUTH_SCHEMA.AGREE_POLICY}
            name="isAcceptPrivacyPolicy"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Checkbox
                size="md"
                colorScheme="green"
                isChecked={value}
                isDisabled={isSubmit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.checked)
                }
                {...(error && {
                  sx: {
                    '> span': {
                      borderColor: 'danger.400',
                    },
                  },
                })}
              >
                <Text color="text.secondary" fontSize="md" flex={1}>
                  By creating an account, you&apos;re agreeing to our {''}
                  <ChakraLink href="#" color="text.primary" cursor="pointer">
                    Privacy Policy
                  </ChakraLink>
                  , and {''}
                  <ChakraLink href="#" color="text.primary" cursor="pointer">
                    Electronics Communication Policy.
                  </ChakraLink>
                </Text>
              </Checkbox>
            )}
          />
        </Flex>
      </VStack>

      {/* Show API error */}
      <Box mb={7}>
        <Text color="red" textAlign="center" py={2} h={10}>
          {root?.message}
        </Text>
        <Button
          type="submit"
          aria-label="btn-sign-up"
          textTransform="capitalize"
          form="register-form"
          isDisabled={isDisabledSubmitBtn}
        >
          Sign Up
        </Button>
      </Box>

      <Text fontWeight="medium" textAlign="center">
        Already have an account?
        <Text
          as={Link}
          to={`/${ROUTES.LOGIN}`}
          aria-label="sign in"
          fontWeight="semibold"
          textDecoration="underline"
          ml={2}
        >
          Sign In
        </Text>
      </Text>
    </>
  );
};

const Register = memo(
  withErrorBoundary(withAuthenticationLayout(RegisterPage, false)),
);

export default Register;
