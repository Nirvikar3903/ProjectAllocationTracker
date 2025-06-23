import React, { useEffect, useState } from "react";
import { getAllAllocations } from "../../services/allocationService";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllocationList = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllAllocations();
        setAllocations(data);
      } catch (err) {
        console.error("Failed to fetch allocations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Allocations</h1>
        <Link
          to="/allocations/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Allocation
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allocations.map((a) => (
          <Card
            key={a._id}
            title={`Project: ${a.project.name}`}
            subtitle={`Employee: ${a.employee.name}`}
          >
            <p className="text-sm">Allocation %: {a.percentage}%</p>
            <Link
              to={`/allocations/${a._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllocationList;
