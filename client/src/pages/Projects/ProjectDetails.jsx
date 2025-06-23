import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectById,
  deleteProject,
} from "../../services/projectService";
import Button from "../../components/Button";
import Card from "../../components/Card";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProjectById(id).then(setProject);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this project?")) {
      await deleteProject(id);
      navigate("/projects");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card title={project.name} subtitle={project.status}>
        <p className="mb-2 text-sm text-gray-600">Priority: {project.priority}</p>
        <p className="mb-2 text-sm text-gray-600">{project.description}</p>
        <p className="mb-2 text-sm text-gray-600">
          {project.startDate} to {project.endDate}
        </p>
        <div className="flex gap-2 mt-4">
          <Button onClick={() => navigate(`/projects/edit/${id}`)} variant="primary">
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

export default ProjectDetails;
