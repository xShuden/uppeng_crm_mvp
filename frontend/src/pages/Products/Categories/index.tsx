import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Form, Modal, Offcanvas, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Breadcrumb from 'Common/BreadCrumb';
import { categoryListData } from 'Common/data';

const Categories = () => {

    document.title = "Görevler | Uppeng CRM + Admin React Template";

    const [show, setShow] = useState<boolean>(false);
    const [info, setInfo] = useState<any>([]);
    const [editingTask, setEditingTask] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>(categoryListData);
    const [subTasks, setSubTasks] = useState<string[]>([]);
    const [currentSubTask, setCurrentSubTask] = useState<string>('');

    // Pagination
    const [pagination, setPagination] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [currentpages, setCurrentpages] = useState<any>([]);
    const perPageData = 9;

    const handleClick = (e: any) => {
        setCurrentPage(Number(e.target.id));
    };

    const indexOfLast = currentPage * perPageData;
    const indexOfFirst = indexOfLast - perPageData;

    const currentdata = useMemo(() => tasks.slice(indexOfFirst, indexOfLast), [indexOfFirst, indexOfLast, tasks])

    useEffect(() => {
        setCurrentpages(currentdata)
    }, [currentPage, currentdata])

    const searchTeamMember = (ele: any) => {
        let search = ele.target.value;
        if (search) {
            search = search.toLowerCase()
            setCurrentpages(tasks.filter((data: any) => (data.categoryTitle.toLowerCase().includes(search))));
            setPagination(false)
        } else {
            setCurrentpages(currentdata);
            setPagination(true)
        }
    };

    // Edit task function
    const handleEditTask = (task: any) => {
        setEditingTask(task);
        setSubTasks(task.subCategory || []);
        // Populate form fields with task data
        const titleInput = document.getElementById('categoryTitle') as HTMLInputElement;
        const staffSelect = document.getElementById('assignedStaff') as HTMLSelectElement;
        const descriptionTextarea = document.getElementById('descriptionInput') as HTMLTextAreaElement;
        
        if (titleInput) titleInput.value = task.categoryTitle;
        if (staffSelect) staffSelect.value = 'mehmet-yilmaz'; // Default staff
        if (descriptionTextarea) descriptionTextarea.value = task.description;
    };

    // Delete task function
    const handleDeleteTask = (task: any) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            setTasks(tasks.filter(task => task.id !== taskToDelete.id));
            setShowDeleteModal(false);
            setTaskToDelete(null);
        }
    };

    // Save task function
    const handleSaveTask = (e: any) => {
        e.preventDefault();
        const titleInput = document.getElementById('categoryTitle') as HTMLInputElement;
        const staffSelect = document.getElementById('assignedStaff') as HTMLSelectElement;
        const descriptionTextarea = document.getElementById('descriptionInput') as HTMLTextAreaElement;

        if (editingTask) {
            // Update existing task
            const updatedTasks = tasks.map(task => 
                task.id === editingTask.id 
                    ? { ...task, categoryTitle: titleInput.value, description: descriptionTextarea.value, subCategory: subTasks }
                    : task
            );
            setTasks(updatedTasks);
            setEditingTask(null);
        } else {
            // Add new task
            const newTask = {
                id: tasks.length + 1,
                categoryTitle: titleInput.value,
                description: descriptionTextarea.value,
                categoryImg: tasks[0]?.categoryImg || '', // Use default image
                subCategory: subTasks
            };
            setTasks([...tasks, newTask]);
        }

        // Reset form
        titleInput.value = '';
        staffSelect.value = '';
        descriptionTextarea.value = '';
        setSubTasks([]);
    };

    // Cancel editing function
    const handleCancelEdit = () => {
        setEditingTask(null);
        setSubTasks([]);
        // Clear form
        const titleInput = document.getElementById('categoryTitle') as HTMLInputElement;
        const staffSelect = document.getElementById('assignedStaff') as HTMLSelectElement;
        const descriptionTextarea = document.getElementById('descriptionInput') as HTMLTextAreaElement;
        
        if (titleInput) titleInput.value = '';
        if (staffSelect) staffSelect.value = '';
        if (descriptionTextarea) descriptionTextarea.value = '';
    };

    // Add sub task
    const handleAddSubTask = () => {
        if (currentSubTask.trim() !== '') {
            setSubTasks([...subTasks, currentSubTask.trim()]);
            setCurrentSubTask('');
        }
    };

    // Remove sub task
    const handleRemoveSubTask = (index: number) => {
        setSubTasks(subTasks.filter((_, i) => i !== index));
    };

    const pageNumbers: any = [];
    for (let i = 1; i <= Math.ceil(tasks.length / perPageData); i++) {
        pageNumbers.push(i);
    }

    const handleprevPage = () => {
        let prevPage = currentPage - 1;
        setCurrentPage(prevPage);
    };

    const handlenextPage = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };

    useEffect(() => {
        if (pageNumbers.length && pageNumbers.length < currentPage) {
            setCurrentPage(pageNumbers.length)
        }
    }, [currentPage, pageNumbers.length])


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb title="Görevler" pageTitle="Hizmetler" />
                    <Row>
                        <Col xxl={3}>
                            <Card>
                                <Card.Header>
                                    <h6 className="card-title mb-0">
                                        {editingTask ? 'Görev Düzenle' : 'Görev Oluştur'}
                                    </h6>
                                </Card.Header>
                                <Card.Body>
                                    <form autoComplete="off" className="needs-validation createCategory-form" id="createCategory-form" noValidate onSubmit={handleSaveTask}>
                                        <input type="hidden" id="categoryid-input" className="form-control" value="" />
                                        <Row>
                                            <Col xxl={12} lg={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="categoryTitle" className="form-label">Görev Başlığı<span className="text-danger">*</span></label>
                                                    <input type="text" className="form-control" id="categoryTitle" placeholder="Görev başlığını girin" required />
                                                    <div className="invalid-feedback">Lütfen bir görev başlığı girin.</div>
                                                </div>
                                            </Col>
                                            <Col xxl={12} lg={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="assignedStaff" className="form-label">Atanan Personel <span className="text-danger">*</span></label>
                                                    <select className="form-control" id="assignedStaff">
                                                        <option value="">Personel Seçin</option>
                                                        <option value="mehmet-yilmaz">Dr. Mehmet Yılmaz</option>
                                                        <option value="fatma-sahin">Fatma Şahin</option>
                                                        <option value="esra-yildiz">Esra Yıldız</option>
                                                        <option value="ali-vural">Dr. Ali Vural</option>
                                                        <option value="cemile-aydin">Cemile Aydın</option>
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col xxl={12} lg={6}>
                                                <div className="mb-3">
                                                    <label htmlFor="descriptionInput" className="form-label">Açıklama</label>
                                                    <textarea className="form-control" id="descriptionInput" rows={3} placeholder="Görev açıklaması" required></textarea>
                                                    <div className="invalid-feedback">Lütfen bir açıklama girin.</div>
                                                </div>
                                            </Col>
                                            <Col xxl={12}>
                                                <div className="mb-3">
                                                    <label className="form-label">Alt Görevler</label>
                                                    <div className="d-flex mb-2">
                                                        <input 
                                                            type="text" 
                                                            className="form-control me-2" 
                                                            placeholder="Alt görev ekle"
                                                            value={currentSubTask}
                                                            onChange={(e) => setCurrentSubTask(e.target.value)}
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    handleAddSubTask();
                                                                }
                                                            }}
                                                        />
                                                        <Button 
                                                            variant="outline-primary" 
                                                            type="button"
                                                            onClick={handleAddSubTask}
                                                        >
                                                            <i className="ri-add-line"></i>
                                                        </Button>
                                                    </div>
                                                    {subTasks.length > 0 && (
                                                        <div className="border rounded p-2">
                                                            {subTasks.map((subTask, index) => (
                                                                <div key={index} className="d-flex align-items-center justify-content-between mb-1">
                                                                    <span className="text-muted">• {subTask}</span>
                                                                    <Button 
                                                                        variant="outline-danger" 
                                                                        size="sm"
                                                                        type="button"
                                                                        onClick={() => handleRemoveSubTask(index)}
                                                                    >
                                                                        <i className="ri-close-line"></i>
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col xxl={12}>
                                                <div className="text-end">
                                                    {editingTask && (
                                                        <Button variant='secondary' type="button" className="me-2" onClick={handleCancelEdit}>
                                                            İptal
                                                        </Button>
                                                    )}
                                                    <Button variant='success' type="submit">
                                                        {editingTask ? 'Görev Güncelle' : 'Görev Ekle'}
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={9}>
                            <Row className="justify-content-between mb-4">
                                <Col xxl={3} lg={6}>
                                    <div className="search-box mb-3 mb-lg-0">
                                        <Form.Control type="text" id="searchInputList" placeholder="Görev Ara..." onChange={(e) => searchTeamMember(e)} />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </Col>
                            </Row>

                            <Row id="categories-list">
                                {(currentpages || []).map((item: any, key: number) => (<Col xxl={4} md={6} key={key}>
                                    <Card className="categrory-widgets overflow-hidden">
                                        <Card.Body className="p-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <h5 className="flex-grow-1 mb-0">{item.categoryTitle}</h5>
                                                <ul className="flex-shrink-0 list-unstyled hstack gap-1 mb-0">
                                                    <li><Link to="#" className="badge bg-info-subtle text-info" onClick={() => handleEditTask(item)}>Düzenle</Link></li>
                                                    <li><Link to="#" className="badge bg-danger-subtle text-danger" onClick={() => handleDeleteTask(item)}>Sil</Link></li>
                                                </ul>
                                            </div>
                                            <ul className="list-unstyled vstack gap-2 mb-0">
                                                {(item.subCategory || []).map((item: any, key: number) => (key < 4 && <li key={key}><Link to="#" className="text-muted">{item}</Link></li>))}
                                            </ul>
                                            <div className="mt-3">
                                                <Link to="#" className="fw-medium link-effect" onClick={() => { setShow(true); setInfo(item) }}>Detayları Gör <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                            </div>
                                            <img src={item.categoryImg} alt="" className="img-fluid category-img object-fit-cover" />
                                        </Card.Body>
                                    </Card>
                                </Col>))}
                            </Row>

                            {pagination && <Row id="pagination-element" className='mb-4'>
                                <Col lg={12}>
                                    <div className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                                        <div className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                            <Button variant="link" href="#" className="page-link" id="page-prev" onClick={() => handleprevPage()}>←</Button>
                                        </div>
                                        <span id="page-num" className="pagination">
                                            {pageNumbers.map((item: any, key: any) => (
                                                <React.Fragment key={key}>
                                                    <div className={currentPage === item ? "page-item active" : "page-item"}>
                                                        <Link className="page-link clickPageNumber" to="#" key={key} id={item} onClick={(e) => handleClick(e)}>
                                                            {item}
                                                        </Link>
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                        </span>
                                        <div className={currentPage >= pageNumbers.length ? "page-item disabled" : "page-item"}>
                                            <Button variant="link" href="#" className="page-link" id="page-next" onClick={() => handlenextPage()}>→</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>}

                        </Col>
                    </Row>
                </Container>
            </div>


            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>#TB12</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="avatar-lg mx-auto">
                        <div className="avatar-title bg-light rounded">
                            <img src={info.categoryImg} alt="" className="avatar-sm overview-img" />
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <h5 className="overview-title">{info.categoryTitle}</h5>
                        <p className="text-muted">by <Link to="#" className="text-reset">Admin</Link></p>
                    </div>

                    <h6 className="fs-14">Açıklama</h6>
                    <p className="text-muted overview-desc">{info.description}</p>

                    <h6 className="fs-14 mb-3">Alt Görevler</h6>
                    <ul className="vstack gap-2 mb-0 subCategory" style={{ listStyleType: "circle" }}>
                        {(info.subCategory || []).map((item: any, key: number) => (key < 4 && <li key={key}><Link to="#" className="text-reset">{item}</Link></li>))}
                    </ul>
                </Offcanvas.Body>
                <div className="p-3 border-top">
                    <Row>
                        <Col sm={6}>
                            <div data-bs-dismiss="offcanvas">
                                <Button variant="danger" type="button" className="btn btn-danger w-100 remove-list" data-bs-toggle="modal" data-bs-target="#delteModal" data-remove-id="12"><i className="ri-delete-bin-line me-1 align-bottom"></i> Sil</Button>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Button variant="secondary" type="button" className="w-100 edit-list" data-bs-dismiss="offcanvas" data-edit-id="12"><i className="ri-pencil-line me-1 align-bottom"></i> Düzenle</Button>
                        </Col>
                    </Row>
                </div>
            </Offcanvas>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Görevi Sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bu görevi silmek istediğinizden emin misiniz?</p>
                    {taskToDelete && (
                        <div className="alert alert-warning">
                            <strong>{taskToDelete.categoryTitle}</strong> görevi kalıcı olarak silinecektir.
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        İptal
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        <i className="ri-delete-bin-line me-1"></i> Sil
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment >

    );
}

export default Categories;