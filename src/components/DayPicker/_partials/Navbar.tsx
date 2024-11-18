import { ButtonGroup, IconButton } from '@chakra-ui/react';
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
    <ButtonGroup size="sm" variant="@secondary">
      <IconButton
        aria-label="Mois précédent"
        float="right"
        onClick={() => onPreviousClick()}
      >
        <FiChevronLeft fontSize="sm" />
      </IconButton>
      <IconButton
        aria-label="Mois suivant"
        float="right"
        onClick={() => onNextClick()}
      >
        <FiChevronRight fontSize="sm" />
      </IconButton>
    </ButtonGroup>
  );
};
