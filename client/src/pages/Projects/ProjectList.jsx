import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../services/projectService";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          to="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Project
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            key={project._id}
            title={project.name}
            subtitle={`Status: ${project.status}`}
            className="cursor-pointer"
          >
            <p className="text-sm">Priority: {project.priority}</p>
            <Link
              to={`/projects/${project._id}`}
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

export default ProjectList;

