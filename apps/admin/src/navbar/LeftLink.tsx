import {
  HoverCard,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Link } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color?: string;
  label: string;
  tooglesize: boolean;
  path: string;
  setOpen?: any;
  name: string;
}

export default function LeftLink({
  icon,
  color,
  label,
  tooglesize,
  path,
  setOpen,
  name,
}: MainLinkProps) {
  const mediaQuery = useMediaQuery('(min-width: 768px)');
  return (
    <Link
      to={path}
      onClick={() => {
        if (setOpen) setOpen(false);
      }}
    >
      <HoverCard position="right" shadow="md">
        <HoverCard.Target>
          <UnstyledButton
            style={{
              display: 'block',
              width: '100%',
              padding: 2,
              borderRadius: 2,
              // color: "white",
              // '&:hover': {
              // backgroundColor:"#555",
              // },
              // "@media:(max-width: 600px)"
            }}
            // className="md:hover:bg-gray-500 hover:bg-slate-200 flex gap-x-3" // sm:text-black md:text-white'
          >
            {/* <Group align={'flex-end flex'}> */}
            <ThemeIcon color={'white'} variant="filled">
              {icon}
            </ThemeIcon>
            {
              <Text
                size="sm"
                className={`${mediaQuery ? 'text-white' : 'text-black'} ${
                  !tooglesize ? 'w-28' : 'w-0'
                } overflow-hidden`}
              >
                {label}
              </Text>
            }
            {/* </Group> */}
          </UnstyledButton>
        </HoverCard.Target>
        <HoverCard.Dropdown
          className={
            !tooglesize ? 'hidden' : 'block fixed ml-4 outline-none border-none'
          }
          // style={{ backgroundColor: '#000000aa' }}
        >
          <Text size="xs">{name}</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Link>
  );
}
