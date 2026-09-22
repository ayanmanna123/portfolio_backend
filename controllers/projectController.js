const { loadLocalData, saveLocalData } = require('../utils/store');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = (req, res, next) => {
  try {
    const data = loadLocalData();
    res.status(200).json({
      success: true,
      data: data.projects || []
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    const project = (data.projects || []).find(p => p.id === id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = (req, res, next) => {
  try {
    const data = loadLocalData();
    const newProject = {
      id: Date.now(),
      title: req.body.title || 'Untitled Project',
      category: req.body.category || 'Web Application',
      description: req.body.description || '',
      image: req.body.image || '/projects/project1.png',
      video: req.body.video || '',
      tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      demoUrl: req.body.demoUrl || '',
      githubUrl: req.body.githubUrl || '',
      featured: Boolean(req.body.featured),
      status: req.body.status || 'Live',
      accentColor: req.body.accentColor || 'from-indigo-500 to-purple-600',
      highlights: Array.isArray(req.body.highlights) ? req.body.highlights : [],
      details: req.body.details || {}
    };

    data.projects = [newProject, ...(data.projects || [])];
    saveLocalData(data);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project by ID
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    const index = (data.projects || []).findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    data.projects[index] = { ...data.projects[index], ...req.body, id };
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: data.projects[index]
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project by ID
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = (req, res, next) => {
  try {
    const data = loadLocalData();
    const id = parseInt(req.params.id);
    data.projects = (data.projects || []).filter(p => p.id !== id);
    saveLocalData(data);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
