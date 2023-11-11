'use client';
import { useAuthProvider } from 'app/context/auth';
import { supabase } from 'lib/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const NewUserModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  const { profile } = useAuthProvider();
  const [username, setUsername] = useState<string | null>(null);
  const handle = profile?.username;
const router = useRouter()
  //console.log(profile)
  const handleOnSubmit = async () => {
    if (profile && username) {
      try {
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .update({ username: username })
          .eq('id', profile.id!)
          .select();

        if (newProfile) {
          //  console.log(JSON.stringify(newProfile))
          toast.success(`Profile updated with username`);
          setUsername(null); // Clear the input field after successful insertion
          //refresh();
          router.refresh()
        }

        if (error) {
          console.log(error);
          throw error;
        }
      } catch (error) {
        console.log(error);
        throw new Error('Error inserting username:');
      }
    }
  };

  const handleTermsCheck = (e: any) => {
    setTermsChecked(e.target.checked);
  };
  if (profile && !handle) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center  justify-center mx-8 sm:pl-32 lg:pl-64 ${showModal ? '' : 'hidden'
          }`}
      >
        <div className="fixed inset-0 bg-zinc-500 dark:bg-zinc-950 opacity-75 blur-3xl"></div>
        <div className="bg-slate-200 dark:bg-black border border-slate-300 dark:border-zinc-700 rounded-md p-8 mx-1 md:mx-4 max-w-xl w-full space-y-4 place-items-center mt-8 relative z-10">
          {/* Content of the modal */}
          <div className="p-4 md:p-8">
            <h2 className="text-2xl mb-4">Create User Handle</h2>
            <p className="mb-4">
              You need to create a user handle before proceeding.
            </p>
            <div>
              <input
                className="bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="username"
                type="text"
                value={username || ''}
                onChange={(e: any) => setUsername(e.target.value)}
              />
              <br />
              <div className="flex items-center">
                <input
                  className="mr-2"
                  id="termsCheck"
                  type="checkbox"
                  checked={termsChecked}
                  onChange={handleTermsCheck}
                  required
                />
                <label htmlFor="termsCheck required">
                  I agree to the terms and conditions
                </label>
              </div>
              <br />
              <button
                onClick={handleOnSubmit}
                className="bg-blue-700 text-white px-4 py-2 rounded"
              >
                Create Handle
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NewUserModal;
