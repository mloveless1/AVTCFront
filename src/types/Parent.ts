import { Athlete } from './Athlete';

type Parent = {
    parent_id?: number;
    email: string;
    phone_number: string;

    athletes: Athlete[];
  };
  
  export default Parent;