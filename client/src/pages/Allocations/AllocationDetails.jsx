import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllocationById,
  deleteAllocation,
} from "../../services/allocationService";
import Button from "../../components/Button";
import Card from "../../components/Card";

const AllocationDetails = () => {
  const { id } = useParams();
  const [allocation, setAllocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllocationById(id).then(setAllocation);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this allocation?")) {
      await deleteAllocation(id);
      navigate("/allocations");
    }
  };

  if (!allocation) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card title={`Project: ${allocation.project.name}`} subtitle={`Employee: ${allocation.employee.name}`}>
        <p className="mb-2 text-sm text-gray-600">Allocation: {allocation.percentage}%</p>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => navigate(`/allocations/edit/${id}`)} variant="primary">
            Edit
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AllocationDetails;
