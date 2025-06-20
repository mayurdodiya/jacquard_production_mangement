import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   {
//     id: "1",
//     name: "Tech Solutions Inc.",
//     email: "admin@techsolutions.com",
//     phone: "+1-555-0123",
//     address: "123 Tech Street, Silicon Valley, CA",
//     industry: "Technology",
//     status: "Active",
//     employees: 150,
//     joinedDate: "2023-01-15",
//   },
//   {
//     id: "2",
//     name: "Manufacturing Corp",
//     email: "contact@manufacturing.com",
//     phone: "+1-555-0456",
//     address: "456 Industrial Ave, Detroit, MI",
//     industry: "Manufacturing",
//     status: "Active",
//     employees: 300,
//     joinedDate: "2023-03-20",
//   },
//   {
//     id: "3",
//     name: "Retail Enterprises",
//     email: "info@retail.com",
//     phone: "+1-555-0789",
//     address: "789 Commerce Blvd, New York, NY",
//     industry: "Retail",
//     status: "Pending",
//     employees: 75,
//     joinedDate: "2023-11-01",
//   },
// ];

// https://6855264c6a6ef0ed6631731b.mockapi.io/companydetails

const initialState: any = [];

const slice = createSlice({
  name: "company",
  initialState,
  reducers: {
    fetchCompanies(state, action: { type: string; payload: any }) {
      return (state = action.payload);
    },
    getError(state, action: { type: string; payload: any }) {
      return (state = action.payload);
    },
  },
});

export const { fetchCompanies, getError } = slice.actions;
export default slice.reducer;
