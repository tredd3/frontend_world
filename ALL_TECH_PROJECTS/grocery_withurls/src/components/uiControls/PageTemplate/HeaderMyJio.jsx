import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { showHeader, hideHeader } from '../../../intents';

const pathsNeedingHeader = [
  '/',
  '/static/jiokart/index.html',
  '/index.html',
  '/static/jiomart/index.html',
  '/static/jiomart/pgloader',
  '/pgloader'
];

const shouldShowHeader = path => pathsNeedingHeader.includes(path);

export default ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (shouldShowHeader(location.pathname)) showHeader();
    else hideHeader();
  }, [location.pathname]);

  return children;
};
