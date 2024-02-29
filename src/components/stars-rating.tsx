import { Icon, Stack, StackProps } from '@chakra-ui/react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  initialRating?: number;
  viewMode?: boolean
  onRate?: (rating: number) => void;
  variant?: "card" | "review";
  boxSize?: string | number;
  stackProps?: StackProps;
}

export default function StarRating({
  onRate = () => {
    true;
  },
  initialRating = 0,
  viewMode = false,
  variant = "review",
  boxSize = 6,
  stackProps  
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const starColor = variant === "review" ? "#00CFB4" : "teal.500";
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRate(selectedRating);
  };

  return (
    <Stack direction="row" {...stackProps}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Icon
          key={value}
          as={FaStar}
          boxSize={boxSize}
          color={value <= rating ? starColor : "gray.200"}
          cursor={!viewMode ? "pointer" : "default"}
          onClick={!viewMode ? () => handleStarClick(value) : undefined}
        />
      ))}
      {/* <Text fontSize="sm">{rating} estrellas</Text> */}
    </Stack>
  );
};

