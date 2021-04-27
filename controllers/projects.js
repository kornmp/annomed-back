import ProjectData from '../models/projectData.js';

export const getProjects = async (req, res) => {
    try {
        const ProjectData = await ProjectData.find();

        res.status(200).json(ProjectData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export  const createProject = async (req, res) => {
    const { projectName, lableType, dataType, lableTag, selectedFile } = req.body;
    
    const newProject = new ProjectData({ projectName, lableType, dataType, lableTag, selectedFile });

    try {
        await newProject.save();

        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
