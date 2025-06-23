import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useAuth } from "../../hooks/useAuth";
import { getAllocationsForEmployee } from "../../services/allocationService";
import LoadingSpinner from "../../components/LoadingSpinner";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllocationsForEmployee(user?.id);
        setAllocations(res);
      } catch (err) {
        console.error("Failed to fetch allocations", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchData();
  }, [user?.id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Hello, {user?.name || "Employee"}</h1>
      <p className="text-sm text-gray-500">Here's your current project allocation summary:</p>

      {allocations.length === 0 ? (
        <p className="text-center text-gray-600">No allocations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allocations.map((alloc) => (
            <Card
              key={alloc._id}
              title={alloc.project?.name || "Unnamed Project"}
              subtitle={`Allocated: ${alloc.percentage}%`}
            >
              <p className="text-sm text-gray-700">
                Period: {alloc.startDate} to {alloc.endDate}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
    