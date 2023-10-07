import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  currePage: number;
  previous: null | undefined | { pageNumber: number | null; limit: number };
  next: null | undefined | { pageNumber: number; limit: number };
};

const Paginate = React.memo(({ currePage, previous, next }: Props) => {
  const [, setQuery] = useSearchParams();
  return (
    <div className="flex w-full pr-6 justify-end mt-4">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {previous ? (
            <li onClick={() => setQuery({ page: String(previous.pageNumber) })}>
              <span
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-white bg-white border 
              border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-red-700 dark:bg-red-800 dark:border-red-700 
              dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white cursor-pointer"
              >
                Previous
              </span>
            </li>
          ) : null}
          <li>
            <span
              className="flex items-center justify-center px-3 h-8 leading-tight text-white
          bg-red-800 border-red-700"
            >
              {currePage}
            </span>
          </li>
          {next ? (
            <li onClick={() => setQuery({ page: String(next.pageNumber) })}>
              <span
                className="flex items-center justify-center px-3 h-8 leading-tight text-white bg-white border border-red-300 rounded-r-lg
               hover:bg-red-100 hover:text-red-700 dark:bg-red-800 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-700
                dark:hover:text-white cursor-pointer"
              >
                Next
              </span>
            </li>
          ) : null}
        </ul>
      </nav>
      <br className="block xl:hidden" />
      <br className="block xl:hidden" />
    </div>
  );
});

export default Paginate;
