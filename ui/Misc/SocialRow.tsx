import Link from 'next/link';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter
} from 'react-icons/ai';

function SocialRow() {
  return (
    <div className="flex justify-center items-center dark:text-white text-black ">
      <Link
        href="https://twitter.com/subportxyz"
        data-tooltip-target="tooltip-facebook"
        className="inline-flex justify-center p-2  cursor-pointer   hover:text-blue-500  duration-300 ease-in-out "
      >
        <AiFillFacebook className="w-5 h-5" />
        <span className="sr-only">Facebook</span>
      </Link>

      <Link
        href="https://twitter.com/subportxyz"
        data-tooltip-target="tooltip-twitter"
        className="inline-flex justify-center p-2   cursor-pointer   hover:text-blue-500 duration-300 ease-in-out "
      >
        <AiOutlineTwitter className="w-5 h-5" />
        <span className="sr-only">Twitter</span>
      </Link>

      <Link
        href="https://www.instagram.com/subport.xyz/"
        data-tooltip-target="tooltip-github"
        className="inline-flex justify-center p-2  cursor-pointer   hover:text-blue-500   duration-300 ease-in-out "
      >
        <AiFillInstagram className="w-5 h-5" />
      </Link>
    </div>
  );
}

export default SocialRow;
