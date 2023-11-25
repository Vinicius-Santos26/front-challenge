import { Flex } from "@chakra-ui/react";
import { StepCard } from "../StepCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface StepLaneProps {
  title: string;
  items: string[];
}

export default function StepLane({ items }: StepLaneProps) {
  
  return (
    <Flex flex="3" padding="5" flexDirection="column" minH="10rem">
      <Flex
        backgroundColor="gray.200"
        borderRadius="8"
        flex="1"
        padding="2"
        flexDirection="column"
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((step) => (
            <StepCard id={step} key={step} />
          ))}
        </SortableContext>
      </Flex>
    </Flex>
  );
}
