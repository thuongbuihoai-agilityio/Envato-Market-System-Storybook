// Types
import { TColor } from '@interfaces/index';

export const Gift = ({ color }: TColor) => (
  <svg
    stroke={color}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 11H20M4 11C2.89543 11 2 10.1046 2 9V8C2 6.89543 2.89543 6 4 6H20C21.1046 6 22 6.89543 22 8V9C22 10.1046 21.1046 11 20 11M4 11L4 20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V11M12 6H16C17.1046 6 18 5.10457 18 4C18 2.89543 17.1046 2 16 2C13.7909 2 12 3.79086 12 6ZM12 6H8C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C10.2091 2 12 3.79086 12 6ZM12 6V22"
      strokeWidth="1.5"
      strokeLinecap="round"
    ></path>
  </svg>
);
