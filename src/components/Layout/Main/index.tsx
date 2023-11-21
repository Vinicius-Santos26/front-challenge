import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import { Link, Outlet, useLocation, useMatches } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';

export function Main() {
  const location = useLocation();
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.pathname));

  const { user } = useAuth();

  const grayBackgroundPages = ["/signin", "/signup"] 

  return (
    <Flex
      as="main"
      flex="1"
      flexDirection="column"
      gap="4"
      py="4"
      px="8"
      bgColor={grayBackgroundPages.includes(location.pathname) ? 'gray.100' : 'white'}
    >
      {user && (
        <Breadcrumb
          separator={<FaChevronRight />}
          fontWeight="normal"
          fontSize="md"
        >
          {crumbs.map((crumb) => (
            <BreadcrumbItem key={crumb.to}>
              <BreadcrumbLink as={Link} to={crumb.to}>
                {crumb.text}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}

      <Outlet />
    </Flex>
  );
}
