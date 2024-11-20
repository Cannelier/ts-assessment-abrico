import { Image, ImageProps } from '@chakra-ui/react';

export const Logo = (props: ImageProps) => {
  return (
    <Image src={'/assets/logo-horizontal-orange.svg'} alt="logo" {...props} />
  );
};
