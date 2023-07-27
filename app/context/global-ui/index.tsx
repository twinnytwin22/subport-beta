'use client'
import React, { createContext, useContext, useEffect } from 'react'
import useCommentsStore from './store';
import { CommentContextComponent } from './component';
export const GlobalUIContext = createContext<any>(null);

export const GlobalUI =
    ({ children }: { children: React.ReactNode }) => {
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
            handleCommentChange,
        }

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



        return (
            <GlobalUIContext.Provider value={values}>
                {children}
                {showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-opacity-50 bg-black">
                        {/* Opaque background */}
                        <div className=" fixed max-w-screen z-50 min-h-screen justify-center left-0 w-full p-4 top-36 rounded-md place-items-center">
                            {/* Modal */}
                            <CommentContextComponent dropId={dropId} />
                        </div>
                    </div>
                )}
            </GlobalUIContext.Provider>
        );
    };

export const useGlobalUIContext = () => useContext(GlobalUIContext);
