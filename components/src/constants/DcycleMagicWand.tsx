import { Text } from "@mantine/core";
import { IconWand } from "@tabler/icons-react";

export const DcycleMagicWandComponent = () => {
    return (
      <div className="flex p-4 items-center justify-center gap-3">
        <IconWand size={24} />{' '}
        <Text size="xl" fw={600}>
          Dcycle AI
        </Text>
      </div>
    );
  };
  