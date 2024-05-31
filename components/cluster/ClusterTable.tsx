// import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

// interface ClusterData {
//   hostName: string;
//   state: string;
//   id: string;
//   ip: string;
//   cpu: number;
//   memory: string;
//   gpu: string | null;
//   gram: string;
//   diskRoot: string;
//   sent: string;
//   received: string;
//   logicalResources: string;
// }

// const ClusterTable = ({ data }: { data: ClusterData[] }) => {
//   const columns = [
//     {
//       header: 'Host / Worker Process name',
//       accessorKey: 'hostName',
//     },
//     {
//       header: 'State',
//       accessorKey: 'state',
//     },
//     {
//       header: 'ID',
//       accessorKey: 'id',
//     },
//     {
//       header: 'IP / PID',
//       accessorKey: 'ip',
//     },
//     {
//       header: 'Actions',
//       accessorKey: 'actions',
//       cell: () => <span>Log</span>,
//     },
//     {
//       header: 'CPU',
//       accessorKey: 'cpu',
//     },
//     {
//       header: 'Memory',
//       accessorKey: 'memory',
//     },
//     {
//       header: 'GPU',
//       accessorKey: 'gpu',
//     },
//     {
//       header: 'GRAM',
//       accessorKey: 'gram',
//     },
//     {
//       header: 'Disk(root)',
//       accessorKey: 'diskRoot',
//     },
//     {
//       header: 'Sent',
//       accessorKey: 'sent',
//     },
//     {
//       header: 'Received',
//       accessorKey: 'received',
//     },
//     {
//       header: 'Logical Resources',
//       accessorKey: 'logicalResources',
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <div className="p-3">
//       <table className='w-full text-center'>
//         <thead className='text-xs bg-[#2D2E5F] p-2'>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id}>
//                   {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody className="text-xs">
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClusterTable;

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

interface ClusterData {
  hostName: string;
  state: string;
  id: string;
  ip: string;
  cpu: number;
  memory: string;
  gpu: string | null;
  gram: string;
  diskRoot: string;
  sent: string;
  received: string;
  logicalResources: string;
}

const ClusterTable = ({ data }: { data: ClusterData[] }) => {
  const columns = [
    {
      header: 'Host / Worker Process name',
      accessorKey: 'hostName',
    },
    {
      header: 'State',
      accessorKey: 'state',
    },
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'IP / PID',
      accessorKey: 'ip',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: () => <span>Log</span>,
    },
    {
      header: 'CPU',
      accessorKey: 'cpu',
    },
    {
      header: 'Memory',
      accessorKey: 'memory',
    },
    {
      header: 'GPU',
      accessorKey: 'gpu',
    },
    {
      header: 'GRAM',
      accessorKey: 'gram',
    },
    {
      header: 'Disk(root)',
      accessorKey: 'diskRoot',
    },
    {
      header: 'Sent',
      accessorKey: 'sent',
    },
    {
      header: 'Received',
      accessorKey: 'received',
    },
    {
      header: 'Logical Resources',
      accessorKey: 'logicalResources',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="text-white">
      <table className="w-full text-center">
        <thead className="text-xs bg-[#2D2E5F] rounded-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-xs">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`${row.original.state === 'Dead' ? 'bg-[#FF3028] text-white' : 'bg-transparent'}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-6 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClusterTable;