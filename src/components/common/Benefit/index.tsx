import { memo } from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

// Constants
import { IMAGES } from '@app/constants/images';

interface BenefitProps {
  image: {
    url: string;
    width: number;
    height: number;
  };
  alt: string;
  heading?: string;
  width?: string;
}

const BenefitComponent = ({
  image,
  alt,
  heading,
  width = '50%',
}: BenefitProps) => (
  <Flex
    w={width}
    p={20}
    minH="100vh"
    alignItems="center"
    position="relative"
    flexDirection="column"
    display={{ base: 'none', lg: 'block' }}
    backgroundColor="background.section.primary"
  >
    <Image
      src={image.url}
      fallbackSrc={IMAGES.FALLBACK.url}
      fallbackStrategy="onError"
      alt={alt}
      w={image.width}
      height={image.height}
    />
    <Image
      position="absolute"
      boxSize={115}
      top={10}
      left={8}
      src={IMAGES.SQUARE.url}
      alt={IMAGES.SQUARE.alt}
      fallbackSrc={IMAGES.FALLBACK.url}
      fallbackStrategy="onError"
    />
    <Image
      position="absolute"
      w={27}
      h={143}
      top={14}
      right={12}
      src={IMAGES.VLINE.url}
      alt={IMAGES.VLINE.alt}
      fallbackSrc={IMAGES.FALLBACK.url}
      fallbackStrategy="onError"
      objectFit="contain"
    />
    <Image
      position="absolute"
      boxSize={81}
      bottom={1}
      left={8}
      src={IMAGES.DOTTED.url}
      alt={IMAGES.DOTTED.alt}
      fallbackSrc={IMAGES.FALLBACK.url}
      fallbackStrategy="onError"
    />
    <Box
      fontFamily="primary"
      textAlign="center"
      m="0 auto"
      w={{ '2xl': '500px' }}
    >
      <Heading
        as="h2"
        variant="heading4Xl"
        marginBottom={4}
        color="text.primary"
      >
        {heading}
      </Heading>

      <Text fontWeight="medium" fontSize="sm" textAlign="center">
        BankCo. help you set saving goals, earn cash back offers, Go to
        disclaimer for more details and get paychecks up to two days early. Get
        a
        <Text
          as="span"
          color="text.currencyColor"
          paddingInline={1}
          fontWeight="bold"
          fontSize="sm"
        >
          $20
        </Text>
        bonus when you receive qualifying direct deposits
      </Text>
    </Box>
  </Flex>
);

const Benefit = memo(BenefitComponent);

export default Benefit;
