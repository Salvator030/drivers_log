import classes from './MainContainer.module.css';
import {Login} from '../Login/Login';
import { Title } from '@mantine/core';

export function MainContainer () {
  return (
    <>
   <Title order={1}>Drivers Log</Title> 
      <Login/>
    </>
  );
}
