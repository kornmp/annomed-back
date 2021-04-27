import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    projectName: String,
    lableType: String,
    dataType: String,
    lableTag: [String],
    selectedFile: String,
});

const ProjectMessage = mongoose.model('ProjectMessage', projectSchema);

export default ProjectMessage;