const STORAGE_KEYS = {
    THEME: 'mytube_theme',
    WATCH_LATER: 'mytube_watch_later'
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
        description: "Learn the fundamentals of web development. This comprehensive guide covers HTML, CSS, and JavaScript basics to help you build your first website.",
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
        description: "Dive deep into advanced JavaScript design patterns including module pattern, factory pattern, and observer pattern.",
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

function init() {
    loadTheme();
    renderVideoGrid();
    setupEventListeners();
    updateWatchLaterCount();
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

function renderVideoGrid() {
    const grid = document.getElementById('videoGrid');
    grid.innerHTML = videos.map(video => createVideoCard(video)).join('');
}

function createVideoCard(video) {
    const watchLater = getWatchLater();
    const isInWatchLater = watchLater.includes(video.id);
    
    return `
        <div class="video-card" data-id="${video.id}" data-title="${video.title.toLowerCase()}">
            <a href="video.html?id=${video.id}" class="video-link">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <span class="video-duration">${video.duration}</span>
                </div>
            </a>
            <div class="video-details">
                <div class="channel-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                </div>
                <div class="video-meta">
                    <h3 class="video-title-text">${video.title}</h3>
                    <p class="channel-name">${video.channel}</p>
                    <p class="video-stats">${video.views} views • ${video.date}</p>
                    <div class="video-actions">
                        <button class="video-action-btn watch-later-btn ${isInWatchLater ? 'added' : ''}" data-id="${video.id}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            ${isInWatchLater ? 'Saved' : 'Watch Later'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');
    const videoGrid = document.getElementById('videoGrid');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (videoGrid) {
        videoGrid.addEventListener('click', handleGridClick);
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.video-card');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const title = card.getAttribute('data-title');
        if (title.includes(query)) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    if (visibleCount === 0 && query !== '') {
        noResults.classList.add('show');
    } else {
        noResults.classList.remove('show');
    }
}

function handleGridClick(e) {
    const btn = e.target.closest('.watch-later-btn');
    if (btn) {
        e.preventDefault();
        const videoId = parseInt(btn.getAttribute('data-id'));
        toggleWatchLater(videoId, btn);
    }
}

function toggleWatchLater(videoId, btn) {
    const watchLater = getWatchLater();
    const index = watchLater.indexOf(videoId);
    
    if (index === -1) {
        watchLater.push(videoId);
        btn.classList.add('added');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
            Saved
        `;
        showNotification('Added to Watch Later');
    } else {
        watchLater.splice(index, 1);
        btn.classList.remove('added');
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
            Watch Later
        `;
        showNotification('Removed from Watch Later');
    }
    
    saveWatchLater(watchLater);
    updateWatchLaterCount();
}

function getWatchLater() {
    const data = localStorage.getItem(STORAGE_KEYS.WATCH_LATER);
    return data ? JSON.parse(data) : [];
}

function saveWatchLater(list) {
    localStorage.setItem(STORAGE_KEYS.WATCH_LATER, JSON.stringify(list));
}

function updateWatchLaterCount() {
    const count = getWatchLater().length;
    const badge = document.getElementById('watchLaterCount');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
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
