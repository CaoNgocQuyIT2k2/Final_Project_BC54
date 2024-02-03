import React, { useState } from 'react';
import { Avatar, Form, Button } from 'antd';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { https } from '../../service/config';

export default function TaskComment() {
    let user = useSelector((state) => state.userReducer.user);
    const [showDescription, setShowDescription] = useState(false);
    const [taskId, setTaskId] = useState(''); // Thêm state cho taskId
    const [contentComment, setContentComment] = useState(''); // Thêm state cho contentComment
    const handleShowDescription = () => {
        setShowDescription(true);
    };

    const handleCancelDescription = () => {
        setShowDescription(false);
    };
    const handleAddComment = async () => {
        try {
            const response = await https.post(
                'api/Comment/insertComment',
                { taskId, contentComment },
            );
            console.log('Comment added successfully:', response.data);
            setTaskId('');
            setContentComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của Form
        handleAddComment(); // Gọi hàm handleAddComment khi Form được gửi đi
    };

    return (
        <>
            <span className="ant-typography pl-1">
                <strong>Comment</strong>
            </span>
            <div className='flex'>
                <div className='mr-2'>
                    <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                </div>
                <div className="description-container mb-6">
                    {!showDescription && (
                        <div
                            className="p-1 hover:bg-gray-200 duration-300 rounded custom-html-parser"
                            onClick={handleShowDescription}
                        >
                            <span className="ant-typography ant-typography-secondary">Add a comment...</span>
                        </div>
                    )}
                    {showDescription && (
                        <Form onSubmit={handleFormSubmit}> {/* Sử dụng onSubmit của Form */}
                            <ReactQuill
                                style={{ height: '200px' }}
                                value={contentComment}
                                onChange={setContentComment} 
                            />
                            <div style={{ marginTop: '3rem' }}>
                                <Button
                                    type="default"
                                    className='bg-blue-500 text-white'
                                    onMouseOver={(e) => e.target.style.color = 'black'}
                                    onMouseOut={(e) => e.target.style.color = 'white'}
                                    htmlType="submit"
                                    style={{ marginRight: '8px' }}
                                >
                                    Save
                                </Button>
                                <Button onClick={handleCancelDescription}>Cancel</Button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </>
    );
}
