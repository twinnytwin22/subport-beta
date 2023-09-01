import React from "react";

interface PaginationProps {
  itemsPerPage: number
  totalItems: number
  paginateFront: any
  paginateBack: any
  currentPage: number
}

export default function Pagination(props: PaginationProps) {


  const { itemsPerPage, totalItems, paginateBack, paginateFront, currentPage } = props

  return (
    <div className="flex items-center  justify-between w-full">
      <div className="flex flex-row items-center">
        <div className="text-sm text-zinc-700 dark:text-zinc-400 mr-2">Showing</div>
        <div className="font-semibold text-zinc-900 dark:text-white mr-2 hidden">{currentPage * itemsPerPage - 10}</div>
        <div className="text-sm text-zinc-700 dark:text-zinc-400 mr-2 hidden">of</div>
        <div className="font-semibold text-zinc-900 dark:text-white mr-2">{currentPage * itemsPerPage}</div>
        <div className="text-sm text-zinc-700 dark:text-zinc-400 mr-2">of</div>
        <div className="font-semibold text-zinc-900 dark:text-white mr-2">{totalItems}</div>
        <div className="text-sm text-zinc-700 dark:text-zinc-400 mr-2"> results</div>
      </div>
      <div className="inline-flex mt-2 xs:mt-0">
        <div className="text-zinc-900 dark:text-white">
          <button disabled={currentPage === 1}
            onClick={() => {
              paginateBack();
            }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-zinc-800 rounded-l hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
            <p className="text-zinc-700 dark:text-zinc-400">Previ</p></button>
        </div>
        <div className="text-zinc-900 dark:text-white">
          <button disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            onClick={() => {
              paginateFront();
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-zinc-800 border-0 border-l border-zinc-700 rounded-r hover:bg-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white">
            <p className="text-zinc-700 dark:text-zinc-400">Next</p>
            <svg aria-hidden="true" className="w-5 h-5 ml-2 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}


