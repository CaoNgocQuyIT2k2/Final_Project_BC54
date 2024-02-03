import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import { https } from '../../service/config';

const TaskListComment = () => {
    const [comment, setComment] = useState([]);

    const taskId = 11548;

    useEffect(() => {
        fetchCommentArticleDetail();
    }, [taskId]);

    const fetchCommentArticleDetail = async () => {
        try {
            const response = await https.get(`/api/Comment/getAll?taskId=${taskId}`);
            // Check if the response contains the 'content' field and it is an array
            if (Array.isArray(response.data.content)) {
                setComment(response.data.content.reverse()); // Set the 'content' array to the 'comment' state
            } else {
                console.error("Error fetching article detail: 'content' field is missing or not an array");
            }
        } catch (error) {
            console.error("Error fetching article detail:", error);
        }
    };

    return (
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}> {/* Set a max height and activate scrolling */}
            {comment.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Avatar
                        style={{
                            backgroundColor: '#A9A9A9',
                            marginRight: '0.5rem',
                        }}
                    >
                        {item.user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                        <List
                            dataSource={[item]} // Pass each item as an array to dataSource
                            renderItem={(commentItem) => ( // Use a different variable name for the item being rendered
                                <List.Item style={{ padding: 0 }}>
                                    <List.Item.Meta
                                        title={<p className='text-xs' style={{ margin: 0, whiteSpace: 'nowrap' }}>{commentItem.user.name}</p>}
                                        description={<p className='text-base' style={{ margin: 0, whiteSpace: 'nowrap' }}>{commentItem.contentComment}</p>} // Access contentComment from commentItem
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskListComment;
