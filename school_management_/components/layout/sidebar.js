import React from 'react';
import { Box, VStack, Link, Text } from '@chakra-ui/react';

const Sidebar = ({ links }) => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg="blue.600"
      color="white"
      p={4}
      position="fixed"
      top={0}
      left={0}
    >
      <VStack align="start" spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Dashboard
        </Text>
        {links.map((link, index) => (
          <Link key={index} href={link.href} _hover={{ textDecoration: 'none', color: 'blue.300' }}>
            {link.label}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;