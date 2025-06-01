// Application state
let appState = {
    currentPage: 'dashboard',
    documents: [
        {
            id: 1,
            name: "Договор поставки №123",
            category: "Договоры",
            status: "pending",
            uploadDate: "2025-06-01",
            size: "2.4 MB",
            tags: ["поставка", "важный"]
        },
        {
            id: 2,
            name: "Финансовый отчет Q1",
            category: "Отчеты",
            status: "approved",
            uploadDate: "2025-05-28",
            size: "1.8 MB",
            tags: ["финансы", "квартальный"]
        },
        {
            id: 3,
            name: "Техническое задание",
            category: "Проекты",
            status: "rejected",
            uploadDate: "2025-05-25",
            size: "3.2 MB",
            tags: ["техническое", "проект"]
        }
    ],
    categories: ["Договоры", "Отчеты", "Проекты", "Письма", "Счета"],
    pendingFiles: [],
    nextId: 4,
    isLoading: false
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeUpload();
    initializeSearch();
    initializeWorkflow();
    populateCategorySelects();
    renderDashboard();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    if (appState.isLoading) return;
    
    setLoading(true);
    
    // Small delay to show loading state
    setTimeout(() => {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Update page content
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        document.getElementById(page).classList.add('active');

        appState.currentPage = page;

        // Render page content
        try {
            switch(page) {
                case 'dashboard':
                    renderDashboard();
                    break;
                case 'documents':
                    renderDocuments();
                    break;
                case 'workflow':
                    renderWorkflow();
                    break;
            }
        } catch (error) {
            console.error('Error rendering page:', error);
            showToast('Ошибка при загрузке страницы', 'error');
        } finally {
            setLoading(false);
        }
    }, 100);
}

function setLoading(loading) {
    appState.isLoading = loading;
    const mainContent = document.querySelector('.main-content');
    if (loading) {
        mainContent.classList.add('loading');
    } else {
        mainContent.classList.remove('loading');
    }
}

// Dashboard functionality
function renderDashboard() {
    try {
        const stats = calculateStats();
        
        document.getElementById('totalDocs').textContent = stats.total;
        document.getElementById('pendingDocs').textContent = stats.pending;
        document.getElementById('approvedDocs').textContent = stats.approved;
        document.getElementById('storageUsed').textContent = stats.storage;

        renderRecentDocuments();
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        showToast('Ошибка при загрузке дашборда', 'error');
    }
}

function calculateStats() {
    const total = appState.documents.length;
    const pending = appState.documents.filter(doc => doc.status === 'pending').length;
    const approved = appState.documents.filter(doc => doc.status === 'approved').length;
    
    return {
        total,
        pending,
        approved,
        storage: '8.7 GB'
    };
}

function renderRecentDocuments() {
    const recentDocs = appState.documents
        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
        .slice(0, 5);

    const container = document.getElementById('recentDocsList');
    
    if (recentDocs.length === 0) {
        container.innerHTML = '<div class="no-documents">Нет документов</div>';
        return;
    }

    container.innerHTML = recentDocs.map(doc => `
        <div class="document-item">
            <div class="document-info">
                <h4>${escapeHtml(doc.name)}</h4>
                <div class="document-meta">
                    <span>📁 ${escapeHtml(doc.category)}</span>
                    <span>📅 ${formatDate(doc.uploadDate)}</span>
                    <span>💾 ${escapeHtml(doc.size)}</span>
                </div>
                <div class="document-tags">
                    ${doc.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
            <span class="status status--${doc.status}">${getStatusText(doc.status)}</span>
        </div>
    `).join('');
}

// Upload functionality
function initializeUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFilesBtn = document.getElementById('selectFiles');
    const uploadBtn = document.getElementById('uploadBtn');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });

    // Handle dropped files
    uploadArea.addEventListener('drop', function(e) {
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Click to select files
    uploadArea.addEventListener('click', () => fileInput.click());
    selectFilesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    // Upload button
    uploadBtn.addEventListener('click', uploadFiles);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleFiles(files) {
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    appState.pendingFiles = fileArray.map(file => ({
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || 'Неизвестный тип'
    }));

    renderPendingFiles();
    updateUploadButton();
}

function updateUploadButton() {
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.disabled = appState.pendingFiles.length === 0;
}

function renderPendingFiles() {
    const container = document.getElementById('uploadedFiles');
    
    if (appState.pendingFiles.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <h3>Выбранные файлы:</h3>
        ${appState.pendingFiles.map((fileData, index) => `
            <div class="file-item">
                <div class="file-info">
                    <div class="file-name">${escapeHtml(fileData.name)}</div>
                    <div class="file-meta">${escapeHtml(fileData.size)} • ${escapeHtml(fileData.type)}</div>
                </div>
                <button class="btn btn--secondary btn--sm" onclick="removeFile(${index})">Удалить</button>
            </div>
        `).join('')}
    `;
}

function removeFile(index) {
    if (index >= 0 && index < appState.pendingFiles.length) {
        appState.pendingFiles.splice(index, 1);
        renderPendingFiles();
        updateUploadButton();
    }
}

function uploadFiles() {
    const category = document.getElementById('categorySelect').value;
    const tagsInput = document.getElementById('tagsInput').value;
    
    if (!category) {
        showToast('Выберите категорию для документов', 'error');
        return;
    }

    if (appState.pendingFiles.length === 0) {
        showToast('Выберите файлы для загрузки', 'error');
        return;
    }

    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    const currentDate = new Date().toISOString().split('T')[0];

    appState.pendingFiles.forEach(fileData => {
        const newDoc = {
            id: appState.nextId++,
            name: fileData.name,
            category,
            status: 'pending',
            uploadDate: currentDate,
            size: fileData.size,
            tags
        };
        appState.documents.push(newDoc);
    });

    showToast(`Загружено ${appState.pendingFiles.length} документов`, 'success');
    
    // Reset form
    appState.pendingFiles = [];
    document.getElementById('categorySelect').value = '';
    document.getElementById('tagsInput').value = '';
    document.getElementById('fileInput').value = '';
    renderPendingFiles();
    updateUploadButton();
}

// Documents functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');

    // Debounce search input
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            renderDocuments();
        }, 300);
    });

    categoryFilter.addEventListener('change', renderDocuments);
    statusFilter.addEventListener('change', renderDocuments);
}

function renderDocuments() {
    try {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const statusFilter = document.getElementById('statusFilter');
        
        if (!searchInput || !categoryFilter || !statusFilter) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryFilterValue = categoryFilter.value;
        const statusFilterValue = statusFilter.value;

        let filteredDocs = appState.documents.filter(doc => {
            const matchesSearch = !searchTerm || 
                                doc.name.toLowerCase().includes(searchTerm) ||
                                doc.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                                doc.category.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilterValue || doc.category === categoryFilterValue;
            const matchesStatus = !statusFilterValue || doc.status === statusFilterValue;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        const container = document.getElementById('documentsGrid');
        
        if (filteredDocs.length === 0) {
            container.innerHTML = '<div class="no-documents">Документы не найдены</div>';
            return;
        }

        container.innerHTML = filteredDocs.map(doc => `
            <div class="document-item">
                <div class="document-info">
                    <h4>${escapeHtml(doc.name)}</h4>
                    <div class="document-meta">
                        <span>📁 ${escapeHtml(doc.category)}</span>
                        <span>📅 ${formatDate(doc.uploadDate)}</span>
                        <span>💾 ${escapeHtml(doc.size)}</span>
                    </div>
                    <div class="document-tags">
                        ${doc.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
                <span class="status status--${doc.status}">${getStatusText(doc.status)}</span>
                <div class="document-actions">
                    <button class="btn btn--secondary btn--sm" onclick="editDocument(${doc.id})">Редактировать</button>
                    <button class="btn btn--outline btn--sm" onclick="deleteDocument(${doc.id})">Удалить</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering documents:', error);
        showToast('Ошибка при загрузке документов', 'error');
    }
}

// Workflow functionality
function initializeWorkflow() {
    const workflowTabs = document.querySelectorAll('.workflow-tab');
    workflowTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const status = this.getAttribute('data-status');
            setActiveWorkflowTab(status);
            renderWorkflowContent(status);
        });
    });
}

function setActiveWorkflowTab(status) {
    document.querySelectorAll('.workflow-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`[data-status="${status}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function renderWorkflow() {
    setActiveWorkflowTab('pending');
    renderWorkflowContent('pending');
}

function renderWorkflowContent(status) {
    try {
        const filteredDocs = appState.documents.filter(doc => doc.status === status);
        const container = document.getElementById('workflowContent');

        if (filteredDocs.length === 0) {
            container.innerHTML = `<div class="no-documents">Нет документов со статусом "${getStatusText(status)}"</div>`;
            return;
        }

        container.innerHTML = filteredDocs.map(doc => `
            <div class="workflow-item">
                <div class="document-info">
                    <h4>${escapeHtml(doc.name)}</h4>
                    <div class="document-meta">
                        <span>📁 ${escapeHtml(doc.category)}</span>
                        <span>📅 ${formatDate(doc.uploadDate)}</span>
                        <span>💾 ${escapeHtml(doc.size)}</span>
                    </div>
                    <div class="document-tags">
                        ${doc.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
                ${status === 'pending' ? `
                    <div class="workflow-actions">
                        <button class="btn btn--approve btn--sm" onclick="approveDocument(${doc.id})">Утвердить</button>
                        <button class="btn btn--reject btn--sm" onclick="rejectDocument(${doc.id})">Отклонить</button>
                    </div>
                ` : `
                    <span class="status status--${doc.status}">${getStatusText(doc.status)}</span>
                `}
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering workflow:', error);
        showToast('Ошибка при загрузке workflow', 'error');
    }
}

// Document actions
function approveDocument(id) {
    const doc = appState.documents.find(d => d.id === id);
    if (doc) {
        doc.status = 'approved';
        showToast(`Документ "${doc.name}" утвержден`, 'success');
        renderWorkflowContent('pending');
        if (appState.currentPage === 'dashboard') {
            renderDashboard();
        }
    }
}

function rejectDocument(id) {
    const doc = appState.documents.find(d => d.id === id);
    if (doc) {
        doc.status = 'rejected';
        showToast(`Документ "${doc.name}" отклонен`, 'error');
        renderWorkflowContent('pending');
        if (appState.currentPage === 'dashboard') {
            renderDashboard();
        }
    }
}

function editDocument(id) {
    showToast('Функция редактирования в разработке', 'info');
}

function deleteDocument(id) {
    if (confirm('Вы уверены, что хотите удалить этот документ?')) {
        const docIndex = appState.documents.findIndex(doc => doc.id === id);
        if (docIndex !== -1) {
            const docName = appState.documents[docIndex].name;
            appState.documents.splice(docIndex, 1);
            showToast(`Документ "${docName}" удален`, 'success');
            renderDocuments();
            if (appState.currentPage === 'dashboard') {
                renderDashboard();
            }
        }
    }
}

// Utility functions
function populateCategorySelects() {
    const selects = ['categorySelect', 'categoryFilter'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const currentValue = select.value;
            const options = selectId === 'categoryFilter' ? 
                '<option value="">Все категории</option>' : 
                '<option value="">Выберите категорию</option>';
            
            select.innerHTML = options + appState.categories.map(cat => 
                `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`
            ).join('');
            
            select.value = currentValue;
        }
    });
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    } catch (error) {
        return dateString;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'Ожидает утверждения',
        'approved': 'Утвержден',
        'rejected': 'Отклонен'
    };
    return statusTexts[status] || status;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toast notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}