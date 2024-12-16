import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const SectionBox = ({ id, title, children }) => {
    return (
        <Box
            id={id}
            w="full"
            p={4}
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="md"
            boxShadow="md"
            _hover={{ boxShadow: 'lg' }}
        >
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {title}
            </Text>
            {children}
        </Box>
    );
};

export default SectionBox;  
