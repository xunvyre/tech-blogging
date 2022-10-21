async function editFormHandler(event)
{
    event.preventDefault();

    const title = document.querySelector(`input[name="title"]`).value;
    const summary = document.querySelector(`input[name="summary"]`).value;
    const post_text = document.querySelector(`textarea[name="desc"]`).value;
    const post_id = window.location.toString().split('/')
                       [window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${post_id}`,
    {
        method: 'PUT',
        body: JSON.stringify({title, summary, post_text}),
        headers: {'Content-Type': 'application/json'}
    })

    if (response.ok)
    {
        document.location.replace(`/posts/${post_id}`);
    }
    else
    {
        alert(response.statusText);
    }
}

async function deleteFormHandler(event)
{
    event.preventDefault();

    const post_id = window.location.toString().split('/')
                       [window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${post_id}`,
    {
        method: 'DELETE',
    })

    if (response.ok)
    {
        document.location.replace(`/dashboard`);
    }
    else
    {
        alert(response.statusText);
    }
  
}

document.querySelector('#confirm').addEventListener('click', editFormHandler);
document.querySelector('#delete').addEventListener('click', deleteFormHandler);