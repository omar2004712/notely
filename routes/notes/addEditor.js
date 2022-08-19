const express = require('express');
const { requireAuth } = require('../middleware');
const {
    searchEditors,
    addEditor,
    deleteEditor,
} = require('../../controllers/editors.js');

const router = express.Router();

router.get('/api/users', searchEditors);

router.put('/api/users', requireAuth, addEditor);

router.delete('/api/editor/:editorId/:noteId', requireAuth, deleteEditor);

module.exports = router;
