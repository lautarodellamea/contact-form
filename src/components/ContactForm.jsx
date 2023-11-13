import { useForm } from '../hooks/useForm'
import { Loader } from './loader/Loader'
import { Message } from './message/Message'

const initialForm = {
  name: '',
  surname: '',
  email: '',
  subject: '',
  comments: '',
}
const validationsForm = (form) => {
  let errors = {}
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
  let regexComments = /^.{1,255}$/

  if (!form.name.trim()) {
    errors.name = "El campo 'Nombre' es requerido"
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' solo acepta letras y espacios en blanco"
  }

  if (!form.surname.trim()) {
    errors.surname = "El campo 'Apellido' es requerido"
  } else if (!regexName.test(form.surname.trim())) {
    errors.surname =
      "El campo 'Apellido' solo acepta letras y espacios en blanco"
  }

  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido"
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto"
  }

  if (!form.subject.trim()) {
    errors.subject = "El campo 'Asunto' es requerido"
  }

  if (!form.comments.trim()) {
    errors.comments = "El campo 'Comentarios' es requerido"
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments =
      "El campo 'Comentarios' no debe exceder los 255 caracteres"
  }

  return errors
}

export const ContactForm = () => {
  const { form, errors, loading, response, handleChange, handleSubmit } =
    useForm({ initialForm, validationsForm })

  return (
    <section>
      <h2>Formulario de contacto</h2>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Nombre...'
          required
          onChange={handleChange}
          value={form.name}
          autoComplete='off'
        />
        {errors.name && <p> {errors.name}</p>}
        <input
          type='text'
          name='surname'
          placeholder='Apellido...'
          required
          onChange={handleChange}
          value={form.surname}
          autoComplete='off'
        />
        {errors.surname && <p> {errors.surname}</p>}
        <input
          type='email'
          name='email'
          placeholder='Email...'
          required
          onChange={handleChange}
          value={form.email}
          autoComplete='off'
        />
        {errors.email && <p> {errors.email}</p>}
        <input
          type='text'
          name='subject'
          placeholder='Asunto a tratar...'
          required
          onChange={handleChange}
          value={form.subject}
          autoComplete='off'
        />
        {errors.subject && <p> {errors.subject}</p>}
        <textarea
          type='text'
          name='comments'
          placeholder='Escribe tus comentarios'
          required
          onChange={handleChange}
          value={form.comments}
          autoComplete='off'
        />
        {errors.comments && <p> {errors.comments}</p>}
        <input type='submit' value='Enviar' />
      </form>
      {loading && <Loader />}
      {response && <Message msg='Los datos han sido enviados' />}
    </section>
  )
}
