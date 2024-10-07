// components/ProfileList.tsx

import { FC } from 'react';
import {
    MdOutlineFemale,
    MdOutlineMale,
    MdOutlineSchool,
    MdOutlineTransgender,
    MdWorkOutline
} from 'react-icons/md';

interface ProfileListProps {
  occupation: string;
  education: string;
  gender: string;
}

const ProfileList: FC<ProfileListProps> = ({
  occupation,
  education,
  gender
}) => {
  // Function to render the correct gender icon
  const renderGenderIcon = () => {
    switch (gender.toLowerCase()) {
      case 'male':
        return (
          <MdOutlineMale className="w-5 h-5 mr-3 text-black dark:text-white" />
        );
      case 'female':
        return (
          <MdOutlineFemale className="w-5 h-5 mr-3 text-black dark:text-white" />
        );
      case 'transgender':
        return (
          <MdOutlineTransgender className="w-5 h-5 mr-3 text-black dark:text-white" />
        );
      default:
        return null; // Optionally handle other cases
    }
  };

  return (
    <div className="max-w-md flex w-full justify-start">
      <ul className="space-y-4">
        <li className="flex items-center">
          <MdWorkOutline className="w-5 h-5 mr-3 text-black dark:text-white" />
          <span className="text-gray-700 dark:text-zinc-50 font-medium">
            {' '}
            {occupation}
          </span>
        </li>
        <li className="flex items-center">
          <MdOutlineSchool className="w-5 h-5 mr-3 text-black dark:text-white" />
          <span className="text-gray-700 dark:text-zinc-50 font-medium">
            {' '}
            {education}
          </span>
        </li>
        <li className="flex items-center">
          {renderGenderIcon()}
          <span className="text-gray-700 dark:text-zinc-50 font-medium">
             {gender}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileList;
