async function newPostHandler(event)
{
    event.preventDefault();

    const title = document.querySelector(`input[name="title"]`).value;
    const summary = document.querySelector(`input[name="summary"]`).value;
    const post_text = document.querySelector(`textarea[name="desc"]`).value;

    const response = await fetch('/api/posts',
    {
        method: 'POST',
        body: JSON.stringify({title, summary, post_text}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok)
    {
        document.location.replace('/dashboard');
    }
    else
    {
        alert(response.statusText);
    }
};
  
document.querySelector('#create').addEventListener('submit', newPostHandler);