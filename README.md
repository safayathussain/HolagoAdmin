This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Color Code 
grey: [#F9FAFB] hover: [#c8c9c986]

{
  /* <DataTable
        className="shadow-lg rounded-md border-none overflow-hidden w-full"
        columns={columns}
        data={data}
        selectableRows
        pagination
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
      /> */
}



const customStyles = {
    rows: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
        color: "#6B7280",
        "&:not(:last-of-type)": {
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "#D1D5DB",
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: "#F9FAFB",
        color: "#6B7280",
        fontSize: "14px",
        fontWeight: "600",
      },
    },
    conditionalRowStyles: [
      {
        when: (row) => row.status === "Pending",
        style: {
          backgroundColor: "#FEE2E2",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.status === "Processing",
        style: {
          backgroundColor: "#FEF3C7",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.status === "Completed",
        style: {
          backgroundColor: "#D1FAE5",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.status === "Cancelled",
        style: {
          backgroundColor: "#FECACA",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.status === "Failed",
        style: {
          backgroundColor: "#FED7D7",
        },
      },
    ],
  };

  const columns = [
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Origin",
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];