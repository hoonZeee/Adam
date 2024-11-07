document.addEventListener('DOMContentLoaded', () => {
    const likeBtn = document.getElementById('likeBtn');
    const likeCount = document.getElementById('likeCount');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const commentsContainer = document.getElementById('commentsContainer');

    let likes = 0;

    likeBtn.addEventListener('click', () => {
        likes++;
        likeCount.textContent = likes;
    });

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = '';
        }
    });

    function addComment(text) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        commentDiv.innerHTML = `
            <p>${text}</p>
            <span class="comment-time">${timeString}</span>
        `;
        commentsContainer.appendChild(commentDiv);
        commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }
});