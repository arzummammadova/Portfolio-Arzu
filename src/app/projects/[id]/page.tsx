'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'

const ProjectDetail = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  // Backend fetch və ya data burada ola bilər

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Project: {id}</h1>
      <p className="text-lg text-gray-600">
        Bu səhifədə "{id}" layihəsinin detalları göstəriləcək.
      </p>
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Geri
      </button>
    </div>
  )
}

export default ProjectDetail
