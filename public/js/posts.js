let editID;
let commentID;
const today = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let hh = String(date.getHours());
    let mins = date.getMinutes();
    if (mins < 10) {
        mins = String(date.getMinutes()).padStart(2, '0');
    } else {
        mins = String(date.getMinutes())
    }
    let tod = 'AM';

    if (date.getHours() >= 13) {
        hh = String(date.getHours() - 12);
        tod = 'PM'
    }
    return `${mm}/${dd}/${yyyy} ~ ${hh}:${mins} ${tod}`;
};

const newPost = async () => {
    try {
        const date = today();
        const subject = $('#subjectText').val();
        const body = $('#bodyText').val();
        if (subject && body) {
            const response = await fetch(`/api/posts`,  
            {
                method: 'POST',
                body: JSON.stringify({ subject, body, date }),
                headers: { 'Content-Type': 'application/json'},
            });

            if (response.ok) {
                document.location.replace('/');
            }
        } else {
            if (!subject) {
                document.getElementById('subjectHelp').classList.toggle('is-hidden');
            }
            if (!body) {
                document.getElementById('bodyHelp').classList.toggle('is-hidden');
            }
            return;
        }
    } catch (error) {
        console.log(error)
        return;
    }
    return;
}; 
const deletePost = async (id) => {
    const response = await fetch(`/api/posts/${id}`,  
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
            });
            
            if (response.ok) {
                alert('You have successfully deleted your post!');
                document.location.replace('/dashboard');
            }
};

const savePost = async () => {
    try {
        const date = today();
        const subject = $('#editSubjectText').val();
        const body = $('#editBodyText').val();
        if (subject && body) {
            const response = await fetch(`/api/posts/${editID}`,  
            {
                method: 'PUT',
                body: JSON.stringify({ subject, body, date }),
                headers: { 'Content-Type': 'application/json'},
            });
            
            console.log(body, subject, date)
            if (response.ok) {
                alert('You have successfully editted your post!');
                document.location.replace('/dashboard');
            }
        } else {
            if (!subject) {
                document.getElementById('editSubjectHelp').classList.toggle('is-hidden');
            }
            if (!body) {
                document.getElementById('editBodyHelp').classList.toggle('is-hidden');
            }
            return edit;
        }
    } catch (error) {
        console.log(error)
        return editID = '';
    }
    return editID = '';
}; 
const commentPost = async () => {
    try {
        const date = today();
        const comment = $('#commentText').val();
        if (comment) {
            const response = await fetch(`/api/comments`,  
            {
                method: 'POST',
                body: JSON.stringify({ comment, date, commentID }),
                headers: { 'Content-Type': 'application/json'},
            });
            if (response.ok) {
                document.location.replace('/');
            }
        } else {
            document.getElementById('commentHelp').classList.toggle('is-hidden');
            return;
        }
    } catch (error) {
        console.log(error)
        return commentID = '';
    }
    return commentID = '';
}
const toggleModal = (e) => {
    e.preventDefault();
    const target = document.getElementById('modal');
    target.classList.toggle('is-active');
    return;
};

const editModal = async (id) => {
    const target = document.getElementById('editModal');
    target.classList.toggle('is-active');
    const post = await fetch(`api/posts/${id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }).then(res => res.json())
    console.log(post)
    $('#editSubjectText').val(post.subject);
    $('#editBodyText').text(post.body);
    editID = id;
};
const commentModal = async (id) => {
    const target = document.getElementById('commentModal');
    target.classList.toggle('is-active');
    const post = await fetch(`api/posts/${id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }).then(res => res.json())
    $('#commentSubjectText').val(post.subject);
    commentID = id;
};

document.getElementById('newPostButton').addEventListener('click', toggleModal);



document.getElementById('cancelPost').addEventListener('click', () => {
    document.getElementById('posting').reset();
        const target = document.getElementById('modal');
	    target.classList.toggle('is-active');
        return;
});
document.getElementById('cancelComment').addEventListener('click', () => {
    document.getElementById('comment').reset();
        const target = document.getElementById('commentModal');
        target.classList.toggle('is-active');
        return commentID = '';
});
document.getElementById('cancelEdit').addEventListener('click', () => {
    document.getElementById('edit').reset();
        const target = document.getElementById('editModal');
	    target.classList.toggle('is-active');
        return editID = '';
});

document.getElementById('postThis').addEventListener('click', newPost);
document.getElementById('commentThis').addEventListener('click', commentPost);
document.getElementById('saveThis').addEventListener('click', savePost);
