import { Form, redirect, useActionData } from 'react-router-dom'

export default function ContactPage() {
  const data = useActionData()

  return (
    <div className="contact">
      <h3>Contacts Us</h3>
      <Form method="POST" action="/contact">
        <label>
          <span>Your email:</span>
          <input type="text" name="email" id="email" required />
        </label>
        <label>
          <span>Your message:</span>
          <input type="text" name="message" id="message" required />
        </label>
        <button>Sumbit</button>

        {data && data.error && <p>{data.error}</p>}
      </Form>
    </div>
  )
}

export const contactAction = async ({ request }) => {
  const data = await request.formData()

  const submission = {
    email: data.get('email'),
    message: data.get('message'),
  }

  //send post request
  if (submission.message.length < 10) {
    return {
      error: 'Message must be over 10 chars long',
    }
  }

  //redirect the user
  return redirect('/')
}
