import { apiSlice } from "@/app/api/apiSlice";
import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";

const categoryAdapter = createEntityAdapter({})
 
const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategory: builder.query({
            query: () => '/category',
            validateStatus: (response, result) => {
              return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
              const loadedCategory = responseData.allCategory.map(category => ({
                ...category,
                id: category._id
              }));
              return categoryAdapter.setAll(initialState, loadedCategory);
            },
            providesTags: (result, error, arg) => {
              if(result?.ids) {
                return [
                  { type: 'Category', id: 'List' },
                  ...result.ids.map(id => ({ type: 'Category', id }))
                ];
              } else {
                return [{ type: 'Category', id: 'List' }];
              }
            }
          }),
          addNewCategory: builder.mutation({
            query: initailCategoryData => ({
                url: '/category',
                method: 'POST',
                body: {
                    ...initailCategoryData
                }
            }),
            invalidatesTags: [
                {type:'Category', id: 'List'}
            ]
          }),
         updateCategory: builder.mutation({
            query: initailCategoryData => ({
                url: '/category',
                method:'PATCH',
                body: {
                    ...initailCategoryData
                }
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Category', id: arg.id}]
            }
          }),
          deleteCategory: builder.mutation({
            query: ({id}) => ({
                url: '/category',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Category', id:arg.id}]
          }),
        }),
        overrideExisting: true

})

export const {  
 useGetCategoryQuery,
 useAddNewCategoryMutation,
 useUpdateCategoryMutation
} = categoryApiSlice

// returns the query result object
export const selectCategoryResult = categoryApiSlice.endpoints.getCategory.select()

// creates memoized selector
const selectCategoryData = createSelector(
selectCategoryResult,
categoryResult => categoryResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllCategorys,
selectById: selectCategoryById,
selectIds: selectCategoryIds
// Pass in a selector that returns the feeds slice of state
} = categoryAdapter.getSelectors(state => selectCategoryData(state) ?? initialState)

