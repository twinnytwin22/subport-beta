'use client';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'lib/providers/supabase/supabase-server';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect } from 'react';
import LoginFormScreen from 'ui/Auth/LoginFormScreen';
import { CommentContextComponent } from './component';
import useCommentsStore from './store';
export const GlobalUIContext = createContext<any>(null);

export const GlobalUI = ({ children }: { children: React.ReactNode }) => {
  const {
    dropId,
    comments,
    comment,
    users,
    getUsers,
    getComments,
    showTextarea: showModal,
    handleAddComment,
    handleDeleteComment,
    handleDiscardComment,
    handleCommentChange,
    useDropId
  } = useCommentsStore();

  const values = {
    useDropId,
    dropId,
    comments,
    comment,
    users,
    getUsers,
    getComments,
    showModal,
    handleAddComment,
    handleDeleteComment,
    handleDiscardComment,
    handleCommentChange
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target as Element;
      if (!targetElement.closest('.comments-modal')) {
        handleDiscardComment(); // Close the modal when clicking outside
        return;
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showModal, handleDiscardComment]);

  const { data: activeSession, isLoading } = useQuery({
    queryKey: ['activeSession'],
    queryFn: () => getSession()
  });

  console.log(activeSession, 'activeSession')

  const path = usePathname();
  const dropPage = path.startsWith('/drop');
  console.log(path);
  //  console.log("%c" + icon.replace(/_/g, " "), "background-color: black; color: lime; font-family: 'Courier New'; padding-bottom: 10px");
  //  console.log("\n\n\n");
  //   console.log("%cCheck out jobs() and apps()", "background-color: black; color: lime; padding: 5px 50px 5px 20px; font-family: 'Courier New'");
  return (
    !isLoading && (
      <GlobalUIContext.Provider value={values}>
        <div className={`${showModal && 'pr-2 w-screen h-screen'}`}>
          {children}
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-black mr-2 ">
              {/* Opaque background */}
              <div className=" fixed max-w-screen z-50 min-h-screen justify-center left-0 w-full p-4 top-36 rounded-md place-items-center mr-2">
                {/* Modal */}
                <CommentContextComponent dropId={dropId} />
              </div>
            </div>
          )}
          {!activeSession && !dropPage && (
            <div className="bg-white dark:bg-black h-screen w-screen fixed z-[9999] isolate top-0 left-0 right-0 ">
              <LoginFormScreen />
            </div>
          )}
        </div>
      </GlobalUIContext.Provider>
    )
  );
};

export const useGlobalUIContext = () => useContext(GlobalUIContext);
