const STORAGE_KEYS = {
    THEME: 'mytube_theme',
    WATCH_LATER: 'mytube_watch_later',
    LIKES: 'mytube_likes',
    COMMENTS: 'mytube_comments'
};

const videos = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        channel: "Code Masters",
        views: "1.2M",
        date: "3 days ago",
        duration: "12:34",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "Learn the fundamentals of web development. This comprehensive guide covers HTML, CSS, and JavaScript basics to help you build your first website. Perfect for beginners who want to start their coding journey.",
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 2,
        title: "Advanced JavaScript Patterns",
        channel: "Tech Tutorials",
        views: "856K",
        date: "1 week ago",
        duration: "18:45",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        description: "Dive deep into advanced JavaScript design patterns including module pattern, factory pattern, and observer pattern. Learn how to write maintainable and scalable code.",
        tags: ["JavaScript", "Design Patterns", "Advanced"]
    },
    {
        id: 3,
        title: "CSS Grid Layout Tutorial",
        channel: "Design Hub",
        views: "543K",
        date: "2 weeks ago",
        duration: "15:20",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Master CSS Grid layout with practical examples. Build responsive layouts easily with this powerful CSS feature.",
        tags: ["CSS", "Grid", "Layout"]
    },
    {
        id: 4,
        title: "React Hooks Explained",
        channel: "Frontend Pro",
        views: "2.1M",
        date: "5 days ago",
        duration: "22:15",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Complete guide to React Hooks. Learn useState, useEffect, useContext, and custom hooks with real world examples.",
        tags: ["React", "Hooks", "Frontend"]
    },
    {
        id: 5,
        title: "Node.js REST API Development",
        channel: "Backend School",
        views: "987K",
        date: "4 days ago",
        duration: "28:30",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        description: "Build a complete REST API using Node.js and Express. Learn routing, middleware, error handling, and best practices.",
        tags: ["Node.js", "API", "Backend"]
    },
    {
        id: 6,
        title: "Python for Beginners",
        channel: "Programming 101",
        views: "1.8M",
        date: "1 week ago",
        duration: "32:10",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        description: "Start your Python journey here. Learn variables, data types, loops, functions, and basic programming concepts.",
        tags: ["Python", "Beginner", "Programming"]
    },
    {
        id: 7,
        title: "Database Design Principles",
        channel: "Data Science Pro",
        views: "678K",
        date: "6 days ago",
        duration: "19:45",
        thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        description: "Learn database design principles including normalization, relationships, indexing, and query optimization.",
        tags: ["Database", "SQL", "Design"]
    },
    {
        id: 8,
        title: "Git and GitHub Workflow",
        channel: "Dev Tools",
        views: "1.5M",
        date: "2 days ago",
        duration: "16:55",
        thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        description: "Master Git version control and GitHub workflow. Learn branching, merging, pull requests, and collaboration best practices.",
        tags: ["Git", "GitHub", "Version Control"]
    }
];

let currentVideo = null;

function init() {
    loadTheme();
    const videoId = getVideoIdFromURL();
    if (videoId) {
        loadVideo(videoId);
        loadRelatedVideos(videoId);
    }
    setupEventListeners();
}

function getVideoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

function loadVideo(videoId) {
    currentVideo = videos.find(v => v.id === videoId);
    if (!currentVideo) {
        currentVideo = videos[0];
    }
    
    document.getElementById('videoPlayer').src = currentVideo.videoSrc;
    document.getElementById('videoTitle').textContent = currentVideo.title;
    document.getElementById('videoViews').textContent = `${currentVideo.views} views`;
    document.getElementById('videoDate').textContent = currentVideo.date;
    document.getElementById('channelName').textContent = currentVideo.channel;
    document.getElementById('videoDescription').textContent = currentVideo.description;
    
    const tagsContainer = document.getElementById('videoTags');
    tagsContainer.innerHTML = currentVideo.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    const likes = getLikes();
    document.getElementById('likeCount').textContent = likes[videoId] || 0;
    
    if (isLiked(videoId)) {
        document.getElementById('likeBtn').classList.add('liked');
    }
    
    loadComments(videoId);
}

function loadRelatedVideos(currentId) {
    const related = videos.filter(v => v.id !== currentId).slice(0, 6);
    const container = document.getElementById('relatedList');
    
    container.innerHTML = related.map(video => `
        <a href="video.html?id=${video.id}" class="related-card">
            <div class="related-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <span class="related-duration">${video.duration}</span>
            </div>
            <div class="related-info">
                <h4 class="related-title-text">${video.title}</h4>
                <p class="related-channel">${video.channel}</p>
                <p class="related-stats">${video.views} views</p>
            </div>
        </a>
    `).join('');
}

function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const likeBtn = document.getElementById('likeBtn');
    const watchLaterBtn = document.getElementById('watchLaterVideoBtn');
    const postCommentBtn = document.getElementById('postComment');
    const cancelCommentBtn = document.getElementById('cancelComment');
    const commentInput = document.getElementById('commentInput');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (likeBtn) {
        likeBtn.addEventListener('click', handleLike);
    }
    
    if (watchLaterBtn) {
        watchLaterBtn.addEventListener('click', handleWatchLater);
    }
    
    if (postCommentBtn) {
        postCommentBtn.addEventListener('click', handlePostComment);
    }
    
    if (cancelCommentBtn) {
        cancelCommentBtn.addEventListener('click', () => {
            commentInput.value = '';
            commentInput.blur();
        });
    }
    
    if (commentInput) {
        commentInput.addEventListener('input', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        });
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    document.body.className = savedTheme === 'dark' ? '' : 'light-mode';
}

function toggleTheme() {
    const isLight = document.body.classList.contains('light-mode');
    document.body.className = isLight ? '' : 'light-mode';
    localStorage.setItem(STORAGE_KEYS.THEME, isLight ? 'dark' : 'light');
}

function handleLike() {
    const videoId = currentVideo.id;
    const likes = getLikes();
    const likeBtn = document.getElementById('likeBtn');
    const likeCount = document.getElementById('likeCount');
    
    if (isLiked(videoId)) {
        likes[videoId] = Math.max((likes[videoId] || 0) - 1, 0);
        removeLikedVideo(videoId);
        likeBtn.classList.remove('liked');
        showNotification('Like removed');
    } else {
        likes[videoId] = (likes[videoId] || 0) + 1;
        addLikedVideo(videoId);
        likeBtn.classList.add('liked');
        showNotification('Video liked');
    }
    
    likeCount.textContent = likes[videoId];
    saveLikes(likes);
}

function handleWatchLater() {
    const videoId = currentVideo.id;
    const watchLater = getWatchLater();
    const index = watchLater.indexOf(videoId);
    
    if (index === -1) {
        watchLater.push(videoId);
        showNotification('Added to Watch Later');
    } else {
        watchLater.splice(index, 1);
        showNotification('Removed from Watch Later');
    }
    
    saveWatchLater(watchLater);
}

function handlePostComment() {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (text === '') {
        return;
    }
    
    const comment = {
        id: Date.now(),
        videoId: currentVideo.id,
        author: 'You',
        text: text,
        time: 'Just now',
        likes: 0
    };
    
    addComment(comment);
    input.value = '';
    input.style.height = 'auto';
    input.blur();
    loadComments(currentVideo.id);
}

function loadComments(videoId) {
    const comments = getComments().filter(c => c.videoId === videoId);
    const container = document.getElementById('commentsList');
    const countElement = document.getElementById('commentCount');
    
    countElement.textContent = comments.length;
    
    if (comments.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px 0;">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    container.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions-row">
                    <button class="comment-like-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        <span>${comment.likes}</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getLikes() {
    const data = localStorage.getItem(STORAGE_KEYS.LIKES);
    return data ? JSON.parse(data) : {};
}

function saveLikes(likes) {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes));
}

function isLiked(videoId) {
    const likedVideos = localStorage.getItem('mytube_liked_videos');
    if (!likedVideos) return false;
    return JSON.parse(likedVideos).includes(videoId);
}

function addLikedVideo(videoId) {
    const likedVideos = localStorage.getItem('mytube_liked_videos');
    const list = likedVideos ? JSON.parse(likedVideos) : [];
    if (!list.includes(videoId)) {
        list.push(videoId);
        localStorage.setItem('mytube_liked_videos', JSON.stringify(list));
    }
}

function removeLikedVideo(videoId) {
    const likedVideos = localStorage.getItem('mytube_liked_videos');
    if (!likedVideos) return;
    const list = JSON.parse(likedVideos);
    const index = list.indexOf(videoId);
    if (index > -1) {
        list.splice(index, 1);
        localStorage.setItem('mytube_liked_videos', JSON.stringify(list));
    }
}

function getWatchLater() {
    const data = localStorage.getItem(STORAGE_KEYS.WATCH_LATER);
    return data ? JSON.parse(data) : [];
}

function saveWatchLater(list) {
    localStorage.setItem(STORAGE_KEYS.WATCH_LATER, JSON.stringify(list));
}

function getComments() {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    return data ? JSON.parse(data) : [];
}

function addComment(comment) {
    const comments = getComments();
    comments.unshift(comment);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', init);
