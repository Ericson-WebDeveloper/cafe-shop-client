import React, { useState } from "react";
import AddCategoryM from "../../../components/admin/AddCategoryM";
import EditCategory from "../../../components/admin/EditCategory";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../api/category-api";
import NoData from "../../../components/NoData";
import Loading from "../../../components/Loading";

// type Props = {}

const Page = React.memo(() => {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const { data, isError, isLoading} = useQuery(["categories"], getCategories, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex w-full max-h-auto min-h-[calc(100vh-70px)] z-[90] mb-10 md:mb-0">
      <div className="flex flex-col w-full h-full mx-auto container space-y-6">
        <div className="flex flex-row w-full space-x-3 items-center h-auto md:h-[50px] mt-24">
          <h1 className="text-3xl md:text-4xl font-mono text-red-500">Categories</h1>
          <button
            onClick={() => setAddModal(true)}
            className="p-2 bg-red-500 rounded-lg text-white font-sans font-semibold hover:bg-red-800"
          >
            Add New
          </button>
        </div>

        <div className="relative overflow-x-auto mx-3 xl:mx-0 rounded-xl">
        {isLoading ? (
            <div className="flex w-full md:h-[350px]">
              <Loading />
            </div>
          ) : isError ? (
            <div className="flex w-full h-[350px]">
              <NoData />
            </div>
          ) : (
          <table className="w-full text-sm text-left text-gray-300 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-red-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isError ? (
                <div className="flex w-full justify-center">
                  <h1 className="text-2xl text-red-600 font-semibold">
                    Data Not Found
                  </h1>
                </div>
              ) : (
                data?.data.categories?.map((category, index) => {
                  return (
                    <tr className="bg-gray-200 border-b text-black" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium  whitespace-nowrap "
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4 space-y-3 md:space-x-3">
                        <button
                          type="button"
                          onClick={() => setEditModal(true)}
                          className="p-2 px-4 bg-yellow-700 text-white rounded-lg font-mono hover:bg-yellow-400"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="p-2 px-4 bg-green-700 text-white rounded-lg font-mono hover:bg-green-400"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>
      <AddCategoryM showModal={addModal} onCloseModal={setAddModal} />
      <EditCategory showModal={editModal} onCloseModal={setEditModal} />
    </div>
  );
});

export default Page;
