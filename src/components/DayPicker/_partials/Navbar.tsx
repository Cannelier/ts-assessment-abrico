import { Group, IconButton } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type CustomNavbarProps = {
  onPreviousClick(): void;
  onNextClick(): void;
};

export const Navbar: React.FC<React.PropsWithChildren<CustomNavbarProps>> = ({
  onPreviousClick,
  onNextClick,
}) => {
  return (
    <Group>
      <IconButton
        visual="@secondary"
        aria-label="Mois précédent"
        float="right"
        onClick={onPreviousClick}
      >
        <FiChevronLeft fontSize="sm" />
      </IconButton>
      <IconButton
        visual="@secondary"
        aria-label="Mois suivant"
        float="right"
        onClick={onNextClick}
      >
        <FiChevronRight fontSize="sm" />
      </IconButton>
    </Group>
  );
};
