import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

// 🔹 Helper to convert 24h -> 12h
const formatTime12h = (time24) => {
  if (!time24) return "";
  const [hour, min] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${min.toString().padStart(2, "0")} ${ampm}`;
};

// 🔹 Helper to format date as "Dec 13, 2025"
const formatDateReadable = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const QuizzesTable = ({ data, onEdit, API, onDeleteSuccess }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/delete/${id}`, { method: "DELETE" });
      onDeleteSuccess(id);
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };

  const columns = [
    { accessorKey: "quizName", header: "Quiz" },
    {
      accessorKey: "quizDate",
      header: "Date",
      cell: ({ getValue }) => formatDateReadable(getValue()),
    },
    {
      accessorKey: "quizTime",
      header: "Time",
      cell: ({ getValue }) => formatTime12h(getValue()),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onEdit(row.original)}
            className="px-3 py-1 text-sm bg-green-600 hover:bg-gray-600 rounded transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-gray-600 rounded transition duration-200"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [], // always array
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 p-6 bg-gray-900 rounded-2xl shadow-xl overflow-x-auto">
      <table className="w-full min-w-[500px] border-collapse">
        <thead className="bg-gray-800 text-gray-400 text-sm uppercase tracking-wider">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-4 px-4 border-b border-gray-700"
                >
                  {flexRender(header.column.columnDef.header)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, i) => (
            <tr
              key={row.id}
              className={i % 2 === 0 ? "bg-gray-900" : "bg-gray-800 hover:bg-gray-700"}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-4 px-4 border-b border-gray-700 text-gray-200"
                >
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

export default QuizzesTable;
