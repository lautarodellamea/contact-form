import { useEffect, useState } from 'react'
import { helpHttp } from '../helpers/helpHttp'

export const useForm = ({ initialForm, validationsForm }) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value,
    })

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationsForm({ ...form, [name]: value })[name],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validationsForm(form)
    setErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some((error) => error)

    // console.log(form)

    if (!hasErrors) {
      // alert('Enviando Formulario')
      setLoading(true)
      helpHttp()
        .post('https://formsubmit.co/ajax/lautarodm98@gmail.com', {
          body: form,
          headers: {
            // que acepta json y el tipo de contenido es json
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setLoading(false)
          setResponse(true)
          setForm(initialForm)

          setTimeout(() => {
            setResponse(false)
          }, 5000)
        })
    } else {
      return
    }
  }

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleSubmit,
  }
}
